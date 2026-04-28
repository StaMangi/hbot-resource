import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

// Canonical site URL. Domain registered with Namecheap, pointing to Cloudflare
// nameservers (ken.ns.cloudflare.com, nena.ns.cloudflare.com), awaiting activation.
// If this changes, also update src/lib/seo.ts (single source of truth there).
const SITE = "https://hbotscience.org";

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",
  build: {
    // Inline all CSS into the per-page <style> block. Eliminates the ~450 ms
    // render-blocking external stylesheet flagged in the Phase 2.F Lighthouse
    // diagnosis. Combined with self-hosted fonts, this lifts mobile
    // Performance from 81 → ≥95.
    inlineStylesheets: "always",
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "el"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    mdx(),
    icon({
      // Tree-shaken at build: only icons referenced via <Icon name="lucide:..." /> ship.
      include: { lucide: ["*"] },
    }),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", el: "el" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
