import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';

describe('lien waiver generator', () => {
  const slug = 'lien-waiver';

  it('registers with a unique primary keyword and legal-adjacent flag', () => {
    const tool = getToolBySlug(slug);
    expect(tool).toBeTruthy();
    expect(tool!.isLegalAdjacent).toBe(true);
    expect(tool!.category).toBe('estimates-invoices');
    expect(allTools.filter((t) => t.primaryKeyword === tool!.primaryKeyword)).toHaveLength(1);
    expect(guidesForTool(slug).length).toBeGreaterThan(0);
    expect(guidesForTool(slug)).toContain('contractor-invoice-example');
  });

  it('validates defaults and emits HowTo + FAQ JSON-LD', () => {
    const tool = getToolBySlug(slug)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);

    const howTo = howToJsonLd({
      name: `How to use the ${tool.shortName} generator`,
      description: tool.metaDescription,
      url: `https://docuklin.com/tools/${tool.slug}/`,
      steps: tool.content.howToUse,
    });
    expect(howTo?.['@type']).toBe('HowTo');
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('builds preview blocks for conditional progress defaults', () => {
    const tool = getToolBySlug(slug)!;
    const blocks = buildDocumentBlocks(tool, tool.defaults);
    expect(blocks.length).toBeGreaterThan(2);
    expect(blocks[0]?.type).toBe('heading');
    const text = JSON.stringify(blocks);
    expect(text).toMatch(/Conditional Lien Waiver/i);
    expect(text).toContain('INV-220');
    expect(text).toMatch(/Exceptions/i);
    expect(text).toMatch(/not a statutory form/i);
    expect(text).toMatch(/Signature/i);
  });

  it('switches heading for unconditional final', () => {
    const tool = getToolBySlug(slug)!;
    const blocks = buildDocumentBlocks(tool, {
      ...tool.defaults,
      waiverType: 'Unconditional Final',
    });
    const text = JSON.stringify(blocks);
    expect(text).toMatch(/Unconditional Lien Waiver and Release — Final Payment/i);
    expect(text).toMatch(/unconditional/i);
  });

  it('shifts waiver and through dates with withTodayDateDefaults', () => {
    const tool = getToolBySlug(slug)!;
    const now = new Date(2026, 10, 19);
    const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
    expect(out.waiverDate).toBe('2026-11-19');
    expect(out.throughDate).toBe('2026-11-19');
  });
});
