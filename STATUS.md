# HBOT Resource — Project Status

**Working dir:** `/Users/stamoulismanginas/Projects/hbot-resource/`
**New repo:** https://github.com/StaMangi/hbot-resource (public)
**Forked from:** [StaMangi/hbot_clinical_resource](https://github.com/StaMangi/hbot_clinical_resource) — preserved at `_henry-dunant-source/`
**Live source site:** https://hbotresource-wcjp4x3h.manus.space
**Target hosting:** Cloudflare Pages
**Target domain:** `hbotscience.org` (registered with Namecheap, DNS pointing to Cloudflare nameservers `ken.ns.cloudflare.com` / `nena.ns.cloudflare.com`, awaiting activation)

## Current phase
**Phase 2.F — Cloudflare Pages preview + Lighthouse.** Deployed and measured. Waiting for Stamos decision on the mobile-Performance fix before 2.E.

**Live preview:** https://hbot-resource.pages.dev (HTTPS, `noindex` during build phase)

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

## What's next (waiting on Stamos)
1. **Decide mobile-Performance fix path** (see `docs/2d-lighthouse-summary.md`):
   - Option A: self-host fonts (recommended)
   - Option B: inline critical CSS
   - Option C: A + B (highest score, ~400 KB repo cost) — **my recommendation**
   - Option D: defer to Phase 5 polish
2. After decision, proceed with **2.E (React islands)** — port `ApplicationsExplorer` and `ProtocolComparison` as `client:visible` islands.

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
- **2026-04-28** — Phase 2.F complete (Cloudflare Pages connected, hbot-resource.pages.dev live, Lighthouse measured against HTTPS preview). Mobile Performance 81 flagged as below target — render-blocking font/CSS issue. Awaiting fix-path decision before 2.E.
