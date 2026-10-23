#!/usr/bin/env node
/**
 * Hard SEO / AEO guardrails — fail CI if dist or source regresses.
 * See docs/SEO-GUARDRAILS.md and docs/CUSTOM-DOMAIN.md.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'dist');
const errors = [];

const PLACEHOLDER_KEY = '00000000000000000000000000000000';
const FORBIDDEN_HOST = 'example.com';

const { DEFAULT_SITE_URL, DEFAULT_SITE_HOST } = await import(
  pathToFileURL(path.join(root, 'src/config/siteDefaults.mjs')).href
);

function fail(msg) {
  errors.push(msg);
}

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, files);
    else if (ent.name === 'index.html' || ent.name === '404.html') files.push(p);
  }
  return files;
}

function walkFiles(dir, pred, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === 'dist' || ent.name === '.git') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkFiles(p, pred, files);
    else if (pred(ent.name, p)) files.push(p);
  }
  return files;
}

function readIfExists(rel) {
  const p = path.join(dist, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordCount(text) {
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}

/** Decode entities so &amp; / &#38; compare equal and lengths match SERP text. */
function decodeEntities(s) {
  return s
    .replace(/&amp;/gi, '&')
    .replace(/&#38;/g, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

if (!fs.existsSync(dist)) {
  console.error('seo-guardrails: dist/ missing — run npm run build first');
  process.exit(1);
}

const configuredOrigin = (
  process.env.PUBLIC_SITE_URL ||
  DEFAULT_SITE_URL
).replace(/\/$/, '');
let configuredHost;
try {
  configuredHost = new URL(configuredOrigin).host;
} catch {
  fail(`invalid PUBLIC_SITE_URL / DEFAULT_SITE_URL: ${configuredOrigin}`);
  configuredHost = '';
}

// --- This-site workers.dev hostname must not be hardcoded outside allowlist ---
const HOST_RE = new RegExp(
  DEFAULT_SITE_HOST.replace(/\./g, '\\.'),
  'g',
);
const allowHostIn = new Set([
  path.join(root, 'src/config/siteDefaults.mjs'),
  path.join(root, '.env.example'),
  path.join(root, '.github/workflows/ci.yml'),
]);
const sourceFiles = walkFiles(root, (name) =>
  /\.(ts|tsx|astro|mjs|js|cjs|jsonc|md|yml|yaml|example)$/i.test(name),
);
for (const file of sourceFiles) {
  if (allowHostIn.has(file)) continue;
  if (file.startsWith(path.join(root, 'docs'))) continue;
  if (file.startsWith(path.join(root, '.lighthouseci'))) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (HOST_RE.test(text)) {
    fail(
      `hardcoded site host ${DEFAULT_SITE_HOST} in ${path.relative(root, file)} — use PUBLIC_SITE_URL / siteDefaults.mjs only (see docs/CUSTOM-DOMAIN.md)`,
    );
  }
}

// --- example.com must not appear in SEO surfaces ---
for (const rel of ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'llms.txt', '_redirects']) {
  const text = readIfExists(rel);
  if (text == null) {
    if (rel.startsWith('sitemap')) fail(`missing ${rel}`);
    continue;
  }
  if (text.toLowerCase().includes(FORBIDDEN_HOST)) {
    fail(`${rel} contains ${FORBIDDEN_HOST}`);
  }
}

const htmlFiles = walkHtml(dist);
const sitemapXml = readIfExists('sitemap-0.xml') || readIfExists('sitemap-index.xml') || '';
const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => {
    try {
      return new URL(m[1]).pathname;
    } catch {
      return m[1];
    }
  }),
);

const headersFile = readIfExists('_headers') || fs.readFileSync(path.join(root, 'public/_headers'), 'utf8');
if (!/\/_astro\/\*\s*\n\s*Cache-Control:\s*public,\s*max-age=31536000,\s*immutable/i.test(headersFile)) {
  fail('public/_headers missing /_astro/* immutable Cache-Control');
}

