#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

const steps = [
  ['SEO audit', 'scripts/audit/seo-audit.mjs'],
  ['AdSense readiness', 'scripts/audit/adsense-audit.mjs'],
  ['JS budget', 'scripts/audit/budget-audit.mjs'],
  ['Link check', 'scripts/audit/link-check.mjs'],
];

let failed = false;
for (const [name, script] of steps) {
  console.log(`\n=== ${name} ===`);
  const r = spawnSync('node', [script], { stdio: 'inherit' });
  if (r.status !== 0) failed = true;
}
if (failed) {
  console.error('\nAudit failed.');
  process.exit(1);
}
console.log('\nAll audits passed.');
