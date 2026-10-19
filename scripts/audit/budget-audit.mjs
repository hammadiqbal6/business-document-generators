#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const dist = path.resolve('dist');
const MAX_GZIP_KB = 50;
const samplePages = [
  'index.html',
  path.join('tools', 'construction-estimate-template', 'index.html'),
];

function gzipKb(filePath) {
  const buf = fs.readFileSync(filePath);
  return zlib.gzipSync(buf).length / 1024;
}

function scriptsForPage(relHtml) {
  const html = fs.readFileSync(path.join(dist, relHtml), 'utf8');
  const srcs = new Set();
  for (const m of html.matchAll(/(?:src|href)=["'](\/_astro\/[^"']+\.js)["']/g)) {
    srcs.add(m[1]);
  }
  return [...srcs];
}

const lazyOnly = /(jspdf|docx|html2canvas|purify|FileSaver|exportPdf|exportDocx)/i;
const errors = [];

for (const page of samplePages) {
  const scripts = scriptsForPage(page).filter((s) => !lazyOnly.test(s));
  let total = 0;
  for (const src of scripts) {
    const fp = path.join(dist, src.slice(1));
    if (fs.existsSync(fp)) total += gzipKb(fp);
  }
  if (total > MAX_GZIP_KB) {
    errors.push(`${page}: initial JS ~${total.toFixed(1)}KB gzip exceeds ${MAX_GZIP_KB}KB`);
  } else {
    console.log(`${page}: initial JS ~${total.toFixed(1)}KB gzip`);
  }
}

if (errors.length) {
  console.error('Budget audit errors:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log('Budget audit OK');
