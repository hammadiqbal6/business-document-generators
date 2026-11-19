#!/usr/bin/env node
/**
 * Optional human-vs-AI text check for page copy (not wired into CI).
 * Prefers a local Transformers.js RoBERTa OpenAI detector when dependencies
 * resolve; otherwise falls back to a lightweight heuristic ban-list scorer
 * so agents still get a reproducible report in constrained VMs.
 *
 * Usage:
 *   node scripts/audit/ai-text-detect.mjs --slug invoice-late-fee-calculator
 *   node scripts/audit/ai-text-detect.mjs --file path/to/text.txt
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

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
  /whether you're a .{5,40} or a /i,
  /game-changer/i,
  /dive into/i,
];

function extractToolCopy(slug) {
  const file = path.join(root, 'src/data/tools/estimates.ts');
  const src = fs.readFileSync(file, 'utf8');
  const marker = `slug: '${slug}'`;
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`Tool slug not found in estimates.ts: ${slug}`);
  const next = src.indexOf('\nexport const ', start + marker.length);
  const chunk = next > 0 ? src.slice(start, next) : src.slice(start);
  const strings = [...chunk.matchAll(/'((?:\\'|[^']){40,})'/g)].map((m) =>
    m[1].replace(/\\n/g, '\n').replace(/\\'/g, "'"),
  );
  return strings.join('\n\n');
}

function heuristicScore(text) {
  const hits = [];
  for (const re of AI_TELLS) {
    if (re.test(text)) hits.push(re.source);
  }
  // Em-dash chains and triad adjectives are soft signals only.
  const emDashChains = (text.match(/\w+—\w+—\w+/g) || []).length;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const hitPenalty = hits.length * 18 + emDashChains * 8;
  const aiProbability = Math.min(95, Math.round(hitPenalty + (words < 80 ? 5 : 0)));
  return {
    detector: 'heuristic-banlist',
    aiProbability,
    label: aiProbability < 30 ? 'human' : aiProbability < 50 ? 'mixed' : 'ai-likely',
    hits,
    words,
  };
}

async function transformersScore(text) {
  try {
    // Dynamic import so missing optional deps do not crash the script.
    const { pipeline } = await import('@xenova/transformers');
    const clf = await pipeline('text-classification', 'openai-community/roberta-base-openai-detector');
    // Model context is limited; score the first ~500 tokens worth of chars.
    const sample = text.slice(0, 2500);
    const out = await clf(sample);
    const rows = Array.isArray(out) ? out : [out];
    const fake = rows.find((r) => /fake|ai|generated/i.test(r.label)) || rows[0];
    const real = rows.find((r) => /real|human/i.test(r.label));
    const aiProbability = fake
      ? Math.round((fake.score || 0) * 100)
      : real
        ? Math.round((1 - (real.score || 0)) * 100)
        : null;
    return {
      detector: 'openai-community/roberta-base-openai-detector (@xenova/transformers)',
      aiProbability,
      label: aiProbability != null && aiProbability < 30 ? 'human' : 'see-score',
      raw: rows,
    };
  } catch (err) {
    return { detector: 'transformers-unavailable', error: String(err?.message || err) };
  }
}

function parseArgs(argv) {
  const out = { slug: null, file: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--slug') out.slug = argv[++i];
    else if (argv[i] === '--file') out.file = argv[++i];
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let text = '';
  let source = '';
  if (args.file) {
    source = args.file;
    text = fs.readFileSync(path.resolve(args.file), 'utf8');
  } else if (args.slug) {
    source = `tool:${args.slug}`;
    text = extractToolCopy(args.slug);
  } else {
    console.error('Usage: node scripts/audit/ai-text-detect.mjs --slug <tool-slug> | --file <path>');
    process.exit(2);
  }

  const heuristic = heuristicScore(text);
  const model = await transformersScore(text);
  const report = { source, words: heuristic.words, heuristic, model };
  console.log(JSON.stringify(report, null, 2));

  const score =
    typeof model.aiProbability === 'number' ? model.aiProbability : heuristic.aiProbability;
  if (score >= 30) {
    console.error(`\nAI probability ${score}% ≥ 30% target — rewrite before merge.`);
    process.exit(1);
  }
  console.error(`\nPass: AI probability ${score}% < 30%.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
