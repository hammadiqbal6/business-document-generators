#!/usr/bin/env node
/**
 * Indexing audit over dist/:
 * - Every sitemap URL must be self-canonical, indexable, and absolute on PUBLIC_SITE_URL / siteDefaults origin with trailing slash
 * - noindex pages must not appear in the sitemap (embeds + 404 are intentional)
 * - Redirect sources must not appear in the sitemap
 * Prints URL buckets for the PR/report.
 */
import fs from 'node:fs';
import path from 'node:path';
import { DEFAULT_SITE_URL } from '../../src/config/siteDefaults.mjs';

const dist = path.resolve('dist');
const origin = (process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
const errors = [];

function fail(msg) {
  errors.push(msg);
}

function walkHtml(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walkHtml(p, acc);
    else if (ent.name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

function fileToPath(file) {
  let rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel.replace(/\.html$/, '')}`;
}

function readAttr(html, relName) {
  const re1 = new RegExp(
    `<link[^>]+rel=["']${relName}["'][^>]+href=["']([^"']+)["']`,
    'i',
  );
  const re2 = new RegExp(
    `<link[^>]+href=["']([^"']+)["'][^>]+rel=["']${relName}["']`,
    'i',
  );
  return html.match(re1)?.[1] || html.match(re2)?.[1] || '';
}

function readMeta(html, name) {
  const re1 = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`,
    'i',
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${name}["']`,
    'i',
  );
  return html.match(re1)?.[1] || html.match(re2)?.[1] || '';
}

function readOgUrl(html) {
  return (
    html.match(/property=["']og:url["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
    html.match(/content=["']([^"']+)["'][^>]+property=["']og:url["']/i)?.[1] ||
    ''
  );
}

function loadSitemapLocs() {
  const locs = [];
  const indexPath = path.join(dist, 'sitemap-index.xml');
  const zeroPath = path.join(dist, 'sitemap-0.xml');
  if (fs.existsSync(indexPath)) {
    const indexXml = fs.readFileSync(indexPath, 'utf8');
    const children = [...indexXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
    for (const childUrl of children) {
      let childFile;
      try {
        childFile = path.join(dist, new URL(childUrl).pathname.replace(/^\//, ''));
      } catch {
        fail(`sitemap-index child is not a URL: ${childUrl}`);
        continue;
      }
      if (!fs.existsSync(childFile)) {
        fail(`sitemap child missing on disk: ${childFile}`);
        continue;
      }
      const xml = fs.readFileSync(childFile, 'utf8');
      for (const m of xml.matchAll(/<url>\s*<loc>\s*([^<\s]+)\s*<\/loc>([\s\S]*?)<\/url>/gi)) {
        const loc = m[1];
        const block = m[2] || '';
        const lastmod = block.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i)?.[1] || '';
        locs.push({ loc, lastmod, from: path.basename(childFile) });
      }
    }
  } else if (fs.existsSync(zeroPath)) {
    const xml = fs.readFileSync(zeroPath, 'utf8');
    for (const m of xml.matchAll(/<url>\s*<loc>\s*([^<\s]+)\s*<\/loc>([\s\S]*?)<\/url>/gi)) {
      locs.push({
        loc: m[1],
        lastmod: (m[2] || '').match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/i)?.[1] || '',
        from: 'sitemap-0.xml',
      });
    }
  } else {
    fail('no sitemap-index.xml or sitemap-0.xml in dist/');
  }
  return locs;
}

function redirectSources() {
  const file = path.join(dist, '_redirects');
  if (!fs.existsSync(file)) return new Set();
  const set = new Set();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const src = trimmed.split(/\s+/)[0];
    if (!src) continue;
    const withSlash = src.endsWith('/') || !src.includes('.') ? (src.endsWith('/') ? src : `${src}/`) : src;
    set.add(src);
    set.add(withSlash);
    set.add(src.replace(/\/$/, '') || '/');
  }
  return set;
}

function htmlPathForLoc(loc) {
  let pathname;
  try {
    pathname = new URL(loc).pathname;
  } catch {
    return null;
  }
  if (pathname === '/') return path.join(dist, 'index.html');
  return path.join(dist, pathname.replace(/^\//, ''), 'index.html');
}

const redirects = redirectSources();
const sitemapEntries = loadSitemapLocs();
const htmlFiles = walkHtml(dist);

/** @type {{ path: string, reason: string }[]} */
const intentionalNoindex = [];
/** @type {string[]} */
const sitemapOk = [];
/** @type {string[]} */
const sitemapMissingLastmod = [];
/** @type {string[]} */
const indexablePages = [];

for (const file of htmlFiles) {
  const pagePath = fileToPath(file);
  const html = fs.readFileSync(file, 'utf8');
  const robots = readMeta(html, 'robots');
  const canonical = readAttr(html, 'canonical');
  const ogUrl = readOgUrl(html);
  const isEmbed = pagePath.includes('/embed/');
  const is404 = pagePath === '/404/' || path.basename(file) === '404.html';
  const isNoindex = /noindex/i.test(robots);

  if (isEmbed || is404) {
    if (!isNoindex) fail(`${pagePath}: expected noindex (embed/404)`);
    intentionalNoindex.push({
      path: pagePath,
      reason: isEmbed ? 'embed widget (canonical → parent tool)' : '404 utility',
    });
    continue;
  }

  indexablePages.push(pagePath);
  const expected = `${origin}${pagePath === '/' ? '/' : pagePath}`;
  if (!canonical) fail(`${pagePath}: missing canonical`);
  else if (canonical !== expected) {
    fail(`${pagePath}: canonical ${canonical} !== self ${expected}`);
  }
  if (ogUrl && ogUrl !== expected) {
    fail(`${pagePath}: og:url ${ogUrl} !== self ${expected}`);
  }
  if (isNoindex) fail(`${pagePath}: unexpected noindex on indexable page`);
  if (!/^index,\s*follow/i.test(robots)) {
    fail(`${pagePath}: robots should be index,follow (got "${robots}")`);
  }
}

const sitemapLocs = new Set();
for (const { loc, lastmod } of sitemapEntries) {
  sitemapLocs.add(loc);
  let u;
  try {
    u = new URL(loc);
  } catch {
    fail(`sitemap loc not a URL: ${loc}`);
    continue;
  }
  if (u.origin !== origin) fail(`sitemap loc wrong origin: ${loc}`);
  if (!u.pathname.endsWith('/')) fail(`sitemap loc missing trailing slash: ${loc}`);

  const pathname = u.pathname;
  if (redirects.has(pathname) || redirects.has(pathname.replace(/\/$/, '') || '/')) {
    fail(`sitemap loc is a redirect source: ${loc}`);
  }

  const htmlFile = htmlPathForLoc(loc);
  if (!htmlFile || !fs.existsSync(htmlFile)) {
    fail(`sitemap loc has no HTML: ${loc}`);
    continue;
  }
  const html = fs.readFileSync(htmlFile, 'utf8');
  const canonical = readAttr(html, 'canonical');
  const robots = readMeta(html, 'robots');
  const ogUrl = readOgUrl(html);
  if (/noindex/i.test(robots)) fail(`sitemap URL is noindex: ${loc}`);
  if (canonical !== loc) fail(`sitemap URL not self-canonical: ${loc} (canonical=${canonical})`);
  if (ogUrl && ogUrl !== loc) fail(`sitemap URL og:url mismatch: ${loc} (og:url=${ogUrl})`);
  if (!lastmod) sitemapMissingLastmod.push(loc);
  else sitemapOk.push(loc);
}

for (const pagePath of indexablePages) {
  const url = `${origin}${pagePath === '/' ? '/' : pagePath}`;
  if (!sitemapLocs.has(url)) fail(`indexable page missing from sitemap: ${url}`);
}

// Tool pages must all be in the sitemap with lastmod
const toolDirs = fs.existsSync(path.join(dist, 'tools'))
  ? fs
      .readdirSync(path.join(dist, 'tools'), { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== 'index.html')
      .map((d) => d.name)
  : [];
for (const slug of toolDirs) {
  if (slug === 'embed') continue;
  const toolUrl = `${origin}/tools/${slug}/`;
  const embedHtml = path.join(dist, 'tools', slug, 'embed', 'index.html');
  // skip if this is somehow not a tool folder
  if (!fs.existsSync(path.join(dist, 'tools', slug, 'index.html'))) continue;
  if (!sitemapLocs.has(toolUrl)) fail(`tool missing from sitemap: ${toolUrl}`);
  const entry = sitemapEntries.find((e) => e.loc === toolUrl);
  if (entry && !entry.lastmod) fail(`tool sitemap entry missing lastmod: ${toolUrl}`);
  void embedHtml;
}

console.log('=== Indexing buckets ===');
console.log(`Origin: ${origin}`);
console.log(`Sitemap URLs (self-canonical, indexable): ${sitemapOk.length + sitemapMissingLastmod.length}`);
if (sitemapMissingLastmod.length) {
  console.log(`  without lastmod (${sitemapMissingLastmod.length}):`);
  for (const u of sitemapMissingLastmod) console.log(`    ${u}`);
}
console.log(`Intentional noindex (${intentionalNoindex.length}):`);
for (const p of intentionalNoindex) console.log(`  ${p.path} — ${p.reason}`);
console.log(`Redirect sources (must not be linked/sitemapped):`);
for (const r of [...redirects].filter((x) => x.endsWith('/') || !x.includes('.')).sort()) {
  console.log(`  ${r}`);
}

if (errors.length) {
  console.error('\nIndexing audit errors:');
  for (const e of errors) console.error(` - ${e}`);
  process.exit(1);
}
console.log('\nIndexing audit OK');