// IndexNow
const placeholderPath = path.join(dist, `${PLACEHOLDER_KEY}.txt`);
if (fs.existsSync(placeholderPath)) {
  fail(`placeholder IndexNow key file present: dist/${PLACEHOLDER_KEY}.txt`);
}
if (fs.existsSync(path.join(root, 'public', `${PLACEHOLDER_KEY}.txt`))) {
  fail(`placeholder IndexNow key still in public/: ${PLACEHOLDER_KEY}.txt`);
}
const keyFiles = fs
  .readdirSync(dist)
  .filter((n) => /^[a-f0-9]{32}\.txt$/i.test(n) && n.toLowerCase() !== `${PLACEHOLDER_KEY}.txt`);
if (keyFiles.length === 0) {
  fail('no IndexNow key file in dist/ (expected public/<32-hex>.txt)');
} else {
  for (const name of keyFiles) {
    const body = fs.readFileSync(path.join(dist, name), 'utf8').trim();
    const key = name.replace(/\.txt$/i, '');
    if (body !== key) fail(`IndexNow file ${name} content must equal the key`);
  }
}

const redirects = readIfExists('_redirects') || '';
if (!/\/sitemap\.xml\s+\/sitemap-index\.xml\s+301\b/.test(redirects)) {
  fail('dist/_redirects missing `/sitemap.xml` → `/sitemap-index.xml` 301');
}

