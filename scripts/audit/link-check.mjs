#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
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
const hrefs = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1].replace(/\/$/, '') || '/';
    if (href.startsWith('/_astro')) continue;
    if (href.startsWith('/docs')) continue;
    hrefs.add(href);
  }
}

/** Paths declared in public/_redirects (source → destination). */
function redirectSources() {
  const file = path.join(dist, '_redirects');
  if (!fs.existsSync(file)) return new Set();
  const set = new Set();
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const src = trimmed.split(/\s+/)[0];
    if (src) set.add(src.replace(/\/$/, '') || '/');
  }
  return set;
}
const redirects = redirectSources();

function resolveInternal(href) {
  const normalized = href.replace(/\/$/, '') || '/';
  if (redirects.has(normalized)) return true;
  // Static asset (png/svg/ico/txt/xml/webmanifest/etc.)
  const asFile = path.join(dist, href.replace(/^\//, ''));
  if (fs.existsSync(asFile) && fs.statSync(asFile).isFile()) return true;
  const clean = href === '/' ? '/index.html' : `${href}/index.html`;
  const alt = `${href}.html`;
  const p1 = path.join(dist, clean.slice(1));
  const p2 = path.join(dist, alt.slice(1));
  return fs.existsSync(p1) || fs.existsSync(p2);
}

for (const href of hrefs) {
  if (!resolveInternal(href)) {
    errors.push(`Broken internal link: ${href}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Link check OK (${hrefs.size} internal paths)`);
