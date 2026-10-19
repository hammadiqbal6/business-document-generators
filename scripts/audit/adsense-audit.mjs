#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const required = ['about', 'contact', 'privacy', 'terms', 'methodology', 'cookies'];
const errors = [];

for (const slug of required) {
  const candidates = [
    path.join(dist, slug, 'index.html'),
    path.join(dist, `${slug}.html`),
  ];
  if (!candidates.some((p) => fs.existsSync(p))) {
    errors.push(`Missing required page: /${slug}/`);
  }
}

const privacyPath = path.join(dist, 'privacy', 'index.html');
if (fs.existsSync(privacyPath)) {
  const html = fs.readFileSync(privacyPath, 'utf8');
  if (!/adsense|google.*ads|third.party/i.test(html)) {
    errors.push('Privacy policy should mention AdSense/third-party ads');
  }
  if (!/aboutads|google\.com\/settings\/ads/i.test(html)) {
    errors.push('Privacy policy missing ad opt-out links');
  }
}

if (!fs.existsSync(path.join(dist, 'ads.txt'))) {
  errors.push('Missing ads.txt in dist');
}

const home = path.join(dist, 'index.html');
if (fs.existsSync(home)) {
  const html = fs.readFileSync(home, 'utf8');
  if (!html.includes('site-footer')) errors.push('Home missing footer navigation');
}

if (errors.length) {
  console.error('AdSense audit errors:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}
console.log('AdSense readiness audit OK');
