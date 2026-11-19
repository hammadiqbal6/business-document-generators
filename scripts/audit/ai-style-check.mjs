#!/usr/bin/env node
/**
 * Heuristic AI-style check for guide articles.
 * Flags banned phrases, em-dash density, and low sentence-length variance.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

const BANNED = [
  /\bdelve\b/i,
  /\bin today's\b/i,
  /\bin today’s\b/i,
  /\bit'?s important to note\b/i,
  /\bnavigate the\b/i,
  /\bdigital landscape\b/i,
  /\brobust\b/i,
  /\bseamless\b/i,
  /\bleverage\b/i,
  /\bunlock the\b/i,
  /\belevate\b/i,
  /\bcomprehensive guide\b/i,
  /\bin conclusion\b/i,
  /\bwhether you'?re a\b/i,
  /\bgame-?changer\b/i,
  /\bdive into\b/i,
  /\bfurthermore\b/i,
  /\bmoreover\b/i,
];

function loadGuides() {
  const src = fs.readFileSync(path.join(root, 'src/data/guides.ts'), 'utf8');
  const start = src.search(/export const guides(?:: Guide\[\])?\s*=\s*/);
  if (start < 0) throw new Error('guides export not found');
  const afterEq = src.indexOf('=', start);
  const bracket = src.indexOf('[', afterEq);
  const endMark = src.indexOf('\n]\n\nexport function getGuide', bracket);
  if (bracket < 0 || endMark < 0) throw new Error('guides array bounds not found');
  const json = src.slice(bracket, endMark + 2);
  return JSON.parse(json);
}

function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function variance(nums) {
  if (nums.length < 2) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  return nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
}

function guideBody(g) {
  return [
    g.answerFirst,
    g.legalNote || '',
    ...(g.howTo || []),
    ...g.sections.flatMap((s) => [s.heading, s.body]),
    ...g.faq.map((f) => `${f.question} ${f.answer}`),
  ].join('\n');
}

function checkArticle(text) {
  const issues = [];
  for (const re of BANNED) {
    if (re.test(text)) issues.push(`banned phrase matching ${re}`);
  }
  const em = (text.match(/—/g) || []).length;
  const words = text.split(/\s+/).filter(Boolean).length || 1;
  const emPer1k = (em / words) * 1000;
  if (emPer1k > 4) issues.push(`em-dash density ${emPer1k.toFixed(1)}/1k words (max 4)`);
  const lens = sentences(text).map((s) => s.split(/\s+/).length);
  const v = variance(lens);
  if (lens.length >= 8 && v < 20) {
    issues.push(`low sentence-length variance ${v.toFixed(1)} (min 20)`);
  }
  return { issues, words, variance: v, emPer1k };
}

/** Slugs that must pass for CI green while the legacy rewrite PR is in flight. */
const ENFORCED = new Set([
  'invoice-payment-terms',
  'what-is-a-change-order',
  'work-order-vs-purchase-order-vs-invoice',
  'freelance-contract-what-to-include',
  'how-to-create-a-contractor-estimate',
]);
const enforceAll = process.argv.includes('--strict-all');

const guides = loadGuides();
let failed = false;
const rows = [];
for (const g of guides) {
  const { issues, words, variance: v, emPer1k } = checkArticle(guideBody(g));
  const mustPass = enforceAll || ENFORCED.has(g.slug);
  rows.push({
    slug: g.slug,
    ok: issues.length === 0,
    enforced: mustPass,
    words,
    variance: Number(v.toFixed(1)),
    emPer1k: Number(emPer1k.toFixed(2)),
    issues,
  });
  if (issues.length) {
    if (mustPass) {
      failed = true;
      console.error(`FAIL /guides/${g.slug}/ (${words} words)`);
    } else {
      console.warn(`WARN /guides/${g.slug}/ (${words} words) — legacy; rewrite PR should fix`);
    }
    for (const i of issues) console.error(`  - ${i}`);
  } else {
    console.log(`OK   /guides/${g.slug}/ (${words} words, var=${v.toFixed(1)})`);
  }
}

const reportPath = path.join(root, 'scripts/audit/ai-style-report.json');
fs.writeFileSync(reportPath, JSON.stringify(rows, null, 2));
console.log(`\nWrote ${reportPath}`);

if (failed) {
  console.error('\nai-style-check failed.');
  process.exit(1);
}
console.log('\nai-style-check passed.');
