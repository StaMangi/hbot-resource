// Astro content collections — schemas for all bilingual content.
// Migrated from data-export/hbot-content.json by scripts/migrate-content.mjs.
// Single source of truth for content shape; the migration script is the only
// non-Astro consumer.

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// "bilingual" is the historic name; the field is now quad-lingual (EN/EL/DE/IT).
// Phase 7 multilingual rollout (German) closed at Stage 6 — DE is required.
// Phase 7.B (Italian) closed at its Stage 6 — `it` is now REQUIRED at build
// time, matching EN/EL/DE. The build fails if any entry is missing `it`.
const bilingual = z.object({
  en: z.string(),
  el: z.string(),
  de: z.string(),
  it: z.string(),
});

const bilingualStringArray = z.object({
  en: z.array(z.string()),
  el: z.array(z.string()),
  de: z.array(z.string()),
  it: z.array(z.string()),
});

const protocol = z.object({
  // All five protocol fields are bilingual. ata + duration migrated from
  // single-string to trilingual in Phase 7 after the endometriosis entry
  // surfaced prose values ("Not standardised") leaking English onto DE +
  // EL pages. For numeric values like "2.0 ATA" or "90 min" the same
  // string is duplicated across locales — the structural cost is small;
  // the editorial guarantee is "no English on /de/ pages" without exception.
  ata: bilingual,
  duration: bilingual,
  sessions: bilingual,
  frequency: bilingual,
  basis: bilingual,
});

// "[1]", "[2]", ... — bibliography pointers. Will resolve to references collection.
const refTags = z.array(z.string());

const mechanisms = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/mechanisms" }),
  schema: z.object({
    title: bilingual,
    icon: z.string(),
    color: z.string(),
    summary: bilingual,
    detail: bilingual,
    refs: refTags,
  }),
});

const indications = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/indications" }),
  schema: z.object({
    legacyId: z.number(),
    // Approval-tier axis (split at /indications/ index, drives breadcrumb).
    // `category` below is the orthogonal medical-domain axis (Wound Care,
    // Sensory Disorders, etc.) — used for the inner card grouping.
    tier: z.enum(["fda-approved", "emerging"]),
    category: bilingual,
    condition: bilingual,
    description: bilingual,
    evidence: bilingual,
    evidenceLevel: z.enum(["A", "B", "C"]),
    protocol,
    refs: refTags,
  }),
});

const departmentApplication = z.object({
  title: bilingual,
  type: z.string(),
  typeColor: z.string(),
  description: bilingual,
  evidence: z.string(),
  protocol,
  refs: refTags,
});

const departments = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/departments" }),
  schema: z.object({
    name: bilingual,
    icon: z.string(),
    color: z.string(),
    shortDesc: bilingual,
    applications: z.array(departmentApplication),
  }),
});

const departmentsWithoutHbot = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "./src/content/departments-without-hbot",
  }),
  schema: z.object({
    name: bilingual,
    icon: z.string(),
    rationale: bilingual,
    role: bilingual,
  }),
});

const longevity = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/longevity" }),
  schema: z.object({
    title: bilingual,
    icon: z.string(),
    stat: z.string(),
    statLabel: bilingual,
    color: z.string(),
    summary: bilingual,
    mechanism: bilingual,
    protocol,
    refs: refTags.optional(),
  }),
});

const researchStudies = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/research-studies" }),
  schema: z.object({
    legacyId: z.number(),
    title: bilingual,
    authors: z.string(),
    journal: z.string(),
    year: z.number(),
    type: z.string(),
    evidenceLevel: z.string(),
    keyFinding: bilingual,
    doi: z.string().url(),
    ref: z.string(),
  }),
});

const strategicRecommendations = defineCollection({
  loader: glob({
    pattern: "**/*.yaml",
    base: "./src/content/strategic-recommendations",
  }),
  schema: z.object({
    title: bilingual,
    icon: z.string(),
    priority: z.string(),
    description: bilingual,
    actions: bilingualStringArray,
  }),
});

const references = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/references" }),
  schema: z.object({
    num: z.number(),
    authors: z.string(),
    title: z.string(),
    journal: z.string(),
    year: z.number(),
    doi: z.string(),
    type: z.string(),
  }),
});

const siteStats = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/site-stats" }),
  schema: z.object({
    value: z.string(),
    label: bilingual,
    sub: bilingual,
  }),
});

export const collections = {
  mechanisms,
  indications,
  departments,
  "departments-without-hbot": departmentsWithoutHbot,
  longevity,
  "research-studies": researchStudies,
  "strategic-recommendations": strategicRecommendations,
  references,
  "site-stats": siteStats,
};
