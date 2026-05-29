#!/usr/bin/env node
/**
 * Digest DOI / URL verification — build gate for the Research Digest.
 *
 * The references gate (verify-references.mjs) only scans
 * src/content/references/. This sibling gives the digest collection
 * (src/content/digest/) the same automated link validation, reusing the
 * shared primitives in lib/doi-check.mjs (DRY).
 *
 * Key difference from the references gate: it TOLERATES a
 * registered-but-pending-publication DOI as a SOFT WARNING rather than a hard
 * failure. Such a DOI resolves on doi.org (200, often to CrossRef's
 * pending-publication landing page) but has no CrossRef /works metadata yet —
 * e.g. 10.1093/occmed/kqag011 in the inaugural issue. The references gate would
 * (correctly, for that collection) hard-fail a CrossRef-404; the digest, which
 * curates very recent literature, must not.
 *
 * Tiered policy
 *   DOI URL (https://doi.org/10.… or bare DOI):
 *     • CrossRef 2xx                                    → PASS
 *     • CrossRef not-found, doi.org resolves (2xx/redirect) → SOFT WARNING (pending pub)
 *     • doi.org 404 / 410                               → HARD FAIL (dead / fabricated)
 *     • network / anti-bot / timeout (retried 3×)       → SOFT WARNING
 *   Non-DOI URL (preprints, ClinicalTrials.gov, news, …):
 *     • 2xx/3xx                                         → PASS
 *     • 404 / 410                                       → HARD FAIL
 *     • other non-2xx / network                         → SOFT WARNING (don't break on a flaky host)
 *
 * Wired into the build via package.json `prebuild` alongside verify-refs, so it
 * runs on every Cloudflare Pages deploy, not just locally.
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";
import {
  extractDoi,
  checkViaCrossRef,
  checkViaDoiOrg,
  checkDirect,
  withRetry,
  createCache,
  RATE_LIMIT_MS,
} from "./lib/doi-check.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const DIGEST_DIR = join(REPO, "src", "content", "digest");
const CACHE_FILE = join(REPO, ".verify-digest-cache.json");

const cache = createCache(CACHE_FILE);

const isOk = (status, error) => !error && status >= 200 && status < 400;
const isDead = (status, error) => !error && (status === 404 || status === 410);

/**
 * @returns {Promise<{state: "pass"|"warn"|"fail", via: string, status?: number, error?: string, reason?: string}>}
 */
async function checkItem(url) {
  const doi = extractDoi(url);
  const key = doi ? `doi:${doi.toLowerCase()}` : `url:${url}`;
  const cached = cache.hit(key);
  if (cached) return { ...cached, cached: true };

  let result;
  if (doi) {
    // 1. CrossRef is authoritative when it has the metadata.
    const cr = await withRetry(() => checkViaCrossRef(doi));
    if (isOk(cr.status, cr.error)) {
      result = { state: "pass", via: "crossref", status: cr.status };
    } else {
      // 2. CrossRef has no metadata (or errored) — consult doi.org itself to
      //    distinguish a dead DOI from a registered-but-pending one.
      const dr = await withRetry(() => checkViaDoiOrg(doi));
      if (isOk(dr.status, dr.error)) {
        result = {
          state: "warn",
          via: "doi.org",
          status: dr.status,
          reason: "resolves on doi.org but CrossRef metadata not yet populated (pending publication)",
        };
      } else if (isDead(dr.status, dr.error)) {
        result = {
          state: "fail",
          via: "doi.org",
          status: dr.status,
          reason: "DOI does not resolve (dead or fabricated)",
        };
      } else {
        result = {
          state: "warn",
          via: "doi.org",
          status: dr.status,
          error: dr.error,
          reason: "could not verify (network / anti-bot)",
        };
      }
    }
  } else {
    // Generic citation URL — lightweight reachability only.
    const r = await withRetry(() => checkDirect(url));
    if (isOk(r.status, r.error)) {
      result = { state: "pass", via: "direct", status: r.status };
    } else if (isDead(r.status, r.error)) {
      result = { state: "fail", via: "direct", status: r.status, reason: "URL not found (404/410)" };
    } else {
      result = {
        state: "warn",
        via: "direct",
        status: r.status,
        error: r.error,
        reason: "could not verify (non-2xx / network)",
      };
    }
  }

  if (result.state === "pass") cache.store(key, result);
  return result;
}

// --- Main ------------------------------------------------------------------

const files = readdirSync(DIGEST_DIR)
  .filter((f) => f.endsWith(".md"))
  .sort();

const items = [];
for (const file of files) {
  const text = readFileSync(join(DIGEST_DIR, file), "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) {
    console.error(`✗ ${file}: no YAML frontmatter found`);
    process.exit(1);
  }
  const data = yaml.parse(m[1]);
  for (const it of data.items ?? []) {
    items.push({ file, issue: data.slug ?? file, title: it.title, url: it.url });
  }
}

console.log(
  `Verifying ${items.length} digest item(s) across ${files.length} issue(s) ` +
    `(CrossRef → doi.org fallback for DOIs; reachability for other URLs)...\n`,
);

const failures = [];
const warnings = [];
let cacheHits = 0;

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  process.stdout.write(`  [${String(i + 1).padStart(2)}/${items.length}] ${item.issue}  `);

  const r = await checkItem(item.url);
  if (r.cached) cacheHits += 1;

  if (r.state === "pass") {
    process.stdout.write(`✓ ${r.status} via ${r.via}${r.cached ? " (cached)" : ""}\n`);
  } else if (r.state === "warn") {
    process.stdout.write(`⚠ ${r.status ?? r.error} via ${r.via} — ${r.reason}\n`);
    warnings.push({ ...item, ...r });
  } else {
    process.stdout.write(`✗ ${r.status ?? r.error} via ${r.via} — ${r.reason}\n`);
    failures.push({ ...item, ...r });
  }

  if (!r.cached) await new Promise((res) => setTimeout(res, RATE_LIMIT_MS));
}

cache.save();

if (cacheHits > 0) {
  console.log(`\n  (${cacheHits} of ${items.length} served from 24-hour cache)`);
}

if (warnings.length > 0) {
  console.warn(
    `\n⚠ ${warnings.length} digest item(s) could not be fully verified ` +
      `(pending publication, network, or anti-bot — NOT a 404/410). Non-fatal; listed for audit:`,
  );
  for (const w of warnings) {
    console.warn(`  ${w.issue} — ${w.status ?? w.error} via ${w.via} — ${w.url}\n    ${w.reason}`);
  }
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} digest item(s) failed (dead link):\n`);
  for (const f of failures) {
    console.error(`  ${f.issue}`);
    console.error(`    title: ${f.title}`);
    console.error(`    url:   ${f.url}`);
    console.error(`    fail:  ${f.status ?? f.error} — ${f.reason}`);
    console.error("");
  }
  console.error("Build aborted. A 404/410 means the digest citation target no longer resolves.");
  console.error("Fix the URL in src/content/digest/, or remove the item.");
  process.exit(1);
}

const verified = items.length - warnings.length;
console.log(
  `\n✓ ${verified}/${items.length} digest item(s) verified` +
    (warnings.length
      ? ` (${warnings.length} pending/unverified, non-fatal — see warnings above).`
      : "."),
);
