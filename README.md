# HBOT Resource

Evidence-based hyperbaric oxygen therapy reference. Bilingual EN/EL.

> **Editorial publisher:** IN2050 Ltd · Cyprus · Reg. HE416406

## Status

Under construction. See [`STATUS.md`](./STATUS.md) for the live phase log and
[`docs/PHASE-2-PLAN.md`](./docs/PHASE-2-PLAN.md) for the current build plan.

## Development

```bash
pnpm install
pnpm dev      # local dev server at http://localhost:4321
pnpm build    # production static build into ./dist
pnpm preview  # serve the production build locally
pnpm check    # type-check (Astro + TS)
```

## Stack

- **Framework:** Astro 5 (static output, native i18n routing)
- **Interactive islands:** React 19
- **Styling:** Tailwind v4 (via `@tailwindcss/vite`)
- **Sitemap:** `@astrojs/sitemap`
- **Long-form content:** `@astrojs/mdx`
- **Hosting target:** Cloudflare Pages

## Repo layout

```
.
├── src/
│   ├── pages/             # routes (EN at /, EL under /el/)
│   ├── layouts/           # BaseLayout wraps every page
│   ├── components/        # BaseHead (SEO), nav, footer, sections
│   ├── content/           # Astro content collections (Phase 2.B+)
│   ├── i18n/              # EN/EL UI strings
│   ├── lib/               # shared helpers (seo, utils)
│   └── styles/            # Tailwind entry
├── public/                # static assets (robots.txt, favicon, OG image)
├── data-export/           # canonical bilingual content (JSON, source-of-truth for content collections)
├── docs/                  # Lighthouse baselines, phase plans
├── _henry-dunant-source/  # original forked source, read-only reference, not built
├── astro.config.ts
├── package.json
└── STATUS.md
```

## Provenance

This project is a generic re-skin of the bespoke clinical resource originally built for Henry Dunant
Hospital Center (Athens). See [`CHANGELOG.md`](./CHANGELOG.md).
