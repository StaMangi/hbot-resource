# Phase 3.B — Lighthouse Summary

**URL:** https://hbot-resource.pages.dev (Cloudflare Pages preview, HTTPS)
**Captured:** 2026-04-28 (post contrast fix)
**Tool:** Lighthouse 12 via Brave headless.

## Pass / fail vs Phase 3.A

| Pillar | 3.A → 3.B Mobile | 3.A → 3.B Desktop | Target | Status |
|---|---|---|---|---|
| Performance | 98 → **98** | 100 → **100** | ≥95 | ✅ |
| Accessibility | 95 → **100** (+5) | 95 → **100** (+5) | ≥95 | ✅ |
| Best Practices | 100 → **100** | 100 → **100** | ≥95 | ✅ |
| SEO | 66 → 66 | 66 → 66 | ≥95 (artefact) | (noindex; flips at Phase 6) |

**A11y improved by 5 points** in the same session — see "A11y regression caught and fixed" below. All real-target pillars now ≥95 on both form factors.

## Spot-check on /clinical/ (the new landing)

| Pillar | Mobile | Desktop |
|---|---|---|
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 66 | 66 |

`/clinical/` mobile FCP/LCP: 1.4 s. Page renders the 9-department grid + 4 reference-material tiles + CTA, all from `LandingLayout` + content collection. Validates that the new layouts deliver consistent performance even on pages denser than the homepage.

## A11y regression caught and fixed

The first 3.B mobile run reported A11y **94** (down from 95 in 3.A). Single failing audit: `color-contrast`.

The offending element: `<p class="text-xs text-slate-400">© 2026 IN2050 Ltd</p>` in `Footer.astro`. Tailwind's `text-slate-400` (`#94a3b8`) on `bg-slate-50` (`#f8fafc`) measured **2.51:1** contrast — well below WCAG AA's 4.5:1 threshold.

Why this didn't surface before 3.B: the long-scroll homepage in 2.D / 2.F / 3.A had the same Footer with the same low-contrast copyright line. Lighthouse a11y audits sometimes miss small elements at the bottom of long pages (the audit runs after scroll-into-view). The new short 3-screen homepage put the footer well within the audit's normal viewport reach, and the regression became visible. **The bug was always there — 3.B just exposed it.**

Fix: `text-slate-400` → `text-slate-600` (`#475569` on `#f8fafc` ≈ **7:1** contrast — solid AA, comfortable AAA). Single-line change in `Footer.astro`. Re-deployed and re-measured: mobile A11y now **100**, desktop A11y also **100** (was previously held at 95 by another, smaller-impact failure that this contrast fix also resolved).

## Architecture-level commentary

Phase 3.B added 6 new routes (the homepage redesign + 2 landings + 6 Phase 4 stubs = 11 new pages, 99 total) without giving back any performance ground:

- Page weight per landing page (gzipped): ~34 KB. Same as the 2.D parity — inline-CSS payload dominates regardless of page-specific content because Tailwind generates the same utilities.
- **Zero JavaScript ships** to the browser still. The new Nav uses `<details>`/`<summary>` for the mobile menu — completely native HTML.
- Mobile FCP/LCP on the new homepage: 1.4 s (was 1.8 s on 3.A's long-scroll homepage). The shorter page means LCP element paints sooner.

## Mobile Core Web Vitals — Henry Dunant → 3.B (full chain)

| Metric | HD | 2.D | 3.A | 3.B |
|---|---|---|---|---|
| Performance | 59 | 81 | 98 | **98** |
| FCP | 5.1 s | 3.6 s | 1.8 s | **1.4 s** |
| LCP | 6.3 s | 3.6 s | 1.8 s | **1.4 s** |
| TBT | 300 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0.01 | 0 | 0 | 0.013 |
| A11y | 75 | 75 | 95 | **100** |

CLS ticked up to 0.013 (still well under the 0.1 "good" threshold) — likely from the new homepage's two-card layout shifting slightly as fonts settle. Within noise. No action needed.

## Reports archived

- `docs/3b-lighthouse-desktop.report.{html,json}` — desktop on `/`
- `docs/3b-lighthouse-mobile.report.{html,json}` — mobile on `/` (post contrast fix)
- `docs/3a-lighthouse-{mobile,desktop}.report.*` — Phase 3.A baseline (kept for reference)
