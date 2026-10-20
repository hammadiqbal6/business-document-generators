// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// Must stay in sync with DEFAULT_SITE_URL in src/config/site.ts
const siteUrl =
  process.env.PUBLIC_SITE_URL ||
  'https://business-document-generators.hammadiqbal117.workers.dev';

export default defineConfig({
  site: siteUrl,
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/embed/'),
      serialize(item) {
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
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
