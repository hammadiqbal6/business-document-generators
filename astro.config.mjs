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
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('jspdf')) return 'jspdf';
            if (id.includes('docx')) return 'docx';
          },
        },
      },
    },
  },
});
