/**
 * POST /api/subscribe — digest subscription endpoint.
 *
 * The site's FIRST Cloudflare Pages Function. Kept deliberately small and
 * dependency-free as the reference pattern for the future contact form.
 *
 * Flow: receive { email, turnstileToken } → best-effort IP rate-limit →
 * validate email → verify Turnstile token server-side → create the subscriber
 * in Buttondown with the server-held API key → return a JSON verdict the
 * frontend maps to a localized message.
 *
 * Secrets live in Cloudflare Pages env vars (NOT in code):
 *   BUTTONDOWN_API_KEY   — Buttondown → Settings → API
 *   TURNSTILE_SECRET_KEY — Cloudflare → Turnstile → (widget) → Secret key
 *
 * This directory is intentionally outside tsconfig's `include`, so Astro's
 * `astro check` does not type-check it; Cloudflare compiles Functions itself.
 * Types below are minimal hand-written shapes, no @cloudflare/workers-types
 * dependency.
 */

interface Env {
  BUTTONDOWN_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-IP rate limit. Pages Functions run in ephemeral isolates, so
// this Map is not a hard global guarantee — Turnstile is the real abuse gate.
// It cheaply blunts a burst hitting the same warm isolate.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now < rec.reset) {
    if (rec.count >= RATE_LIMIT) return json({ ok: false, error: "rate_limited" }, 429);
    rec.count += 1;
  } else {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
  }

  // Parse + validate input.
  let payload: { email?: unknown; turnstileToken?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const turnstileToken =
    typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "invalid_email" }, 400);

  // Verify Turnstile server-side.
  if (!env.TURNSTILE_SECRET_KEY) {
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }
  const verify = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
        remoteip: ip,
      }),
    },
  );
  const verifyData = (await verify.json().catch(() => ({}))) as { success?: boolean };
  if (!verifyData.success) return json({ ok: false, error: "turnstile_failed" }, 403);

  // Create the subscriber in Buttondown.
  if (!env.BUTTONDOWN_API_KEY) {
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }
  const bd = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
      "content-type": "application/json",
    },
    // Buttondown v1 expects `email_address`. Confirm field/status against the
    // current Buttondown API docs when the account is set up.
    body: JSON.stringify({ email_address: email }),
  });

  if (bd.status === 201) return json({ ok: true, status: "subscribed" }, 201);

  // Already-subscribed surfaces as 409, or 400 with an "already exists" code
  // depending on API version — treat both as a benign success for the user.
  if (bd.status === 409 || bd.status === 400) {
    const body = (await bd.json().catch(() => ({}))) as { code?: string; detail?: string };
    const alreadyExists =
      bd.status === 409 ||
      /exist|already|subscribed/i.test(`${body.code ?? ""} ${body.detail ?? ""}`);
    if (alreadyExists) return json({ ok: true, status: "already_subscribed" }, 200);
    return json({ ok: false, error: "invalid_email" }, 400);
  }

  return json({ ok: false, error: "provider_error" }, 502);
}