// wrangler: worker 308 + previews, no top-level vars
const wranglerPath = path.join(root, 'wrangler.jsonc');
if (fs.existsSync(wranglerPath)) {
  const wrangler = fs.readFileSync(wranglerPath, 'utf8');
  if (!/"html_handling"\s*:\s*"force-trailing-slash"/.test(wrangler)) {
    fail('wrangler.jsonc missing assets.html_handling: "force-trailing-slash"');
  }
  if (!/"previews"\s*:\s*\{/.test(wrangler)) {
    fail('wrangler.jsonc missing "previews": {} (required by npx wrangler preview)');
  }
  if (!/"main"\s*:\s*"src\/worker\.ts"/.test(wrangler)) {
    fail('wrangler.jsonc missing main: src/worker.ts (308 trailing-slash worker)');
  }
  if (!/"run_worker_first"\s*:\s*true/.test(wrangler)) {
    fail('wrangler.jsonc missing assets.run_worker_first: true');
  }
  const stripped = wrangler.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutPreviews = stripped.replace(/"previews"\s*:\s*\{[\s\S]*?\}/, '');
  if (/"vars"\s*:\s*\{/.test(withoutPreviews)) {
    fail('wrangler.jsonc has top-level vars — breaks wrangler preview; use Workers Builds env (see docs/SEO-GUARDRAILS.md)');
  }
}

const workerSrc = fs.readFileSync(path.join(root, 'src/worker.ts'), 'utf8');
if (!/\{1,\s*16\}/.test(workerSrc) && !/\{1,16\}/.test(workerSrc)) {
  fail('src/worker.ts FILE_EXT should allow long extensions ({1,16}) for .webmanifest');
}
if (!/\b308\b/.test(workerSrc)) {
  fail('src/worker.ts must redirect with 308');
}

// Per HTML page checks
for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const isEmbed = rel.includes('/embed/');
  const is404 = rel === '404.html';

  if (html.toLowerCase().includes(FORBIDDEN_HOST)) {
    fail(`${rel}: contains ${FORBIDDEN_HOST}`);
  }

  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
  const desc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? '';
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1] ?? '';
  const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)?.[1] ?? '';
  const h1s = [...html.matchAll(/<h1\b/gi)];

  if (!isEmbed && !is404) {
    const titleText = decodeEntities(title);
    const descText = decodeEntities(desc);

    if (!title) fail(`${rel}: missing title`);
    else if (titleText.length < 25 || titleText.length > 65) {
      fail(`${rel}: title length ${titleText.length} outside 25–65`);
    }

    if (!desc) fail(`${rel}: missing meta description`);
    else if (descText.length < 70 || descText.length > 160) {
      fail(`${rel}: meta description length ${descText.length} outside 70–160`);
    }

    const ogTitle = decodeEntities(
      html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)?.[1] ?? '',
    );
    const twTitle = decodeEntities(
      html.match(/<meta\s+name="twitter:title"\s+content="([^"]*)"/i)?.[1] ?? '',
    );
    if (ogTitle && ogTitle !== titleText) {
      fail(`${rel}: og:title !== <title>`);
    }
    if (twTitle && twTitle !== titleText) {
      fail(`${rel}: twitter:title !== <title>`);
    }
    const ogDesc = decodeEntities(
      html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)?.[1] ?? '',
    );
    const twDesc = decodeEntities(
      html.match(/<meta\s+name="twitter:description"\s+content="([^"]*)"/i)?.[1] ?? '',
    );
    if (ogDesc && descText && ogDesc !== descText) {
      fail(`${rel}: og:description !== meta description`);
    }
    if (twDesc && descText && twDesc !== descText) {
      fail(`${rel}: twitter:description !== meta description`);
    }

    if (!canonical) fail(`${rel}: missing canonical`);
    else {
      try {
        const cu = new URL(canonical);
        if (cu.host !== configuredHost) {
          fail(`${rel}: canonical host ${cu.host} !== configured ${configuredHost}`);
        }
      } catch {
        fail(`${rel}: invalid canonical URL`);
      }
    }

    if (h1s.length !== 1) fail(`${rel}: expected 1 H1, got ${h1s.length}`);

    if (ogImage && /\/$/.test(ogImage)) {
      fail(`${rel}: og:image ends with trailing slash (${ogImage})`);
    }

    // Invalid JSON-LD
    for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(m[1]);
      } catch (e) {
        fail(`${rel}: invalid JSON-LD (${e.message})`);
      }
    }

    // Inline scripts must not use import (breaks non-module inline)
    for (const m of html.matchAll(/<script(?![^>]*type=["']application\/ld\+json)([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const attrs = m[1] || '';
      const body = m[2] || '';
      if (/type=["']module["']/i.test(attrs)) continue;
      if (/^\s*import\s+/m.test(body) || /\bimport\s*\(/m.test(body)) {
        // Dynamic import() in module scripts is fine; bare import in classic scripts is not.
        if (!/type=["']module["']/i.test(attrs) && /^\s*import\s+/m.test(body)) {
          fail(`${rel}: inline classic script uses import — use bundled module or data attributes`);
        }
      }
    }
  }

  // Tool pages must link to a guide
  if (rel.startsWith('tools/') && rel !== 'tools/index.html' && !isEmbed) {
    if (!/href="\/guides\/[^"]+"/i.test(html)) {
      fail(`${rel}: tool page has no internal link to a /guides/ URL`);
    }
  }

  // Guides word count
  if (rel.startsWith('guides/') && rel !== 'guides/index.html') {
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
    const words = wordCount(stripTags(main));
    if (words < 800) fail(`${rel}: guide too thin (${words} words in main; need ≥800)`);
  }

  // Page path should be in sitemap (skip 404, embed)
  if (!is404 && !isEmbed) {
    const urlPath =
      '/' +
      rel
        .replace(/index\.html$/, '')
        .replace(/\\/g, '/');
    const normalized = urlPath === '/' ? '/' : urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
    if (sitemapPaths.size && !sitemapPaths.has(normalized) && !sitemapPaths.has(normalized.replace(/\/$/, '') + '/')) {
      // Astro sitemap uses absolute locs; we extracted pathnames
      if (![...sitemapPaths].some((p) => p === normalized || p === normalized.replace(/\/$/, ''))) {
        fail(`${rel}: page path ${normalized} missing from sitemap`);
      }
    }
  }
}

// Broken internal links (reuse light check)
const hrefs = new Set();
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/_astro')) continue;
    hrefs.add(href.replace(/\/$/, '') || '/');
  }
}
function resolveInternal(href) {
  const asFile = path.join(dist, href.replace(/^\//, ''));
  if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) return true;
  const clean = href === '/' ? '/index.html' : `${href.replace(/\/$/, '')}/index.html`;
  return fs.existsSync(path.join(dist, clean.replace(/^\//, '')));
}
for (const href of hrefs) {
  if (!resolveInternal(href)) fail(`broken internal link: ${href}`);
}

console.log('SEO guardrails:', {
  pages: htmlFiles.length,
  origin: configuredOrigin,
  errors: errors.length,
});
if (errors.length) {
  errors.forEach((e) => console.error('ERROR', e));
  process.exit(1);
}
console.log('SEO guardrails passed.');
