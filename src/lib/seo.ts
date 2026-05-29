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
  de: "Evidenzbasierter Leitfaden zur hyperbaren Sauerstofftherapie. Mechanismen, FDA-zugelassene Indikationen, klinische Protokolle, Anwendungen in der Langlebigkeitsmedizin und peer-reviewed Evidenz.",
  it: "Guida basata sull'evidenza alla ossigenoterapia iperbarica. Meccanismi, indicazioni approvate dalla FDA, protocolli clinici, applicazioni nella medicina della longevità ed evidenze sottoposte a revisione paritaria.",
  es: "Referencia basada en la evidencia sobre la oxigenoterapia hiperbárica. Mecanismos, indicaciones aprobadas por la FDA, protocolos clínicos, aplicaciones en medicina de la longevidad y evidencia revisada por pares.",
} as const;

// Order here drives the language-switcher dropdown display order (Nav maps over
// it). EN stays first as the default/root locale; Greek moved to the end per
// Stamos's request. This is cosmetic only — routing, default-locale logic
// (`target === "en"` in localePath), the Locale union type, and hreflang
// emission (hardcoded order in BaseHead) are all position-independent.
export const SUPPORTED_LOCALES = ["en", "de", "it", "es", "el"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_OG_IMAGE = "/og-default.png";

export function canonicalUrl(pathname: string): string {
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${clean}`;
}

/** Returns the path-only version of the alternate locale URL (no domain). */
export function localePath(pathname: string, target: Locale): string {
  // Generalised in Phase 7 DE rollout: strip any known locale prefix, then
  // re-prepend the target's prefix (apex for the default locale, /<code>/
  // for everything else).
  const stripped = pathname.replace(/^\/(en|el|de|it|es)(\/|$)/, "/");
  if (target === "en") return stripped;
  return `/${target}${stripped === "/" ? "/" : stripped}`;
}

export function alternateLocaleUrl(pathname: string, target: Locale): string {
  return canonicalUrl(localePath(pathname, target));
}
