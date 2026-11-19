import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';
import { lineItemTotal, sumLineItems } from '../src/lib/money';
import type { LineItem } from '../src/data/tools/types';

const PRESET_SLUGS = ['roofing-estimate', 'painting-estimate'] as const;

describe('roofing and painting estimate presets', () => {
  it('registers both presets with unique primary keywords', () => {
    const keywords = allTools.map((t) => t.primaryKeyword);
    for (const slug of PRESET_SLUGS) {
      const tool = getToolBySlug(slug);
      expect(tool, slug).toBeTruthy();
      expect(tool!.category).toBe('estimates-invoices');
      expect(keywords.filter((k) => k === tool!.primaryKeyword)).toHaveLength(1);
    }
  });

  it('validates defaults, builds commercial preview, and emits HowTo + FAQ JSON-LD', () => {
    for (const slug of PRESET_SLUGS) {
      const tool = getToolBySlug(slug)!;
      expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
      expect(guidesForTool(slug).length).toBeGreaterThan(0);

      const blocks = buildDocumentBlocks(tool, tool.defaults);
      expect(blocks.length).toBeGreaterThan(2);
      expect(blocks[0]?.type).toBe('heading');
      expect(JSON.stringify(blocks)).toMatch(/Line items|Subtotal|Total/i);

      const howTo = howToJsonLd({
        name: `How to use the ${tool.shortName} generator`,
        description: tool.metaDescription,
        url: `https://docuklin.com/tools/${tool.slug}/`,
        steps: tool.content.howToUse,
      });
      expect(howTo?.['@type']).toBe('HowTo');
      expect(tool.content.faq.length).toBeGreaterThanOrEqual(4);
      expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
    }
  });

  it('roofing defaults include tear-off, underlayment, shingles, flashing, disposal', () => {
    const tool = getToolBySlug('roofing-estimate')!;
    const items = tool.defaults.lineItems as LineItem[];
    const text = items.map((i) => i.description.toLowerCase()).join(' | ');
    expect(text).toMatch(/tear-off/);
    expect(text).toMatch(/underlayment/);
    expect(text).toMatch(/shingle/);
    expect(text).toMatch(/flashing|drip edge/);
    expect(text).toMatch(/disposal|dumpster|haul/);
    expect(sumLineItems(items)).toBeGreaterThan(0);
  });

  it('painting defaults include prep, primer, coats, and materials', () => {
    const tool = getToolBySlug('painting-estimate')!;
    const items = tool.defaults.lineItems as LineItem[];
    const text = items.map((i) => i.description.toLowerCase()).join(' | ');
    expect(text).toMatch(/prep/);
    expect(text).toMatch(/primer/);
    expect(text).toMatch(/coat|eggshell|finish/);
    expect(text).toMatch(/paint|supplies|material/);
    const wall = items.find((i) => /wall/i.test(i.description));
    expect(wall).toBeTruthy();
    expect(lineItemTotal(wall!.quantity, wall!.rate)).toBeCloseTo(1100 * 1.15, 2);
  });

  it('shifts estimate dates with withTodayDateDefaults', () => {
    const now = new Date(2026, 10, 19);
    for (const slug of PRESET_SLUGS) {
      const tool = getToolBySlug(slug)!;
      const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
      expect(out.estimateDate).toBe('2026-11-19');
    }
  });
});
