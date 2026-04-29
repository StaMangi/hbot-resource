#!/usr/bin/env node
/**
 * One-shot migration: protocol.sessions and protocol.frequency from
 * single string to bilingual { en, el } object.
 *
 * Run once after the schema change in src/content.config.ts that made
 * those two fields bilingual. Walks every YAML under src/content/ that
 * has a `protocol:` block (indications, departments, longevity) and
 * rewrites the two single-line fields into bilingual blocks using the
 * translation tables below.
 *
 * Idempotent: if a sessions/frequency entry is already a block (next
 * line is `en:`), it's skipped.
 *
 * Trigger: Phase 4.D EL parity review surfaced English qualifiers
 * leaking into the EL protocol panel ("highly variable",
 * "Daily, protocol-dependent", "5×/week" etc.). The fix is structural
 * rather than per-page, so this script applies it everywhere at once.
 *
 * Delete this file after the migration is committed.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const CONTENT = join(REPO, "src", "content");

const SESSIONS_TRANSLATIONS = {
  // Pure-numeric and unit-less ranges read identically in EN and EL —
  // the EL value is the same string. Listed explicitly so the script
  // is auditable.
  "40": "40",
  "60": "60",
  "20 – 30": "20 – 30",
  "20 – 40": "20 – 40",
  "30 – 40": "30 – 40",
  "30 – 60": "30 – 60",
  "40 – 60": "40 – 60",
  "10 – 20": "10 – 20",
  // With qualifiers — these are the leaks.
  "10 – 20 per cycle": "10 – 20 ανά κύκλο",
  "1 – 3 (emergency)": "1 – 3 (επείγον)",
  "6 – 30 (highly variable)": "6 – 30 (πολύ μεταβλητές)",
  "Per radiation course": "Ανά κύκλο ακτινοθεραπείας",
};

const FREQUENCY_TRANSLATIONS = {
  "5×/week": "5×/εβδομάδα",
  "Once daily, 5×/week": "Μία φορά την ημέρα, 5×/εβδομάδα",
  "Daily, protocol-dependent": "Καθημερινά, εξαρτάται από το πρωτόκολλο",
  "Once or twice daily": "Μία ή δύο φορές την ημέρα",
  "Immediately, then daily": "Αμέσως, μετά καθημερινά",
  "Continuous until resolved": "Συνεχόμενα μέχρι την υποχώρηση",
  "Continuous until stable": "Συνεχόμενα μέχρι σταθεροποίηση",
  "Post-exercise or daily": "Μετά την άσκηση ή καθημερινά",
  "Prior to each radiation fraction": "Πριν από κάθε κλάσμα ακτινοβολίας",
};

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) yield* walk(p);
    else if (s.isFile() && p.endsWith(".yaml")) yield p;
  }
}

function migrateBlock(text, fieldName, translations) {
  // Match `<indent>fieldName: "<value>"` followed by anything (must be
  // a different field on the next line, not `en:` — that's the
  // already-migrated form). Capture the indent so the rewritten block
  // nests correctly.
  const re = new RegExp(
    `^([ \\t]*)${fieldName}: "([^"]+)"\\s*\\n(?!\\1  en:)`,
    "gm",
  );
  let unmatchedValues = new Set();
  const out = text.replace(re, (match, indent, value) => {
    const el = translations[value];
    if (el === undefined) {
      unmatchedValues.add(value);
      return match; // leave alone — will be flagged
    }
    return (
      `${indent}${fieldName}:\n` +
      `${indent}  en: "${value}"\n` +
      `${indent}  el: "${el}"\n`
    );
  });
  return { out, unmatchedValues: [...unmatchedValues] };
}

const files = [...walk(CONTENT)];
let changedFiles = 0;
const allUnmatched = new Map();

for (const path of files) {
  const orig = readFileSync(path, "utf8");
  const r1 = migrateBlock(orig, "sessions", SESSIONS_TRANSLATIONS);
  const r2 = migrateBlock(r1.out, "frequency", FREQUENCY_TRANSLATIONS);
  const merged = r2.out;
  if (merged !== orig) {
    writeFileSync(path, merged);
    changedFiles++;
    console.log(`migrated: ${path.replace(REPO + "/", "")}`);
  }
  for (const v of r1.unmatchedValues) {
    if (!allUnmatched.has(v)) allUnmatched.set(v, []);
    allUnmatched.get(v).push(`sessions in ${path.replace(REPO + "/", "")}`);
  }
  for (const v of r2.unmatchedValues) {
    if (!allUnmatched.has(v)) allUnmatched.set(v, []);
    allUnmatched.get(v).push(`frequency in ${path.replace(REPO + "/", "")}`);
  }
}

console.log(`\nFiles modified: ${changedFiles}`);

if (allUnmatched.size > 0) {
  console.error(
    `\n✗ ${allUnmatched.size} value(s) had no translation table entry — left untouched:\n`,
  );
  for (const [v, locations] of allUnmatched) {
    console.error(`  "${v}"`);
    for (const loc of locations) console.error(`    ${loc}`);
  }
  console.error(
    "\nAdd these to SESSIONS_TRANSLATIONS or FREQUENCY_TRANSLATIONS and re-run.",
  );
  process.exit(1);
}
