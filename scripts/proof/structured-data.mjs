#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2] || 'dist';
const outDir = process.argv[3] || 'docs/proof/structured-data';

const samples = [
  { label: 'home', file: 'index.html' },
  { label: 'tool-construction', file: path.join('tools', 'construction-estimate-template', 'index.html') },
  { label: 'hub-estimates', file: path.join('hubs', 'estimates-invoices', 'index.html') },
  { label: 'guide-construction', file: path.join('guides', 'construction-estimate-that-wins-jobs', 'index.html') },
];

const log = [];
let errors = 0;

for (const { label, file } of samples) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1],
  );
  const parsed = [];
  for (const raw of blocks) {
    try {
      parsed.push(JSON.parse(raw));
    } catch (e) {
      log.push(`FAIL ${label}: invalid JSON-LD: ${e.message}`);
      errors++;
    }
  }
  fs.writeFileSync(path.join(outDir, `${label}.json`), JSON.stringify(parsed, null, 2));
  for (const obj of parsed) {
    const type = obj['@type'];
    if (!obj['@context']) {
      log.push(`FAIL ${label}: missing @context on ${type}`);
      errors++;
    }
    if (type === 'WebApplication' && !obj.offers) {
      log.push(`FAIL ${label}: WebApplication missing offers`);
      errors++;
    }
    if (type === 'BreadcrumbList' && !obj.itemListElement?.length) {
      log.push(`FAIL ${label}: empty BreadcrumbList`);
      errors++;
    }
  }
  log.push(`OK ${label}: ${parsed.length} JSON-LD block(s) — types: ${parsed.map((p) => p['@type']).join(', ')}`);
}

fs.writeFileSync(
  path.join(outDir, 'README-snippet.txt'),
  `After deploy, test live URLs in Google Rich Results Test:\nhttps://search.google.com/test/rich-results\n\nExample URLs (replace domain):\n- https://YOUR_DOMAIN/\n- https://YOUR_DOMAIN/tools/construction-estimate-template/\n`,
);

console.log(log.join('\n'));
console.log(`\nValidation: ${errors === 0 ? 'PASS' : `FAIL (${errors} issues)`}`);
if (errors) process.exit(1);
