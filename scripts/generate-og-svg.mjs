#!/usr/bin/env node
/**
 * Per-page OG images as SVG (no heavy image deps) + brand webmanifest.
 * Parses slugs/titles from src/data so we do not need a TS loader.
 * Brand strings come from siteDefaults.mjs (overridable via PUBLIC_SITE_*).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_SITE_NAME,
  DEFAULT_SITE_SHORT_NAME,
} from '../src/config/siteDefaults.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public/og');

const siteName = process.env.PUBLIC_SITE_NAME || DEFAULT_SITE_NAME;
const siteShortName = process.env.PUBLIC_SITE_SHORT_NAME || DEFAULT_SITE_SHORT_NAME;
const brandFooter = `${siteName} · Free PDF / DOCX templates`;
const brandEyebrow = siteName.toUpperCase();

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title, maxLen = 42) {
  const words = title.split(/\s+/);
  const lines = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function svgFor(title, eyebrow) {
  const lines = wrapTitle(title);
  const textNodes = lines
    .map(
      (ln, i) =>
        `<text x="72" y="${300 + i * 58}" fill="#f8faf9" font-family="Georgia, serif" font-size="48" font-weight="700">${escapeXml(ln)}</text>`,
    )
    .join('\n  ');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a4a40"/>
      <stop offset="100%" stop-color="#0f6b5c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="16" height="630" fill="#c9a227"/>
  <text x="72" y="120" fill="#c9a227" font-family="system-ui,sans-serif" font-size="28" letter-spacing="0.04em">${escapeXml(eyebrow)}</text>
  ${textNodes}
  <text x="72" y="560" fill="#d8e3de" font-family="system-ui,sans-serif" font-size="26">${escapeXml(brandFooter)}</text>
</svg>
`;
}

function defaultOgSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(siteName)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a2a2b"/>
      <stop offset="55%" stop-color="#0f3d3e"/>
      <stop offset="100%" stop-color="#1a5c5e"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#7ec8c3"/>
      <stop offset="100%" stop-color="#d4e8e6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="-40" r="280" fill="#1f6b6d" opacity="0.35"/>
  <circle cx="80" cy="700" r="260" fill="#083233" opacity="0.55"/>
  <rect x="72" y="72" width="8" height="486" rx="4" fill="url(#accent)"/>
  <text x="112" y="250" fill="#f4faf9" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700" letter-spacing="-1.5">${escapeXml(siteName)}</text>
  <text x="112" y="340" fill="#c5e6e3" font-family="Georgia, 'Times New Roman', serif" font-size="34">
    Free niche business document generators
  </text>
  <text x="112" y="400" fill="#9ec9c5" font-family="ui-sans-serif, system-ui, sans-serif" font-size="26">
    Fill a form · Preview live · Export PDF or DOCX
  </text>
  <text x="112" y="520" fill="#7eb8b3" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22">
    Nothing leaves your browser
  </text>
</svg>
`;
}

function writeWebManifest() {
  const manifest = {
    name: siteName,
    short_name: siteShortName,
    description: 'Free niche business document generators with PDF export',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f6b5c',
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
  fs.writeFileSync(
    path.join(root, 'public/site.webmanifest'),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

/** Extract { slug, title } pairs (JSON-ish or TS object literals). */
function extractSlugTitlePairs(src) {
  const pairs = [];
  const re =
    /["']?slug["']?\s*:\s*["']([^"']+)["'][\s\S]*?["']?title["']?\s*:\s*["']((?:\\.|[^"'\\])*)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m[1] === 'string') continue; // skip interface
    pairs.push({ slug: m[1], title: m[2].replace(/\\'/g, "'").replace(/\\"/g, '"') });
  }
  return pairs;
}

function extractHubs(typesSrc) {
  const hubs = [];
  const re = /slug:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]((?:\\.|[^'"\\])*)['"]/g;
  let m;
  while ((m = re.exec(typesSrc)) !== null) {
    if (['estimates-invoices', 'contracts', 'forms', 'creative-templates'].includes(m[1])) {
      hubs.push({ slug: m[1], title: m[2].replace(/\\'/g, "'") });
    }
  }
  return hubs;
}

fs.mkdirSync(outDir, { recursive: true });

const toolFiles = [
  'src/data/tools/estimates.ts',
  'src/data/tools/contracts.ts',
  'src/data/tools/forms-creative.ts',
];
const toolPairs = [];
for (const rel of toolFiles) {
  const src = fs.readFileSync(path.join(root, rel), 'utf8');
  // Prefer shortName for OG title when present after slug
  const slugRe = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = slugRe.exec(src)) !== null) {
    const slice = src.slice(m.index, m.index + 500);
    const short = slice.match(/shortName:\s*'((?:\\'|[^'])*)'/);
    const name = slice.match(/\n\s*name:\s*'((?:\\'|[^'])*)'/);
    const title = (short?.[1] || name?.[1] || m[1]).replace(/\\'/g, "'");
    toolPairs.push({ slug: m[1], title });
  }
}

const guidesSrc = fs.readFileSync(path.join(root, 'src/data/guides.ts'), 'utf8');
// Prefer simple adjacent "slug"/"title" JSON-style keys from the guides array.
const guidePairs = [];
{
  const arrayStart = guidesSrc.indexOf('export const guides');
  const slice = arrayStart >= 0 ? guidesSrc.slice(arrayStart) : guidesSrc;
  const blockRe =
    /"slug"\s*:\s*"([^"]+)"\s*,\s*"title"\s*:\s*"([^"]+)"/g;
  let gm;
  while ((gm = blockRe.exec(slice)) !== null) {
    guidePairs.push({ slug: gm[1], title: gm[2] });
  }
  if (guidePairs.length === 0) {
    guidePairs.push(...extractSlugTitlePairs(guidesSrc));
  }
}

const typesSrc = fs.readFileSync(path.join(root, 'src/data/tools/types.ts'), 'utf8');
const hubs = extractHubs(typesSrc);

for (const t of toolPairs) {
  fs.writeFileSync(path.join(outDir, `tool-${t.slug}.svg`), svgFor(t.title, 'DOCUMENT GENERATOR'));
}
for (const g of guidePairs) {
  fs.writeFileSync(path.join(outDir, `guide-${g.slug}.svg`), svgFor(g.title, 'GUIDE'));
}
for (const h of hubs) {
  fs.writeFileSync(path.join(outDir, `hub-${h.slug}.svg`), svgFor(h.title, 'CATEGORY HUB'));
}
fs.writeFileSync(path.join(outDir, 'guides.svg'), svgFor('Business document guides', 'GUIDES'));
fs.writeFileSync(
  path.join(outDir, 'home.svg'),
  svgFor('Invoice, estimate & contract templates', brandEyebrow),
);
fs.writeFileSync(path.join(root, 'public/og-default.svg'), defaultOgSvg());
writeWebManifest();

console.log(
  `OG SVGs: ${toolPairs.length} tools, ${guidePairs.length} guides, ${hubs.length} hubs → ${outDir} (${siteName})`,
);
console.log(
  'Note: if public/og-default.svg brand text changed, re-rasterize public/og-default.png (Playwright screenshot of the SVG).',
);
