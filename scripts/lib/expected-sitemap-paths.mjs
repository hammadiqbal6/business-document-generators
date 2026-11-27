/**
 * Expected indexable sitemap paths (trailing slash) derived from tool/guide
 * data + static pages. Used by indexing-audit and Vitest so a missing route
 * fails CI even before HTML walk edge cases.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

function extractSlugs(src) {
  /** @type {string[]} */
  const slugs = [];
  const slugRe = /(?:slug|"slug")\s*:\s*["']([^"']+)["']/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    const slug = m[1];
    if (slug === 'string') continue;
    slugs.push(slug);
  }
  return slugs;
}

/**
 * Static indexable paths (trailing slash). Intentionally excludes
 * cookies/privacy/terms (noindex) and embeds/404.
 */
export const STATIC_INDEXABLE_PATHS = [
  '/',
  '/tools/',
  '/guides/',
  '/about/',
  '/contact/',
  '/methodology/',
  '/hubs/estimates-invoices/',
  '/hubs/contracts/',
  '/hubs/forms/',
  '/hubs/creative-templates/',
];

/**
 * @returns {{ paths: string[], toolSlugs: string[], guideSlugs: string[] }}
 */
export function expectedIndexablePaths() {
  const toolFiles = [
    'src/data/tools/estimates.ts',
    'src/data/tools/contracts.ts',
    'src/data/tools/forms-creative.ts',
  ];
  /** @type {string[]} */
  const toolSlugs = [];
  for (const rel of toolFiles) {
    const src = fs.readFileSync(path.join(root, rel), 'utf8');
    // Prefer exported ToolDefinition objects: take slug near updatedAt/publishedAt
    // by reading every slug: '…' that looks like a route slug (kebab-case).
    for (const slug of extractSlugs(src)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) continue;
      if (!toolSlugs.includes(slug)) toolSlugs.push(slug);
    }
  }

  const guidesSrc = fs.readFileSync(path.join(root, 'src/data/guides.ts'), 'utf8');
  /** @type {string[]} */
  const guideSlugs = [];
  for (const slug of extractSlugs(guidesSrc)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) continue;
    // guides.ts also mentions relatedToolSlugs — keep only guide entries by
    // requiring the slug appears as a top-level guide object slug near title.
    // Simpler: accept unique kebab slugs that appear as `"slug": "…"` JSON-style
    // or slug: '…' in guide objects; filter known tool-only collisions below.
    if (!guideSlugs.includes(slug)) guideSlugs.push(slug);
  }

  // relatedToolSlugs / relatedGuideSlugs also match extractSlugs — drop tool
  // slugs that are not guide pages by intersecting with guide object markers.
  const guideObjectSlugs = new Set();
  const guideObjRe =
    /(?:{\s*"slug"\s*:\s*"([^"]+)"|{\s*slug:\s*'([^']+)')/g;
  let gm;
  while ((gm = guideObjRe.exec(guidesSrc)) !== null) {
    guideObjectSlugs.add(gm[1] || gm[2]);
  }
  // Fallback if objects use different formatting: keep guideSlugs that are
  // not also tool slugs, plus explicit object matches.
  const toolSet = new Set(toolSlugs);
  const cleanedGuides = [
    ...new Set([
      ...[...guideObjectSlugs],
      ...guideSlugs.filter((s) => !toolSet.has(s)),
    ]),
  ].filter((s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s));

  /** @type {string[]} */
  const paths = [...STATIC_INDEXABLE_PATHS];
  for (const slug of toolSlugs) paths.push(`/tools/${slug}/`);
  for (const slug of cleanedGuides) paths.push(`/guides/${slug}/`);

  return {
    paths: [...new Set(paths)].sort(),
    toolSlugs: [...toolSlugs].sort(),
    guideSlugs: [...cleanedGuides].sort(),
  };
}

/**
 * Paths that must never appear in the sitemap.
 */
export const SITEMAP_EXCLUDED_PATH_PATTERNS = [
  /\/embed\/?$/,
  /^\/404\/?$/,
  /^\/cookies\/?$/,
  /^\/privacy\/?$/,
  /^\/terms\/?$/,
];

export function isExcludedFromSitemap(pathname) {
  return SITEMAP_EXCLUDED_PATH_PATTERNS.some((re) => re.test(pathname));
}
