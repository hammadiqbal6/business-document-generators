#!/usr/bin/env node
/**
 * Optional local HF AI-text detector for guides.
 * Tries openai-community/roberta-base-openai-detector via a small Python helper.
 * Never fails the audit pipeline — prints notes and writes tmp/hf-ai-scores.json when possible.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const py = path.join(root, 'scripts/audit/hf-ai-detect.py');
const out = path.join(root, 'tmp/hf-ai-scores.json');

fs.mkdirSync(path.join(root, 'tmp'), { recursive: true });

const r = spawnSync('python3', [py, '--out', out], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
  env: { ...process.env, HF_HUB_DISABLE_PROGRESS_BARS: '1', TRANSFORMERS_VERBOSITY: 'error' },
});

if (r.stdout) process.stdout.write(r.stdout);
if (r.stderr) process.stderr.write(r.stderr);

if (r.status !== 0) {
  console.error('\nHF detector unavailable or failed; heuristic ai-style-check.mjs remains the gate.');
  process.exit(0);
}
console.log(`\nWrote ${out}`);
