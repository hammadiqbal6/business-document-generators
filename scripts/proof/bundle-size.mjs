#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dist = process.argv[2] || 'dist';
const MAX_JS_KB = 50;
const lazy = /(jspdf|docx|html2canvas|purify|FileSaver|exportPdf|exportDocx)/i;

function gzipKb(filePath) {
  return zlib.gzipSync(fs.readFileSync(filePath)).length / 1024;
}

function scriptsFromHtml(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const srcs = new Set();
  for (const m of html.matchAll(/(?:src|href)=["'](\/_astro\/[^"']+\.(?:js|css))["']/g)) {
    srcs.add(m[1]);
  }
  return [...srcs];
}

const pages = [
  'index.html',
  path.join('hubs', 'estimates-invoices', 'index.html'),
  path.join('tools', 'construction-estimate-template', 'index.html'),
  path.join('tools', 'photography-contract-template', 'index.html'),
  path.join('tools', 'simple-nda', 'index.html'),
];

const lines = [`# Bundle sizes (gzip) — budget: initial JS ≤ ${MAX_JS_KB} KB per page\n`];
let failed = false;

for (const rel of pages) {
  const htmlPath = path.join(dist, rel);
  const assets = scriptsFromHtml(htmlPath);
  let js = 0;
  let css = 0;
  const detail = [];
  for (const src of assets) {
    const fp = path.join(dist, src.slice(1));
    if (!fs.existsSync(fp)) continue;
    const kb = gzipKb(fp);
    if (src.endsWith('.css')) css += kb;
    else if (src.endsWith('.js')) {
      if (!lazy.test(src)) js += kb;
      detail.push(`${src} ${kb.toFixed(1)}KB gzip${lazy.test(src) ? ' (lazy)' : ''}`);
    }
  }
  const ok = js <= MAX_JS_KB;
  if (!ok) failed = true;
  lines.push(`## ${rel}`);
  lines.push(`- Initial JS: ${js.toFixed(1)} KB gzip — ${ok ? 'PASS' : 'FAIL'}`);
  lines.push(`- CSS: ${css.toFixed(1)} KB gzip`);
  lines.push(`- Assets:\n${detail.map((d) => `  - ${d}`).join('\n') || '  - (none in HTML)'}\n`);
}

if (failed) {
  lines.push('\n**One or more pages exceed the JS budget.**\n');
  process.exitCode = 1;
}
console.log(lines.join('\n'));
