# Phase 3.D — Lighthouse Summary

**URL:** https://hbot-resource.pages.dev (Cloudflare Pages preview, HTTPS)
**Captured:** 2026-04-28 (post a11y contrast fix mid-session)
**Tool:** Lighthouse 12 via Brave headless.

## Detail-page spot-check

`/indications/refractory-osteomyelitis/` chosen as representative — full content shape (description + ProtocolPanel full-variant + RefTags + breadcrumbs + JSON-LD).

| Pillar | Mobile | Desktop | Target |
|---|---|---|---|
| Performance | **100** | **100** | ≥95 ✅ |
| Accessibility | **100** | **100** | ≥95 ✅ |
| Best Practices | **100** | **100** | ≥95 ✅ |
| SEO | 66 (noindex) | 66 (noindex) | (Phase 6 lifts) |

Mobile FCP / LCP: **1.0 s**. Desktop FCP: 0.3 s. CLS: 0. TBT: 0 ms.

## A11y regression caught + fixed mid-session

First 3.D mobile run: A11y **95**. Single failing audit: `link-in-text-block` ("Links rely on color to be distinguishable").

The offending pattern: `<a class="text-teal-700 hover:underline">references page</a>` — underline only on hover. WCAG 1.4.1 requires inline text links be visually distinguishable from surrounding text *without* relying on hover.

Fixed across **12 files** (8 detail page templates + 4 landings/indices that had the same pattern): `text-teal-700 hover:underline` → `text-teal-700 underline underline-offset-2 hover:text-teal-800`. Always underlined; colour shifts on hover.

Re-deployed and re-measured: A11y back to **100**.

## Mobile Performance chain — full evolution

| Phase | Best representative page | Score |
|---|---|---|
| Henry Dunant baseline | / | 59 |
| Phase 2.D rebuild | / | 81 |
| Phase 3.A font fix | / | 98 |
| Phase 3.B new homepage | / | 98 |
| Phase 3.C `/indications/` index | / | 100 |
| Phase 3.D `/indications/refractory-osteomyelitis/` detail | / | **100** |

Architecture stayed clean as the site grew from 1 page (long-scroll homepage) to 99 pages (3 landings + 8 indexes + 68 detail pages + Phase 4 stubs + 404). Inline CSS payload remains the dominant per-page weight; content scales linearly within it.

## Reports archived

- `docs/3d-lighthouse-indication-mobile.report.{html,json}` — `/indications/refractory-osteomyelitis/` mobile (post a11y fix)
- `docs/3d-lighthouse-indication-desktop.report.{html,json}` — same page, desktop
