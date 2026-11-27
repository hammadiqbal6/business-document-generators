import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  STATIC_INDEXABLE_PATHS,
  expectedIndexablePaths,
  isExcludedFromSitemap,
} from '../scripts/lib/expected-sitemap-paths.mjs';
import { allTools } from '../src/data/tools';
import { guides } from '../src/data/guides';
import { DEFAULT_SITE_URL } from '../src/config/siteDefaults.mjs';

describe('sitemap completeness inventory', () => {
  const { paths, toolSlugs, guideSlugs } = expectedIndexablePaths();

  it('includes every registered tool slug as /tools/<slug>/', () => {
    expect(toolSlugs.length).toBe(allTools.length);
    for (const tool of allTools) {
      expect(toolSlugs).toContain(tool.slug);
      expect(paths).toContain(`/tools/${tool.slug}/`);
    }
  });

  it('includes every guide slug as /guides/<slug>/', () => {
    expect(guideSlugs.length).toBe(guides.length);
    for (const guide of guides) {
      expect(guideSlugs).toContain(guide.slug);
      expect(paths).toContain(`/guides/${guide.slug}/`);
    }
  });

  it('includes static hubs/home/indexes and excludes noindex utilities', () => {
    for (const p of STATIC_INDEXABLE_PATHS) {
      expect(paths).toContain(p);
      expect(isExcludedFromSitemap(p)).toBe(false);
    }
    expect(paths).not.toContain('/cookies/');
    expect(paths).not.toContain('/privacy/');
    expect(paths).not.toContain('/terms/');
    expect(paths).not.toContain('/404/');
    expect(isExcludedFromSitemap('/tools/quote-estimate-generator/embed/')).toBe(true);
  });

  it('lists the flagship quote-estimate-generator canonical path', () => {
    expect(paths).toContain('/tools/quote-estimate-generator/');
  });

  it('keeps flagship estimate title/meta within SEO bounds', async () => {
    const { getToolBySlug } = await import('../src/data/tools');
    const { buildPageTitle } = await import('../src/lib/seo');
    const tool = getToolBySlug('quote-estimate-generator');
    expect(tool).toBeTruthy();
    expect(tool!.title.toLowerCase()).toContain('free estimate generator');
    expect(tool!.title.toLowerCase()).toContain('quote estimate');
    expect(tool!.h1.toLowerCase()).toContain('free estimate generator');
    expect(tool!.metaDescription.toLowerCase()).toContain('quote estimate generator');
    expect(buildPageTitle(tool!.title).length).toBeLessThanOrEqual(65);
    expect(tool!.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(tool!.metaDescription.length).toBeLessThanOrEqual(160);
  });

  it('matches dist sitemap locs when dist/ is present (post-build gate)', () => {
    const dist = path.resolve('dist');
    const zero = path.join(dist, 'sitemap-0.xml');
    const index = path.join(dist, 'sitemap-index.xml');
    if (!fs.existsSync(zero) && !fs.existsSync(index)) {
      // Unit inventory still runs without a build; audit:indexing covers dist.
      expect(paths.length).toBeGreaterThan(40);
      return;
    }

    const origin = (process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
    const locs = new Set<string>();

    const loadLocs = (xml: string) => {
      for (const m of xml.matchAll(/<url>\s*<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
        locs.add(m[1]);
      }
    };

    if (fs.existsSync(index)) {
      const indexXml = fs.readFileSync(index, 'utf8');
      const children = [...indexXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
      for (const childUrl of children) {
        const childFile = path.join(dist, new URL(childUrl).pathname.replace(/^\//, ''));
        if (fs.existsSync(childFile)) loadLocs(fs.readFileSync(childFile, 'utf8'));
      }
    }
    if (fs.existsSync(zero)) loadLocs(fs.readFileSync(zero, 'utf8'));

    expect(locs.size).toBeGreaterThan(0);
    for (const pagePath of paths) {
      const url = `${origin}${pagePath === '/' ? '/' : pagePath}`;
      expect(locs.has(url), `missing from dist sitemap: ${url}`).toBe(true);
    }
    expect(locs.has(`${origin}/tools/quote-estimate-generator/`)).toBe(true);
  });
});

describe('robots.txt sitemap reference', () => {
  it('points Sitemap at /sitemap-index.xml on the site origin', () => {
    const src = fs.readFileSync('src/pages/robots.txt.ts', 'utf8');
    expect(src).toMatch(/Sitemap:\s*\$\{origin\}\/sitemap-index\.xml/);
  });
});
