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
  // Phase 7.C (Spanish) closed at its Stage 6 — `es` now REQUIRED at build
  // time, matching EN/EL/DE/IT. The build fails if any entry is missing `es`.
  es: z.string(),
});

const bilingualStringArray = z.object({
  en: z.array(z.string()),
  el: z.array(z.string()),
  de: z.array(z.string()),
  it: z.array(z.string()),
  es: z.array(z.string()),
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
    // Last-updated stamp. Required so the build fails (no silent gaps) if any
    // entry omits it — see /Tier 1A SEO/GEO/. Visible "Last updated" line in
    // DetailLayout + `dateModified` in MedicalWebPage JSON-LD both read from
    // here. ISO date YYYY-MM-DD; one value per entry (entries are multilingual).
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    // Tier 1 answer-box: visible 40–60 word lead block on the detail page.
    // Required, all 5 locales (bilingual). Distilled verbatim from approved
    // content; not paraphrased. See tier1-answerboxes-and-meta-DRAFT.md.
    answerBox: bilingual,
    // Tier 1 meta-description: when set, drives <meta name="description">
    // + JSON-LD description on the detail page. Never drives card text on
    // the /<collection>/ index. Optional; if present, all 5 locales required.
    metaDescription: bilingual.optional(),
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
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // ISO date, YYYY-MM-DD
    answerBox: bilingual, // Tier 1 — required, see mechanisms above
    metaDescription: bilingual.optional(), // Tier 1 — optional, see mechanisms above
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
  // Optional cross-link from a department application card to its full
  // indication page (e.g. Psychiatry → PTSD → /indications/post-traumatic-stress-disorder/).
  // When set, the department [slug] page renders the application title as a link.
  indicationSlug: z.string().optional(),
});

const departments = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/departments" }),
  schema: z.object({
    name: bilingual,
    icon: z.string(),
    color: z.string(),
    shortDesc: bilingual,
    // Optional department-level framing paragraph, rendered above the
    // applications list on the [slug] page. Added for cross-cutting
    // departments (e.g. Rehabilitation Medicine); existing departments omit it.
    intro: bilingual.optional(),
    applications: z.array(departmentApplication),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // ISO date, YYYY-MM-DD
    // Tier 1 — departments have NO answerBox; metaDescription is optional but
    // when set drives <meta name="description"> + JSON-LD only — never the
    // /departments/ index card (which still uses shortDesc).
    metaDescription: bilingual.optional(),
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
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // ISO date, YYYY-MM-DD
    answerBox: bilingual, // Tier 1 — required, see mechanisms above
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

// Research Digest — weekly issues. ENGLISH ONLY by locked decision (one
// digest for everyone), so fields are plain strings, NOT bilingual. Each
// issue is a frontmatter-only Markdown file under src/content/digest/.
// Routing keys off the filename (entry.id), e.g. 2026-w22.md → /digest/2026-w22/.
const digest = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/digest" }),
  schema: z.object({
    slug: z.string(),
    date: z.coerce.date(),
    title: z.string(),
    items: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          summary: z.string(),
        }),
      )
      .min(1),
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
  digest,
};
