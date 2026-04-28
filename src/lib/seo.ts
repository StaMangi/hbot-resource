// Site-wide SEO constants and helpers.
// Single source of truth for canonical site URL, default OG image, etc.

export const SITE_URL = "https://hbotscience.org";

// Brand text. Flows into <og:site_name>, page <title> tags, JSON-LD publisher,
// and anywhere the brand surfaces outside i18n strings. The matching i18n
// key is "nav.brand" — keep both in sync if the brand changes.
export const SITE_NAME = "HBOT Science";

export const SITE_DEFAULT_DESCRIPTION = {
  en: "Evidence-based hyperbaric oxygen therapy reference. Mechanisms, FDA-approved indications, clinical protocols, longevity applications, and peer-reviewed evidence.",
  el: "Τεκμηριωμένος οδηγός υπερβαρικής οξυγονοθεραπείας. Μηχανισμοί, εγκεκριμένες ενδείξεις FDA, κλινικά πρωτόκολλα, εφαρμογές μακροζωίας και αξιολογημένη βιβλιογραφία.",
} as const;

export const SUPPORTED_LOCALES = ["en", "el"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_OG_IMAGE = "/og-default.png";

export function canonicalUrl(pathname: string): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${clean}`;
}

/** Returns the path-only version of the alternate locale URL (no domain). */
export function localePath(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/(en|el)(\/|$)/, "/");
  if (target === "en") return stripped;
  return `/el${stripped === "/" ? "/" : stripped}`;
}

export function alternateLocaleUrl(pathname: string, target: Locale): string {
  return canonicalUrl(localePath(pathname, target));
}
