// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { DEFAULT_SITE_URL } from './src/config/siteDefaults.mjs';
import { buildPathLastmodMap } from './scripts/lib/content-dates.mjs';

// Canonical origin: PUBLIC_SITE_URL, else single default (see docs/CUSTOM-DOMAIN.md)
const siteUrl = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;
const pathLastmod = buildPathLastmodMap();

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/embed/'),
      serialize(item) {
        // Prefer real content dates; omit lastmod when we have no reliable source.
        try {
          const u = new URL(item.url);
          const path = u.pathname.endsWith('/') ? u.pathname : `${u.pathname}/`;
          const lastmod = pathLastmod.get(path);
          if (lastmod) item.lastmod = lastmod;
          else delete item.lastmod;
        } catch {
          delete item.lastmod;
        }
        return item;
      },
    }),
  ],
  build: {
    // Inline CSS on tool/hub pages so the head is not 3+ render-blocking stylesheets.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      // Do not force jspdf/docx into manualChunks: Rollup was placing Vite's shared
      // __vitePreload helper inside the jspdf chunk, so the click-to-load editor
      // script statically imported ~126KB gzip of jspdf on every tool page view.
      modulePreload: false,
    },
  },
});
