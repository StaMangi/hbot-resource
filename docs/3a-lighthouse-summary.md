# Phase 3.A — Lighthouse Summary

**URL:** https://hbot-resource.pages.dev (Cloudflare Pages preview, HTTPS)
**Captured:** 2026-04-28
**Tool:** Lighthouse 12 via Brave headless.

## Pass / fail vs Phase 2.F baseline

| Pillar | 2.F → 3.A Mobile | 2.F → 3.A Desktop | Target | Status |
|---|---|---|---|---|
| Performance | **81 → 98** (+17) | **96 → 100** (+4) | ≥95 | ✅ |
| Accessibility | 95 → 95 | 95 → 95 | ≥95 | ✅ |
| Best Practices | 100 → 100 | 100 → 100 | ≥95 | ✅ |
| SEO | 66 → 66 | 66 → 66 | ≥95 | Artefact* |

*The SEO score remains at 66 because of the deliberate `noindex={true}` set on every page during preview. Only failing audit is `is-crawlable` ("Page is blocked from indexing"). Returns to ≥95 when domain is attached at Phase 6 launch and `noindex` flips off.

## Mobile Core Web Vitals — full delta chain

| Metric | Henry Dunant (Phase 1) | Phase 2.D (post-rebuild) | Phase 3.A (post-font-fix) | Total Δ |
|---|---|---|---|---|
| Performance | 59 | 81 | **98** | **+39** |
| First Contentful Paint | 5.1 s | 3.6 s | **1.8 s** | −3.3 s |
| Largest Contentful Paint | 6.3 s | 3.6 s | **1.8 s** | −4.5 s |
| Total Blocking Time | 300 ms | 0 ms | 0 ms | −300 ms |
| Cumulative Layout Shift | 0.01 | 0 | 0 | clean |
| Total page weight | 295 KB | 110 KB | 267 KB* | — |

*Phase 3.A page weight grew from 110 → 267 KB on mobile because all CSS (~150 KB) is now inlined and 14 woff2 files (312 KB total, of which the browser fetches the ~3-4 actually used) ship with the first request. Net effect on LCP: down by half. The trade is exactly what we wanted — fewer round-trips, more bytes on the critical path.

## What the fix did, in one paragraph

Two render-blocking external stylesheets were sitting on the critical path in 2.F: Google Fonts CSS (~992 ms wasted on simulated 4G) and the compiled Tailwind CSS (~450 ms). Self-hosting the fonts via `@fontsource/montserrat` + `@fontsource/lato` (Latin + Latin-Ext subsets, 14 weights total = 312 KB woff2) plus setting `build.inlineStylesheets: 'always'` in `astro.config.ts` collapsed both wait states. The CSS now renders synchronously with the HTML stream; the woff2 files are bundled with content-hashed names served from the same origin (no DNS round-trip to fonts.gstatic.com). Result: FCP/LCP both **1.8 s** on simulated mobile — half of 2.F.

## Caveats / known notes

- **Greek subset:** `@fontsource` doesn't ship Greek subsets for either Montserrat or Lato. (Lato never had Greek on Google Fonts either; Montserrat had it on the Google CDN but not in fontsource.) Greek text on `/el/` falls back to system Greek fonts (Helvetica Neue / Segoe UI / Roboto) — same behaviour as the original Henry Dunant site. If visual fidelity on Greek pages becomes a concern, Phase 5 polish can self-host a Greek-supporting fallback like Noto Sans Greek.
- **The 14 woff2 files**: 312 KB total. Browser fetches only 3-4 based on weight-in-use and unicode-range. No optimisation needed.
- **Page weight is now CSS-heavy, not request-count-heavy.** This is the right shape for performance.

## What this unlocks

3.B (homepage + clinical/wellness landings) and onward build on a measured ≥95 mobile baseline. Any future regressions will be visible in the next Lighthouse run, not buried under a font-CDN issue.

## Reports archived

- `docs/3a-lighthouse-desktop.report.{html,json}` — full Lighthouse output
- `docs/3a-lighthouse-mobile.report.{html,json}` — full Lighthouse output
- `docs/2d-lighthouse-{mobile,desktop}.report.*` — Phase 2.F baseline (for delta reference)
- `docs/baseline-{mobile,desktop}.report.*` — Phase 1 Henry Dunant baseline
