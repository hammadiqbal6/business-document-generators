import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';

const TRADE_SLUGS = ['roofing-estimate-template', 'painting-estimate-template'] as const;

describe('roofing and painting trade estimate presets', () => {
  it('registers both tools with unique primary keywords', () => {
    const keywords = allTools.map((t) => t.primaryKeyword);
    for (const slug of TRADE_SLUGS) {
      const tool = getToolBySlug(slug);
      expect(tool, slug).toBeTruthy();
      expect(tool!.category).toBe('estimates-invoices');
      expect(keywords.filter((k) => k === tool!.primaryKeyword)).toHaveLength(1);
    }
  });

  it('validates defaults, builds commercial preview, and emits HowTo + FAQ JSON-LD', () => {
    for (const slug of TRADE_SLUGS) {
      const tool = getToolBySlug(slug)!;
      expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
      expect(guidesForTool(slug).length).toBeGreaterThan(0);

      const blocks = buildDocumentBlocks(tool, tool.defaults);
      expect(blocks.length).toBeGreaterThan(2);
      expect(blocks[0]?.type).toBe('heading');
      expect(blocks.some((b) => b.type === 'table')).toBe(true);
      expect(blocks.some((b) => b.type === 'totals')).toBe(true);

      const howTo = howToJsonLd({
        name: `How to use the ${tool.shortName} generator`,
        description: tool.metaDescription,
        url: `https://docuklin.com/tools/${tool.slug}/`,
        steps: tool.content.howToUse,
      });
      expect(howTo?.['@type']).toBe('HowTo');
      expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);
      expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
    }
  });

  it('roofing preview shows squares, tear-off, and underlayment lines', () => {
    const tool = getToolBySlug('roofing-estimate-template')!;
    const text = JSON.stringify(buildDocumentBlocks(tool, tool.defaults));
    expect(text).toContain('RF-2026-088');
    expect(text).toMatch(/Tear-off/i);
    expect(text).toMatch(/underlayment/i);
    expect(text).toMatch(/square/i);
    expect(text).toMatch(/Deposit/i);
  });

  it('painting preview shows rooms and sq ft lines', () => {
    const tool = getToolBySlug('painting-estimate-template')!;
    const text = JSON.stringify(buildDocumentBlocks(tool, tool.defaults));
    expect(text).toContain('PT-2026-041');
    expect(text).toMatch(/room/i);
    expect(text).toMatch(/sq ft/i);
    expect(text).toMatch(/Deposit/i);
  });

  it('cross-links trade presets and construction / quote peers', () => {
    const roofing = getToolBySlug('roofing-estimate-template')!;
    const painting = getToolBySlug('painting-estimate-template')!;
    expect(roofing.relatedSlugs).toContain('painting-estimate-template');
    expect(painting.relatedSlugs).toContain('roofing-estimate-template');
    expect(roofing.relatedSlugs).toContain('construction-estimate-template');
    expect(painting.relatedSlugs).toContain('quote-estimate-generator');
  });
});
