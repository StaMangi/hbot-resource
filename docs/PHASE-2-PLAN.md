# Phase 2 Plan — Fork, De-brand, Astro Migration

**Status:** Awaiting Stamos approval. No code changes until approved.
**Phase 1 deliverables:** `STATUS.md`, `data-export/hbot-content.json`, `data-export/hbot-i18n.json`, `docs/baseline-{mobile,desktop}.report.{json,html}`, this plan.

---

## Scope of Phase 2

End state: a brand-new Astro 5 site, generic and de-branded, deployed to a Cloudflare Pages preview URL, at full **content parity** with the current Henry Dunant site (5 mechanisms · 14 FDA indications · 9 departments · 6 longevity applications · 24 references · EN/EL bilingual).

**Out of scope (Phase 3+):** two-path homepage, `/clinical` and `/wellness` landing pages, new indications, `/programme-design`, `/operator-blueprint`, `/safety`, schema.org JSON-LD, sitemap, contact form, custom domain.

This phase is *only* "make a generic Astro version of what we have today, deployed and previewable." Content expansion and information architecture come later.

---

## 2.1 New repo creation

**Recommendation:** new repo `StaMangi/hbot-resource` (Decision C). Public from day one — Cloudflare Pages auto-deploy is simplest with public repos, and this site is meant to be public anyway.

Run from a Terminal window in `/Users/stamoulismanginas/Projects/hbot-resource/`:

```bash
gh repo create StaMangi/hbot-resource --public \
  --description "Evidence-based HBOT clinical and wellness reference. Editorial publisher: IN2050 Ltd."
```

