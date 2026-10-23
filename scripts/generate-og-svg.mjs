#!/usr/bin/env node
/**
 * Per-page OG images as SVG (no heavy image deps).
 * Parses slugs/titles from src/data so we do not need a TS loader.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public/og');

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
  <text x="72" y="560" fill="#d8e3de" font-family="system-ui,sans-serif" font-size="26">DocuForge Tools · Free PDF / DOCX templates</text>
</svg>
`;
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
  svgFor('Invoice, estimate & contract templates', 'DOCUFORGE TOOLS'),
);

console.log(
  `OG SVGs: ${toolPairs.length} tools, ${guidePairs.length} guides, ${hubs.length} hubs → ${outDir}`,
);
