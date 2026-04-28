# Phase 3 Plan — Restructure to Two-Path IA + Deep Pages

**Status:** Awaiting Stamos approval. No execution until approved.
**Predecessor:** Phase 2.D long-scroll homepage at https://hbot-resource.pages.dev with content collections, i18n, SEO scaffolding, and Cloudflare Pages auto-deploy in place.

---

## Scope of Phase 3

End state: a multi-page site with ~90 routes (45 EN + 45 EL) replacing the long-scroll homepage. Two-path information architecture (clinical / wellness) with shared library, breadcrumbs, per-page schema.org, internal cross-linking. **Mobile Performance lifted to ≥95** by self-hosting fonts in 3.A.1 (deferred Option C from Phase 2.F).

**Out of scope (Phase 4+):** new indication content (long COVID, fibromyalgia, dermatology, plastic surgery, women's health), `/safety/`, `/programme-design/`, `/operator-blueprint/`. Phase 3 builds the IA shell for *existing* content only.

---

## Sub-step breakdown

| Sub-step | Deliverable | Sessions |
|---|---|---|
| **3.A** | Foundation: font fix + URL stubs + page-template skeleton | 2.5 |
| **3.B** | Tier 1 + 2: new homepage, /clinical/, /wellness/ | 3.5 |
| **3.C** | Tier 3 — index pages for each collection (/mechanisms/, /indications/, /departments/, /longevity/, /evidence/, /references/, /protocols/, /about/) | 5 |
| **3.D** | Tier 3 — detail pages via dynamic routes ([slug].astro) | 3 |
| **3.E** | Tier 4 — cross-linking, Breadcrumbs.astro, per-page schema.org | 3 |
| **3.F** | Cleanup + parity QA + final Lighthouse | 1 |
| **Total** | | **~18 sessions** (≈ 27 hours focused work) |

I'd suggest pausing for review after **3.A** (font fix landed, IA scaffolding in place but content empty), **3.B** (three landing pages live for visual review), and **3.E** (full structure complete before final cleanup).

---

## 3.A — Foundation (2.5 sessions)

### 3.A.1 — Self-host fonts + inline critical CSS *(was deferred from Phase 2.F as Option C)*

- Subset Montserrat (400/500/600/700) and Lato (300/400/700) to **Latin + Greek** glyphs in `.woff2`. Use `google-webfonts-helper` to generate subsets. ~400 KB total in `public/fonts/`.
- Replace the `<link href="https://fonts.googleapis.com/...">` block in `BaseHead.astro` with `@font-face` declarations in `src/styles/global.css` using `font-display: swap`.
- Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the 2 critical font files (Montserrat 600 + Lato 400).
- Set `build.inlineStylesheets: 'always'` in `astro.config.ts` — inlines all CSS into `<style>` tags so no separate request blocks render.
- Re-run Lighthouse against the preview URL post-deploy. Save reports to `docs/3a-lighthouse-{mobile,desktop}.report.{html,json}`. Document delta in `docs/3a-lighthouse-summary.md`. **Confirm mobile Performance ≥95** before proceeding.
- If still below 95 after fix, escalate diagnosis before continuing 3.A.

### 3.A.2 — URL structure scaffold

Create empty page stubs at all final URLs so the routing tree exists from day one. Each stub uses `BaseLayout` + `Nav` + `Footer` + a placeholder `<main>` with the route name. This lets Cloudflare's auto-deploy reflect the IA before any content lands.

### 3.A.3 — Page-template skeletons

Three reusable layout components:
- `src/layouts/LandingLayout.astro` — for `/`, `/clinical/`, `/wellness/` (hero + sectioned content).
- `src/layouts/IndexLayout.astro` — for collection index pages (header + grid/list of cards + sidebar nav).
- `src/layouts/DetailLayout.astro` — for individual entries (breadcrumbs + h1 + content body + cross-links sidebar).

All three wrap `BaseLayout` and accept a `pathname` + `locale` prop.

---

## 3.B — Tier 1 + 2 (3.5 sessions)

### 3.B.1 — Homepage `/` and `/el/`

Per the brief:
- Hero: neutral authority statement, 1 line headline + 1 line description. No IN2050 branding above the fold.
- **Two large cards below fold**: "For Hospitals & Clinics" → `/clinical/`, "For Wellness & Longevity Operators" → `/wellness/`.
- Trust strip with hard numbers from collections: indication count, citation count, FDA/UHMS recognition.
- Brief intro to the 5 mechanisms with link to `/mechanisms/`.
- Footer with IN2050 attribution + language toggle.

### 3.B.2 — `/clinical/` landing

Framing: evidence levels, departmental integration, referral pathways, regulatory status.
Sections:
- FDA-approved indications summary (link to full list at `/indications/`).
- Departmental application mapping (re-using the 2.D Departments content, generic phrasing).
- Protocol overview (link to `/protocols/`).
- Strategic recommendations content (the 4 cards from `strategic-recommendations` collection — repurposed here, since they're hospital-integration-flavoured).
- CTA: "Request a clinical consultation" → single quiet contact form (Cloudflare Pages Function endpoint, 30 lines).

### 3.B.3 — `/wellness/` landing

Framing: longevity outcomes, member experience, programme design, market opportunity.
Sections:
- Longevity evidence summary (key Hadanny RCTs from `research-studies`).
- 60-session protocol summary (link to `/longevity/` for full applications).
- Mechanism preview (the anti-aging mechanism — link to `/mechanisms/antiaging/`).
- Market context (the existing `strategy.market.*` content — fits naturally here).
- CTA: "Request an operator briefing" → same contact form pattern.

### 3.B.4 — Nav redesign

Update `Nav.astro` to reflect new IA:
- Brand: "HBOT Science" (left).
- Primary links: "Clinical", "Wellness", "Library" (dropdown of collection indices: Mechanisms, Indications, Departments, Longevity, Evidence, References, Protocols).
- Right side: language toggle.
- Mobile: collapses to hamburger; the dropdown becomes a flat list under each top-level entry. Native `<details>`/`<summary>` for the disclosure (zero JS).

---

## 3.C — Tier 3: Index pages (5 sessions)

For each of these, the page lists all entries in the collection with cards/rows linking to detail pages.

| Route | Collection | Entries | Layout notes |
|---|---|---|---|
| `/mechanisms/` | mechanisms | 5 | 5-card grid + paradox banner (preserved from 2.D) |
| `/indications/` | indications | 14 | Filterable list — see "Re-evaluation of interactivity" below |
| `/departments/` | departments | 9 | List with FDA/research counts; click-through to detail |
| `/departments/without-hbot/` | departments-without-hbot | 6 | Sub-page; explains why HBOT doesn't apply |
| `/longevity/` | longevity | 6 | 3×2 grid + landmark banner (EL only, preserved from 2.D) |
| `/evidence/` | research-studies | 8 | Card list with DOI links + evidence-level legend |
| `/references/` | references | 24 | Numbered list with `id="ref-N"` anchors (cross-link target) |
| `/protocols/` | (composite) | — | Static comparison matrix — see "Re-evaluation of interactivity" |
| `/about/` | (no collection) | — | Editorial policy stub. Phase 6 fills the actual content. |

Each index page gets:
- `<h1>` matching `t("<section>.section.title", locale)`
- Subtitle matching `t("<section>.section.subtitle", locale)`
- Breadcrumb trail: Home › {section}
- `MedicalWebPage` JSON-LD
- Internal links to all detail pages

---

## 3.D — Tier 3: Detail pages via dynamic routes (3 sessions)

For each collection that has per-entry detail pages, one `[slug].astro` file generates all routes:

```ts
// src/pages/indications/[slug].astro
export async function getStaticPaths() {
  const indications = await getCollection('indications');
  return indications.map(ind => ({
    params: { slug: ind.id },
    props: { entry: ind, locale: 'en' as const },
  }));
}
```

Greek mirror: `src/pages/el/indications/[slug].astro` with `locale: 'el'`. Both routes use the same `DetailLayout` + entry data, just different locale rendering.

**Detail templates**:

| Route pattern | Built routes (per locale) | Page contents |
|---|---|---|
| `/indications/[slug]/` | 14 | Condition title + category + evidence level · description · ProtocolPanel · cited references · "See also" cross-links to mechanisms + departments |
| `/mechanisms/[slug]/` | 5 | Title · summary · detail · cited references · "Underlies these indications" cross-links |
| `/departments/[slug]/` | 9 | Department name · short description · all applications (each with ProtocolPanel + RefTags) · cross-links to relevant mechanisms |
| `/longevity/[slug]/` | 6 | Title · stat · summary · mechanism · ProtocolPanel · cited references · cross-links to studies + mechanisms |

Total dynamic-route pages: **34 per locale × 2 = 68**. Plus 12 static index/landing pages (per locale) × 2 = 24. **~90 pages built.**

---

## 3.E — Tier 4: Cross-linking + breadcrumbs + per-page schema (3 sessions)

### 3.E.1 — Reverse-index helper at build time

```ts
// src/lib/cross-links.ts
import { getCollection } from 'astro:content';

export async function buildReferenceIndex() {
  const ind = await getCollection('indications');
  const mech = await getCollection('mechanisms');
  const long = await getCollection('longevity');
  const dept = await getCollection('departments');

  // refNum -> [{ collection, slug, title }]
  const byRef: Record<string, Array<{ collection: string; slug: string; title: { en: string; el: string } }>> = {};

  const push = (refNum: string, entry: { collection: string; slug: string; title: { en: string; el: string } }) => {
    byRef[refNum] ??= [];
    byRef[refNum].push(entry);
  };

  for (const e of ind) for (const r of e.data.refs) push(r.replace(/[\[\]]/g, ''), { collection: 'indications', slug: e.id, title: e.data.condition });
  for (const e of mech) for (const r of e.data.refs) push(r.replace(/[\[\]]/g, ''), { collection: 'mechanisms', slug: e.id, title: e.data.title });
  for (const e of long) for (const r of (e.data.refs ?? [])) push(r.replace(/[\[\]]/g, ''), { collection: 'longevity', slug: e.id, title: e.data.title });
  for (const e of dept) for (const a of e.data.applications) for (const r of a.refs) push(r.replace(/[\[\]]/g, ''), { collection: 'departments', slug: e.id, title: e.data.name });

  return byRef;
}
```

Used on `/references/` page: each reference shows "Cited in: …" with links to citing entries.

Also surfaces on each detail page: an indication's detail can show "Related: [other indications citing the same key references]" — emergent from the same index.

### 3.E.2 — `Breadcrumbs.astro` component

Accepts an array of `{ label, href }`. Last item is plain text (current page). Renders:
- Visible: chevron-separated breadcrumb at top of `DetailLayout`
- Hidden: `BreadcrumbList` JSON-LD inside `BaseHead`

### 3.E.3 — Per-page schema.org JSON-LD

Schema type per page:
| Page type | JSON-LD `@type` |
|---|---|
| `/`, `/clinical/`, `/wellness/`, indexes, `/about/` | `MedicalWebPage` |
| `/indications/[slug]/` | `MedicalWebPage` + nested `MedicalCondition` + nested `MedicalProcedure` (the protocol) |
| `/mechanisms/[slug]/` | `MedicalWebPage` + nested `MedicalProcedure` |
| `/longevity/[slug]/` | `MedicalWebPage` + nested `MedicalProcedure` |
| `/references/[ref-N]` (anchor target only, no separate page) | included as `ScholarlyArticle` items inside the `/references/` page's JSON-LD `mainEntity` array |
| All deep pages | `BreadcrumbList` (separate JSON-LD block) |

Helper `src/lib/schema.ts` builds these from collection data at build time.

---

## 3.F — Cleanup + parity QA + final Lighthouse (1 session)

### Files to delete
- `src/components/HomePage.astro` (replaced by new `/` page).
- All of `src/components/sections/*.astro` (Hero, Mechanisms, FDA, Departments, NoHBOT, Longevity, Evidence, Strategy, References) — once their card primitives have been extracted into reusable components.

### Files to extract (component primitives, before deleting parents)
| Extracted from | New reusable component | Used by |
|---|---|---|
| `Mechanisms.astro` | `MechanismCard.astro` | `/mechanisms/`, `/clinical/`, homepage preview |
| `FDA.astro` | `IndicationCard.astro` | `/indications/`, `/clinical/`, related-content cross-links |
| `Departments.astro` | `DepartmentCard.astro` + `DepartmentApplicationCard.astro` | `/departments/`, `/clinical/` |
| `NoHBOT.astro` | `DeptWithoutCard.astro` | `/departments/without-hbot/` |
| `Longevity.astro` | `LongevityCard.astro` | `/longevity/`, `/wellness/` |
| `Evidence.astro` | `StudyCard.astro` | `/evidence/`, related-content cross-links |
| `References.astro` | `ReferenceItem.astro` | `/references/`, citation footnotes |
| `Strategy.astro` | `RecommendationCard.astro` | `/clinical/` (strategic recs fit there) |
| `Hero.astro` | DELETE; new homepage hero is fundamentally different |

### Final QA
- Quadruple-grep verification (Henry Dunant, Νοσοκομείο Henry, Ντυνάν, Ερυθρός Σταυρός) — should remain clean.
- `astro check` — 0 errors.
- `pnpm build` — produces ~90 HTML files (verify count matches expected).
- Lighthouse mobile + desktop on `/`, `/clinical/`, `/wellness/`, `/indications/burns/` — all four pillars ≥95 (excluding `is-crawlable` from `noindex`).
- `docs/3-final-lighthouse-summary.md` with the deltas.

---

## URL structure — exact slugs

All slugs derive from existing content collections (verified in `src/content/`).

### English (root)

```
/                                              homepage
/clinical/                                     clinical landing
/wellness/                                     wellness landing
/about/                                        editorial policy

/mechanisms/                                   mechanisms index
  ├── /mechanisms/hyperoxygenation/
  ├── /mechanisms/angiogenesis/
  ├── /mechanisms/antimicrobial/
  ├── /mechanisms/gas-reduction/
  └── /mechanisms/antiaging/

/indications/                                  indications index
  ├── /indications/air-or-gas-embolism/
  ├── /indications/carbon-monoxide-poisoning/
  ├── /indications/clostridial-myositis-and-myonecrosis-gas-gangrene/
  ├── /indications/crush-injury-and-compartment-syndrome/
  ├── /indications/decompression-sickness/
  ├── /indications/enhancement-of-healing-in-selected-problem-wounds/
  ├── /indications/exceptional-blood-loss-anemia/
  ├── /indications/intracranial-abscess/
  ├── /indications/necrotizing-soft-tissue-infections/
  ├── /indications/refractory-osteomyelitis/
  ├── /indications/delayed-radiation-injury-soft-tissue-and-bony-necrosis/
  ├── /indications/compromised-skin-grafts-and-flaps/
  ├── /indications/idiopathic-sudden-sensorineural-hearing-loss/
  └── /indications/central-retinal-artery-occlusion/

/departments/                                  departments index
  ├── /departments/surgery/
  ├── /departments/neurology/
  ├── /departments/oncology/
  ├── /departments/gastroenterology/
  ├── /departments/endocrinology/
  ├── /departments/ent/
  ├── /departments/ophthalmology/
  ├── /departments/psychiatry/
  ├── /departments/geriatrics/
  └── /departments/without-hbot/                sub-page (6 entries inline)

/longevity/                                    longevity index
  ├── /longevity/telomere/
  ├── /longevity/senescence/
  ├── /longevity/cognitive/
  ├── /longevity/stemcells/
  ├── /longevity/athletic/
  └── /longevity/collagen/

/evidence/                                     8 research studies
/references/                                   24 refs with #ref-N anchors
/protocols/                                    static comparison matrix
```

### Greek

Identical tree under `/el/` prefix. Astro 5's i18n routing + `getStaticPaths` per locale produces all 90 routes from one set of `[slug].astro` templates.

---

## Component reuse plan

### Survives unchanged (confirmed safe to keep)
- `src/layouts/BaseLayout.astro`
- `src/components/BaseHead.astro` *(extension: accept breadcrumbs prop for BreadcrumbList JSON-LD injection)*
- `src/components/Footer.astro`
- `src/components/SectionHeader.astro`
- `src/components/ProtocolPanel.astro`
- `src/components/RefTags.astro`
- `src/i18n/{en,el}.ts` + `src/i18n/index.ts`
- `src/lib/seo.ts`
- `src/content.config.ts`
- All of `src/content/**/*.yaml`

### Updated in place
- `src/components/Nav.astro` — IA-aware, primary links + Library dropdown (3.B.4).

### New components (Phase 3 introduces)
- `src/components/Breadcrumbs.astro` (3.E.2)
- `src/layouts/LandingLayout.astro`, `IndexLayout.astro`, `DetailLayout.astro` (3.A.3)
- 9 card primitives extracted from sections (3.F)
- `src/lib/cross-links.ts` (3.E.1)
- `src/lib/schema.ts` (3.E.3)

### Deleted at end of Phase 3
- `src/components/HomePage.astro`
- All of `src/components/sections/*.astro` (after extracting card primitives)
- `src/pages/index.astro` (replaced — see migration impact below)
- `src/pages/el/index.astro` (replaced)

---

## Routing strategy in Astro 5

| Route shape | Pattern | Example file |
|---|---|---|
| Static landing pages | `src/pages/<route>/index.astro` | `src/pages/clinical/index.astro` |
| Collection-driven detail pages | `src/pages/<collection>/[slug].astro` with `getStaticPaths` | `src/pages/indications/[slug].astro` |
| Greek mirrors | identical structure under `src/pages/el/<...>` | `src/pages/el/indications/[slug].astro` |

**DRY trick**: each `[slug].astro` is ~10 lines — it just calls `getStaticPaths` and renders `<DetailLayout entry={entry} locale={locale} />`. The actual content rendering lives in the layout. EN and EL pages share the layout; only the locale prop differs.

`@astrojs/sitemap` auto-includes every static-output route with `xhtml:link` alternates between EN/EL counterparts. Already configured from 2.A — no changes needed.

---

## Cross-link generation

Computed once per build inside `src/lib/cross-links.ts`. Output structure (pseudocode):

```ts
{
  byReference: {
    "1": [
      { collection: "mechanisms", slug: "hyperoxygenation", title: { en: "...", el: "..." } },
      { collection: "indications", slug: "air-or-gas-embolism", title: { en: "...", el: "..." } },
      ...
    ],
    "2": [...],
    ...
  },
  byMechanism: {
    "hyperoxygenation": ["air-or-gas-embolism", "decompression-sickness", ...]
    // derived: pages that share refs with this mechanism
  }
}
```

Detail pages import the index and render a "Related" sidebar with 3-5 relevant links. References page renders "Cited in: …" beneath each numbered entry. Zero runtime cost — all resolved at build.

---

## What carries over from the discarded 2.E plan

The original 2.E was scoped to port two React islands (`ApplicationsExplorer`, `ProtocolComparison`). Both still have natural homes in the new IA — but neither survives as planned. See "Re-evaluation of interactivity" below.

**Carried over:** the structural insight that filtering and comparison are real user needs. Both addressed differently in Phase 3.

**Discarded:** `client:visible` React-island machinery, jsPDF dependency, the existing `_henry-dunant-source/client/src/components/{ApplicationsExplorer,ProtocolComparison}.tsx` reference code (no longer port-target — they're informational reference only).

---

## Re-evaluation of interactivity

Default position (per Stamos): **probably most are not** needed.

### `ApplicationsExplorer` (filter indications by category, search by keyword)

**Verdict: replaced with CSS-only filter, not a React island.**

On `/indications/` (14 entries in Phase 3, ~34 in Phase 4) a filter is genuinely useful. Implementation:
- Render all entries with `data-category="acute-ischemias"` etc. attributes
- A `<select>` at top of page changes a `[data-active-category]` attribute on a parent via... no, that needs JS.
- **Better: 5 category links at top of page**, each linking to `/indications/?cat=acute-ischemias`. Use CSS `:has()` to show/hide based on URL. Or simpler: 5 separate static pages `/indications/category/acute-ischemias/` etc. Zero JS.
- **Keyword search**: deferred. With 14-34 entries, browser Cmd-F works fine. If demand emerges, add a tiny island in Phase 5.

Recommendation: **render flat alphabetised list + 5 category-link chips at top + 5 sub-pages for category-filtered views**. No JS.

### `ProtocolComparison` (multi-select indications, side-by-side comparison, jsPDF export)

**Verdict: replaced with static comparison matrix on `/protocols/`.**

The original tool let users pick N indications and see them compared. A static page that renders **all 14 protocols in a single comparison table** delivers the same comparison utility — easier to scan, better for SEO (full table in HTML), better for printing (Cmd-P → PDF, no jsPDF needed).

```
| Indication | ATA | Duration | Sessions | Frequency | Evidence |
| ---------- | --- | -------- | -------- | --------- | -------- |
| Air or Gas Embolism | 2.8–3.0 | 90 min | 1–3 | Continuous until stable | A |
| ...
```

Recommendation: **static 14-row comparison matrix**. PDF export becomes "Cmd-P prints cleanly". Drop `jspdf` and `jspdf-autotable` from dependencies entirely.

### Mechanism `<details>`/`<summary>` expand on cards

Already zero-JS in 2.D (native HTML5). Carries over unchanged.

### Department picker (sidebar that switches the visible department)

In Phase 3, each department gets its own page (`/departments/surgery/`, etc.). The picker disappears — replaced by the index page's link list. No interactivity needed.

### Mobile hamburger menu

Use `<details>`/`<summary>` for the disclosure (Astro's `Nav.astro`). Zero JS, accessible by default, animates with CSS.

**Net result for Phase 3: zero React islands, zero `client:*` directives, full removal of `@astrojs/react`** if we choose. (Could keep React installed for future Phase 5 polish; trivial cost.) The Cloudflare Pages preview in Phase 3 will ship **literally zero JavaScript** to the browser.

This makes Phase 3.F's final Lighthouse measurement particularly clean — any remaining mobile-perf gap is now purely CSS/font/image, not JS.

---

## Migration impact on current 2.D output

| 2.D artefact | Fate in Phase 3 |
|---|---|
| `src/pages/index.astro` (long-scroll EN homepage) | **Replaced** by new tier-1 homepage in 3.B.1 |
| `src/pages/el/index.astro` (long-scroll EL homepage) | **Replaced** by new tier-1 homepage |
| `src/pages/404.astro` | Updated to use new IA in Nav |
| `src/components/HomePage.astro` | **Deleted** at end of 3.F |
| `src/components/sections/*.astro` | **Deleted** at end of 3.F (after extracting card primitives) |
| 2.D Lighthouse reports in `docs/2d-*` | **Kept as historical record** for delta comparison |
| 2.D commit history | **Preserved on `main` branch** — git log is the audit trail |

**No "Phase 4 archive directory" needed.** The git history is the archive. Preview URL keeps working — visitors during the transition see WIP, but `noindex` keeps it out of search engines.

---

## Font/CSS optimisation as 3.A.1

Repeating from §3.A above for visibility:

**Concrete sequence:**
1. Download `.woff2` subsets via google-webfonts-helper (Latin + Greek):
   - Montserrat 400, 500, 600, 700 (4 files)
   - Lato 300, 400, 700 (3 files)
   - Total: 7 files, ~400 KB combined
2. Drop into `public/fonts/`.
3. Write `@font-face` declarations in `src/styles/global.css` with `font-display: swap` and `unicode-range` per subset.
4. Remove the Google Fonts `<link>` from `src/components/BaseHead.astro`.
5. Add `<link rel="preload" as="font" type="font/woff2" crossorigin>` in `BaseHead.astro` for the two most-critical files (Montserrat 600 for h1/h2, Lato 400 for body).
6. Set `build: { inlineStylesheets: 'always' }` in `astro.config.ts`.
7. Push, wait for Cloudflare Pages auto-deploy, run Lighthouse mobile + desktop.
8. **Pass criterion: mobile Performance ≥95.** If below, escalate before continuing 3.A.

Expected result based on Phase 2.F diagnosis (Google Fonts wasted 992ms on mobile, own CSS wasted 450ms — both eliminated):
- Mobile Performance: ~95-98
- Desktop Performance: ~98-100
- A11y / BP: unchanged at 95 / 100
- SEO: unchanged at 66 (the deliberate `noindex`, fixes at Phase 6)

---

## Acceptance criteria for Phase 3 completion

- [ ] All 90 routes (45 EN + 45 EL) build cleanly via `pnpm build`.
- [ ] `astro check` reports 0 errors.
- [ ] Quadruple-grep verification clean in `src/`, `dist/`, `public/`.
- [ ] Mobile + desktop Lighthouse ≥95 on Performance / Accessibility / Best Practices on `/`, `/clinical/`, `/wellness/`, plus a sampled detail page (`/indications/refractory-osteomyelitis/`). SEO will still be 66 due to `noindex`; that's expected.
- [ ] Every detail page has: breadcrumbs, MedicalWebPage JSON-LD (with nested MedicalCondition / MedicalProcedure where applicable), Cited-in cross-links rendered.
- [ ] Sitemap auto-includes all routes with EN ↔ EL `xhtml:link` alternates (auto via `@astrojs/sitemap`).
- [ ] Cloudflare Pages preview at `hbot-resource.pages.dev` shows the new IA after the final 3.F push.

---

## What I will NOT do during Phase 3

- No new content (all Phase 4 — long COVID, fibromyalgia, dermatology, plastic surgery, women's health additions).
- No `/safety/`, `/programme-design/`, `/operator-blueprint/` — Phase 4.
- No domain attachment — Phase 6.
- No Cloudflare Web Analytics setup — Phase 6.
- No editorial policy long-form content — Phase 6 (just stub the `/about/` route).
- No EN/EL asymmetry resolution — flagged as Phase 3 audit item; my proposal: **drop the 14 EL-only longevity keys** when the new `/wellness/` and `/longevity/` pages are built, since the cleanest path is symmetry. Stamos can override.

---

## Stop conditions

Pause and wait for Stamos sign-off after each of:
- 3.A complete (font fix landed, Lighthouse re-run, mobile Performance ≥95 confirmed)
- 3.B complete (homepage + clinical + wellness landings live for visual review)
- 3.E complete (full IA + cross-links + schema in place; final cleanup is mechanical)
