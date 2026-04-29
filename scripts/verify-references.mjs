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

import {
  existsSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const REFS_DIR = join(REPO, "src", "content", "references");
const CACHE_FILE = join(REPO, ".verify-refs-cache.json");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT_MS = 200;
const REQUEST_TIMEOUT_MS = 15_000;
const USER_AGENT =
  "HBOT-Science-DOI-Verifier/1.0 (+https://hbotscience.org; verify-refs)";

// --- Input classification --------------------------------------------------
//
// Three legitimate shapes for a `doi` field:
//
//   1. Bare DOI:               10.1038/s41598-022-15565-0
//   2. Canonical doi.org URL:  https://doi.org/10.1038/s41598-022-15565-0
//   3. Non-DOI repository URL: https://pmc.ncbi.nlm.nih.gov/articles/PMC...
//                              https://www.ncbi.nlm.nih.gov/books/...
//                              https://www.uhms.org/resources/...
//                              https://www.scivisionpub.com/pdfs/...
//
// Anything else fails. The most common trap is a publisher URL with a
// DOI substring inside — the publisher returns 200 to a browser and so
// passes a naive HEAD check from a developer machine, but the DOI itself
// won't resolve via CrossRef and the URL fails 403 from CI runners
// behind Cloudflare's IP ranges (anti-bot).

const DOI_BARE_RE = /^10\.\d{4,9}\/\S+$/;
const DOI_URL_RE = /^https?:\/\/(?:dx\.)?doi\.org\/(10\.\d{4,9}\/\S+)$/i;
const DOI_BURIED_RE = /\b10\.\d{4,9}\/\S+/;
const NON_DOI_HOSTS_RE =
  /^https?:\/\/(?:[\w-]+\.)*(?:ncbi\.nlm\.nih\.gov|uhms\.org|scivisionpub\.com)\b/i;

/**
 * @typedef {{kind: "doi", doi: string} | {kind: "url", url: string} | {kind: "malformed", reason: string}} Classification
 */

/** @returns {Classification} */
function classifyDoiField(value) {
  const s = String(value).trim();
  if (DOI_BARE_RE.test(s)) return { kind: "doi", doi: s };
  const m = DOI_URL_RE.exec(s);
  if (m) return { kind: "doi", doi: m[1] };
  if (NON_DOI_HOSTS_RE.test(s)) return { kind: "url", url: s };
  if (/^https?:\/\//i.test(s) && DOI_BURIED_RE.test(s)) {
    return {
      kind: "malformed",
      reason:
        "publisher URL contains a DOI substring — use canonical https://doi.org/<doi> form or the bare DOI",
    };
  }
  return {
    kind: "malformed",
    reason:
      "expected bare DOI (10.XXXX/...), canonical doi.org URL, or recognised non-DOI repository URL (PubMed/PMC/NCBI Bookshelf/UHMS/scivisionpub)",
  };
}

// --- Cache -----------------------------------------------------------------

let cache = {};
if (existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(readFileSync(CACHE_FILE, "utf8"));
  } catch {
    /* corrupt cache — regenerate */
  }
}

const cacheHit = (key) => {
  const c = cache[key];
  return c && Date.now() - c.checked < CACHE_TTL_MS ? c : null;
};

const cacheStore = (key, data) => {
  cache[key] = { ...data, checked: Date.now() };
};

// --- HTTP ------------------------------------------------------------------

async function fetchOne(url, method) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
      redirect: "follow",
      signal: ctrl.signal,
    });
    return { status: res.status };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Authoritative DOI check via CrossRef. Bypasses publisher anti-bot;
 * returns 200 iff the DOI is registered, 404 if it isn't (genuine).
 * DOI lookup is lowercased — CrossRef is case-insensitive but
 * normalising prevents subtle bugs.
 */
async function checkViaCrossRef(doi) {
  const apiUrl = `https://api.crossref.org/works/${encodeURIComponent(doi.toLowerCase())}`;
  return await fetchOne(apiUrl, "HEAD");
}

/** Direct HEAD with GET fallback for non-DOI URLs. */
async function checkDirect(url) {
  let res = await fetchOne(url, "HEAD");
  if (res.status === 405 || res.status === 403 || res.status === 501) {
    res = await fetchOne(url, "GET");
  }
  return res;
}

// --- Per-ref check ---------------------------------------------------------

async function checkRef(ref) {
  const cls = classifyDoiField(ref.doi);

  if (cls.kind === "malformed") {
    return { ok: false, malformed: true, reason: cls.reason };
  }

  // Cache key uses the normalised lookup target so canonical-case and
  // lowercase variants of the same DOI hit the same cache entry.
  const key = cls.kind === "doi" ? `doi:${cls.doi.toLowerCase()}` : `url:${cls.url}`;
  const cached = cacheHit(key);
  if (cached) return { ...cached, cached: true };

  let status;
  let error;
  const method = cls.kind === "doi" ? "crossref" : "direct";

  try {
    const res =
      cls.kind === "doi" ? await checkViaCrossRef(cls.doi) : await checkDirect(cls.url);
    status = res.status;
  } catch (e) {
    error = e.name === "AbortError" ? "timeout" : e.message;
  }

  const ok = !error && status >= 200 && status < 400;
  const result = { ok, status, error, method };
  cacheStore(key, result);
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

const failures = [];
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
  } else {
    process.stdout.write(`✗ ${result.status ?? result.error} via ${result.method}\n`);
    failures.push({ ...ref, ...result });
  }

  if (!result.cached && !result.malformed) {
    await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
  }
}

writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

if (cacheHits.length > 0) {
  console.log(
    `\n  (${cacheHits.length} of ${refs.length} served from 24-hour cache)`,
  );
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} reference(s) failed:\n`);
  for (const f of failures) {
    console.error(`  ref-${f.num}.yaml`);
    console.error(`    title: ${f.title}`);
    console.error(`    doi:   ${f.doi}`);
    if (f.malformed) {
      console.error(`    error: malformed DOI field — ${f.reason}`);
    } else {
      console.error(`    fail:  ${f.status ?? f.error}`);
    }
    console.error("");
  }
  console.error(
    "Build aborted. CrossRef 404 = DOI not registered (typo? wrong paper?).",
  );
  console.error(
    "Find the correct DOI on PubMed and update the YAML, or remove the citation.",
  );
  process.exit(1);
}

console.log(`\n✓ All ${refs.length} references resolve.`);
