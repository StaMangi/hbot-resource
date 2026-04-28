// Site-wide SEO constants and helpers.
// Single source of truth for canonical site URL, default OG image, etc.

export const SITE_URL = "https://hbotresource.com";
export const SITE_NAME = "HBOT Resource";
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

export function alternateLocaleUrl(pathname: string, target: Locale): string {
  const stripped = pathname.replace(/^\/(en|el)(\/|$)/, "/");
  const path = target === "en" ? stripped : `/el${stripped === "/" ? "/" : stripped}`;
  return canonicalUrl(path);
}
