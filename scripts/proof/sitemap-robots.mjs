#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2] || 'dist';

function countHtml(dir) {
  let n = 0;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) n += countHtml(p);
    else if (ent.name.endsWith('.html') && !p.includes('/embed/')) n++;
  }
  return n;
}

const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
const sitemapPath = fs.existsSync(path.join(dist, 'sitemap-index.xml'))
  ? path.join(dist, 'sitemap-index.xml')
  : path.join(dist, 'sitemap-0.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlCount = (sitemap.match(/<loc>/g) || []).length;
const htmlCount = countHtml(dist);

const bots = ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot', 'Claude-SearchBot'];
const botChecks = bots.map((b) => `${b}: ${robots.includes(b) ? 'mentioned/allowed' : 'NOT FOUND'}`);

const llms = fs.existsSync(path.join(dist, 'llms.txt')) ? 'present' : 'MISSING';

const lines = [
  `# Sitemap & robots proof — ${new Date().toISOString()}`,
  '',
  `Built HTML pages (excl. embed): ${htmlCount}`,
  `Sitemap <loc> count: ${urlCount}`,
  `Match: ${urlCount >= htmlCount - 2 ? 'OK (sitemap may exclude 404/embed)' : 'REVIEW'}`,
  '',
  '## robots.txt',
  '```',
  robots.trim(),
  '```',
  '',
  '## Bot allow checks',
  ...botChecks.map((l) => `- ${l}`),
  '',
  `## llms.txt: ${llms}`,
  '',
  '## Sitemap sample (first 2k chars)',
  '```xml',
  sitemap.slice(0, 2000),
  '```',
];

console.log(lines.join('\n'));
