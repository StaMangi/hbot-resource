# HBOT Resource — Project Status

**Working dir:** `/Users/stamoulismanginas/Projects/hbot-resource/`
**New repo:** https://github.com/StaMangi/hbot-resource (public)
**Forked from:** [StaMangi/hbot_clinical_resource](https://github.com/StaMangi/hbot_clinical_resource) — preserved at `_henry-dunant-source/`
**Live source site:** https://hbotresource-wcjp4x3h.manus.space
**Target hosting:** Cloudflare Pages
**Target domain:** `hbotscience.org` (registered with Namecheap, DNS pointing to Cloudflare nameservers `ken.ns.cloudflare.com` / `nena.ns.cloudflare.com`, awaiting activation)

## Current phase
**Phase 3.E — Cross-links + BreadcrumbList JSON-LD.** Complete and deployed. Pause point reached. Awaiting Stamos review before 3.F (cleanup + final QA).

**Live preview:** https://hbot-resource.pages.dev (HTTPS, `noindex` during build phase). **99 routes** deployed. Cross-link reverse index live: detail-page asides show "Related" entries; `/references/` shows "Cited in:" per entry; BreadcrumbList JSON-LD on every detail page.

## Phase 1 (audit) — done
- Inventory + memory seeded · Phase 2 plan written · Lighthouse baseline (Desktop 88/82/81/92, Mobile 59/75/82/92) · Content extracted to `data-export/` (66 entries + 286 i18n keys).

## Phase 2.A (bootstrap) — done (this session)
- Henry Dunant source moved to `_henry-dunant-source/` (read-only reference, included in repo for provenance)
- Local `.git/` from the original clone dropped; fresh git history initialised
- Astro 5.18.1 project bootstrapped at repo root with: React 19, Tailwind v4 (via `@tailwindcss/vite`), `@astrojs/sitemap`, `@astrojs/mdx`, `@astrojs/check`
- Folder skeleton: `src/{pages,layouts,components,lib,styles,i18n}` + `public/`
- **`BaseHead.astro` SEO scaffolding wired from day one** (per Stamos addition 1):
  - Canonical URL, hreflang en/el/x-default, Open Graph, Twitter Card, MedicalWebPage JSON-LD, robots noindex, favicon, font preconnects.
- Initial pages: `/` (EN placeholder), `/el/` (EL mirror), `/404` — all build to static HTML.
- `noindex` set on every page during preview phase.
- Sitemap auto-generated with EN ↔ EL `xhtml:link` alternates.
- `robots.txt` allows all crawlers and points to `sitemap-index.xml`.
- Build verified: `pnpm build` produces 3 pages + sitemap in ~1 second.
- GitHub repo created: https://github.com/StaMangi/hbot-resource (public)
- Initial commit pushed to `main`. CHANGELOG attributes Henry Dunant source.

## Phase 2.B (content migration) — done (this session)
- Domain placeholder fixed (`hbotresource.com` → `hbotscience.org`) before content migration.
- `src/content.config.ts` defines Zod schemas for 9 collections with bilingual EN/EL fields.
- `scripts/migrate-content.mjs` reads `data-export/hbot-content.json`, applies de-branding rewrites, generates per-entry YAML files.
- **80 entries written** across 9 collections:
  - mechanisms (5) · indications (14) · departments (9) · departments-without-hbot (6) · longevity (6) · research-studies (8) · strategic-recommendations (4) · references (24) · site-stats (4)
- De-branding pass rewrote one entry (`strategic-recommendations/research`) to drop "Henry Dunant Hospital" and "Eastern Mediterranean region" — both EN and EL.
- Verification: zero "Henry Dunant" or "Νοσοκομείο Henry" matches anywhere in `src/content/`.
- Build clean: Astro loads + validates all 80 entries against Zod schemas, ~1 second.

## Phase 2.C (i18n + base shell) — done (this session)
- `scripts/migrate-i18n.mjs` — second one-shot migration script. Reads `data-export/hbot-i18n.json`, applies approved de-brand replacements at port-time, emits `src/i18n/{en,el}.ts`.
- **De-brand approved replacements applied:** 8 EN replacements + 7 EL replacements + 2 deletions per language (`nav.subtitle`, `strategy.market.stat2`).
- **Stealth catch:** EL `nav.subtitle` was `"Νοσοκομείο Ερυθρός Σταυρός"` (Red Cross Hospital — the Greek localizers' equivalent for Henry Dunant Hospital, which is run by the Hellenic Red Cross Society). Plain regex on "Henry Dunant" / "Ντυνάν" would have missed it. Pattern set now permanently includes "Ερυθρός Σταυρός".
- **i18n keys:** 134 EN + 148 EL (was 136 / 150 before deletions).
- `src/i18n/index.ts` — `t(key, locale)` helper, EN-canonical with locale fallback to EN then to the key itself.
- `src/lib/seo.ts` — added `localePath()` helper for path-only locale switching.
- `SITE_NAME` updated to `"HBOT Science"` for consistency with `nav.brand`.
- `src/components/Nav.astro` — brand link + language toggle that preserves the current path. Zero JS, accessible (`hreflang` + `aria-label`).
- `src/components/Footer.astro` — editorial publisher line *"Editorial publisher: IN2050 Ltd · Cyprus · Reg. HE416406"*, editorial-policy link, language toggle, copyright. No IN2050 logo, no proprietary badge, no Henry Dunant.
- `/`, `/el/`, `/404` all wired through `Nav` and `Footer` via `BaseLayout` slots.
- **Quadruple grep verification clean** in shippable code (`src/`, `dist/`, `public/`): zero matches for `Henry Dunant`, `Νοσοκομείο Henry`, `Ντυνάν`, `Ερυθρός Σταυρός`. Documentation files (CHANGELOG/README/STATUS/PHASE-2-PLAN), `data-export/*` (canonical pre-de-brand source), `scripts/migrate-*.mjs` (regex patterns), and Lighthouse baselines retain Henry Dunant references — all expected and correct.
- Build clean: 3 pages + sitemap, ~1 s.

## Phase 3 audit items (deferred from earlier phases)
- **EN/EL asymmetry:** EL has 14 longevity strings (`longevity.landmark.*`, `longevity.stat.*`, `longevity.wellness.athletic.*`, `longevity.wellness.cognitive.*`) not present in EN. Inherited from the Henry Dunant codebase. Decide in Phase 3: (a) backfill EN translations, or (b) remove dead EL keys.
- **Missing components for `strategy.market.stat2`:** key was deleted in 2.C. Strategy section component (Phase 2.D) must rebuild this stat block thoughtfully — placeholder text would have rotted.

## Phase 5 polish items
- **Mobile language-toggle redundancy.** Nav and Footer both expose language toggles. On mobile narrow viewports this creates duplicated friction. Decide: hide Nav toggle on mobile (keep Footer), hide Footer toggle on mobile (keep Nav), or accept both. Phase 5 polish.

## Phase 2.D (section content rendering) — done (this session)
- Added `astro-icon` + `@iconify-json/lucide` for static lucide icons (tree-shaken at build).
- Reusable subcomponents: `SectionHeader.astro`, `ProtocolPanel.astro`, `RefTags.astro`.
- 9 section components in `src/components/sections/` — Hero, Mechanisms, FDA, Departments, NoHBOT, Longevity, Evidence, Strategy, References. All zero-JS, all read from content collections via `getCollection()`.
- Long-scroll homepage composed in `src/components/HomePage.astro`, used by `/` (EN) and `/el/`.
- **`strategy.market.stat2` rebuild:** chose `"258+ Peer-reviewed citations"` (English) / `"258+ Αξιολογημένες αναφορές"` (Greek). Reason: matches the broader 258-citation claim already in `evidence.summary.body` and signals broad evidence base, which is the right market-positioning frame between clinical and wellness.
- New i18n keys added: `strategy.market.stat2.val`, `strategy.market.stat2` (both languages). `migrate-i18n.mjs` updated with an `ADDITIONS` map so re-running stays idempotent.
- **EN/EL asymmetry handling:** Longevity section's landmark study banner + wellness callouts only render in EL (where the keys exist). EN gets the main longevity grid only. Added `has(key, locale)` to `src/i18n/index.ts` so sections can conditionally render locale-only blocks.
- **Content rendered correctly** in built output: 5 mechanisms · 14 FDA cards · 9 departments (with their applications) · 6 dept-without-hbot · 6 longevity · 8 research studies · 4 strategic recommendations · 24 references with `id="ref-N"` anchors.
- **Quadruple grep clean** in shippable code (`src/`, `dist/`, `public/`).
- **Page weight (gzipped):** 26.9 KB EN, 33.4 KB EL — far under 500 KB target. Zero `<script>` tags reference real JS (only the inline JSON-LD block ships).
- **Lighthouse local run blocked:** Brave headless consistently rejects HTTP localhost with `CHROME_INTERSTITIAL_ERROR` (Brave's Shields/HTTPS-only behaviour, not overrideable via flags). Tried multiple flag combinations including `--unsafely-treat-insecure-origin-as-secure`, fresh user-data-dirs, disabled Brave features. Formal Lighthouse measurement is **deferred to 2.F** when Cloudflare Pages serves over HTTPS (proven working in Phase 1 baselines).
  - Architecture-derived expectations against the Phase 1 baseline (mobile 59 perf): zero-JS static rendering should deliver ≥95 across all four pillars on both mobile and desktop. Verified in 2.F.

## Phase 2.F (Pages preview + Lighthouse) — done (this session)
- Cloudflare Pages connected to `StaMangi/hbot-resource` (Stamos via dashboard). Preview URL: https://hbot-resource.pages.dev. Build settings: Astro preset, `pnpm build`, `dist/` output, `NODE_VERSION=22`.
- First deploy succeeded. Auto-deploys on every push to `main`.
- Lighthouse mobile + desktop run against the preview URL. Reports saved to `docs/2d-lighthouse-{mobile,desktop}.report.{html,json}` and human-readable summary to `docs/2d-lighthouse-summary.md`.

### Scores (preview URL, HTTPS)
| Pillar | Mobile (was) | Desktop (was) | Target |
|---|---|---|---|
| Performance | **81** (59) | **96** (88) | ≥95 |
| Accessibility | **95** (75) | **95** (82) | ≥95 |
| Best Practices | **100** (82) | **100** (81) | ≥95 |
| SEO | **66** (92) | **66** (92) | ≥95 |

- SEO drop is **artificial** — only failing audit is `is-crawlable`, caused by the deliberate `noindex` during preview. Will return to ≥95 when domain is attached and `noindex` flips off at Phase 6 launch.
- **Mobile Performance 81 is below target.** Diagnosis: render-blocking external stylesheets (Google Fonts ~992ms + own _astro CSS ~450ms). Page weight only 110 KiB total; zero JS; zero unused CSS. The bottleneck is the font CDN, not the architecture. Four fix-path options written up in summary doc.

## Phase 3.A (foundation) — done (this session)
### 3.A.1 — Font fix (deferred Option C from 2.F)
- `@fontsource/montserrat` (4 weights) + `@fontsource/lato` (3 weights), Latin + Latin-Ext subsets, total 14 woff2 files / 312 KB. Browser fetches only 3-4 based on weight + unicode-range.
- Greek subsets not available in fontsource for either typeface (same as the original site — Lato never had Greek; Montserrat had it on Google CDN but fontsource omits it). Greek text on `/el/` falls back to system Greek fonts cleanly. Phase 5 polish can self-host Noto Sans Greek if visual fidelity on Greek pages becomes a concern.
- `build.inlineStylesheets: 'always'` in `astro.config.ts` — all CSS inlined into per-page `<style>` block; eliminated the 2.F-flagged 450 ms render-blocking external CSS.
- Google Fonts CDN `<link>` + preconnects removed from `BaseHead.astro`. Confirmed zero references to fonts.googleapis.com / fonts.gstatic.com in any built page.

### 3.A.3 — Three reusable layouts
- `src/layouts/LandingLayout.astro` — tier 1 + 2 (homepage, clinical, wellness). Hero slot + main slot.
- `src/layouts/IndexLayout.astro` — collection index pages with built-in SectionHeader + breadcrumbs slot.
- `src/layouts/DetailLayout.astro` — per-entry pages with two-column desktop (main + aside), single-column mobile, breadcrumbs/eyebrow/h1/main/aside slots.

### 3.A.2 — URL stubs (30 new files, 76 routes generated)
- 6 static landing stubs: `/clinical/`, `/wellness/`, `/about/` × EN + EL.
- 16 index stubs: `/mechanisms/`, `/indications/`, `/departments/`, `/departments/without-hbot/`, `/longevity/`, `/evidence/`, `/references/`, `/protocols/` × EN + EL.
- 8 dynamic `[slug].astro` stubs (4 collections × 2 locales) generating 68 detail routes.
- Each stub renders `StubContent` placeholder labelled with its expected phase (3.B / 3.C / 3.D / 6).
- All `noindex={true}` during preview.

### Existing 2.D pages preserved (per Stamos amendment B)
- `/`, `/el/`, `/404` continue to render the long-scroll homepage as fallback.
- `src/components/sections/*.astro` and `src/components/HomePage.astro` stay in place; deletion happens at end of 3.F after card primitives are extracted.

### Lighthouse — pass criterion met
| Pillar | Mobile | Desktop | Target |
|---|---|---|---|
| Performance | **98** (was 81) | **100** (was 96) | ≥95 ✅ |
| Accessibility | 95 | 95 | ≥95 ✅ |
| Best Practices | 100 | 100 | ≥95 ✅ |
| SEO | 66 | 66 | (deliberate noindex; flips at Phase 6) |

Mobile FCP / LCP halved: 3.6 s → 1.8 s. Reports in `docs/3a-lighthouse-{mobile,desktop}.report.{html,json}` + `docs/3a-lighthouse-summary.md`.

### Build verification
- `astro check`: 0 errors / 0 warnings / 0 hints across 60 files.
- `pnpm build`: 93 routes built in 1.43 s.
- Sitemap: 92 routes (404 excluded), EN/EL alternates wired.
- Quadruple-grep clean in `src/`, `dist/`, `public/`.

## Phase 3.B — done (this session)

### i18n parity achieved (150 EN / 150 EL keys)
- 14 EL-only longevity strings backfilled into EN with British English spelling. `migrate-i18n.mjs` updated with `EN_LONGEVITY_BACKFILL` map; re-run produces matching output.
- Stamos approved 12 verbatim and amended 2:
  - **Flag #1**: `longevity.wellness.cognitive.tag` → "Wellness Programme" (EN) and "Πρόγραμμα Ευεξίας" (EL). Drops "Premium" framing for editorial-credibility tone.
  - **Flag #2**: `longevity.wellness.athletic.desc` — drops the unsourced "30-50%" figure in BOTH languages. Qualitative claim retained (supported by ref-22 / Fife 2022 meta-analysis). **Editorial-integrity precedent established**: every claim citable, no exceptions, no asymmetry between languages.
- Quadruple-grep verification still clean.

### Nav redesign (zero JS, accessible)
- Brand · Clinical / Wellness · | · Mechanisms / Indications / Departments / Longevity / Evidence / References · language toggle.
- Active-link highlighting via build-time pathname comparison.
- Sticky position so nav stays visible on deep pages.
- Mobile menu: native `<details>`/`<summary>` — hamburger opens a flat list, dismissible, accessible. No JS.

### Tier 1 — new homepage (replaces long-scroll)
- 3-screen short home: hero with 4 stats · two soft-routing path cards (Clinical, Wellness) · 4-tile library preview.
- New components: `HomeStat.astro`, `HomePathCard.astro`, `HomeLibraryTile.astro`.
- Old `HomePage.astro` and `src/components/sections/*.astro` stay in src/ (per amendment B) — code-level fallback until 3.F deletion.

### Tier 2 — /clinical/ and /wellness/ landings (replaces 3.A stubs)
- Both EN + EL.
- Clinical: hero · 9-department grid (cards link to `/departments/<slug>/` with FDA/research counts from collection) · 4-tile reference-material section · mailto CTA.
- Wellness: hero · 6-application grid (cards link to `/longevity/<slug>/` with stat + summary) · 4-tile operator-architecture section · mailto CTA.
- Both use `mailto:info@hbotscience.org` with prefilled subject lines. No forms, no JS.
- `MedicalAudience` schema.org on /clinical/ targeting MedicalProfessional.

### 6 Phase 4 route stubs added
- `/safety/`, `/programme-design/`, `/operator-blueprint/` × EN + EL.
- Real content arrives in Phase 4. Routes exist now so /wellness/ + /clinical/ can link to them without 404s.

### Lighthouse — better than 3.A baseline
| Pillar | Mobile (3.A → 3.B) | Desktop (3.A → 3.B) |
|---|---|---|
| Performance | 98 → 98 | 100 → 100 |
| Accessibility | 95 → **100** (+5) | 95 → **100** (+5) |
| Best Practices | 100 → 100 | 100 → 100 |
| SEO | 66 (noindex) | 66 (noindex) |

`/clinical/` Lighthouse spot-check: 100 / 100 / 100 / 66. New layouts deliver consistent performance.

A11y regression caught + fixed mid-session: `Footer.astro` copyright `text-slate-400` had 2.51 contrast on `bg-slate-50` (below WCAG AA 4.5). Bumped to `text-slate-600` (~7:1, AAA). Bug was inherited from 2.D — 3.B's shorter homepage just made it visible to Lighthouse.

### Build status
- `astro check`: 0/0/0 across **69 files**.
- `pnpm build`: **99 routes** in 1.52 s.
- Sitemap: 98 routes (404 excluded), EN/EL alternates wired.

## Phase 3.C — done (this session)

### `docs/PHASE-4-PLAN.md` committed
- 10 sub-steps (4.A–4.J), ~37–48 sessions, 4 stop points.
- Scope locked to 5 PDF clusters + 3 standalone pages. Wider original-brief items proposed for deferral.
- DOI verification: automated `pnpm verify-refs` (preferred) or manual checklist fallback.
- Per-cluster PR + preview-deploy review workflow.
- Three open questions surfaced for Stamos's async review.
- **Source PDF arrived**: `docs/sources/Other HBOT applications.pdf` is now in the repo (Stamos committed it during this session). Phase 4.A can start with research material in hand once 3.D–3.F complete.

### 3.C content
- 7 reusable card components in `src/components/cards/`: `MechanismCard`, `IndicationCard`, `DepartmentCard`, `DeptWithoutCard`, `LongevityCard`, `StudyCard`, `ReferenceItem`. (These also satisfy most of Phase 3.F's "extract card primitives" — F's cleanup pass becomes verification rather than fresh extraction.)
- 8 index pages × 2 locales = 16 routes built:
  - `/mechanisms/` — 5-card grid + paradox callout
  - `/indications/` — 14 cards grouped into 5 category sections (no JS filter)
  - `/departments/` — 9-card grid + footer link to without-hbot
  - `/departments/without-hbot/` — 6-card grid + amber disclaimer banner
  - `/longevity/` — 6-card grid + Hyperoxic-Hypoxic Paradox callout
  - `/evidence/` — 8 study cards + level legend + summary banner
  - `/references/` — 24 reference items with `id="ref-N"` anchors (cross-link target for 3.E reverse index) + 4-stat summary
  - `/protocols/` — static comparison matrix (14-row FDA table + 6-row longevity table). Replaces the original interactive multi-select + jsPDF tool per Phase 3 plan's zero-JS direction; Cmd-P prints cleanly.
- `/about/` stays as 3.A stub — Phase 6 launch-prep fills it.

### Lighthouse spot-checks (mobile)
| Page | Perf | A11y | BP | SEO | FCP | LCP |
|---|---|---|---|---|---|---|
| `/indications/` | 100 | 100 | 100 | 66 | 1.5 s | 1.5 s |
| `/references/` | 98 | 100 | 100 | 66 | 1.8 s | 1.8 s |

All real-target pillars ≥95. Compressed page weight across all 8 index pages: 35–37 KB. Tight and consistent. Reports + summary at `docs/3c-lighthouse-summary.md`.

### Build status
- `astro check`: 0 / 0 / 0 across **76 files** (was 69 → +7 cards).
- `pnpm build`: 99 routes in 1.58 s.
- Quadruple-grep clean.

## What's next (waiting on Stamos)
1. **Async review of `docs/PHASE-4-PLAN.md`** — answer the three open questions on scope / DOI tooling / reviewable unit. Source PDF prerequisite already satisfied.
2. **3.C review** — visit:
   - https://hbot-resource.pages.dev/indications/ (category groupings)
   - https://hbot-resource.pages.dev/references/ (24-item bibliography)
   - https://hbot-resource.pages.dev/protocols/ (comparison matrix, try Cmd-P printability)
   - https://hbot-resource.pages.dev/departments/without-hbot/
   - Greek mirrors at `/el/...`
3. Approve **3.D** — detail pages via dynamic routes. 34 entries (5 mechanisms + 14 indications + 9 departments + 6 longevity) × 2 locales = 68 detail pages, each replacing its 3.A stub.

## Open issues / risks
- **Domain `hbotscience.org` registered (Namecheap), DNS at Cloudflare, awaiting activation.** Hard-coded in `src/lib/seo.ts` as the canonical URL. Single source of truth — if it changes, edit there and rebuild.
- **Cloudflare Pages connection deferred** — Stamos to set up via dashboard at sub-step 2.F.
- **`@astrojs/mdx` 5.x and `@astrojs/react` 5.x are available** but require Astro 6. We pinned to Astro 5.18.1 for stability. Revisit when Astro 6 is more battle-tested.

## Phase log
- **2026-04-28** — Phase 1 complete (inventory + baseline + content export + Phase 2 plan).
- **2026-04-28** — Phase 2.A complete (Astro shell + repo + initial commit pushed).
- **2026-04-28** — Domain corrected to `hbotscience.org`.
- **2026-04-28** — Phase 2.B complete (80 content entries migrated to YAML, de-branded, Zod-validated, build clean).
- **2026-04-28** — Phase 2.C complete (i18n ported with de-brand, Nav + Footer built, Red Cross stealth reference caught and dropped, all four forbidden patterns clean in shippable code).
- **2026-04-28** — Phase 2.D complete (9 section components rendering from content collections, long-scroll homepage in EN + EL, 80 content entries surfaced, gzipped pages 27/33 KB, build clean). Lighthouse-local blocked on Brave headless quirk; deferred to 2.F.
- **2026-04-28** — Phase 2.F complete (Cloudflare Pages connected, hbot-resource.pages.dev live, Lighthouse measured against HTTPS preview). Mobile Performance 81 flagged as below target — render-blocking font/CSS issue. Decision: defer Option C font fix into Phase 3.A.
- **2026-04-28** — Phase 3 plan written and approved (`docs/PHASE-3-PLAN.md`). 6 sub-steps (3.A through 3.F), 4 stop points, ~18 sessions, ~90 routes target. Zero React islands.
- **2026-04-28** — Phase 3.A complete (self-hosted fonts + inline critical CSS + 3 reusable layouts + 30 URL stubs / 76 routes). Mobile Performance lifted 81 → 98, FCP/LCP halved to 1.8 s. All real-target pillars ≥95. 93 pages now deploying. Existing long-scroll homepage preserved as fallback per amendment B.
- **2026-04-28** — Phase 3.B complete (homepage redesign · /clinical/ + /wellness/ landings · Nav redesign · 14 EL longevity strings backfilled into EN · 6 Phase 4 stubs · A11y contrast regression caught and fixed). Mobile A11y 95 → 100. Editorial-integrity precedent locked: never ship unsourced claims, even inherited ones, in either language. 99 routes deploying.
- **2026-04-28** — `docs/PHASE-4-PLAN.md` committed. 10 sub-steps, ~37–48 sessions, scope locked to 5 PDF clusters + 3 standalone pages.
- **2026-04-28** — Source PDF `docs/sources/Other HBOT applications.pdf` committed by Stamos. Phase 4.A prerequisite satisfied.
- **2026-04-28** — Phase 3.C complete (7 reusable card components · 8 collection index pages × 2 locales = 16 routes built). Lighthouse spot-checks on /indications/ and /references/: 100/100/100/66 and 98/100/100/66. Compressed page weights 35–37 KB across all 8 indexes.
- **2026-04-28** — Phase 4 plan amendments applied (PDF rename satisfied, 4.B extra-care note added, Greek glossary locked at end-of-4.B).
- **2026-04-28** — Phase 3.D complete (`Breadcrumbs.astro` + `src/lib/refs.ts` cross-ref validator + 4 dynamic-route detail templates × 2 locales = 8 files generating 68 routes). Lighthouse on `/indications/refractory-osteomyelitis/`: 100/100/100/66 mobile + desktop after a11y contrast fix on inline text links (text-teal-700 hover:underline → always-underline pattern, applied across 12 files). FCP/LCP 1.0 s mobile. Proceeding to 3.E.
- **2026-04-29** — Phase 3.E complete (`src/lib/cross-links.ts` reverse-index helper · `src/lib/breadcrumbs.ts` shared type · `RelatedAside.astro` aside component · BaseHead emits `BreadcrumbList` JSON-LD when `breadcrumbs` prop populated · DetailLayout refactored from slot to prop pattern · 8 detail pages updated · `/references/` ReferenceItem now shows "Cited in:" per entry). Sample reverse-index verified on refractory-osteomyelitis (5 related entries via shared refs `[1]` + `[11]`) and ref-9 (cited by 6 entries). Lighthouse 100/100/100/66 on detail page after fixing one more `text-slate-400` low-contrast bug in RelatedAside (third instance of same pattern → site-wide convention now: `text-slate-500` minimum for muted microcopy on light backgrounds). Awaiting Stamos review before 3.F.
