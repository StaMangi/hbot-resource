/**
 * POST /api/contact — two-mode contact endpoint.
 *
 * Mirrors functions/api/subscribe.ts (the reference Pages Function pattern):
 * receive JSON → best-effort per-IP rate-limit → validate the reason + required
 * fields server-side → verify the Turnstile token server-side → deliver one
 * email to the single configured inbox. Returns a JSON verdict the page maps to
 * a localised message.
 *
 * Two modes, driven by `reason`:
 *   - "research"  → structured research submission (submissionType, link, title,
 *                   relation?, relevance?, name, affiliation, role, email)
 *   - "corrections" | "partnership" | "media" | "general" → general contact
 *                   (name, email, message)
 *
 * Delivery is a transactional email send via Resend (https://resend.com) using
 * a fetch call — no SDK, no extra dependency, same shape as the Buttondown call
 * in subscribe.ts. (MailChannels' free Cloudflare route was retired in 2024, so
 * Resend is the simplest robust option; swap the provider block if Stamos
 * prefers another.) All submissions go to ONE inbox (no per-reason label).
 *
 * Secrets / env vars live in Cloudflare Pages settings (NOT in code):
 *   TURNSTILE_SECRET_KEY  — secret    — Cloudflare → Turnstile → (widget) → Secret key
 *   RESEND_API_KEY        — secret    — Resend → API Keys
 *   CONTACT_DEST_EMAIL    — plaintext — the single inbox that receives submissions
 *   CONTACT_FROM_EMAIL    — plaintext — verified Resend sender (a hbotscience.org address)
 *
 * This directory is intentionally outside tsconfig's `include`, so Astro's
 * `astro check` does not type-check it; Cloudflare compiles Functions itself.
 */

interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  CONTACT_DEST_EMAIL: string;
  CONTACT_FROM_EMAIL: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const REASONS = ["research", "corrections", "partnership", "media", "general"] as const;
type Reason = (typeof REASONS)[number];
const SUBMISSION_TYPES = ["comment", "article", "study", "trial", "other"] as const;

// English triage labels for the inbox subject line (the inbox owner reads in
// English regardless of the submitter's locale).
const REASON_LABEL: Record<Reason, string> = {
  research: "Research submission",
  corrections: "Corrections",
  partnership: "Partnership",
  media: "Media",
  general: "General",
};

// Per-field length caps — truncate (don't reject) to stay lenient but bounded.
const CAP = {
  name: 200,
  email: 320,
  title: 500,
  link: 1000,
  affiliation: 300,
  role: 200,
  relation: 300,
  relevance: 5000,
  message: 5000,
  submissionType: 40,
};

// Best-effort per-IP rate limit. Pages Functions run in ephemeral isolates, so
// this is not a hard global guarantee — Turnstile is the real abuse gate.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function str(v: unknown, cap: number): string {
  return typeof v === "string" ? v.trim().slice(0, cap) : "";
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context;

  // Best-effort per-IP rate limit.
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now < rec.reset) {
    if (rec.count >= RATE_LIMIT) return json({ ok: false, error: "rate_limited" }, 429);
    rec.count += 1;
  } else {
    hits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
  }

  // Parse.
  let p: Record<string, unknown>;
  try {
    p = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const reason = str(p.reason, 40) as Reason;
  if (!REASONS.includes(reason)) return json({ ok: false, error: "invalid_reason" }, 400);

  const turnstileToken = typeof p.turnstileToken === "string" ? p.turnstileToken : "";

  // Validate required fields per mode (server-side; never trust the client).
  const email = str(p.email, CAP.email);
  const name = str(p.name, CAP.name);
  if (!name) return json({ ok: false, error: "missing_field" }, 400);
  if (!EMAIL_RE.test(email)) return json({ ok: false, error: "invalid_email" }, 400);

  let subject: string;
  let lines: string[];

  if (reason === "research") {
    const submissionType = str(p.submissionType, CAP.submissionType);
    const link = str(p.link, CAP.link);
    const title = str(p.title, CAP.title);
    const affiliation = str(p.affiliation, CAP.affiliation);
    const role = str(p.role, CAP.role);
    const relation = str(p.relation, CAP.relation);
    const relevance = str(p.relevance, CAP.relevance);

    if (!SUBMISSION_TYPES.includes(submissionType as (typeof SUBMISSION_TYPES)[number])) {
      return json({ ok: false, error: "missing_field" }, 400);
    }
    if (!link || !title || !affiliation || !role) {
      return json({ ok: false, error: "missing_field" }, 400);
    }

    subject = `[HBOT] Research submission: ${title.slice(0, 120)}`;
    lines = [
      `Reason: Research submission`,
      `Submission type: ${submissionType}`,
      `Title: ${title}`,
      `DOI / link: ${link}`,
      `Related indication/department: ${relation || "—"}`,
      `Why it's relevant: ${relevance || "—"}`,
      ``,
      `Name: ${name}`,
      `Affiliation: ${affiliation}`,
      `Role / credentials: ${role}`,
      `Email: ${email}`,
    ];
  } else {
    const message = str(p.message, CAP.message);
    if (!message) return json({ ok: false, error: "missing_field" }, 400);

    subject = `[HBOT] ${REASON_LABEL[reason]} — ${name}`;
    lines = [
      `Reason: ${REASON_LABEL[reason]}`,
      `Name: ${name}`,
      `Email: ${email}`,
      ``,
      `Message:`,
      message,
    ];
  }

  // Verify Turnstile server-side.
  if (!env.TURNSTILE_SECRET_KEY) return json({ ok: false, error: "server_misconfigured" }, 500);
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

  // Deliver to the single inbox via Resend.
  if (!env.RESEND_API_KEY || !env.CONTACT_DEST_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ ok: false, error: "server_misconfigured" }, 500);
  }
  const send = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL,
      to: [env.CONTACT_DEST_EMAIL],
      reply_to: email,
      subject,
      text: lines.join("\n"),
    }),
  });

  if (send.ok) return json({ ok: true, status: "sent" }, 200);
  return json({ ok: false, error: "provider_error" }, 502);
}
