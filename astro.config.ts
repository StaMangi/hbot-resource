import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// Canonical site URL — placeholder until hbotresource.com is registered.
// Global find/replace if domain changes.
const SITE = "https://hbotresource.com";

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "always",
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
