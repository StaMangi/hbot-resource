# HBOT Resource — Project Status

**Working dir:** `/Users/stamoulismanginas/Projects/hbot-resource/`
**New repo:** https://github.com/StaMangi/hbot-resource (public)
**Forked from:** [StaMangi/hbot_clinical_resource](https://github.com/StaMangi/hbot_clinical_resource) — preserved at `_henry-dunant-source/`
**Live source site:** https://hbotresource-wcjp4x3h.manus.space
**Target hosting:** Cloudflare Pages
**Target domain:** `hbotscience.org` (registered with Namecheap, DNS pointing to Cloudflare nameservers `ken.ns.cloudflare.com` / `nena.ns.cloudflare.com`, awaiting activation)

## Current phase
**Phase 2.C — i18n + base shell.** Complete. Waiting for Stamos review before 2.D.

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

## What's next (waiting on Stamos)
1. **Review 2.C output** — sample HTML inline below + on GitHub. Sanity-check rendered Nav and Footer in EN and EL.
2. Approve **2.D (section content rendering)** — convert the 9 Henry-Dunant-era section components (Hero, Mechanisms, FDA, Departments, NoHBOT, Longevity, Evidence, Strategy, References) into Astro components that read from the content collections. Long-scroll homepage parity with the current Henry Dunant site.

## Open issues / risks
- **Domain `hbotscience.org` registered (Namecheap), DNS at Cloudflare, awaiting activation.** Hard-coded in `src/lib/seo.ts` as the canonical URL. Single source of truth — if it changes, edit there and rebuild.
- **Cloudflare Pages connection deferred** — Stamos to set up via dashboard at sub-step 2.F.
- **`@astrojs/mdx` 5.x and `@astrojs/react` 5.x are available** but require Astro 6. We pinned to Astro 5.18.1 for stability. Revisit when Astro 6 is more battle-tested.

## Phase log
- **2026-04-28** — Phase 1 complete (inventory + baseline + content export + Phase 2 plan).
- **2026-04-28** — Phase 2.A complete (Astro shell + repo + initial commit pushed).
- **2026-04-28** — Domain corrected to `hbotscience.org`.
- **2026-04-28** — Phase 2.B complete (80 content entries migrated to YAML, de-branded, Zod-validated, build clean).
- **2026-04-28** — Phase 2.C complete (i18n ported with de-brand, Nav + Footer built, Red Cross stealth reference caught and dropped, all four forbidden patterns clean in shippable code). Waiting for review before 2.D.
