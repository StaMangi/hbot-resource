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
 * Non-DOI URLs (NCBI bookshelf, etc.) fall through to direct HEAD/GET.
 *
 * Editorial-integrity precedent (Phase 3.B / 3.E): every claim citable.
 * This script catches the inverse — citations whose targets disappeared
 * or were typo'd at source.
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

let cache = {};
if (existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(readFileSync(CACHE_FILE, "utf8"));
  } catch {
    /* corrupt cache — regenerate */
  }
}

const cacheHit = (url) => {
  const c = cache[url];
  return c && Date.now() - c.checked < CACHE_TTL_MS ? c : null;
};

const cacheStore = (url, data) => {
  cache[url] = { ...data, checked: Date.now() };
};

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
 */
async function checkViaCrossRef(doi) {
  const apiUrl = `https://api.crossref.org/works/${encodeURIComponent(doi)}`;
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

async function checkUrl(url) {
  const cached = cacheHit(url);
  if (cached) return cached;

  let status;
  let error;
  let method = "direct";

  try {
    const doiMatch = url.match(/^https?:\/\/(?:dx\.)?doi\.org\/(.+)$/i);
    if (doiMatch) {
      method = "crossref";
      const doi = decodeURIComponent(doiMatch[1]);
      const res = await checkViaCrossRef(doi);
      status = res.status;
    } else {
      const res = await checkDirect(url);
      status = res.status;
    }
  } catch (e) {
    error = e.name === "AbortError" ? "timeout" : e.message;
  }

  const ok = !error && status >= 200 && status < 400;
  const result = { ok, status, error, method };
  cacheStore(url, result);
  return result;
}

const refFiles = readdirSync(REFS_DIR)
  .filter((f) => f.endsWith(".yaml"))
  .sort();

const refs = refFiles.map((file) => {
  const data = yaml.parse(readFileSync(join(REFS_DIR, file), "utf8"));
  return { file, num: data.num, doi: data.doi, title: data.title };
});

console.log(
  `Verifying ${refs.length} references via CrossRef API (api.crossref.org/works/{doi})...\n`,
);

const failures = [];
const cacheHits = [];

for (let i = 0; i < refs.length; i++) {
  const ref = refs[i];
  const wasCached = !!cacheHit(ref.doi);
  if (wasCached) cacheHits.push(ref.num);

  process.stdout.write(
    `  [${String(i + 1).padStart(2)}/${refs.length}] ref-${String(ref.num).padStart(2)}  `,
  );

  const { ok, status, error, method } = await checkUrl(ref.doi);

  if (ok) {
    process.stdout.write(`✓ ${status} via ${method}${wasCached ? " (cached)" : ""}\n`);
  } else {
    process.stdout.write(`✗ ${status ?? error} via ${method}\n`);
    failures.push({ ...ref, status, error });
  }

  if (!wasCached) await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
}

writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));

if (cacheHits.length > 0) {
  console.log(
    `\n  (${cacheHits.length} of ${refs.length} served from 24-hour cache)`,
  );
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} reference(s) failed to resolve:\n`);
  for (const f of failures) {
    console.error(`  ref-${f.num}.yaml`);
    console.error(`    title: ${f.title}`);
    console.error(`    doi:   ${f.doi}`);
    console.error(`    fail:  ${f.status ?? f.error}`);
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

console.log(`\n✓ All ${refs.length} references resolve in CrossRef.`);
