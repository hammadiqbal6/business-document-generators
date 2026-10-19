#!/usr/bin/env node
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:3456';
const proofDir = process.argv[3] || 'docs/proof';
const mobileDir = path.join(proofDir, 'mobile');

const pages = [
  ['home', '/index.html'],
  ['hub-estimates', '/hubs/estimates-invoices/index.html'],
  ['tool-construction', '/tools/construction-estimate-template/index.html'],
  ['tool-photography', '/tools/photography-contract-template/index.html'],
  ['tool-nda', '/tools/simple-nda/index.html'],
];

const viewports = [
  { label: '360', width: 360, height: 800 },
  { label: '768', width: 768, height: 1024 },
];

const log = [];
const browser = await chromium.launch();
const results = [];

for (const vp of viewports) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();
  for (const [name, route] of pages) {
    await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const horizontalScroll = scrollWidth > clientWidth + 2;
    const buttons = await page.$$('button, a, input[type="submit"]');
    let smallTargets = 0;
    for (const el of buttons.slice(0, 30)) {
      const box = await el.boundingBox();
      if (box && (box.width < 44 || box.height < 44)) smallTargets++;
    }
    const file = path.join(mobileDir, `${name}-${vp.label}.png`);
    await page.screenshot({ path: file, fullPage: true });
    results.push({
      page: name,
      vp: vp.label,
      horizontalScroll,
      smallTargets,
    });
  }
  await context.close();
}
await browser.close();

for (const r of results) {
  log.push(
    `${r.page} @ ${r.vp}px: horizontalScroll=${r.horizontalScroll ? 'FAIL' : 'PASS'}, smallTapTargets(sample)=${r.smallTargets}`,
  );
}
const anyFail = results.some((r) => r.horizontalScroll);
log.push(`\nOverall viewport: ${anyFail ? 'FAIL' : 'PASS'}`);
console.log(log.join('\n'));
if (anyFail) process.exit(1);
