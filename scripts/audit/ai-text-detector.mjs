#!/usr/bin/env node
/**
 * Optional AI-tell / detector helper (not wired into CI).
 *
 * 1) Always runs a local banned-phrase + burstiness heuristic.
 * 2) If Python + transformers are available, also scores with
 *    openai-community/roberta-base-openai-detector (Fake = human-like).
 *
 * Usage:
 *   node scripts/audit/ai-text-detector.mjs --slug progress-invoice
 *   node scripts/audit/ai-text-detector.mjs --file path/to.txt
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

const BANNED = [
  /\bdelve\b/i,
  /in today's (fast-paced|digital)/i,
  /it's important to note/i,
  /\bnavigate\b/i,
  /\blandscape\b/i,
  /\brobust\b/i,
  /\bseamless\b/i,
  /\bleverage\b/i,
  /\bunlock\b/i,
  /\belevate\b/i,
  /comprehensive guide/i,
  /\bin conclusion\b/i,
  /whether you're a .+ or a /i,
  /game-?changer/i,
  /\bdive into\b/i,
];

function extractToolCopy(slug) {
  const estimates = fs.readFileSync(path.join(root, 'src/data/tools/estimates.ts'), 'utf8');
  const contracts = fs.readFileSync(path.join(root, 'src/data/tools/contracts.ts'), 'utf8');
  const forms = fs.readFileSync(path.join(root, 'src/data/tools/forms-creative.ts'), 'utf8');
  const blob = `${estimates}\n${contracts}\n${forms}`;
  const re = new RegExp(`slug:\\s*'${slug}'[\\s\\S]*?updatedAt:\\s*'[^']+'`, 'm');
  const m = blob.match(re);
  if (!m) throw new Error(`Tool slug not found: ${slug}`);
  const block = m[0];
  const parts = [];
  for (const key of ['answerFirst', 'body', 'question', 'answer', 'heading']) {
    const rx = new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`, 'g');
    let hit;
    while ((hit = rx.exec(block))) {
      parts.push(hit[1].replace(/\\n/g, '\n').replace(/\\'/g, "'"));
    }
  }
  return parts.join('\n\n');
}

function heuristicScore(text) {
  const hits = [];
  for (const re of BANNED) {
    if (re.test(text)) hits.push(re.toString());
  }
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const mean = lengths.length ? lengths.reduce((a, b) => a + b, 0) / lengths.length : 0;
  const variance =
    lengths.length > 1
      ? lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / lengths.length
      : 0;
  const stdev = Math.sqrt(variance);
  // Heuristic: banned hits dominate; low sentence-length variance nudges AI score up.
  let aiProb = hits.length * 25;
  if (stdev < 4 && lengths.length >= 4) aiProb += 15;
  if (stdev >= 6) aiProb = Math.max(0, aiProb - 10);
  aiProb = Math.min(100, aiProb);
  return {
    detector: 'heuristic-banned+burstiness',
    aiProbabilityPct: aiProb,
    bannedHits: hits,
    sentenceCount: lengths.length,
    sentenceLengthStdev: Math.round(stdev * 10) / 10,
    label: aiProb < 30 ? 'human' : 'review',
  };
}

function robertaScore(text) {
  const py = `
import json, sys
text = sys.stdin.read()
try:
  from transformers import pipeline
  clf = pipeline("text-classification", model="openai-community/roberta-base-openai-detector", truncation=True)
  # Model labels: Real ~= human, Fake ~= AI (OpenAI detector convention varies by checkpoint).
  out = clf(text[:4000])[0]
  label = out["label"]
  score = float(out["score"])
  # openai-detector: "Fake" often means AI-generated; "Real" means human.
  if label.lower() in ("fake", "label_0", "ai", "gpt"):
    ai = score * 100
  else:
    ai = (1 - score) * 100
  print(json.dumps({"detector":"openai-community/roberta-base-openai-detector","label":label,"rawScore":score,"aiProbabilityPct":round(ai,1)}))
except Exception as e:
  print(json.dumps({"detector":"openai-community/roberta-base-openai-detector","error":str(e)}))
`;
  const result = spawnSync('python3', ['-c', py], {
    input: text,
    encoding: 'utf8',
    maxBuffer: 20 * 1024 * 1024,
    env: { ...process.env, PATH: `${process.env.HOME}/.local/bin:${process.env.PATH}` },
  });
  if (result.status !== 0) {
    return { detector: 'openai-community/roberta-base-openai-detector', error: result.stderr || result.stdout };
  }
  try {
    return JSON.parse(result.stdout.trim().split('\n').pop());
  } catch {
    return { detector: 'openai-community/roberta-base-openai-detector', error: result.stdout };
  }
}

function main() {
  const args = process.argv.slice(2);
  let text = '';
  let name = 'stdin';
  const slugIdx = args.indexOf('--slug');
  const fileIdx = args.indexOf('--file');
  if (slugIdx >= 0) {
    name = args[slugIdx + 1];
    text = extractToolCopy(name);
  } else if (fileIdx >= 0) {
    name = args[fileIdx + 1];
    text = fs.readFileSync(name, 'utf8');
  } else {
    text = fs.readFileSync(0, 'utf8');
  }

  const rows = [heuristicScore(text)];
  if (!args.includes('--heuristic-only')) {
    rows.push(robertaScore(text));
  }

  console.log(`# AI text detector — ${name}\n`);
  console.log('| Detector | AI probability | Label / notes |');
  console.log('|----------|----------------|---------------|');
  for (const r of rows) {
    if (r.error) {
      console.log(`| ${r.detector} | n/a | error: ${String(r.error).slice(0, 120)} |`);
    } else {
      const note =
        r.bannedHits?.length
          ? `banned hits: ${r.bannedHits.length}; stdev ${r.sentenceLengthStdev}`
          : r.label || r.detector;
      console.log(`| ${r.detector} | ${r.aiProbabilityPct}% | ${note} |`);
    }
  }
  const hardFail = rows.some((r) => !r.error && r.aiProbabilityPct >= 30);
  process.exit(hardFail ? 2 : 0);
}

main();
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
