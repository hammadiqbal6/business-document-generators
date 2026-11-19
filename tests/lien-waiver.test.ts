import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';

const SLUG = 'lien-waiver-generator';

describe('lien waiver generator', () => {
  it('registers with a unique primary keyword and legal-adjacent flag', () => {
    const tool = getToolBySlug(SLUG);
    expect(tool).toBeTruthy();
    expect(tool!.isLegalAdjacent).toBe(true);
    expect(tool!.category).toBe('contracts');
    const matches = allTools.filter((t) => t.primaryKeyword === tool!.primaryKeyword);
    expect(matches).toHaveLength(1);
  });

  it('validates defaults, links guides, and emits HowTo + FAQ JSON-LD', () => {
    const tool = getToolBySlug(SLUG)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(guidesForTool(SLUG).length).toBeGreaterThan(0);
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(4);

    const blocks = buildDocumentBlocks(tool, tool.defaults);
    expect(blocks[0]?.type).toBe('heading');
    expect(blocks[0]?.text).toMatch(/Conditional Waiver and Release Upon Progress Payment/i);
    const text = JSON.stringify(blocks);
    expect(text).toContain('North Ridge Electric');
    expect(text).toMatch(/Signature/i);
    expect(text).toMatch(/state lien-waiver forms vary/i);

    const howTo = howToJsonLd({
      name: `How to use the ${tool.shortName} generator`,
      description: tool.metaDescription,
      url: `https://docuklin.com/tools/${tool.slug}/`,
      steps: tool.content.howToUse,
    });
    expect(howTo?.['@type']).toBe('HowTo');
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('switches heading for unconditional final waivers', () => {
    const tool = getToolBySlug(SLUG)!;
    const blocks = buildDocumentBlocks(tool, {
      ...tool.defaults,
      waiverCondition: 'Unconditional',
      waiverScope: 'Final',
    });
    expect(blocks[0]?.text).toMatch(/Unconditional Waiver and Release Upon Final Payment/i);
  });

  it('shifts waiver and through dates with withTodayDateDefaults', () => {
    const tool = getToolBySlug(SLUG)!;
    const now = new Date(2026, 10, 19);
    const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
    expect(out.waiverDate).toBe('2026-11-19');
    expect(out.throughDate).toBe('2026-11-15'); // today − 4 days
  });
});
