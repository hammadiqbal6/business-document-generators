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

const adsTxtPath = path.join(dist, 'ads.txt');
if (!fs.existsSync(adsTxtPath)) {
  errors.push('Missing ads.txt in dist');
} else {
  const adsTxt = fs.readFileSync(adsTxtPath, 'utf8');
  const pub = (process.env.PUBLIC_ADSENSE_PUBLISHER_ID || '').trim();
  if (pub) {
    const pubId = pub.startsWith('ca-pub-') ? pub.slice(3) : pub.startsWith('pub-') ? pub : `pub-${pub}`;
    if (!adsTxt.includes(`google.com, ${pubId}, DIRECT, f08c47fec0942fa0`)) {
      errors.push('ads.txt missing Google publisher line for PUBLIC_ADSENSE_PUBLISHER_ID');
    }
  } else if (!/omitted until approval|PUBLIC_ADSENSE_PUBLISHER_ID/i.test(adsTxt)) {
    errors.push('ads.txt should keep a comment placeholder when publisher ID is unset');
  }
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
