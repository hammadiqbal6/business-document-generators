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
