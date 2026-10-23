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
  const titles = [...html.matchAll(/<title>([^<]*)<\/title>/gi)];
  if (titles.length !== 1) errors.push(`${rel}: expected 1 title, got ${titles.length}`);
  else if (titles[0][1].length > 60) errors.push(`${rel}: title too long (${titles[0][1].length}; max 60)`);
  else if (!titles[0][1].trim()) errors.push(`${rel}: empty title`);

  const desc = html.match(/<meta name="description" content="([^"]*)"/i);
  if (!desc) errors.push(`${rel}: missing meta description`);
  else if (desc[1].length < 50 || desc[1].length > 165) {
    errors.push(`${rel}: meta description length ${desc[1].length} outside 50–165`);
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
