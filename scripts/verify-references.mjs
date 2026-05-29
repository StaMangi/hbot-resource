#!/usr/bin/env node
/**
 * DOI verification — Phase 4.A.2 build gate.
 *
 * Strategy: for `https://doi.org/<doi>` URLs, check via CrossRef's API
 * (`api.crossref.org/works/{doi}`) — the authoritative DOI registry.
 * CrossRef returns 200 if the DOI is registered with publisher-resolved
 * metadata, 404 if it isn't. This bypasses publisher anti-bot (LWW, MDPI,
 * Sage all 403 our HEAD/GET on doi.org redirects, but their DOIs do
 * exist in CrossRef).
 *
 * Non-DOI URLs (PubMed/PMC, NCBI Bookshelf, UHMS, preprint hosts) fall
 * through to direct HEAD/GET.
 *
 * Input validation (added after Phase 4.B Cloudflare deploy failure):
 *   - Bare DOI (`10.XXXX/...`) and canonical `doi.org` URLs are accepted.
 *   - Known non-DOI repository hosts are accepted (direct HEAD).
 *   - Publisher URLs with a DOI buried inside (e.g.
 *     `https://www.neurology.org/doi/abs/10.1212/...`) fail loudly with
 *     a clear error pointing at the canonical doi.org form. This is the
 *     bug class that broke the Cloudflare build for ref-15.
 *
 * Editorial-integrity precedent (Phase 3.B / 3.E): every claim citable.
 * This script catches the inverse — citations whose targets disappeared,
 * were typo'd at source, or are stored in a malformed way that resolves
 * locally but fails on a fresh CI runner.
 *
 * Wired into pnpm build lifecycle as `prebuild` so Cloudflare Pages
 * rejects deploys with broken DOIs before assets ship.
 *
 * Cache: 24-hour TTL in .verify-refs-cache.json (gitignored). Speeds up
 * local iteration; useless on Cloudflare's fresh-container builds, but
 * costs nothing there either.
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";
import {
  classifyDoiField,
  checkViaCrossRef,
  checkDirect,
  withRetry,
  createCache,
  RATE_LIMIT_MS,
} from "./lib/doi-check.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const REFS_DIR = join(REPO, "src", "content", "references");
const CACHE_FILE = join(REPO, ".verify-refs-cache.json");

// Classification, HTTP, retry, and cache primitives are shared with the digest
// gate via scripts/lib/doi-check.mjs. The policy below (CrossRef-authoritative;
// CrossRef 404/410 = hard fail) is the references gate's own.
const cache = createCache(CACHE_FILE);

// --- Per-ref check ---------------------------------------------------------

async function checkRef(ref) {
  const cls = classifyDoiField(ref.doi);

  if (cls.kind === "malformed") {
    return { ok: false, malformed: true, reason: cls.reason };
  }

  // Cache key uses the normalised lookup target so canonical-case and
  // lowercase variants of the same DOI hit the same cache entry.
  const key = cls.kind === "doi" ? `doi:${cls.doi.toLowerCase()}` : `url:${cls.url}`;
  const cached = cache.hit(key);
  if (cached) return { ...cached, cached: true };

  const method = cls.kind === "doi" ? "crossref" : "direct";
  const { status, error } = await withRetry(() =>
    cls.kind === "doi" ? checkViaCrossRef(cls.doi) : checkDirect(cls.url),
  );

  const ok = !error && status >= 200 && status < 400;
  // Editorial-integrity gate vs. flaky-network resilience (added Phase 7.B):
  // a build-breaking HARD failure requires positive proof the citation is
  // dead — an HTTP/CrossRef 404 or 410 (Gone). A network error (timeout /
  // fetch failed) or an anti-bot status (403 / 5xx) does NOT prove the target
  // is missing, so it is downgraded to a non-fatal WARNING. This stops one
  // unreliable host (e.g. scivisionpub.com timing out from Cloudflare's build
  // IPs while resolving fine everywhere else) from randomly breaking an
  // otherwise-valid deploy, without weakening the dead-link guarantee.
  const hardFail = !ok && !error && (status === 404 || status === 410);
  const softWarn = !ok && !hardFail;
  const result = { ok, status, error, method, hardFail, softWarn };
  // Cache only positive resolutions — never persist a transient failure, or
  // it would suppress a retry on the next local run within the 24h TTL.
  if (ok) cache.store(key, result);
  return result;
}

// --- Main ------------------------------------------------------------------

const refFiles = readdirSync(REFS_DIR)
  .filter((f) => f.endsWith(".yaml"))
  .sort();

const refs = refFiles.map((file) => {
  const data = yaml.parse(readFileSync(join(REFS_DIR, file), "utf8"));
  return { file, num: data.num, doi: data.doi, title: data.title };
});

console.log(
  `Verifying ${refs.length} references (CrossRef for DOIs, direct HEAD for repository URLs)...\n`,
);

const failures = []; // hard failures (dead link / malformed) → abort build
const warnings = []; // soft warnings (network / anti-bot) → report, don't abort
const cacheHits = [];

for (let i = 0; i < refs.length; i++) {
  const ref = refs[i];

  process.stdout.write(
    `  [${String(i + 1).padStart(2)}/${refs.length}] ref-${String(ref.num).padStart(2)}  `,
  );

  const result = await checkRef(ref);

  if (result.cached) cacheHits.push(ref.num);

  if (result.malformed) {
    process.stdout.write(`✗ MALFORMED — ${result.reason}\n`);
    failures.push({ ...ref, ...result });
  } else if (result.ok) {
    process.stdout.write(
      `✓ ${result.status} via ${result.method}${result.cached ? " (cached)" : ""}\n`,
    );
  } else if (result.hardFail) {
    process.stdout.write(`✗ ${result.status} via ${result.method} (dead link)\n`);
    failures.push({ ...ref, ...result });
  } else {
    process.stdout.write(
      `⚠ ${result.status ?? result.error} via ${result.method} (unverified — not fatal)\n`,
    );
    warnings.push({ ...ref, ...result });
  }

  if (!result.cached && !result.malformed) {
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  }
}

cache.save();

if (cacheHits.length > 0) {
  console.log(
    `\n  (${cacheHits.length} of ${refs.length} served from 24-hour cache)`,
  );
}

if (warnings.length > 0) {
  console.warn(
    `\n⚠ ${warnings.length} reference(s) could not be verified from this environment ` +
      `(network error or anti-bot status — NOT a 404/410). Non-fatal: these resolve ` +
      `outside CI. Listed for audit:`,
  );
  for (const w of warnings) {
    console.warn(`  ref-${w.num}.yaml — ${w.status ?? w.error} via ${w.method} — ${w.doi}`);
  }
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} reference(s) failed (dead link or malformed):\n`);
  for (const f of failures) {
    console.error(`  ref-${f.num}.yaml`);
    console.error(`    title: ${f.title}`);
    console.error(`    doi:   ${f.doi}`);
    if (f.malformed) {
      console.error(`    error: malformed DOI field — ${f.reason}`);
    } else {
      console.error(`    fail:  ${f.status} (HTTP 404/410 — citation target is gone)`);
    }
    console.error("");
  }
  console.error(
    "Build aborted. A 404/410 means the citation target no longer exists.",
  );
  console.error(
    "Find the correct DOI on PubMed and update the YAML, or remove the citation.",
  );
  process.exit(1);
}

const verified = refs.length - warnings.length;
console.log(
  `\n✓ ${verified}/${refs.length} references resolve` +
    (warnings.length
      ? ` (${warnings.length} unverified from this environment, non-fatal — see warnings above).`
      : "."),
);
