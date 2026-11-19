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
#!/usr/bin/env node
/**
 * Heuristic AI-style check for Docuklin guides (src/data/guides.ts).
 * Flags banned filler, em-dash density, and low sentence-length variance.
 * Exit 1 when any guide fails hard thresholds.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const BANNED = [
  { id: 'delve', re: /\bdelve\b/i },
  { id: 'dive-into', re: /\bdive into\b/i },
  { id: 'in-todays', re: /\bin today'?s\b/i },
  { id: 'digital-landscape', re: /\bdigital landscape\b/i },
  { id: 'navigate-complex', re: /\bnavigate the\b/i },
  { id: 'landscape-metaphor', re: /\b(?:competitive|business|content)\s+landscape\b/i },
  { id: 'robust', re: /\brobust\b/i },
  { id: 'seamless', re: /\bseamless\b/i },
  { id: 'leverage', re: /\bleverage\b/i },
  { id: 'unlock', re: /\bunlock(?:s|ing|ed)?\b/i },
  { id: 'elevate', re: /\belevate\b/i },
  { id: 'comprehensive-guide', re: /\bcomprehensive guide\b/i },
  { id: 'in-conclusion', re: /\bin conclusion\b/i },
  { id: 'whether-youre', re: /\bwhether you(?:'|’)re a .+ or a\b/i },
  { id: 'game-changer', re: /\bgame[-\s]?changer\b/i },
  { id: 'important-to-note', re: /\bit(?:'|’)s important to note\b/i },
  { id: 'furthermore', re: /\bfurthermore\b/i },
  { id: 'moreover', re: /\bmoreover\b/i },
];

const MAX_EM_DASH_PER_1K = 4;
const MIN_SENTENCE_STD = 6.5;
const MIN_CONTRACTION_PER_1K = 4;
const MIN_ANSWER_WORDS = 35;
const MAX_ANSWER_WORDS = 65;

function loadGuides() {
  // Prefer compiled import via strip-types when available; fall back to JSON extract.
  try {
    const require = createRequire(import.meta.url);
    // Dynamic import path for Node with --experimental-strip-types is awkward in spawn;
    // parse the exported array from source instead (stable for this repo).
    const src = fs.readFileSync(path.join(root, 'src/data/guides.ts'), 'utf8');
    const start = src.indexOf('export const guides');
    if (start < 0) throw new Error('export const guides not found');
    // Skip past TypeScript type annotation like `Guide[]` before the value array.
    const eq = src.indexOf('=', start);
    const bracket = src.indexOf('[', eq);
    let depth = 0;
    let end = -1;
    for (let i = bracket; i < src.length; i++) {
      const ch = src[i];
      if (ch === '[') depth++;
      else if (ch === ']') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
    if (end < 0) throw new Error('Could not find guides array end');
    const jsonish = src.slice(bracket, end);
    // guides.ts already uses JSON-compatible double quotes in practice
    return JSON.parse(jsonish);
  } catch (err) {
    console.error('Failed to load guides:', err.message);
    process.exit(2);
  }
}

function guideText(g) {
  const parts = [
    g.answerFirst || '',
    ...(g.sections || []).map((s) => `${s.heading || ''}\n${s.body || ''}`),
    ...(g.faq || []).map((f) => `${f.question || ''}\n${f.answer || ''}`),
    ...(g.howTo || []),
  ];
  return parts.join('\n');
}

function sentences(text) {
  return text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 3);
}

function stddev(nums) {
  if (nums.length < 2) return 0;
  const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
  const v = nums.reduce((a, b) => a + (b - mean) ** 2, 0) / nums.length;
  return Math.sqrt(v);
}

function scoreGuide(g) {
  const text = guideText(g);
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const emCount = (text.match(/—/g) || []).length;
  const emPer1k = wordCount ? (emCount / wordCount) * 1000 : 0;
  const lens = sentences(text).map((s) => s.split(/\s+/).length);
  const sentenceStd = stddev(lens);
  const answerWords = (g.answerFirst || '').trim().split(/\s+/).filter(Boolean).length;
  const bannedHits = BANNED.filter((b) => b.re.test(text)).map((b) => b.id);

  const contractions = (text.match(/\b(?:you'll|you're|we're|we've|don't|doesn't|isn't|aren't|can't|won't|it's|that's|there's|I'm|I've|I'd)\b/gi) || []).length;
  const contractionPer1k = wordCount ? (contractions / wordCount) * 1000 : 0;

  const failures = [];
  if (bannedHits.length) failures.push(`banned:${bannedHits.join(',')}`);
  if (emPer1k > MAX_EM_DASH_PER_1K) failures.push(`em-dash:${emPer1k.toFixed(1)}/1k`);
  if (sentenceStd < MIN_SENTENCE_STD) failures.push(`low-variance:std=${sentenceStd.toFixed(1)}`);
  if (contractionPer1k < MIN_CONTRACTION_PER_1K) {
    failures.push(`low-contractions:${contractionPer1k.toFixed(1)}/1k`);
  }
  if (answerWords < MIN_ANSWER_WORDS || answerWords > MAX_ANSWER_WORDS) {
    failures.push(`answerFirst-words:${answerWords}`);
  }

  return {
    slug: g.slug,
    wordCount,
    answerWords,
    emCount,
    emPer1k: Number(emPer1k.toFixed(2)),
    sentenceStd: Number(sentenceStd.toFixed(2)),
    contractionPer1k: Number(contractionPer1k.toFixed(2)),
    bannedHits,
    failures,
    pass: failures.length === 0,
  };
}

const guides = loadGuides();
const rows = guides.map(scoreGuide);
const failed = rows.filter((r) => !r.pass);

console.log('AI style check (guides)');
console.log(
  [
    'slug'.padEnd(42),
    'words'.padStart(6),
    'ans'.padStart(4),
    'em/1k'.padStart(6),
    'std'.padStart(6),
    'contr'.padStart(6),
    'result',
  ].join(' '),
);
for (const r of rows) {
  const mark = r.pass ? 'PASS' : `FAIL ${r.failures.join('; ')}`;
  console.log(
    [
      r.slug.padEnd(42),
      String(r.wordCount).padStart(6),
      String(r.answerWords).padStart(4),
      r.emPer1k.toFixed(1).padStart(6),
      r.sentenceStd.toFixed(1).padStart(6),
      r.contractionPer1k.toFixed(1).padStart(6),
      mark,
    ].join(' '),
  );
}

console.log(`\n${rows.filter((r) => r.pass).length}/${rows.length} guides passed heuristic AI-style check.`);

if (process.argv.includes('--json')) {
  fs.writeFileSync(path.join(root, 'tmp-ai-style-scores.json'), JSON.stringify(rows, null, 2));
}

if (failed.length) {
  console.error(`\nAI style check failed for ${failed.length} guide(s).`);
  process.exit(1);
}

console.log('\nAI style check passed.');
