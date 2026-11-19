#!/usr/bin/env node
/**
 * Lightweight local AI-text heuristic + optional Hugging Face detectors.
 * Not wired into CI (model download is heavy). Usage:
 *   node scripts/audit/ai-detect-text.mjs --file path.txt
 *   node scripts/audit/ai-detect-text.mjs --slug lien-waiver-generator
 *
 * Heuristic target: AI-tell score under 30 (lower = more human-like).
 * If transformers + a detector model are available, also print model P(AI).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const AI_TELLS = [
  /delve/i,
  /in today's (?:fast-paced|digital) (?:world|landscape)/i,
  /it's important to note/i,
  /\bnavigate\b/i,
  /\blandscape\b/i,
  /\brobust\b/i,
  /\bseamless\b/i,
  /\bleverage\b/i,
  /\bunlock\b/i,
  /\belevate\b/i,
  /comprehensive guide/i,
  /in conclusion/i,
  /whether you're a .+ or a /i,
  /game-changer/i,
  /dive into/i,
  /furthermore/i,
  /moreover/i,
  /cutting-edge/i,
  /utilize/i,
];

function heuristicScore(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  let hits = 0;
  const found = [];
  for (const re of AI_TELLS) {
    if (re.test(text)) {
      hits += 1;
      found.push(re.source);
    }
  }
  // Uniform sentence length is an AI tell; reward variance.
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
  const variance =
    lengths.reduce((a, b) => a + (b - avg) ** 2, 0) / Math.max(lengths.length, 1);
  const lowBurstinessPenalty = variance < 20 ? 15 : variance < 40 ? 5 : 0;
  const tellPenalty = Math.min(70, hits * 18);
  const score = Math.min(100, tellPenalty + lowBurstinessPenalty);
  return {
    detector: 'local-heuristic',
    aiProbabilityPercent: score,
    details: {
      wordCount: words.length,
      sentenceCount: sentences.length,
      lengthVariance: Math.round(variance * 10) / 10,
      aiTellHits: hits,
      aiTells: found,
    },
  };
}

async function tryTransformers(text) {
  try {
    const { pipeline } = await import('@xenova/transformers');
    const clf = await pipeline('text-classification', 'Xenova/openai-detector');
    const sample = text.slice(0, 1500);
    const out = await clf(sample);
    const rows = Array.isArray(out) ? out : [out];
    const fake = rows.find((r) => /fake|ai|gpt/i.test(r.label || ''));
    const real = rows.find((r) => /real|human/i.test(r.label || ''));
    const aiProb = fake
      ? Math.round(fake.score * 1000) / 10
      : real
        ? Math.round((1 - real.score) * 1000) / 10
        : null;
    return {
      detector: 'Xenova/openai-detector',
      aiProbabilityPercent: aiProb,
      raw: rows,
    };
  } catch (err) {
    return {
      detector: 'Xenova/openai-detector',
      aiProbabilityPercent: null,
      skipped: String(err?.message || err).slice(0, 200),
    };
  }
}

function extractToolCopy(slug) {
  // Dynamic import of built tool registry via ts through vitest is heavy; scrape source.
  const contractsPath = path.join(root, 'src/data/tools/contracts.ts');
  const estimatesPath = path.join(root, 'src/data/tools/estimates.ts');
  const formsPath = path.join(root, 'src/data/tools/forms-creative.ts');
  const blob = [contractsPath, estimatesPath, formsPath]
    .map((p) => fs.readFileSync(p, 'utf8'))
    .join('\n');
  const marker = `slug: '${slug}'`;
  const start = blob.indexOf(marker);
  if (start < 0) throw new Error(`Tool slug not found: ${slug}`);
  const next = blob.indexOf("slug: '", start + marker.length);
  const chunk = next > 0 ? blob.slice(start, next) : blob.slice(start);
  const bits = [];
  for (const key of ['answerFirst', 'body', 'question', 'answer', 'heading']) {
    const re = new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`, 'g');
    let m;
    while ((m = re.exec(chunk))) {
      bits.push(m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'"));
    }
    const re2 = new RegExp(`${key}:\\s*"((?:\\\\"|[^"])*)"`, 'g');
    while ((m = re2.exec(chunk))) {
      bits.push(m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'));
    }
  }
  return bits.join('\n\n');
}

function parseArgs(argv) {
  const out = { file: null, slug: null, transformers: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--file') out.file = argv[++i];
    else if (argv[i] === '--slug') out.slug = argv[++i];
    else if (argv[i] === '--transformers') out.transformers = true;
  }
  return out;
}

const args = parseArgs(process.argv);
let text = '';
if (args.file) {
  text = fs.readFileSync(path.resolve(args.file), 'utf8');
} else if (args.slug) {
  text = extractToolCopy(args.slug);
} else {
  console.error('Usage: node scripts/audit/ai-detect-text.mjs --slug <tool-slug> | --file <path> [--transformers]');
  process.exit(2);
}

const results = [heuristicScore(text)];
if (args.transformers) {
  results.push(await tryTransformers(text));
}

const label = args.slug || path.basename(args.file);
console.log(JSON.stringify({ label, wordCount: text.trim().split(/\s+/).length, results }, null, 2));

const worst = Math.max(
  ...results.map((r) => (typeof r.aiProbabilityPercent === 'number' ? r.aiProbabilityPercent : 0)),
);
process.exit(worst >= 30 ? 1 : 0);
