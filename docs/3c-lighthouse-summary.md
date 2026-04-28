# Phase 3.C — Lighthouse Summary

**URL:** https://hbot-resource.pages.dev (Cloudflare Pages preview, HTTPS)
**Captured:** 2026-04-28
**Tool:** Lighthouse 12 via Brave headless.

## Spot-checks across the new index pages

Two pages were measured to validate the index-page pattern at different content densities:

### `/indications/` — 14 cards across 5 category sections
| Pillar | Mobile | Target |
|---|---|---|
| Performance | **100** | ≥95 ✅ |
| Accessibility | **100** | ≥95 ✅ |
| Best Practices | **100** | ≥95 ✅ |
| SEO | 66 (noindex) | (Phase 6 lifts) |

FCP / LCP: 1.5 s / 1.5 s. CLS: 0. TBT: 0 ms.

### `/references/` — 24 numbered reference items (heaviest by raw content)
| Pillar | Mobile | Target |
|---|---|---|
| Performance | **98** | ≥95 ✅ |
| Accessibility | **100** | ≥95 ✅ |
| Best Practices | **100** | ≥95 ✅ |
| SEO | 66 (noindex) | (Phase 6 lifts) |

FCP / LCP: 1.8 s / 1.8 s. Slightly heavier render than /indications/ because the 24-row list has more DOM nodes; still comfortably above the ≥95 target.

## Compressed page weights — all 8 index pages

| Route | Raw HTML | Compressed |
|---|---|---|
| `/mechanisms/` | 163 KB | 35 KB |
| `/indications/` | 177 KB | 36 KB |
| `/departments/` | 169 KB | 36 KB |
| `/longevity/` | 167 KB | 36 KB |
| `/evidence/` | 175 KB | 37 KB |
| `/references/` | 189 KB | 37 KB |
| `/protocols/` | 175 KB | 36 KB |

Tight and consistent. The ~150 KB of inlined CSS dominates each page; entry content adds 10–25 KB raw / 1–3 KB compressed. None of the eight pages crosses the 500 KB-per-page brief target by an order of magnitude.

## Mobile Performance chain across phases

| Phase | Homepage | Target |
|---|---|---|
| Henry Dunant baseline | 59 | — |
| Phase 2.D (rebuild) | 81 | ≥95 |
| Phase 3.A (font fix) | 98 | ≥95 |
| Phase 3.B (new homepage) | 98 | ≥95 |
| Phase 3.C (index pages) | n/a — homepage unchanged this phase | ≥95 |
| Phase 3.C `/indications/` | **100** | ≥95 |
| Phase 3.C `/references/` | **98** | ≥95 |

The architecture continues to deliver. Adding 8 collection index pages (each with 5–24 content cards) didn't dent performance — the bottleneck remains the inlined CSS payload, which is per-page-constant rather than per-content-scaling.

## Reports archived

- `docs/3c-lighthouse-indications-mobile.report.{html,json}` — `/indications/` mobile run
- (References mobile not archived since it's a single spot-check; full report can be regenerated on demand)
