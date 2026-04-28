# HBOT Resource — Project Status

**Working dir:** `/Users/stamoulismanginas/Projects/hbot-resource/`
**New repo:** https://github.com/StaMangi/hbot-resource (public)
**Forked from:** [StaMangi/hbot_clinical_resource](https://github.com/StaMangi/hbot_clinical_resource) — preserved at `_henry-dunant-source/`
**Live source site:** https://hbotresource-wcjp4x3h.manus.space
**Target hosting:** Cloudflare Pages
**Target domain:** `hbotscience.org` (registered with Namecheap, DNS pointing to Cloudflare nameservers `ken.ns.cloudflare.com` / `nena.ns.cloudflare.com`, awaiting activation)

## Current phase
**Phase 2.B — Content migration.** Complete. Waiting for Stamos review before 2.C.

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

## What's next (waiting on Stamos)
1. **Review the 2.B output** — sample YAML files in chat, full tree on GitHub at `src/content/`.
2. Approve **2.C (i18n + base shell)** — port EN/EL strings into `src/i18n/`, build de-branded `Nav.astro` and `Footer.astro`, set up language toggle, ensure every existing page still passes through `BaseLayout`/`BaseHead` cleanly.

## Open issues / risks
- **Domain `hbotscience.org` registered (Namecheap), DNS at Cloudflare, awaiting activation.** Hard-coded in `src/lib/seo.ts` as the canonical URL. Single source of truth — if it changes, edit there and rebuild.
- **Cloudflare Pages connection deferred** — Stamos to set up via dashboard at sub-step 2.F.
- **`@astrojs/mdx` 5.x and `@astrojs/react` 5.x are available** but require Astro 6. We pinned to Astro 5.18.1 for stability. Revisit when Astro 6 is more battle-tested.

## Phase log
- **2026-04-28** — Phase 1 complete (inventory + baseline + content export + Phase 2 plan).
- **2026-04-28** — Phase 2.A complete (Astro shell + repo + initial commit pushed).
- **2026-04-28** — Domain corrected to `hbotscience.org`.
- **2026-04-28** — Phase 2.B complete (80 content entries migrated to YAML, de-branded, Zod-validated, build clean). Waiting for review before 2.C.
