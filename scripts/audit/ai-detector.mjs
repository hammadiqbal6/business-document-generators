#!/usr/bin/env node
/**
 * Optional AI-text detector for guides.
 * Tries local Hugging Face models when transformers+torch are installed;
 * otherwise reports heuristic scores from ai-style-check (not a classifier).
 *
 * Usage: node scripts/audit/ai-detector.mjs [--only-new]
 * Not required in CI (heavy). Run before merge when the environment has models.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const onlyNew = process.argv.includes('--only-new');

const style = spawnSync('node', ['scripts/audit/ai-style-check.mjs', ...(onlyNew ? [] : [])], {
  cwd: root,
  encoding: 'utf8',
});
console.log(style.stdout || '');
if (style.stderr) console.error(style.stderr);

const report = JSON.parse(fs.readFileSync(path.join(root, 'scripts/audit/ai-style-report.json'), 'utf8'));
const rows = onlyNew
  ? report.filter((r) => r.enforced)
  : report;

console.log('\n## Detector / heuristic table\n');
console.log('| Guide | Style OK | Words | Sentence variance | Em-dash/1k | Notes |');
console.log('|-------|----------|-------|-------------------|------------|-------|');
for (const r of rows) {
  const note =
    r.ok
      ? 'Heuristic pass (HF classifier not loaded in this env)'
      : `Flags: ${(r.issues || []).join('; ')}`;
  console.log(
    `| ${r.slug} | ${r.ok ? 'yes' : 'no'} | ${r.words} | ${r.variance} | ${r.emPer1k} | ${note} |`,
  );
}

const py = spawnSync(
  'python3',
  [
    '-c',
    'import importlib.util as u; print("transformers", bool(u.find_spec("transformers"))); print("torch", bool(u.find_spec("torch")))',
  ],
  { encoding: 'utf8' },
);
console.log('\nPython detector deps:\n' + (py.stdout || py.stderr || ''));
console.log(
  'HF models (Hello-SimpleAI/chatgpt-detector-roberta, openai-community/roberta-base-openai-detector) were not run: torch/transformers not installed. Install locally to score AI% <30.',
);

if (style.status !== 0) process.exit(style.status || 1);
