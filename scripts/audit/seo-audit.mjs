#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
if (!fs.existsSync(dist)) {
  console.error('dist/ missing — run npm run build first');
  process.exit(1);
}

const htmlFiles = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith('.html')) htmlFiles.push(p);
  }
}
walk(dist);

const errors = [];
const toolPages = htmlFiles.filter((f) => f.includes(`${path.sep}tools${path.sep}`) && !f.includes('embed'));

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

for (const file of htmlFiles) {
  const rel = path.relative(dist, file);
  if (rel.includes(`${path.sep}embed${path.sep}`)) {
    const html = fs.readFileSync(file, 'utf8');
    if (!html.includes('noindex')) {
      errors.push(`${rel}: embed page should be noindex`);
    }
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const is404 = rel === '404.html' || rel.endsWith(`${path.sep}404.html`);

  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/gi)];
  if (titles.length !== 1) errors.push(`${rel}: expected 1 title, got ${titles.length}`);
  else if (!titles[0][1].trim()) errors.push(`${rel}: empty title`);
  else if (!is404) {
    const titleLen = decodeEntities(titles[0][1]).length;
    if (titleLen < 25 || titleLen > 65) {
      errors.push(`${rel}: title length ${titleLen} outside 25–65`);
    }
  }

  const desc = html.match(/<meta name="description" content="([^"]*)"/i);
  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (!is404) {
    const descLen = decodeEntities(desc[1]).length;
    if (descLen < 70 || descLen > 160) {
      errors.push(`${rel}: meta description length ${descLen} outside 70–160`);
    }
  }

  if (!is404) {
    const pageTitle = decodeEntities(titles[0]?.[1] ?? '');
    const ogTitle = decodeEntities(html.match(/property="og:title"\s+content="([^"]*)"/i)?.[1] ?? '');
    const twTitle = decodeEntities(html.match(/name="twitter:title"\s+content="([^"]*)"/i)?.[1] ?? '');
    if (pageTitle && ogTitle && ogTitle !== pageTitle) {
      errors.push(`${rel}: og:title !== <title>`);
    }
    if (pageTitle && twTitle && twTitle !== pageTitle) {
      errors.push(`${rel}: twitter:title !== <title>`);
    }
  }

  const h1s = [...html.matchAll(/<h1[^>]*>/gi)];
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 h1, got ${h1s.length}`);

  if (!html.includes('rel="canonical"')) errors.push(`${rel}: missing canonical`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json">/gi)];
  if (ld.length < 1) errors.push(`${rel}: missing JSON-LD`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      errors.push(`${rel}: invalid JSON-LD (${e.message})`);
    }
  }

  if (!html.includes('property="og:title"')) errors.push(`${rel}: missing OG tags`);
  const ogImage = html.match(/property="og:image"\s+content="([^"]*)"/i);
  if (ogImage && /\/$/.test(ogImage[1])) {
    errors.push(`${rel}: og:image ends with trailing slash`);
  }
  if (/example\.com/i.test(html)) errors.push(`${rel}: contains example.com`);
}

for (const file of toolPages) {
  if (file.endsWith(`${path.sep}tools${path.sep}index.html`)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < 400) {
    errors.push(`${path.relative(dist, file)}: thin content (${words} words, need ~600+ rendered)`);
  }
}

const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!robots.includes('Sitemap:')) errors.push('robots.txt missing Sitemap');

const sitemapExists =
  fs.existsSync(path.join(dist, 'sitemap-index.xml')) || fs.existsSync(path.join(dist, 'sitemap-0.xml'));
if (!sitemapExists) errors.push('sitemap not found in dist');

if (errors.length) {
  console.error('SEO audit errors:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log(`SEO audit OK (${htmlFiles.length} HTML files, ${toolPages.length} tool pages)`);
