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
