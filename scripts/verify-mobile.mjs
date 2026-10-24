#!/usr/bin/env node
/**
 * Headless checks at 360 / 390 / 768: no horizontal overflow, editor usable, inputs ≥16px.
 * Usage: node scripts/verify-mobile.mjs [baseUrl]
 */
import { chromium, devices } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:4321';
const outDir = path.resolve('docs/proof/mobile-seo');
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: '360', ...devices['Galaxy S5'], viewport: { width: 360, height: 740 } },
  { name: '390', viewport: { width: 390, height: 844, isMobile: true, hasTouch: true } },
  { name: '768', viewport: { width: 768, height: 1024, isMobile: true, hasTouch: true } },
];

const pages = ['/', '/tools/construction-estimate-template/'];

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const errors = [];

for (const vp of viewports) {
  for (const pagePath of pages) {
    const context = await browser.newContext({
      viewport: vp.viewport,
      isMobile: vp.isMobile ?? true,
      hasTouch: vp.hasTouch ?? true,
      userAgent: vp.userAgent,
    });
    const page = await context.newPage();
    const url = base.replace(/\/$/, '') + pagePath;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return {
        scrollWidth: doc.scrollWidth,
        innerWidth: window.innerWidth,
        offenders: [...document.querySelectorAll('body *')]
          .filter((el) => el.scrollWidth > window.innerWidth + 1)
          .slice(0, 8)
          .map((el) => ({
            tag: el.tagName,
            cls: (el.className || '').toString().slice(0, 80),
            w: el.scrollWidth,
          })),
      };
    });
    if (overflow.scrollWidth > overflow.innerWidth + 1) {
      errors.push(`${vp.name}${pagePath}: page overflow ${overflow.scrollWidth}>${overflow.innerWidth} ${JSON.stringify(overflow.offenders)}`);
    }

    const bannerH = await page.evaluate(() => {
      const el = document.getElementById('cookie-banner');
      if (!el || el.hidden) return 0;
      return el.getBoundingClientRect().height;
    });
    if (bannerH > 56.5) {
      errors.push(`${vp.name}${pagePath}: cookie banner height ${bannerH}px > 56px`);
    }

    const shot = path.join(outDir, `fold-${pagePath.replace(/\//g, '_') || 'home'}-${vp.name}.png`);
    await page.screenshot({ path: shot, fullPage: false });

    if (pagePath.includes('/tools/')) {
      // Answer-first: static shell inputs must be usable without a click gate.
      await page.waitForSelector(
        '.generator--shell [data-shell-field], .generator input, .generator textarea, .generator select',
        { timeout: 15000 },
      );

      const answerFirst = await page.evaluate(() => {
        const h1 = document.querySelector('main h1, h1');
        const input = document.querySelector(
          '.generator--shell [data-shell-field], .generator input, .generator textarea, .generator select',
        );
        if (!h1 || !input) return { ok: false, reason: 'missing h1 or input' };
        const range = document.createRange();
        range.setStartAfter(h1);
        range.setEndBefore(input);
        const words = (range.toString() || '').trim().split(/\s+/).filter(Boolean).length;
        const inputTop = input.getBoundingClientRect().top + window.scrollY;
        return { ok: true, words, inputTop };
      });
      if (!answerFirst.ok) {
        errors.push(`${vp.name}${pagePath}: ${answerFirst.reason}`);
      } else {
        if (answerFirst.words > 60) {
          errors.push(`${vp.name}${pagePath}: ${answerFirst.words} words before first input (max 60)`);
        }
        if (answerFirst.inputTop > 780) {
          errors.push(`${vp.name}${pagePath}: first input at ${Math.round(answerFirst.inputTop)}px (want ≤780)`);
        }
      }

      const fontOk = await page.evaluate(() => {
        const input = document.querySelector(
          '.generator--shell [data-shell-field], .generator input, .generator textarea, .generator select',
        );
        if (!input) return false;
        return parseFloat(getComputedStyle(input).fontSize) >= 16;
      });
      if (!fontOk) errors.push(`${vp.name}${pagePath}: input font < 16px`);

      // Upgrade to full editor and confirm it mounts.
      const loadBtn = page.locator('[data-generator-load]');
      if (await loadBtn.count()) {
        await loadBtn.click();
      }
      await page.waitForSelector('.generator:not(.generator--shell)', { timeout: 25000 });
      const loadingStuck = await page.locator('text=Loading editor').count();
      if (loadingStuck) errors.push(`${vp.name}${pagePath}: stuck on Loading editor`);

      const previewTab = page.locator('.generator__tabs button', { hasText: 'Preview' });
      if (await previewTab.count()) {
        await previewTab.click();
        await page.waitForSelector('.generator__preview', { state: 'visible' });
      }

      const editorShot = path.join(outDir, `editor-${vp.name}.png`);
      await page.screenshot({ path: editorShot, fullPage: false });
    }

    await context.close();
    console.log('OK', vp.name, pagePath);
  }
}

await browser.close();
if (errors.length) {
  console.error('Mobile verify failed:\n' + errors.map((e) => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log('Mobile verify OK →', outDir);
