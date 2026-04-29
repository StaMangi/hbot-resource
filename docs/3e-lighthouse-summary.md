# Phase 3.E — Cross-Links + Schema + Lighthouse Summary

**URL:** https://hbot-resource.pages.dev (Cloudflare Pages preview, HTTPS)
**Captured:** 2026-04-28
**Tool:** Lighthouse 12 via Brave headless.

## Sample reverse-index entry — `/indications/refractory-osteomyelitis/`

Per the Phase 3 plan amendment C — verifying the cross-link logic on a representative entry before it cascades across the site.

**Source data:** `src/content/indications/refractory-osteomyelitis.yaml` cites refs `[1]` and `[11]`.

**Computed cross-links (top 5):**
| Collection | Slug | Title (EN) | Shared refs |
|---|---|---|---|
| mechanisms | `hyperoxygenation` | Hyperoxygenation & Vasoconstriction | [1] |
| mechanisms | `angiogenesis` | Neovascularization & Angiogenesis | [1], [11] (both) |
| mechanisms | `antimicrobial` | Antimicrobial Activity | [1] |
| mechanisms | `gas-reduction` | Gas Volume Reduction | [1] |
| indications | `air-or-gas-embolism` | Air or Gas Embolism | [1] |

Logic verifies as expected: angiogenesis ranks higher (2 shared refs vs 1) but both ref-1-only and ref-11-only entries surface. Self-reference is excluded (the algorithm filters `otherKey === key`).

## Sample "Cited in" — `ref-9` (UHMS Indications, 14th Edition)

Reverse mapping shows ref-9 is cited by **6 entries** across the site:

| Collection | Slug | Title (EN) |
|---|---|---|
| indications | `intracranial-abscess` | Intracranial Abscess |
| departments | `surgery` | Surgery Sector |
| departments | `oncology` | Medical Oncology |
| departments | `ent` | ENT (Otolaryngology) |
| departments | `ophthalmology` | Ophthalmology |
| departments | `endocrinology` | Endocrinology & Metabolism |

The departments surface because their `applications[]` arrays include indication-level refs that aggregate to the dept's reference set.

## Lighthouse — detail page after a11y fix

| Pillar | Mobile | Target |
|---|---|---|
| Performance | **100** | ≥95 ✅ |
| Accessibility | **100** | ≥95 ✅ |
| Best Practices | **100** | ≥95 ✅ |
| SEO | 66 (noindex) | (Phase 6 lifts) |

Mobile FCP / LCP: **1.5 s**. CLS: 0. TBT: 0 ms. Page weight 37 KB compressed (with the new RelatedAside content).

## A11y regression caught + fixed (round 3 of the same pattern)

3.E first run: A11y **95**. Single failing audit: `color-contrast` on `<span class="block text-[10px] uppercase tracking-wider text-slate-400">` inside RelatedAside — the small collection-label tag ("Mechanism", "Indication") above each related-entry link.

Same `text-slate-400` low-contrast issue we've now seen three times:
- 3.B Footer copyright (`text-slate-400` on slate-50)
- 3.D inline references-page links (hover-only underline)
- 3.E RelatedAside collection labels (`text-slate-400` on slate-50/50)

Pattern recognised: any small uppercase `text-slate-400` on light background trips `color-contrast`. Site-wide convention going forward: `text-slate-500` minimum for muted microcopy on light backgrounds. (The remaining 2 instances of `text-slate-400` in code live in obsolete 2.D `src/components/sections/*` which sit on dark gradients — fine. They get deleted at 3.F anyway.)

Fixed: `text-slate-400` → `text-slate-500` in RelatedAside. Re-deployed, re-measured: A11y **100**.

## Mobile Performance chain — full evolution

| Phase | Best representative page | Score |
|---|---|---|
| Henry Dunant baseline | / | 59 |
| Phase 2.D rebuild | / | 81 |
| Phase 3.A font fix | / | 98 |
| Phase 3.B new homepage | / | 98 |
| Phase 3.C `/indications/` index | 100 | 100 |
| Phase 3.D detail page | `/indications/refractory-osteomyelitis/` | 100 |
| Phase 3.E detail w/ Related aside + JSON-LD breadcrumbs | same | **100** |

Five phases of structural change without ever falling below 95 mobile after 3.A's foundation. Architecture has held.

## Reports archived

- `docs/3e-lighthouse-detail-mobile.report.{html,json}` — `/indications/refractory-osteomyelitis/` mobile (post a11y fix)
