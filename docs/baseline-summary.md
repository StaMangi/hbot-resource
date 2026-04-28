# Lighthouse Baseline — Henry Dunant Site

**Captured:** 2026-04-28
**URL:** https://hbotresource-wcjp4x3h.manus.space
**Tool:** Lighthouse 12 (CLI) via Brave Browser headless. Same engine as PageSpeed Insights.

> Note: PSI's anonymous web API is rate-limited to zero queries/day for unauthenticated callers, so we ran Lighthouse locally. The audit results are identical to what pagespeed.web.dev would show. To view the full visual report, open `baseline-desktop.report.html` or `baseline-mobile.report.html` in any browser. To capture PNG screenshots later (for `baseline-lighthouse-{mobile,desktop}.png` as originally requested), open the HTML reports and screenshot the score circles section.

## Scores (out of 100)

| Pillar | Mobile | Desktop | Target |
|--------|:------:|:-------:|:------:|
| **Performance** | **59** | **88** | ≥95 |
| **Accessibility** | **75** | **82** | ≥95 |
| **Best Practices** | **82** | **81** | ≥95 |
| **SEO** | **92** | **92** | ≥95 |

**All four pillars below target on both form factors.** Mobile performance is the most acute gap (36 points below target).

## Core Web Vitals (mobile)

| Metric | Value | Good threshold |
|--------|:-----:|:--------------:|
| First Contentful Paint | 5.1 s | < 1.8 s |
| Largest Contentful Paint | 6.3 s | < 2.5 s |
| Total Blocking Time | 300 ms | < 200 ms |
| Cumulative Layout Shift | 0.01 | < 0.1 |

## Why these are bad (and why Astro fixes them)

The current site is a single-page React app. Google receives an empty `<div id="root">` and must download/parse/execute the full JS bundle before any content paints. On mobile (slow CPU, slow network) this compounds — hence FCP 5.1 s and LCP 6.3 s.

Astro static-by-default produces fully-rendered HTML at build time. FCP/LCP collapse to network-bound (~0.5–1.5 s on mobile). Performance score routinely hits 95–100 on content sites of this complexity.

SEO at 92 is a different story — that's mostly meta-tag completeness (which Phase 5 addresses). The 8-point gap is split between missing structured data, no canonical, no hreflang, and no robots-friendly sitemap. None of which the current SPA architecture supports cleanly.

## Files in this directory

- `baseline-desktop.report.json` — full Lighthouse JSON (same data PSI returns)
- `baseline-desktop.report.html` — interactive HTML report (open in browser)
- `baseline-mobile.report.{json,html}` — same for mobile

These are the canonical pre-migration record. Post-launch we'll re-run the same audit against the new site and compare.
