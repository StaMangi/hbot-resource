#!/usr/bin/env node
/**
 * Migrate data-export/hbot-i18n.json into src/i18n/{en,el}.ts.
 *
 * One-shot script. After running, src/i18n/{en,el}.ts becomes the canonical
 * source of truth — re-running this overwrites those files. Edits should
 * live in the .ts files directly; the script is committed for reproducibility
 * and as the audit trail of the de-branding rewrites applied at port-time.
 *
 * De-branding rewrites — approved by Stamos 2026-04-28:
 *   EN: 8 replacements + 2 deletions (nav.subtitle, strategy.market.stat2)
 *   EL: 7 replacements + 2 deletions (nav.subtitle, strategy.market.stat2)
 *
 * Catches the stealth Red Cross reference in EL nav.subtitle ("Νοσοκομείο
 * Ερυθρός Σταυρός" — Henry Dunant Hospital is run by the Hellenic Red Cross
 * Society, so the EL localizers used "Red Cross Hospital" as the EL label).
 *
 * After write, scans output for: Henry Dunant, Νοσοκομείο Henry, Ντυνάν,
 * Ερυθρός Σταυρός. Aborts if any match.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const SOURCE = join(REPO, "data-export", "hbot-i18n.json");
const TARGET_DIR = join(REPO, "src", "i18n");

const data = JSON.parse(readFileSync(SOURCE, "utf8"));

// ────────────────────────────────────────────────────────────────────────────
// Approved replacements — keys to overwrite verbatim with these strings.
// ────────────────────────────────────────────────────────────────────────────
const EN_REPLACEMENTS = {
  "nav.brand": "HBOT Science",
  "hero.badge": "Evidence-Based Reference · Clinical & Longevity Applications",
  "hero.exec.body": data.en["hero.exec.body"].replace(
    "This resource maps current evidence to the specific departments of Henry Dunant Hospital Center, providing a strategic framework for clinical integration and wellness program development.",
    "This resource maps current evidence into a structured reference for clinical decision-making and longevity programme design.",
  ),
  "dept.section.subtitle":
    "Select a department to explore HBOT applications, evidence levels, and clinical protocols relevant to each specialty.",
  "nohbot.section.subtitle":
    "The following departments do not currently have direct HBOT applications based on available evidence. This does not preclude future research or indirect roles in patient care pathways.",
  "strategy.section.subtitle":
    "A phased framework for integrating HBOT services into a hospital programme, addressing clinical, operational, and market positioning dimensions.",
  "strategy.market.body":
    "The global longevity medicine market is projected to reach $44.2 billion by 2030. HBOT, with its unique combination of FDA-approved clinical applications and emerging evidence for healthy aging, sits at the intersection of clinical integration and premium wellness. A dedicated Hyperbaric Medicine Unit creates a clear competitive position for hospitals and longevity operators entering the longevity-medicine market.",
  "refs.footer.pill": "HBOT Science — Bibliography",
};

const EL_REPLACEMENTS = {
  "nav.brand": "HBOT Science",
  "hero.badge": "Τεκμηριωμένος Οδηγός · Κλινικές & Εφαρμογές Μακροζωίας",
  "dept.section.subtitle":
    "Επιλέξτε ένα τμήμα για να εξερευνήσετε τις εφαρμογές HBOT, τα επίπεδα τεκμηρίωσης και τα κλινικά πρωτόκολλα για κάθε ειδικότητα.",
  "nohbot.section.subtitle":
    "Τα παρακάτω τμήματα δεν έχουν επί του παρόντος άμεσες εφαρμογές HBOT βάσει των διαθέσιμων στοιχείων. Αυτό δεν αποκλείει μελλοντική έρευνα ή έμμεσους ρόλους στις διαδρομές φροντίδας ασθενών.",
  "strategy.section.subtitle":
    "Ένα σταδιακό πλαίσιο για την ενσωμάτωση υπηρεσιών HBOT σε ένα νοσοκομειακό πρόγραμμα, αντιμετωπίζοντας κλινικές, επιχειρησιακές και διαστάσεις τοποθέτησης στην αγορά.",
  "strategy.market.body":
    "Η παγκόσμια αγορά ιατρικής μακροζωίας αναμένεται να φτάσει τα $44,2 δισεκατομμύρια έως το 2030. Η HBOT, με τον μοναδικό συνδυασμό εγκεκριμένων κλινικών εφαρμογών FDA και αναδυόμενων στοιχείων για υγιή γήρανση, βρίσκεται στη συμβολή κλινικής ενσωμάτωσης και premium ευεξίας. Μια αφιερωμένη Μονάδα Υπερβαρικής Ιατρικής δημιουργεί σαφή ανταγωνιστική θέση για νοσοκομεία και κέντρα μακροζωίας που εισέρχονται στην αγορά της ιατρικής μακροζωίας.",
  "refs.footer.pill": "HBOT Science — Βιβλιογραφία",
};

const DELETES = new Set(["nav.subtitle", "strategy.market.stat2"]);

// Phase 2.D additions: rebuild the strategy stat2 slot with a real,
// evidence-grounded value (per Stamos's instruction not to leave a stub
// that would rot). The original "In Athens (opportunity)" was deleted;
// replaced with "258+ peer-reviewed citations" — references the existing
// 258-citations claim already in evidence.summary.body and refs.stat content.
// Inserted after strategy.market.stat1 to preserve nav ordering.
const EN_ADDITIONS = {
  "strategy.market.stat2.val": "258+",
  "strategy.market.stat2": "Peer-reviewed citations",
};
const EL_ADDITIONS = {
  "strategy.market.stat2.val": "258+",
  "strategy.market.stat2": "Αξιολογημένες αναφορές",
};

// ────────────────────────────────────────────────────────────────────────────
// Apply: build new dictionaries
// ────────────────────────────────────────────────────────────────────────────
function applyReplacements(source, replacements, additions) {
  const out = {};
  for (const [key, value] of Object.entries(source)) {
    if (DELETES.has(key)) continue;
    out[key] = key in replacements ? replacements[key] : value;
    // Insert additions immediately after strategy.market.stat1 so dictionary
    // order matches the visual ordering of the stats in the strategy section.
    if (key === "strategy.market.stat1") {
      for (const [aKey, aVal] of Object.entries(additions)) {
        out[aKey] = aVal;
      }
    }
  }
  return out;
}

const enFinal = applyReplacements(data.en, EN_REPLACEMENTS, EN_ADDITIONS);
const elFinal = applyReplacements(data.el, EL_REPLACEMENTS, EL_ADDITIONS);

// ────────────────────────────────────────────────────────────────────────────
// Serialise: write TS files with literal types via `as const`.
// ────────────────────────────────────────────────────────────────────────────
function escapeForTs(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}

function serialise(name, dict, headerLines) {
  const header = [
    "// Auto-generated by scripts/migrate-i18n.mjs.",
    "// Source: data-export/hbot-i18n.json (de-branding applied at port-time).",
    "// This file is the canonical source of truth — edit here, NOT in the script.",
    "// Re-running the migration overwrites local edits.",
    ...headerLines,
    "",
  ].join("\n");

  const entries = Object.entries(dict)
    .map(([k, v]) => `  "${k}": "${escapeForTs(v)}",`)
    .join("\n");

  return `${header}export const ${name} = {\n${entries}\n} as const;\n`;
}

mkdirSync(TARGET_DIR, { recursive: true });

writeFileSync(
  join(TARGET_DIR, "en.ts"),
  serialise("en", enFinal, [
    `// EN keys: ${Object.keys(enFinal).length}.`,
    "// Deletions vs source: nav.subtitle, strategy.market.stat2.",
    "// Replacements: nav.brand, hero.badge, hero.exec.body (last sentence),",
    "// dept.section.subtitle, nohbot.section.subtitle, strategy.section.subtitle,",
    "// strategy.market.body, refs.footer.pill.",
  ]),
);

writeFileSync(
  join(TARGET_DIR, "el.ts"),
  serialise("el", elFinal, [
    `// EL keys: ${Object.keys(elFinal).length}.`,
    "// Deletions vs source: nav.subtitle (stealth Red Cross / Hellenic-Red-Cross-",
    "// Society reference, dropped per de-brand policy), strategy.market.stat2.",
    "// Replacements: nav.brand, hero.badge, dept.section.subtitle,",
    "// nohbot.section.subtitle, strategy.section.subtitle,",
    "// strategy.market.body, refs.footer.pill.",
    "//",
    "// EN/EL asymmetry: this file has 14 longevity.* keys not present in en.ts",
    "// (landmark.*, stat.*, wellness.athletic.*, wellness.cognitive.*).",
    "// Phase 3 audit decides backfill EN vs remove dead EL.",
  ]),
);

// ────────────────────────────────────────────────────────────────────────────
// Verify: triple-grep + Red Cross stealth check
// ────────────────────────────────────────────────────────────────────────────
const FORBIDDEN = [
  /Henry Dunant/i,
  /Νοσοκομείο Henry/,
  /Ντυνάν/,
  /Ερυθρός Σταυρός/,
];

function checkFile(path) {
  const text = readFileSync(path, "utf8");
  const hits = [];
  for (const pat of FORBIDDEN) {
    const m = text.match(pat);
    if (m) hits.push(`${pat} → "${m[0]}"`);
  }
  return hits;
}

const enHits = checkFile(join(TARGET_DIR, "en.ts"));
const elHits = checkFile(join(TARGET_DIR, "el.ts"));

if (enHits.length || elHits.length) {
  console.error("\n✗ FAIL: forbidden patterns still present");
  if (enHits.length) {
    console.error("  src/i18n/en.ts:");
    for (const h of enHits) console.error("    " + h);
  }
  if (elHits.length) {
    console.error("  src/i18n/el.ts:");
    for (const h of elHits) console.error("    " + h);
  }
  process.exit(1);
}

console.log(`✓ src/i18n/en.ts written — ${Object.keys(enFinal).length} keys`);
console.log(`✓ src/i18n/el.ts written — ${Object.keys(elFinal).length} keys`);
console.log(`✓ De-brand verification passed (Henry Dunant, Νοσοκομείο Henry,`);
console.log(`  Ντυνάν, Ερυθρός Σταυρός — all zero matches).`);
