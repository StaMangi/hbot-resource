# HBOT Resource — Project Status

**Working dir:** `/Users/stamoulismanginas/Projects/hbot-resource/`
**New repo:** https://github.com/StaMangi/hbot-resource (public)
**Forked from:** [StaMangi/hbot_clinical_resource](https://github.com/StaMangi/hbot_clinical_resource) — preserved at `_henry-dunant-source/`
**Live source site:** https://hbotresource-wcjp4x3h.manus.space
**Target hosting:** Cloudflare Pages
**Target domain:** `hbotresource.com` (placeholder until registered)

## Current phase
**Phase 2.A — Bootstrap.** Complete. Waiting for Stamos review before 2.B.

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

## What's next (waiting on Stamos)
1. **Review the 2.A output** — clone the repo locally, run `pnpm install && pnpm dev`, visit http://localhost:4321 and http://localhost:4321/el/. Or just review the GitHub repo.
2. Approve **2.B (content migration)** — Zod schemas + script that splits `hbot-content.json` into per-entry YAML files in `src/content/`.

## Open issues / risks
- **Domain not yet registered.** `hbotresource.com` is hard-coded in `src/lib/seo.ts` as the canonical URL. If we change domain, it's a single-line edit + rebuild (no widespread find/replace needed thanks to centralised constant).
- **Cloudflare Pages connection deferred** — Stamos to set up via dashboard at sub-step 2.F.
- **`@astrojs/mdx` 5.x and `@astrojs/react` 5.x are available** but require Astro 6. We pinned to Astro 5.18.1 for stability. Revisit when Astro 6 is more battle-tested.

## Phase log
- **2026-04-28** — Phase 1 complete (inventory + baseline + content export + Phase 2 plan).
- **2026-04-28** — Phase 2.A complete (Astro shell + repo + initial commit pushed). Waiting for review before 2.B.
