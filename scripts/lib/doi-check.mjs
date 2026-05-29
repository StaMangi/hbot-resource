/**
 * Shared DOI / URL verification primitives.
 *
 * Extracted from verify-references.mjs (the references build gate) so the
 * digest gate (verify-digest.mjs) can reuse the exact same network +
 * classification logic instead of duplicating it. Pure / side-effect-free
 * (apart from createCache's file I/O, which is opt-in per caller) — importing
 * this module runs no verification on its own.
 *
 * Strategy recap: for DOIs, CrossRef's API (api.crossref.org/works/{doi}) is
 * the authoritative registry and bypasses publisher anti-bot. doi.org itself
 * is the resolver of last resort — used to distinguish a genuinely dead DOI
 * (404/410) from one that is registered-but-pending-publication (resolves on
 * doi.org, but CrossRef metadata not yet populated).
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";

export const REQUEST_TIMEOUT_MS = 15_000;
export const RATE_LIMIT_MS = 200;
export const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
export const USER_AGENT =
  "HBOT-Science-DOI-Verifier/1.0 (+https://hbotscience.org)";

// --- Classification --------------------------------------------------------

const DOI_BARE_RE = /^10\.\d{4,9}\/\S+$/;
const DOI_URL_RE = /^https?:\/\/(?:dx\.)?doi\.org\/(10\.\d{4,9}\/\S+)$/i;
const DOI_BURIED_RE = /\b10\.\d{4,9}\/\S+/;
const NON_DOI_HOSTS_RE =
  /^https?:\/\/(?:[\w-]+\.)*(?:ncbi\.nlm\.nih\.gov|uhms\.org|scivisionpub\.com|clinicaltrials\.gov)\b/i;

/**
 * @typedef {{kind: "doi", doi: string} | {kind: "url", url: string} | {kind: "malformed", reason: string}} Classification
 */

/**
 * Strict classification used by the references gate: bare DOI, canonical
 * doi.org URL, or a recognised non-DOI repository host. Anything else is
 * malformed (hard fail) — notably a publisher URL with a DOI buried inside.
 * @returns {Classification}
 */
export function classifyDoiField(value) {
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

/**
 * Lenient DOI extraction for the digest gate, whose item URLs are arbitrary
 * citation links (any valid URL — preprints, ClinicalTrials.gov, news). Returns
 * the bare DOI if the value is a doi.org URL or bare DOI, else null (→ treat as
 * a generic URL with a lightweight reachability check).
 * @returns {string | null}
 */
export function extractDoi(value) {
  const s = String(value).trim();
  if (DOI_BARE_RE.test(s)) return s;
  const m = DOI_URL_RE.exec(s);
  return m ? m[1] : null;
}

// --- HTTP ------------------------------------------------------------------

export async function fetchOne(url, method) {
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

/** Authoritative DOI check via CrossRef. 200 iff registered with metadata. */
export async function checkViaCrossRef(doi) {
  const apiUrl = `https://api.crossref.org/works/${encodeURIComponent(doi.toLowerCase())}`;
  return await fetchOne(apiUrl, "HEAD");
}

/** The doi.org resolver itself — follows the redirect to the publisher (or to
 *  CrossRef's pending-publication landing page). Used to tell a dead DOI from a
 *  registered-but-pending one. HEAD with GET fallback for anti-bot statuses. */
export async function checkViaDoiOrg(doi) {
  const url = `https://doi.org/${doi}`;
  let res = await fetchOne(url, "HEAD");
  if (res.status === 405 || res.status === 403 || res.status === 501) {
    res = await fetchOne(url, "GET");
  }
  return res;
}

/** Direct HEAD with GET fallback for non-DOI / generic URLs. */
export async function checkDirect(url) {
  let res = await fetchOne(url, "HEAD");
  if (res.status === 405 || res.status === 403 || res.status === 501) {
    res = await fetchOne(url, "GET");
  }
  return res;
}

/**
 * Retry transient network failures (timeout / fetch failed) with linear
 * backoff. Stops as soon as any HTTP response arrives, or after maxAttempts.
 * @returns {Promise<{status?: number, error?: string}>}
 */
export async function withRetry(attempt, maxAttempts = 3) {
  let status;
  let error;
  for (let i = 1; i <= maxAttempts; i++) {
    status = undefined;
    error = undefined;
    try {
      const res = await attempt();
      status = res.status;
      break;
    } catch (e) {
      error = e.name === "AbortError" ? "timeout" : e.message || "fetch failed";
      if (i < maxAttempts) await new Promise((r) => setTimeout(r, i * 1000));
    }
  }
  return { status, error };
}

// --- Cache (24h TTL, opt-in per caller) ------------------------------------

export function createCache(cacheFile) {
  let cache = {};
  if (existsSync(cacheFile)) {
    try {
      cache = JSON.parse(readFileSync(cacheFile, "utf8"));
    } catch {
      /* corrupt cache — regenerate */
    }
  }
  return {
    hit(key) {
      const c = cache[key];
      return c && Date.now() - c.checked < CACHE_TTL_MS ? c : null;
    },
    store(key, data) {
      cache[key] = { ...data, checked: Date.now() };
    },
    save() {
      writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
    },
  };
}
