#!/usr/bin/env node
/**
 * Lightweight AI-tell heuristic + optional Hugging Face detector for tool/guide copy.
 * Not wired into CI (model download is heavy). Usage:
 *
 *   node scripts/audit/ai-text-detector.mjs --slug roofing-estimate
 *   node scripts/audit/ai-text-detector.mjs --slug painting-estimate --hf
 *
 * Exit 0 always unless --strict and heuristic AI-tell hits remain.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '../..');

const AI_TELLS = [
  /delve/i,
  /in today'?s (fast-paced |digital )?world/i,
  /it'?s important to note/i,
  /\bnavigate\b/i,
  /\blandscape\b/i,
  /\brobust\b/i,
  /\bseamless\b/i,
  /\bleverage\b/i,
  /\bunlock\b/i,
  /\belevate\b/i,
  /comprehensive guide/i,
  /in conclusion/i,
  /whether you'?re a .+ or a/i,
  /game-changer/i,
  /dive into/i,
  /furthermore/i,
  /moreover/i,
];

function extractToolBlob(src, slug) {
  const slugIdx = src.indexOf(`slug: '${slug}'`);
  if (slugIdx < 0) throw new Error(`slug not found: ${slug}`);
  const next = src.indexOf(`slug: '`, slugIdx + 10);
  const chunk = next > 0 ? src.slice(slugIdx, next) : src.slice(slugIdx);
  const parts = [];
  for (const key of ['answerFirst', 'body', 'question', 'answer', 'heading']) {
    const re = new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`, 'g');
    let m;
    while ((m = re.exec(chunk))) parts.push(m[1].replace(/\\'/g, "'").replace(/\\n/g, '\n'));
    const re2 = new RegExp(`${key}:\\s*"((?:\\\\"|[^"])*)"`, 'g');
    while ((m = re2.exec(chunk))) parts.push(m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'));
  }
  // howToUse / tips / commonMistakes string arrays
  for (const arrKey of ['howToUse', 'commonMistakes', 'tips']) {
    const block = chunk.match(new RegExp(`${arrKey}:\\s*\\[([\\s\\S]*?)\\]`, 'm'));
    if (block) {
      const itemRe = /'((?:\\'|[^'])*)'/g;
      let m;
      while ((m = itemRe.exec(block[1]))) parts.push(m[1].replace(/\\'/g, "'"));
    }
  }
  return parts.join('\n\n');
}

function heuristicScore(text) {
  const hits = [];
  for (const re of AI_TELLS) {
    if (re.test(text)) hits.push(re.source);
  }
  // Burstiness proxy: variance of sentence lengths
  const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 8);
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(lengths.length, 1);
  const variance =
    lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / Math.max(lengths.length, 1);
  const burstiness = Math.sqrt(variance);
  // Heuristic "AI probability": tell hits dominate; low burstiness adds a little
  let aiProb = hits.length * 18;
  if (burstiness < 4) aiProb += 10;
  if (burstiness > 8) aiProb -= 5;
  aiProb = Math.max(0, Math.min(100, aiProb));
  return { hits, burstiness: Number(burstiness.toFixed(2)), sentenceCount: sentences.length, aiProb };
}

async function hfDetect(text) {
  // Optional: requires transformers + torch in the environment
  const { spawnSync } = await import('node:child_process');
  const snippet = text.slice(0, 1500).replace(/\s+/g, ' ');
  const py = `
import json, sys
text = sys.stdin.read()
try:
    from transformers import pipeline
    clf = pipeline("text-classification", model="openai-community/roberta-base-openai-detector", truncation=True)
    out = clf(text[:1000])[0]
    print(json.dumps({"label": out["label"], "score": float(out["score"])}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
`;
  const r = spawnSync('python3', ['-c', py], {
    input: snippet,
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024,
    timeout: 300_000,
  });
  if (r.status !== 0) return { error: r.stderr || r.stdout || 'python failed' };
  try {
    return JSON.parse(r.stdout.trim().split('\n').pop());
  } catch {
    return { error: r.stdout || 'parse failed' };
  }
}

function main() {
  const args = process.argv.slice(2);
  const slugIdx = args.indexOf('--slug');
  const slug = slugIdx >= 0 ? args[slugIdx + 1] : null;
  const useHf = args.includes('--hf');
  const strict = args.includes('--strict');
  if (!slug) {
    console.error('Usage: node scripts/audit/ai-text-detector.mjs --slug <tool-slug> [--hf] [--strict]');
    process.exit(1);
  }
  const src = fs.readFileSync(path.join(root, 'src/data/tools/estimates.ts'), 'utf8');
  const text = extractToolBlob(src, slug);
  const h = heuristicScore(text);
  const result = {
    slug,
    chars: text.length,
    heuristicAiProbPercent: h.aiProb,
    aiTellHits: h.hits,
    burstiness: h.burstiness,
    sentenceCount: h.sentenceCount,
    verdict: h.aiProb < 30 && h.hits.length === 0 ? 'human-likely' : h.aiProb < 30 ? 'review' : 'rewrite',
  };
  const run = async () => {
    if (useHf) {
      result.hf = await hfDetect(text);
      if (result.hf?.label) {
        // Fake / Real labels from openai detector
        const fake = /fake/i.test(result.hf.label);
        result.hfAiProbPercent = fake ? Math.round(result.hf.score * 100) : Math.round((1 - result.hf.score) * 100);
      }
    }
    console.log(JSON.stringify(result, null, 2));
    if (strict && (h.hits.length > 0 || h.aiProb >= 30)) process.exit(2);
  };
  run();
}

main();
