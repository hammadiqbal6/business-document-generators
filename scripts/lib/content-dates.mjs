/**
 * Build a map of site paths → last-modified ISO dates from tool/guide data.
 * Used by sitemap serialize (and anything else that needs real freshness).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_LAUNCHED_AT } from '../../src/config/siteDefaults.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

function toIsoDate(dateStr) {
  // Content dates are YYYY-MM-DD in Asia/Karachi (+05:00)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
  return `${dateStr}T00:00:00.000+05:00`;
}

function extractUpdatedAts(src) {
  /** @type {Map<string, string>} slug → YYYY-MM-DD */
  const map = new Map();
  const slugRe = /(?:slug|"slug")\s*:\s*["']([^"']+)["']/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    const slug = m[1];
    if (slug === 'string') continue;
    // Tool objects can be several KB between slug and updatedAt.
    const slice = src.slice(m.index, m.index + 20000);
    const updated =
      slice.match(/(?:updatedAt|"updatedAt")\s*:\s*["'](\d{4}-\d{2}-\d{2})["']/) ||
      null;
    if (updated) map.set(slug, updated[1]);
  }
  return map;
}

/**
 * @returns {Map<string, string>} absolute site path (with trailing slash) → ISO lastmod
 */
export function buildPathLastmodMap() {
  /** @type {Map<string, string>} */
  const out = new Map();
  const launched = process.env.PUBLIC_LAUNCHED_AT || DEFAULT_LAUNCHED_AT;
  const launchedIso = toIsoDate(launched) || `${launched}T00:00:00.000Z`;

  const toolFiles = [
    'src/data/tools/estimates.ts',
    'src/data/tools/contracts.ts',
    'src/data/tools/forms-creative.ts',
  ];
  for (const rel of toolFiles) {
    const src = fs.readFileSync(path.join(root, rel), 'utf8');
    for (const [slug, date] of extractUpdatedAts(src)) {
      const iso = toIsoDate(date);
      if (iso) out.set(`/tools/${slug}/`, iso);
    }
  }

  const guidesSrc = fs.readFileSync(path.join(root, 'src/data/guides.ts'), 'utf8');
  for (const [slug, date] of extractUpdatedAts(guidesSrc)) {
    const iso = toIsoDate(date);
    if (iso) out.set(`/guides/${slug}/`, iso);
  }

  // Static / index pages: use launchedAt (or omit later if unknown)
  const staticPaths = [
    '/',
    '/tools/',
    '/guides/',
    '/about/',
    '/contact/',
    '/methodology/',
    '/privacy/',
    '/terms/',
    '/cookies/',
    '/hubs/estimates-invoices/',
    '/hubs/contracts/',
    '/hubs/forms/',
    '/hubs/creative-templates/',
  ];
  for (const p of staticPaths) {
    if (!out.has(p)) out.set(p, launchedIso);
  }

  return out;
}
