# HBOT Resource — Project Status

**Working dir:** `/Users/stamoulismanginas/Projects/hbot-resource/`
**Source repo:** [StaMangi/hbot_clinical_resource](https://github.com/StaMangi/hbot_clinical_resource) (cloned in place)
**Live source site:** https://hbotresource-wcjp4x3h.manus.space
**Target hosting:** Cloudflare Pages (separate domain TBC)

## Current phase
**Phase 1 — Audit & plan (read-only).** Complete. Waiting for Phase 2 approval.

## Done
- Repo cloned into working dir (alongside `.claude/`)
- File-tree, dependency, content-storage, i18n, and "Henry Dunant" inventory complete
- Memory seeded with user role, project context, workflow expectations, and content-integrity rules
- **Decisions approved (2026-04-28):** Astro · drop backend · cut chatbot · new repo `StaMangi/hbot-resource` · Lighthouse baseline via local CLI (PSI API blocked)
- **Lighthouse baseline captured** — `docs/baseline-{mobile,desktop}.report.{json,html}` + `docs/baseline-summary.md`
  - Desktop: Perf 88 · A11y 82 · BP 81 · SEO 92
  - Mobile: Perf 59 · A11y 75 · BP 82 · SEO 92 — all below ≥95 target
- **Content extraction** — `data-export/hbot-content.json` (66 entries) + `data-export/hbot-i18n.json` (286 keys, EN/EL)
- **Phase 2 plan written** — `docs/PHASE-2-PLAN.md`

## What's next (waiting on Stamos)
1. Review `docs/PHASE-2-PLAN.md` and approve (or amend)
2. Cloudflare Pages access decision: connect repo via dashboard (Stamos) OR `wrangler login` route (me, after Stamos auths)
3. Domain target confirmation (`hbotresource.com` or alt) — for canonical URL placeholders

## Open issues / risks
- Current site is a **single-page SPA** — entire content renders client-side from one HTML shell. The brief requires multi-page routing AND non-JS-rendered text for crawlers. This is a structural mismatch and forces a framework decision now.
- Site is **coupled to Manus.space hosting** (vite-plugin-manus-runtime, `/manus-storage/` asset paths, debug-collector, ManusDialog). Decoupling is part of the fork.
- Backend (Express + tRPC + MySQL + S3 + OAuth) is **largely unused for content** — content is hardcoded TS arrays. Stack simplification recommended.

## Phase log
- **2026-04-28** — Phase 1 complete. Inventory + baseline + content export + Phase 2 plan all delivered. Waiting for Phase 2 approval.
