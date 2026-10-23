#!/usr/bin/env node
/**
 * Post-deploy IndexNow ping.
 * Reads built sitemap(s) from dist/, POSTs URL batches to api.indexnow.org.
 * Never fails the build/deploy: all errors are caught and the process exits 0.
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs --dry-run
 *
 * Env:
 *   INDEXNOW_KEY      — override key (default: 4d6f1ea5473a0968a83c67ceda5a0387)
 *   INDEXNOW_DISABLE=1 — skip entirely
 *   PUBLIC_SITE_URL   — optional site origin (else derived from sitemap <loc>s)
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { DEFAULT_SITE_URL } from '../src/config/siteDefaults.mjs';

const DEFAULT_KEY = '4d6f1ea5473a0968a83c67ceda5a0387';
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10_000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const dryRun = process.argv.includes('--dry-run');

function extractLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<\s]+)\s*<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) {
    locs.push(m[1].trim());
  }
  return locs;
}

function isSitemapUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    return /sitemap[^/]*\.xml$/i.test(pathname);
  } catch {
    return /sitemap[^/]*\.xml$/i.test(url);
  }
}

function localPathForSitemapUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const name = path.basename(pathname);
    return path.join(DIST, name);
  } catch {
    return path.join(DIST, path.basename(url));
  }
}

async function collectUrls() {
  if (!existsSync(DIST)) {
    throw new Error(`dist/ not found at ${DIST}; run npm run build first`);
  }

  const indexPath = path.join(DIST, 'sitemap-index.xml');
  const urls = new Set();

  if (existsSync(indexPath)) {
    const indexXml = await readFile(indexPath, 'utf8');
    const childLocs = extractLocs(indexXml);
    for (const child of childLocs) {
      const local = localPathForSitemapUrl(child);
      if (!existsSync(local)) {
        console.warn(`[indexnow] missing child sitemap file: ${local}`);
        continue;
      }
      const xml = await readFile(local, 'utf8');
      for (const loc of extractLocs(xml)) {
        if (!isSitemapUrl(loc)) urls.add(loc);
      }
    }
  } else {
    const files = (await readdir(DIST)).filter((f) => /^sitemap.*\.xml$/i.test(f));
    if (files.length === 0) {
      throw new Error('No sitemap-index.xml or sitemap*.xml in dist/');
    }
    for (const file of files) {
      const xml = await readFile(path.join(DIST, file), 'utf8');
      for (const loc of extractLocs(xml)) {
        if (!isSitemapUrl(loc)) urls.add(loc);
      }
    }
  }

  return [...urls];
}

function resolveSiteOrigin(urlList) {
  const fromEnv = (process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (urlList.length > 0) {
    try {
      const u = new URL(urlList[0]);
      return u.origin;
    } catch {
      /* fall through */
    }
  }
  return DEFAULT_SITE_URL;
}

async function postBatch(payload) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const bodyText = await res.text().catch(() => '');
  console.log(`[indexnow] HTTP ${res.status}${bodyText ? ` — ${bodyText.slice(0, 200)}` : ''}`);
  return res.status;
}

async function main() {
  if (process.env.INDEXNOW_DISABLE === '1') {
    console.log('[indexnow] skipped (INDEXNOW_DISABLE=1)');
    return;
  }

  const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
  const urlList = await collectUrls();
  if (urlList.length === 0) {
    console.log('[indexnow] no URLs found in sitemap; nothing to submit');
    return;
  }

  const site = resolveSiteOrigin(urlList);
  let host;
  try {
    host = new URL(site).host;
  } catch {
    host = site.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
  const keyLocation = `${site.replace(/\/$/, '')}/${key}.txt`;

  console.log(`[indexnow] ${urlList.length} URL(s) from dist/ sitemaps`);
  console.log(`[indexnow] host=${host} keyLocation=${keyLocation}`);

  const batches = [];
  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    batches.push(urlList.slice(i, i + BATCH_SIZE));
  }

  for (let i = 0; i < batches.length; i++) {
    const payload = {
      host,
      key,
      keyLocation,
      urlList: batches[i],
    };
    if (dryRun) {
      console.log(
        `[indexnow] --dry-run batch ${i + 1}/${batches.length}: ${batches[i].length} URLs`,
      );
      console.log(JSON.stringify({ ...payload, urlList: `[${batches[i].length} urls]` }, null, 2));
      if (batches[i].length <= 5) {
        console.log('[indexnow] urlList sample:', batches[i]);
      } else {
        console.log('[indexnow] urlList sample (first 5):', batches[i].slice(0, 5));
      }
      continue;
    }
    console.log(`[indexnow] posting batch ${i + 1}/${batches.length} (${batches[i].length} URLs)…`);
    await postBatch(payload);
  }

  if (dryRun) {
    console.log(`[indexnow] dry-run complete — ${urlList.length} URL(s), not posted`);
  }
}

main()
  .catch((err) => {
    console.error('[indexnow] error (non-fatal):', err?.message || err);
  })
  .finally(() => {
    process.exit(0);
  });