That just creates the empty GitHub repo. We then initialise locally and push (I'll do this at the start of step 2.2 once the Astro project exists).

**Note on the working directory:** the current `/Users/stamoulismanginas/Projects/hbot-resource/` contains the cloned Henry Dunant repo. Two options for where the new Astro project lives:

- **Option R1** (recommended): keep the Henry Dunant clone as a read-only reference (move it to `_henry-dunant-source/` subdir or a sibling dir), and start the Astro project at the repo root. This keeps the new repo clean.
- **Option R2**: new sibling working dir `/Users/stamoulismanginas/Projects/hbot-resource-new/`. Cleaner separation but means switching directories mid-session.

Recommendation: Option R1. I'll move the existing files into `_henry-dunant-source/` and start fresh in the same directory. Memory and `.claude/` settings stay valid.

**Provenance file** (committed in the first push):

```
CHANGELOG.md
---
# CHANGELOG

## 0.1.0 — 2026-04-XX
- Project forked from `StaMangi/hbot_clinical_resource` (Henry Dunant Hospital Center
  bespoke deliverable). Re-skinned and de-branded as a generic, audience-neutral
  HBOT reference site.
- Editorial publisher: IN2050 Ltd · Cyprus · Reg. HE416406.
- Source content (mechanisms, FDA indications, departments, longevity applications,
  references) carried over via `data-export/hbot-content.json`.
```

---

## 2.2 Astro project bootstrap

**Astro version:** 5.x (latest stable, Vite-based, native TypeScript, native i18n routing).

**Integrations:**

| Package | Why |
|---------|-----|
| `@astrojs/react` | React islands for `ApplicationsExplorer` and `ProtocolComparison` |
| `@tailwindcss/vite` | Tailwind v4 (matches existing setup; the old `@astrojs/tailwind` plugin is for v3) |
| `@astrojs/sitemap` | Auto-generated sitemap.xml in Phase 5 |
| `@astrojs/mdx` | For long-form content pages with embedded components (Phase 4) |
| `astro-seo` *(optional)* | Helper for OG/Twitter/canonical tags (or hand-roll in `BaseLayout.astro`) |

**Folder structure (created in step 2.2):**

```
hbot-resource/
├── astro.config.ts
├── tsconfig.json
├── package.json
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── content.config.ts          # Astro 5 content collections (Zod schemas)
│   ├── content/
│   │   ├── mechanisms/             # 5 .yaml files
│   │   ├── indications/            # 14 .yaml files (Phase 4 will add ~20 more)
│   │   ├── departments/            # 9 .yaml files
│   │   ├── longevity/              # 6 .yaml files
│   │   ├── references/             # 24 .yaml files (or one file with array)
│   │   ├── research-studies/       # 8 .yaml files
│   │   └── strategic-recommendations/
│   ├── i18n/
│   │   ├── en.ts                   # carried over from current i18n/en.ts
│   │   ├── el.ts                   # carried over from current i18n/el.ts
│   │   └── index.ts                # tiny helper: t(key, lang)
│   ├── layouts/
│   │   ├── BaseLayout.astro        # html shell, nav, footer, head SEO meta
│   │   └── ContentLayout.astro     # wraps content pages (Phase 3+)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── Breadcrumbs.astro
│   │   ├── ProtocolPanel.astro
│   │   ├── RefTag.astro
│   │   ├── HeroSection.astro
│   │   ├── MechanismsSection.astro
│   │   ├── FDASection.astro
│   │   ├── DepartmentsSection.astro
│   │   ├── LongevitySection.astro
│   │   ├── EvidenceSection.astro
│   │   ├── ReferencesSection.astro
│   │   ├── DepartmentsWithoutHBOT.astro
│   │   ├── StrategySection.astro
│   │   ├── islands/
│   │   │   ├── ApplicationsExplorer.tsx
│   │   │   └── ProtocolComparison.tsx
│   │   └── ui/                     # shadcn primitives only used by islands
│   ├── pages/
│   │   ├── index.astro              # / (English homepage — same long-scroll layout as today, parity only)
│   │   ├── 404.astro
│   │   └── el/
│   │       └── index.astro          # /el (Greek mirror)
│   ├── lib/
│   │   └── utils.ts                # cn() helper for shadcn
│   └── styles/
│       └── global.css
├── docs/
│   ├── PHASE-2-PLAN.md             # this file
│   ├── baseline-desktop.report.{json,html}
│   └── baseline-mobile.report.{json,html}
├── data-export/
│   ├── hbot-content.json
│   └── hbot-i18n.json
├── _henry-dunant-source/           # original code, read-only reference
├── CHANGELOG.md
├── README.md
└── STATUS.md
```

Phase 2 only delivers `/` and `/el/` (long-scroll homepage, same as today). Multi-page routes (`/indications/{slug}/`, `/clinical/`, etc.) come in Phase 3 — but the folder structure above is set up for them so we're not refactoring later.

---

## 2.3 De-branding pass — exhaustive file/line list

The full list, with the **exact** replacement strings. Site name placeholder: **"HBOT Resource"**. Footer attribution: **"Editorial publisher: IN2050 Ltd · Cyprus · Reg. HE416406"**.

Note: most of these files won't carry over verbatim — they get rewritten as `.astro`. The replacements below describe **what the new equivalent must say** so the new code is correct from the first commit.

### Components — DELETE entirely (do not recreate)
- `client/src/components/AttributionBar.tsx` — proprietary bar, not on generic site
- `client/src/components/AIChatBox.tsx` — Decision B (cut chatbot)
- `client/src/components/ManusDialog.tsx` — Manus-specific
- `client/src/components/Map.tsx` — Google Maps integration, not used on generic site
- `client/src/components/DashboardLayout.tsx`, `DashboardLayoutSkeleton.tsx` — no dashboard
- `client/src/components/ErrorBoundary.tsx` — Astro handles errors
- `client/src/pages/ComponentShowcase.tsx` — dev artifact
- `client/public/__manus__/debug-collector.js` — Manus telemetry

### Components — REWRITE as .astro
- `NavBar.tsx` → `Nav.astro`
  - Line 90: `alt="Henry Dunant Hospital Center"` → `alt="HBOT Resource"`
  - Replace hospital logo image with text wordmark "HBOT Resource"
  - Drop language toggle button (Astro i18n routing handles this — see 2.6)
- `ContactFooter.tsx` → `Footer.astro`
  - Replace IN2050 logo image with single-line text attribution
  - Lines 28, 33, 38, 41, 48, 68-70, 81 — all rewritten:
    ```
    [horizontal divider]
    Editorial publisher: IN2050 Ltd · Cyprus · Reg. HE416406
    Editorial policy · Contact · EN | EL
    © {{year}} IN2050 Ltd
    ```
  - Remove email, website, WhatsApp, "exclusively for Henry Dunant", "not for public distribution"
- `ProtocolComparison.tsx` (kept as React island)
  - Line 58: `pdfSubtitle: "Henry Dunant Hospital Center — Clinical Resource Platform"` → `pdfSubtitle: "HBOT Resource — Protocol Comparison"`
  - Line 60: `pdfSource: "Source: HBOT Clinical Resource · Henry Dunant Hospital Center, Athens"` → `pdfSource: "Source: HBOT Resource (hbotscience.org)"`
  - Line 92: Greek mirror — `pdfSubtitle: "Νοσοκομείο Henry Dunant — Κλινική Πλατφόρμα Πόρων"` → `pdfSubtitle: "HBOT Resource — Σύγκριση Πρωτοκόλλων"`

### i18n strings — REWRITE in `src/i18n/{en,el}.ts`

| Key | EN replacement | EL replacement |
|-----|----------------|----------------|
| `nav.subtitle` | DELETE key | DELETE key |
| `nav.brand` | "HBOT Resource" | "HBOT Resource" *(brand kept Latin)* |
| `hero.badge` | "Evidence-Based HBOT Reference" | "Τεκμηριωμένος Οδηγός HBOT" |
| `hero.exec.body` (last sentence) | strip "to the specific departments of Henry Dunant Hospital Center, providing a strategic framework for clinical integration and wellness program development." → "providing a structured reference for clinical integration and longevity programme design." | Greek mirror |
| `dept.section.subtitle` | "...relevant to each specialty." (drop "at Henry Dunant Hospital Center") | drop "στο Νοσοκομείο Henry Dunant" |
| `nohbot.section.subtitle` | "The following departments do not currently have direct HBOT applications based on available evidence..." (drop "at Henry Dunant Hospital Center") | drop "του Νοσοκομείου Henry Dunant" |
| `strategy.section.subtitle` | "A phased framework for integrating HBOT services in clinical settings..." (drop "at Henry Dunant Hospital Center") | Greek mirror |
| `strategy.market.body` | Rewrite removing "positions Henry Dunant Hospital to capture both the clinical and premium wellness segments. A dedicated Hyperbaric Medicine Unit would be the first of its kind in Athens, establishing a significant competitive advantage in the Eastern Mediterranean healthcare market." Keep market-size opening sentence, drop hospital-specific positioning. | Greek mirror |
| `refs.footer.pill` | "HBOT Resource — Bibliography" | "HBOT Resource — Βιβλιογραφία" |

### Data file `hbot-data.ts` (carried over via JSON export)
- Line 2 header comment: drop "Henry Dunant Hospital Center, Athens"
- `STRATEGIC_RECOMMENDATIONS` entry at lines 1129-1130 (the "research partnerships" item): rewrite both EN and EL to drop "Henry Dunant Hospital" and "Eastern Mediterranean region"

The JSON export already has these as plain data — the rewrite happens at import-into-content-collection time.

### `client/index.html` (replaced by Astro)
- Title and description handled per-page in `BaseLayout.astro` via Astro's slot pattern. No `<title>HBOT Clinical Resource | Henry Dunant Hospital</title>` carries over.
- Existing umami analytics tags: drop (Cloudflare Web Analytics added in Phase 6).

### Other strip-outs
- `package.json`: drop `vite-plugin-manus-runtime`, `@aws-sdk/*`, `drizzle-*`, `mysql2`, `jose`, `express`, `@trpc/*`, server-side deps. Keep React, Radix UI primitives used by surviving islands, Tailwind, framer-motion (if used in islands), date-fns, jspdf for PDF export.
- Drop entire `server/`, `shared/`, `drizzle/`, `patches/` directories. (They live in `_henry-dunant-source/` for reference.)

---

## 2.4 Content migration — JSON to Astro content collections

`data-export/hbot-content.json` already contains every entry in Astro-friendly shape. Migration is mechanical:

1. Define Zod schemas in `src/content.config.ts` mirroring the JSON structure (Bilingual fields as `z.object({ en: z.string(), el: z.string() })`).
2. Run a one-shot migration script (`scripts/migrate-content.mjs`) that reads `hbot-content.json` and writes:
   - `src/content/mechanisms/{slug}.yaml` (5 files)
   - `src/content/indications/{slug}.yaml` (14 files)
   - `src/content/departments/{slug}.yaml` (9 files)
   - `src/content/longevity/{slug}.yaml` (6 files)
   - `src/content/research-studies/{slug}.yaml` (8 files)
   - `src/content/strategic-recommendations/{slug}.yaml` (4 files)
   - `src/content/references.yaml` (one file, 24-entry array — references cross-link from many pages, easier as one collection)
3. Verify: `astro check` + `astro build`. All 66 entries should load with no schema errors.
4. The de-branding text-replacement pass (above section) runs as part of this migration — it's one extra `String.prototype.replace` per known phrase before writing the YAML.
5. The migration script is throwaway — committed for reproducibility but not run again.

Departments embed indication references by slug. References are cross-referenced by `[1]`, `[2]` etc. — keep the `refs: ["[1]", "[2]"]` shape for now; convert to slug-based refs in Phase 3 when individual indication pages are built.

---

## 2.5 Component migration strategy

### Stay React (interactive islands)
| Component | Why kept | Hydration |
|-----------|----------|-----------|
| `ApplicationsExplorer.tsx` | Filter/search UI with state | `client:visible` (lazy) |
| `ProtocolComparison.tsx` | Multi-select + comparison + jsPDF export | `client:visible` |

These are the only two components on the current site that need JS to function. Everything else is decorative / static rendering.

### Convert to `.astro` (zero JS)
| Current | Becomes |
|---------|---------|
| `HeroSection.tsx` | `HeroSection.astro` |
| `MechanismsSection.tsx` | `MechanismsSection.astro` |
| `FDASection.tsx` | `FDASection.astro` (table↔card toggle: tiny island OR keep both rendered with CSS) |
| `DepartmentsSection.tsx` | `DepartmentsSection.astro` (interactive department picker → island OR pre-render all + CSS-only show/hide) |
| `LongevitySection.tsx` | `LongevitySection.astro` |
| `EvidenceSection.tsx` | `EvidenceSection.astro` |
| `NoHBOTSection.tsx` | `DepartmentsWithoutHBOT.astro` |
| `StrategySection.tsx` | `StrategySection.astro` |
| `ReferencesSection.tsx` | `ReferencesSection.astro` |
| `NavBar.tsx` | `Nav.astro` (mobile menu = small island) |
| `ContactFooter.tsx` | `Footer.astro` |
| `ProtocolPanel.tsx` | `ProtocolPanel.astro` |
| `RefTags.tsx` | `RefTag.astro` (anchor link only — no JS needed) |
| `MechanismsSection.tsx` (collapse/expand) | island for the collapse/expand button only |

The "collapse/expand details" patterns can use native `<details>`/`<summary>` HTML elements — zero JS, accessible by default.

### Delete entirely
`AttributionBar`, `AIChatBox`, `ManusDialog`, `Map`, `DashboardLayout*`, `ErrorBoundary`, `ComponentShowcase`, the entire `_core` server tree, `__manus__/debug-collector.js`.

### shadcn/ui pruning
Currently 50+ shadcn primitives in `components/ui/`. After island scope-down, the actual set used by `ApplicationsExplorer` + `ProtocolComparison` is roughly: `button`, `select`, `input`, `checkbox`, `card`, `badge`, `separator`, `tabs`. We keep ~10 primitives, delete the other 40+.

---

## 2.6 i18n strategy

**Recommendation: Option I1** — root EN, prefixed EL.

```
/                 → English homepage
/el/              → Greek homepage
/indications/...  → English (Phase 3+)
/el/indications/...
```

Astro 5 config:

```ts
i18n: {
  defaultLocale: "en",
  locales: ["en", "el"],
  routing: { prefixDefaultLocale: false }
}
```

Why this over symmetrical `/en/` `/el/`:
- **SEO**: most search traffic for "HBOT", "hyperbaric oxygen therapy" etc. is English. Cleaner English URLs concentrate link equity at the root.
- **Editorial signal**: English is the publication language. Greek is a secondary serving for Greek-speaking partners (Athens hospitals, Cyprus market). The root URL signals primary language.
- **Hreflang** + canonical tags handle the symmetric SEO part — Google understands both URLs are equivalent.

**Language toggle UI**: a static link (`<a href="/el/indications/burns/">EL</a>`) in the Nav, computed from current page path. No JS, no localStorage. Cleaner than the current `LanguageContext` approach.

**i18n string lookup**: tiny helper `t(key, lang)` that reads from `src/i18n/{en,el}.ts`. Same shape as current `useLanguage` hook, but resolved at build time, not runtime.

---

## 2.7 Cloudflare Pages preview deploy

**Recommended setup** — connect once, auto-deploy forever:

1. Stamos goes to https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Authorise Cloudflare to read `StaMangi/hbot-resource`
3. Select the repo, set build command `pnpm build` (or `npm run build`), output directory `dist`
4. First deploy runs automatically → Cloudflare assigns a URL like `hbot-resource.pages.dev`

After that, every push to `main` rebuilds; every PR gets an ephemeral preview URL. Stamos can review at any time without me having to deploy manually.

**If Stamos prefers fully manual** (no Cloudflare account access yet): I can use `wrangler pages deploy ./dist` from the Mac Mini once `wrangler login` has been run. Dashboard route is simpler and survives me being absent.

The first preview deploy lands in step **2.6 of the work plan** (after content migration + base layout exist) — you'll see the de-branded site at `hbot-resource.pages.dev` *before* the React islands are ported, so you have visual feedback halfway through the phase.

---

## 2.8 Effort estimate

A "session" = one focused working block, ~1–2 hours, ending at a checkpoint commit.

| # | Sub-step | Sessions |
|---|----------|----------|
| 2.A | New repo + folder reorg + Astro bootstrap + React/Tailwind/MDX/sitemap integrations + base layout shell | 1 |
| 2.B | Content schemas + migration script + 66 content entries verified loading | 1 |
| 2.C | i18n setup + EN/EL routing + Nav.astro + Footer.astro (de-branded) | 1 |
| 2.D | Convert 9 static section components to .astro (Hero, Mechanisms, FDA, Depts, NoHBOT, Longevity, Evidence, Strategy, References) | 2 |
| 2.E | Port React islands (ApplicationsExplorer, ProtocolComparison) + jsPDF export still working | 1 |
| 2.F | Cloudflare Pages connect + first preview deploy + smoke test mobile/desktop EN/EL | 0.5 |
| 2.G | Parity QA against current Henry Dunant site + de-brand grep verification (no "Henry Dunant" anywhere except `_henry-dunant-source/`) | 0.5 |
| | **Total** | **~7 sessions** |

I'd suggest pausing for your review after 2.A (does the bootstrap look right?), 2.C (Nav + Footer de-brand visible), and 2.F (preview URL live).

---

## What I'll need from you when Phase 2 starts

1. **Approval of this plan** (or amendments).
2. **Cloudflare Pages access**: either you connect the GitHub repo via the Cloudflare dashboard yourself (15-minute one-time task), or I do it via `wrangler login` from a Terminal where you've authenticated.
3. **Domain decision** — confirmed `hbotscience.org` (registered, DNS at Cloudflare).
4. **Editorial policy text** — the footer links to `/about/` (which exists in the brief). Phase 6 deliverable. For Phase 2 we just stub the link — no text needed yet.

---

## What I will NOT do until you approve

No code changes. No `gh repo create`. No `_henry-dunant-source/` move. No deletes of existing files. The plan above describes intent only.
