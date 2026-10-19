#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2] || 'dist';

function wordCount(htmlPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

const required = [
  ['About', path.join('about', 'index.html')],
  ['Contact', path.join('contact', 'index.html')],
  ['Privacy', path.join('privacy', 'index.html')],
  ['Terms', path.join('terms', 'index.html')],
  ['Methodology', path.join('methodology', 'index.html')],
];

const toolSample = path.join('tools', 'construction-estimate-template', 'index.html');
const privacy = fs.readFileSync(path.join(dist, 'privacy', 'index.html'), 'utf8');
const adsTxt = fs.existsSync(path.join(dist, 'ads.txt')) ? fs.readFileSync(path.join(dist, 'ads.txt'), 'utf8') : '';

const lines = [
  '# AdSense readiness evidence',
  '',
  `Generated: ${new Date().toISOString()} UTC`,
  '',
  '## Required pages',
  '',
];

for (const [name, rel] of required) {
  const ok = fs.existsSync(path.join(dist, rel));
  lines.push(`- [${ok ? 'x' : ' '}] **${name}** — \`${rel}\` (${ok ? wordCount(path.join(dist, rel)) : 0} words rendered)`);
}

lines.push(
  '',
  '## Privacy / ads language',
  '',
  `- AdSense/third-party mention: ${/adsense|google.*ads|third.party/i.test(privacy) ? 'YES' : 'NO'} — see \`privacy/index.html\` in dist`,
  `- Opt-out links (aboutads / Google Ads Settings): ${/aboutads|google\.com\/settings\/ads/i.test(privacy) ? 'YES' : 'NO'}`,
  '',
  '## ads.txt',
  '```',
  adsTxt.trim() || '(empty template — fill publisher ID before launch)',
  '```',
  '',
  '## CMP / consent banner',
  '',
  '- Site ships **placeholder** AdSense slots disabled until `PUBLIC_ADS_ENABLED=true`.',
  '- Owner must integrate a **Google-certified CMP** for EEA/UK/CH before personalized ads (`docs/ADSENSE.md`).',
  '',
  '## Content depth (sample tool page)',
  '',
  `- \`${toolSample}\`: **${wordCount(path.join(dist, toolSample))}** words (target ≥600 for tool pages)`,
  '',
  '## Navigation',
  '',
  `- Footer links present on home: ${fs.readFileSync(path.join(dist, 'index.html'), 'utf8').includes('site-footer') ? 'YES' : 'NO'}`,
  '',
  '## Automated check',
  '',
  'Run `node scripts/audit/adsense-audit.mjs` (included in `npm run audit` / `seo-audit.txt`).',
);

console.log(lines.join('\n'));
