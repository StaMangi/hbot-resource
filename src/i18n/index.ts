// Tiny build-time translation helper. EN is canonical — if a key is missing
// from the requested locale's dictionary, falls back to EN, then to the key
// itself (so a missing translation surfaces visibly rather than crashing).
//
// Loose typing on the key parameter (string) is intentional: the EN/EL key
// sets are asymmetric (EL has 14 longevity keys EN doesn't — see Phase 3
// audit item in STATUS.md). Tightening to `keyof typeof en` would lock out
// EL-only callsites.

import { en } from "./en";
import { el } from "./el";
import type { Locale } from "@/lib/seo";

const dicts: Record<Locale, Record<string, string>> = { en, el };

export function t(
  key: string,
  locale: Locale,
  vars?: Record<string, string | number>,
): string {
  const raw = dicts[locale][key] ?? dicts.en[key] ?? key;
  if (!vars) return raw;
  // Replace `{name}` placeholders. Unmatched placeholders are left intact —
  // visible at render time, easier to spot than silent omission.
  return raw.replace(/\{(\w+)\}/g, (m, name) =>
    name in vars ? String(vars[name]) : m,
  );
}

/**
 * Returns true only if the key is genuinely defined in the requested locale's
 * dictionary. Used by sections that contain locale-only content (e.g. EL has
 * 14 longevity keys EN doesn't — see Phase 3 audit) so we render those
 * sub-blocks conditionally rather than fall back to the literal key string.
 */
export function has(key: string, locale: Locale): boolean {
  return key in dicts[locale];
}

export { en, el };
