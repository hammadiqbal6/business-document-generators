#!/usr/bin/env node
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const outDir = '/opt/cursor/artifacts/screenshots';
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  ['home', '/index.html'],
  ['hub-estimates', '/hubs/estimates-invoices/index.html'],
  ['tool-construction', '/tools/construction-estimate-template/index.html'],
  ['tool-photography', '/tools/photography-contract-template/index.html'],
  ['tool-podcast', '/tools/podcast-script-template/index.html'],
];

async function main() {
const server = spawn('npx', ['serve', 'dist', '-l', '4321'], { stdio: 'ignore' });
for (let i = 0; i < 30; i++) {
  try {
    const res = await fetch('http://127.0.0.1:4321/');
    if (res.ok) break;
  } catch {
    /* wait */
  }
  await new Promise((r) => setTimeout(r, 500));
}

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 360, height: 800 } });
const page = await context.newPage();

for (const [name, route] of pages) {
  await page.goto(`http://127.0.0.1:4321${route}`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, `${name}-360.png`), fullPage: true });
  console.log('Saved', name);
}

await browser.close();
server.kill();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
