# Phase 2.D — Lighthouse Summary

**URL:** https://hbot-resource.pages.dev (Cloudflare Pages preview, HTTPS)
**Captured:** 2026-04-28
**Tool:** Lighthouse 12 via Brave headless (same setup as Phase 1 baselines).

## Headline scores

| Pillar | Mobile baseline → 2.D | Desktop baseline → 2.D | Target |
|---|---|---|---|
| Performance | 59 → **81** (+22) | 88 → **96** (+8) | ≥95 |
| Accessibility | 75 → **95** (+20) | 82 → **95** (+13) | ≥95 |
| Best Practices | 82 → **100** (+18) | 81 → **100** (+19) | ≥95 |
| SEO | 92 → **66** (−26)* | 92 → **66** (−26)* | ≥95 |

*The SEO regression is **artificial**. The only failing SEO audit is `is-crawlable` (Page is blocked from indexing) — caused by the `noindex={true}` we deliberately set on every page during preview. When the real domain is attached at Phase 6 launch and `noindex` flips to `false`, SEO returns to ≥95 (every other SEO audit passes). This is a preview-config artefact, not a regression.

## Pillars below target

### Desktop — 96 perf · 95 a11y · 100 BP · 66 SEO* — ✓ all real targets met

### Mobile — 81 perf · 95 a11y · 100 BP · 66 SEO* — ✗ Performance below target

**Mobile Performance at 81 is the only real gap.** Flagging per the brief.

## Diagnosis — what's holding mobile perf back

LCP fires at 3.55 s on simulated mobile (4G network, Moto G4 CPU). Two render-blocking external stylesheets sit on the critical path:

| Resource | Size | Wasted ms |
|---|---|---|
| Google Fonts CSS (`fonts.googleapis.com/css2?family=Montserrat...&family=Lato...`) | 1.2 KB | 992 ms |
| Our own _astro CSS (compiled Tailwind) | 20 KB | 450 ms |

Total wasted: ~1.4 s on mobile. Page weight is **110 KiB total** (excellent — well under brief target). No unused CSS, no unused JS, no third-party tracker blocking, no images on the critical path (lucide SVG icons are inline).

The bottleneck is **render-blocking CSS, not page weight or JS**. The architectural decision (zero-JS static rendering) is doing its job — what's left is the same render-blocking-fonts issue any site using a font CDN faces.

## Fix paths

**Option A — self-host fonts.** Drop Google Fonts CDN. Add `public/fonts/Montserrat-*.woff2` and `Lato-*.woff2` (subset to Latin + Greek). Use `@font-face` in `global.css` with `font-display: swap`. Removes the largest render-blocking resource. Expected mobile Performance: 95+. Cost: ~400 KB of font files added to repo, ~30 min work.

**Option B — inline critical CSS.** Set Astro's `build.inlineStylesheets: 'always'` (or `'auto'`) in `astro.config.ts`. CSS gets inlined into `<style>` on every page; no separate request. Increases per-page HTML size by ~20 KB raw / ~3 KB gzipped. Expected mobile Performance: ~90 (Google Fonts is still external).

**Option C — A + B.** Highest score, ~400 KB repo cost, both render-blocking resources eliminated. Expected mobile Performance: 97-100.

**Option D — defer.** Acknowledged blocker for ≥95 mobile; won't block 2.E (React islands actually have potential to push perf back down, so fixing this *first* would let us measure the React-island delta cleanly). Numbers stay where they are until Phase 5 polish.

## Mobile Core Web Vitals — Henry Dunant vs Phase 2.D

| Metric | Henry Dunant | Phase 2.D | Δ |
|---|---|---|---|
| First Contentful Paint | 5.1 s | 3.6 s | **−1.5 s** |
| Largest Contentful Paint | 6.3 s | 3.6 s | **−2.7 s** |
| Total Blocking Time | 300 ms | 0 ms | **−300 ms** *(no JS to block)* |
| Cumulative Layout Shift | 0.01 | 0 | **−0.01** |
| Total page weight | 295 KB | 110 KB | **−185 KB** |

The rebuild collapsed the SPA-tax — TBT to zero, CLS to zero, page weight cut by ~63%. The remaining ~1.4 s on FCP/LCP is entirely the render-blocking external stylesheets identified above.

## Recommendation

**Apply Option C (self-host + inline critical CSS) before 2.E.** Reasons:

1. Stamos's brief explicitly asks to know before 2.E adds React. Fixing now means the React-islands delta (which we'll measure in 2.E or later) is uncontaminated by the font fix.
2. Mobile Performance gap is small enough to fix in one focused session.
3. Fixing render-blocking CSS in 2.D's static foundation matches the pattern of "bake the foundation right" used for SEO scaffolding (2.A) and i18n de-brand (2.C).

**Counter-argument: defer.** If you'd rather see the React-islands impact on a known baseline first, leave 81 as is, ship 2.E, then fix fonts in Phase 5 with a clean before/after.

Either is defensible. Tell me which.

## Reports archived

- `docs/2d-lighthouse-desktop.report.{html,json}` — full Lighthouse output
- `docs/2d-lighthouse-mobile.report.{html,json}` — full Lighthouse output
- `docs/baseline-{mobile,desktop}.report.{html,json}` — Phase 1 baseline (for reference)

Open the `.html` files in any browser to see the full visual reports.
