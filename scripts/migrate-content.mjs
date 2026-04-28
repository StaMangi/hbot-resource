#!/usr/bin/env node
/**
 * Migrate data-export/hbot-content.json into per-entry YAML files
 * under src/content/<collection>/<slug>.yaml.
 *
 * One-shot script. Idempotent: re-running overwrites existing files.
 * Committed for reproducibility, but should not need to run again — once
 * the YAML is checked in, edits happen in YAML directly.
 *
 * Includes a de-branding pass: known Henry Dunant references in the
 * source data are rewritten generically before serialisation. After
 * writing all files, scans for any remaining "Henry Dunant" mentions
 * and aborts with a clear error if found.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, "..");
const SOURCE = join(REPO, "data-export", "hbot-content.json");
const TARGET = join(REPO, "src", "content");

// ────────────────────────────────────────────────────────────────────────────
// De-branding rewrites. Strings here are the only known Henry Dunant /
// hospital-specific mentions in hbot-content.json (see Phase 1 audit).
// Each entry is [pattern, replacement]. Patterns are matched as plain
// substrings, applied recursively across all string values.
// ────────────────────────────────────────────────────────────────────────────
const DEBRAND = [
  // STRATEGIC_RECOMMENDATIONS / "research" entry — only Henry Dunant mention
  // in the content. Replace the whole tail clause to avoid leaving awkward
  // grammar.
  [
    "positioning Henry Dunant Hospital as a leader in hyperbaric medicine research in the Eastern Mediterranean region",
    "contributing to the international hyperbaric medicine evidence base",
  ],
  [
    "τοποθετώντας το Νοσοκομείο Henry Dunant ως ηγέτη στην έρευνα υπερβαρικής ιατρικής στην Ανατολική Μεσόγειο",
    "συμβάλλοντας στη διεθνή βάση τεκμηρίωσης της υπερβαρικής ιατρικής",
  ],
];

function debrand(value) {
  if (typeof value === "string") {
    let s = value;
    for (const [pattern, replacement] of DEBRAND) {
      s = s.split(pattern).join(replacement);
    }
    return s;
  }
  if (Array.isArray(value)) return value.map(debrand);
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = debrand(v);
    return out;
  }
  return value;
}

// ────────────────────────────────────────────────────────────────────────────
// Slug helpers
// ────────────────────────────────────────────────────────────────────────────
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

// ────────────────────────────────────────────────────────────────────────────
// Collection writers — one per top-level array in hbot-content.json.
// Each returns { collection, count, slugs } for summary reporting.
// ────────────────────────────────────────────────────────────────────────────
function writeYaml(collection, slug, body) {
  const dir = join(TARGET, collection);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, `${slug}.yaml`);
  // Plain-block mapping. Force quotes on all strings to avoid YAML special-char
  // surprises (colons, dashes, leading numbers, Greek punctuation).
  const text = yaml.stringify(body, {
    defaultStringType: "QUOTE_DOUBLE",
    defaultKeyType: "PLAIN",
    lineWidth: 0,
  });
  writeFileSync(file, text);
}

function clearCollection(collection) {
  const dir = join(TARGET, collection);
  rmSync(dir, { recursive: true, force: true });
}

function migrateMechanisms(data) {
  clearCollection("mechanisms");
  const slugs = [];
  for (const entry of data.MECHANISMS) {
    const { id, ...body } = debrand(entry);
    writeYaml("mechanisms", id, body);
    slugs.push(id);
  }
  return { collection: "mechanisms", count: slugs.length, slugs };
}

function migrateIndications(data) {
  clearCollection("indications");
  const slugs = [];
  for (const entry of data.FDA_INDICATIONS) {
    const slug = slugify(entry.condition.en);
    const { id, ...rest } = debrand(entry);
    const body = { legacyId: id, ...rest };
    writeYaml("indications", slug, body);
    slugs.push(slug);
  }
  return { collection: "indications", count: slugs.length, slugs };
}

function migrateDepartments(data) {
  clearCollection("departments");
  const slugs = [];
  for (const entry of data.DEPARTMENTS_WITH_HBOT) {
    const { id, ...body } = debrand(entry);
    writeYaml("departments", id, body);
    slugs.push(id);
  }
  return { collection: "departments", count: slugs.length, slugs };
}

function migrateDepartmentsWithoutHbot(data) {
  clearCollection("departments-without-hbot");
  const slugs = [];
  for (const entry of data.DEPARTMENTS_WITHOUT_HBOT) {
    const slug = slugify(entry.name.en);
    writeYaml("departments-without-hbot", slug, debrand(entry));
    slugs.push(slug);
  }
  return { collection: "departments-without-hbot", count: slugs.length, slugs };
}

function migrateLongevity(data) {
  clearCollection("longevity");
  const slugs = [];
  for (const entry of data.LONGEVITY_APPLICATIONS) {
    const { id, ...body } = debrand(entry);
    writeYaml("longevity", id, body);
    slugs.push(id);
  }
  return { collection: "longevity", count: slugs.length, slugs };
}

function migrateResearchStudies(data) {
  clearCollection("research-studies");
  const slugs = [];
  for (const entry of data.RESEARCH_STUDIES) {
    const slug = `study-${entry.id}`;
    const { id, ...rest } = debrand(entry);
    const body = { legacyId: id, ...rest };
    writeYaml("research-studies", slug, body);
    slugs.push(slug);
  }
  return { collection: "research-studies", count: slugs.length, slugs };
}

function migrateStrategicRecommendations(data) {
  clearCollection("strategic-recommendations");
  const slugs = [];
  for (const entry of data.STRATEGIC_RECOMMENDATIONS) {
    const { id, ...body } = debrand(entry);
    writeYaml("strategic-recommendations", id, body);
    slugs.push(id);
  }
  return { collection: "strategic-recommendations", count: slugs.length, slugs };
}

function migrateReferences(data) {
  clearCollection("references");
  const slugs = [];
  for (const entry of data.REFERENCES) {
    const slug = `ref-${entry.num}`;
    writeYaml("references", slug, debrand(entry));
    slugs.push(slug);
  }
  return { collection: "references", count: slugs.length, slugs };
}

function migrateSiteStats(data) {
  clearCollection("site-stats");
  const slugs = [];
  for (const entry of data.SITE_STATS) {
    const slug = slugify(entry.label.en);
    writeYaml("site-stats", slug, debrand(entry));
    slugs.push(slug);
  }
  return { collection: "site-stats", count: slugs.length, slugs };
}

// ────────────────────────────────────────────────────────────────────────────
// Verification: scan the entire src/content tree for any remaining
// "Henry Dunant" mention. Aborts the script if any are found.
// ────────────────────────────────────────────────────────────────────────────
function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...walkFiles(full));
    } else {
      out.push(full);
    }
  }
  return out;
}

function verifyNoHenryDunant() {
  const files = walkFiles(TARGET);
  const hits = [];
  for (const f of files) {
    const content = readFileSync(f, "utf8");
    if (/Henry Dunant|Νοσοκομείο Henry/i.test(content)) {
      hits.push(f);
    }
  }
  if (hits.length > 0) {
    console.error("\n✗ FAIL: Henry Dunant references still present in:");
    for (const h of hits) console.error("  - " + h);
    process.exit(1);
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Run
// ────────────────────────────────────────────────────────────────────────────
const data = JSON.parse(readFileSync(SOURCE, "utf8"));

const reports = [
  migrateSiteStats(data),
  migrateMechanisms(data),
  migrateIndications(data),
  migrateDepartments(data),
  migrateDepartmentsWithoutHbot(data),
  migrateLongevity(data),
  migrateResearchStudies(data),
  migrateStrategicRecommendations(data),
  migrateReferences(data),
];

console.log("Migration summary:\n");
let total = 0;
for (const { collection, count, slugs } of reports) {
  console.log(`  ${collection.padEnd(30)} ${String(count).padStart(2)} entries`);
  console.log(`    slugs: ${slugs.join(", ")}`);
  total += count;
}
console.log(`\n  ${"TOTAL".padEnd(30)} ${String(total).padStart(2)} entries\n`);

verifyNoHenryDunant();

console.log("✓ De-brand verification passed: no Henry Dunant references remain.");
console.log(`✓ Output written to: ${TARGET.replace(REPO, ".")}/`);
