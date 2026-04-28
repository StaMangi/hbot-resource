# CHANGELOG

## 0.1.0 — 2026-04-28 (Phase 2.A — bootstrap)

- Project forked from [`StaMangi/hbot_clinical_resource`](https://github.com/StaMangi/hbot_clinical_resource)
  (the bespoke Henry Dunant Hospital Center clinical resource), re-skinned and de-branded as a generic,
  audience-neutral HBOT reference site.
- Editorial publisher: **IN2050 Ltd · Cyprus · Reg. HE416406**.
- Original Henry Dunant source tree preserved under `_henry-dunant-source/` for reference. It is not built or shipped.
- Source content (mechanisms, FDA indications, departments, longevity applications, references) extracted into
  `data-export/hbot-content.json` and `data-export/hbot-i18n.json` ahead of Astro content collection migration.
- New stack: **Astro 5** (static output, native i18n routing) · React 19 islands · Tailwind v4 · `@astrojs/sitemap` · `@astrojs/mdx`.
- SEO scaffolding wired into `BaseHead.astro` from day one: canonical URLs, hreflang (en/el),
  Open Graph, Twitter Card, MedicalWebPage JSON-LD slot.
- `noindex` is set on every page during preview (until a real domain is pointed at the site).

## Forked from

- Source repo: <https://github.com/StaMangi/hbot_clinical_resource>
- Source live site: <https://hbotresource-wcjp4x3h.manus.space>
- Source: bespoke clinical resource for Henry Dunant Hospital Center (Athens) by IN2050 Ltd.
