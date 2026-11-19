#!/usr/bin/env node
/**
 * Lightweight AI-tell / voice check for Docuklin copy (not wired into CI).
 *
 * Usage:
 *   node scripts/audit/ai-text-detector.mjs path/to/file.txt
 *   node scripts/audit/ai-text-detector.mjs --tool invoice-late-fee-calculator
 *
 * Always runs a banned-phrase / uniformity heuristic. If
 * OPENAI_DETECTOR_CMD is set, runs that command with the text on stdin
 * (optional commercial/local detector hook). Hugging Face models are
 * optional via scripts/audit/ai-text-detector-hf.py when transformers
 * is installed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

const BANNED = [
  /\bdelve\b/i,
  /in today's (?:fast-paced |digital )?world/i,
  /it'?s important to note/i,
  /\bnavigate\b/i,
  /\blandscape\b/i,
  /\brobust\b/i,
  /\bseamless\b/i,
  /\bleverage\b/i,
  /\bunlock\b/i,
  /\belevate\b/i,
  /comprehensive guide/i,
  /\bin conclusion\b/i,
  /whether you'?re a .+ or a/i,
  /game-?changer/i,
  /dive into/i,
];

function extractToolProse(slug) {
  const require = createRequire(import.meta.url);
  // Dynamic import of built data is awkward; read the TS source blocks instead.
  const estimates = fs.readFileSync(path.join(root, 'src/data/tools/estimates.ts'), 'utf8');
  const start = estimates.indexOf(`slug: '${slug}'`);
  if (start < 0) throw new Error(`Tool slug not found in estimates.ts: ${slug}`);
  const chunk = estimates.slice(start, start + 12000);
  const parts = [];
  for (const m of chunk.matchAll(/(?:answerFirst|body|question|answer|heading):\s*'((?:\\'|[^'])*)'/g)) {
    parts.push(m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n'));
  }
  for (const m of chunk.matchAll(/(?:howToUse|commonMistakes|tips):\s*\[([\s\S]*?)\]/g)) {
    for (const s of m[1].matchAll(/'((?:\\'|[^'])*)'/g)) {
      parts.push(s[1].replace(/\\'/g, "'"));
    }
  }
  return parts.join('\n\n');
}

function scoreText(text) {
  const hits = [];
  for (const re of BANNED) {
    if (re.test(text)) hits.push(re.source);
  }
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 20);
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const avg = lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0;
  const variance =
    lengths.length > 1
      ? lengths.reduce((a, n) => a + (n - avg) ** 2, 0) / lengths.length
      : 0;
  // Heuristic: many AI tells or very uniform sentence length → higher “AI-ish” score.
  let aiProb = Math.min(95, hits.length * 18);
  if (lengths.length >= 6 && variance < 8) aiProb = Math.max(aiProb, 35);
  if (hits.length === 0 && variance >= 12) aiProb = Math.min(aiProb, 18);
  if (hits.length === 0 && variance >= 20) aiProb = Math.min(aiProb, 12);
  return { aiProb, hits, sentenceCount: sentences.length, avgLen: avg, variance };
}

function main() {
  const args = process.argv.slice(2);
  let text = '';
  let label = 'stdin';
  const toolIdx = args.indexOf('--tool');
  if (toolIdx >= 0) {
    const slug = args[toolIdx + 1];
    label = `tool:${slug}`;
    text = extractToolProse(slug);
  } else if (args[0] && args[0] !== '-') {
    label = args[0];
    text = fs.readFileSync(args[0], 'utf8');
  } else {
    text = fs.readFileSync(0, 'utf8');
  }

  const result = scoreText(text);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  console.log(`AI-text detector (lexicon/heuristic)`);
  console.log(`Source: ${label}`);
  console.log(`Words: ${words}`);
  console.log(`AI probability (heuristic): ${result.aiProb}%`);
  console.log(`Banned-phrase hits: ${result.hits.length ? result.hits.join(', ') : 'none'}`);
  console.log(
    `Sentence burstiness: n=${result.sentenceCount} avgLen=${result.avgLen.toFixed(1)} var=${result.variance.toFixed(1)}`,
  );

  const hfPy = path.join(__dirname, 'ai-text-detector-hf.py');
  if (fs.existsSync(hfPy)) {
    const hf = spawnSync('python3', [hfPy], {
      input: text,
      encoding: 'utf8',
      maxBuffer: 10_000_000,
    });
    if (hf.status === 0 && hf.stdout.trim()) {
      console.log('HF detector:', hf.stdout.trim());
    } else if (hf.stderr) {
      console.log('HF detector skipped:', hf.stderr.split('\n')[0]);
    }
  }

  if (process.env.OPENAI_DETECTOR_CMD) {
    const ext = spawnSync(process.env.OPENAI_DETECTOR_CMD, {
      shell: true,
      input: text,
      encoding: 'utf8',
    });
    if (ext.stdout) console.log('External detector:', ext.stdout.trim());
  }

  const pass = result.aiProb < 30 && result.hits.length === 0;
  console.log(pass ? 'PASS (<30% heuristic, no banned phrases)' : 'FAIL');
  process.exit(pass ? 0 : 1);
}

main();
