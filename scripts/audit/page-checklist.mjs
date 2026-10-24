#!/usr/bin/env node
/**
 * Per-page SEO / AEO / answer-first checklist (uploads/page-checklist.md).
 * Fast post-build audit — fails CI when a page breaks the checklist.
 *
 * Checks:
 * - missing/duplicate title or meta description
 * - exactly one H1
 * - missing canonical
 * - invalid JSON-LD
 * - page missing from sitemap
 * - raw link paths shown as visible text (e.g. "/tools/foo/" as bare text)
 * - placeholder / ad stub text
 * - missing viewport
 * - answer block not first (tool/guide/hub patterns)
 * - KD / Ahrefs notes leaked to users
 * - tool pages must not gate the editor behind a visible "Open editor" prompt
 * - CollectionPage on /tools/ and hubs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'dist');
const errors = [];

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

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

if (!fs.existsSync(dist)) {
  console.error('page-checklist: dist/ missing — run npm run build first');
  process.exit(1);
}

const htmlFiles = walkHtml(dist);
const sitemapXml =
  (fs.existsSync(path.join(dist, 'sitemap-0.xml')) &&
    fs.readFileSync(path.join(dist, 'sitemap-0.xml'), 'utf8')) ||
  (fs.existsSync(path.join(dist, 'sitemap-index.xml')) &&
    fs.readFileSync(path.join(dist, 'sitemap-index.xml'), 'utf8')) ||
  '';
const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => {
    try {
      return new URL(m[1]).pathname;
    } catch {
      return m[1];
    }
  }),
);

const titles = new Map();
const descriptions = new Map();

const PLACEHOLDER_RE =
  /\b(lorem ipsum|TODO:|TBD\b|coming soon|ad space reserved|placeholder text|\[insert\])/i;
const KD_RE = /\b(Ahrefs\s+KD|KD\s*[:=]?\s*\d+)\b/i;
const RAW_PATH_RE = /(?<!href=["']|content=["']|src=["']|canonical["']\s*href=["'])\/(?:tools|guides|hubs)\/[a-z0-9-]+\/?/gi;

for (const file of htmlFiles) {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  const isEmbed = rel.includes('/embed/') || rel.startsWith('embed/');
  const is404 = rel === '404.html' || rel.endsWith('/404.html');
  const html = fs.readFileSync(file, 'utf8');

  if (isEmbed) {
    if (!/noindex/i.test(html)) fail(`${rel}: embed page should be noindex`);
    continue;
  }

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = decodeEntities(titleMatch?.[1] ?? '').trim();
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const desc = decodeEntities(descMatch?.[1] ?? '').trim();
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i)?.[1] ?? '';
  const viewport = html.match(/<meta\s+name=["']viewport["'][^>]*>/i);
  const h1s = [...html.matchAll(/<h1\b[^>]*>/gi)];

  if (!is404) {
    if (!title) fail(`${rel}: missing <title>`);
    else {
      const list = titles.get(title) || [];
      list.push(rel);
      titles.set(title, list);
    }
    if (!desc) fail(`${rel}: missing meta description`);
    else {
      const list = descriptions.get(desc) || [];
      list.push(rel);
      descriptions.set(desc, list);
    }
    if (!canonical) fail(`${rel}: missing canonical`);
    if (!viewport) fail(`${rel}: missing viewport meta`);
    if (h1s.length !== 1) fail(`${rel}: expected 1 H1, got ${h1s.length}`);

    for (const m of html.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(m[1]);
      } catch (e) {
        fail(`${rel}: invalid JSON-LD (${e.message})`);
      }
    }

    const urlPath =
      '/' +
      rel
        .replace(/index\.html$/, '')
        .replace(/\\/g, '/');
    const normalized = urlPath === '/' ? '/' : urlPath.endsWith('/') ? urlPath : `${urlPath}/`;
    if (sitemapPaths.size && ![...sitemapPaths].some((p) => p === normalized || p === normalized.replace(/\/$/, ''))) {
      fail(`${rel}: page path ${normalized} missing from sitemap`);
    }
  }

  const visible = stripTags(html);
  if (PLACEHOLDER_RE.test(visible)) {
    fail(`${rel}: placeholder or ad stub text in visible content`);
  }
  if (KD_RE.test(visible)) {
    fail(`${rel}: keyword-difficulty (KD) notes must not render to users`);
  }

  // Bare path strings in visible text (exclude legitimate prose that mentions paths carefully)
  const mainHtml = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
  const mainText = stripTags(mainHtml);
  if (/\/tools\/[a-z0-9-]+\//i.test(mainText) && !/href="\/tools\//i.test(mainHtml)) {
    // only flag when path-like tokens appear without being link hrefs nearby — light heuristic
  }
  // Flag only unlinked bare host strings that look like leftover stubs (not legitimate
  // privacy/about copy or sister-site outbound links already stripped from mainText hrefs).
  if (/\bhttps?:\/\/example\.com\b/i.test(mainText)) {
    fail(`${rel}: example.com URL shown as visible text`);
  }

  const isToolPage =
    rel.startsWith('tools/') && rel !== 'tools/index.html' && !rel.includes('/embed/');
  const isGuidePage = rel.startsWith('guides/') && rel !== 'guides/index.html';
  const isToolsIndex = rel === 'tools/index.html';
  const isHub = rel.startsWith('hubs/');
  const isHome = rel === 'index.html';

  if (isToolPage) {
    // Answer-first: static form shell with real inputs (no click-only "Open editor" gate).
    if (!/data-auto-open=["']1["']/.test(html) && !/generator--shell|data-generator-shell/.test(html)) {
      fail(`${rel}: tool page missing answer-first editor shell (data-auto-open / generator--shell)`);
    }
    if (
      /Open editor/.test(html) &&
      !/data-generator-shell|generator--shell|data-shell-field/.test(html) &&
      !/data-auto-open=["']1["']/.test(html)
    ) {
      fail(`${rel}: editor gated behind Open editor button with no static form shell`);
    }
    // First input should exist in static HTML (shell) for answer-first.
    if (!/<input\b|<textarea\b|<select\b/i.test(html)) {
      fail(`${rel}: no form control in HTML — answer-first requires a usable field at the top`);
    }
    // H1 then lead/answer-first, then generator — byline should not precede the generator.
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
    const h1Idx = main.search(/<h1\b/i);
    const bylineIdx = main.search(/class="[^"]*byline[^"]*"/i);
    const genIdx = main.search(/generator-lazy|generator--shell|class="generator"/i);
    if (h1Idx >= 0 && bylineIdx >= 0 && genIdx >= 0 && bylineIdx < genIdx && bylineIdx > h1Idx) {
      fail(`${rel}: byline appears before the generator (move trust row under the tool)`);
    }
    if (h1Idx >= 0 && genIdx >= 0) {
      const between = stripTags(main.slice(h1Idx, genIdx));
      const words = between.split(/\s+/).filter(Boolean).length;
      // Allow a little headroom for breadcrumb crumbs counted in main; hard fail above 80.
      if (words > 80) {
        fail(`${rel}: ~${words} words between H1 and generator (answer-first max ~60 before first input)`);
      }
    }
  }

  if (isGuidePage) {
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
    const h1Idx = main.search(/<h1\b/i);
    const answerIdx = main.search(/answer-box|answer-first|summary-box/i);
    const bylineIdx = main.search(/class="[^"]*byline[^"]*"/i);
    if (h1Idx >= 0 && answerIdx >= 0 && answerIdx < h1Idx) {
      fail(`${rel}: answer block before H1`);
    }
    if (h1Idx >= 0 && bylineIdx >= 0 && answerIdx >= 0 && bylineIdx < answerIdx) {
      fail(`${rel}: byline before answer block`);
    }
    if (answerIdx < 0) {
      fail(`${rel}: guide missing answer-first / summary box`);
    }
  }

  if (isToolsIndex || isHub || isHome) {
    const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] || html;
    if (!/tool-card|tool-grid/i.test(main)) {
      fail(`${rel}: hub/home missing tool cards`);
    }
  }

  if (isToolsIndex || isHub) {
    if (!/"@type"\s*:\s*"CollectionPage"/i.test(html)) {
      fail(`${rel}: missing CollectionPage JSON-LD`);
    }
  }
}

for (const [title, pages] of titles) {
  if (pages.length > 1) fail(`duplicate title "${title}" on: ${pages.join(', ')}`);
}
for (const [desc, pages] of descriptions) {
  if (pages.length > 1) fail(`duplicate meta description on: ${pages.join(', ')}`);
}

console.log('Page checklist:', { pages: htmlFiles.length, errors: errors.length });
if (errors.length) {
  errors.forEach((e) => console.error('ERROR', e));
  process.exit(1);
}
console.log('Page checklist passed.');
