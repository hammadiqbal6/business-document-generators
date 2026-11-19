import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd, buildPageTitle } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';
import { sumLineItems } from '../src/lib/money';
import type { LineItem } from '../src/data/tools/types';

const TRADE_SLUGS = ['roofing-estimate-template', 'painting-estimate-template'] as const;

describe('roofing and painting estimate presets', () => {
  it('registers both tools with unique primary keywords', () => {
    const keywords = allTools.map((t) => t.primaryKeyword);
    for (const slug of TRADE_SLUGS) {
      const tool = getToolBySlug(slug);
      expect(tool, slug).toBeTruthy();
      expect(keywords.filter((k) => k === tool!.primaryKeyword)).toHaveLength(1);
    }
  });

  it('validates defaults, builds commercial preview, and emits HowTo + FAQ JSON-LD', () => {
    for (const slug of TRADE_SLUGS) {
      const tool = getToolBySlug(slug)!;
      expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
      expect(guidesForTool(slug).length).toBeGreaterThan(0);
      expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);

      const blocks = buildDocumentBlocks(tool, tool.defaults);
      expect(blocks[0]?.type).toBe('heading');
      const text = JSON.stringify(blocks);
      expect(text).toMatch(/Line items/i);
      expect(text).toMatch(/Subtotal/i);
      expect(text).toMatch(/Deposit/i);

      const howTo = howToJsonLd({
        name: `How to use the ${tool.shortName} generator`,
        description: tool.metaDescription,
        url: `https://docuklin.com/tools/${tool.slug}/`,
        steps: tool.content.howToUse,
      });
      expect(howTo?.['@type']).toBe('HowTo');
      expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');

      const title = buildPageTitle(tool.title);
      expect(title.length).toBeGreaterThanOrEqual(25);
      expect(title.length).toBeLessThanOrEqual(65);
    }
  });

  it('roofing defaults price squares, tear-off, underlayment, flashing, and disposal', () => {
    const tool = getToolBySlug('roofing-estimate-template')!;
    const lines = tool.defaults.lineItems as LineItem[];
    const joined = lines.map((l) => l.description.toLowerCase()).join(' | ');
    expect(joined).toMatch(/tear-off/);
    expect(joined).toMatch(/underlayment/);
    expect(joined).toMatch(/flashing/);
    expect(joined).toMatch(/disposal|dumpster/);
    expect(lines.some((l) => l.unit === 'sq')).toBe(true);
    expect(sumLineItems(lines)).toBe(7376);
  });

  it('painting defaults separate materials vs labor and support sq ft or rooms', () => {
    const tool = getToolBySlug('painting-estimate-template')!;
    const lines = tool.defaults.lineItems as LineItem[];
    const units = new Set(lines.map((l) => l.unit));
    expect(units.has('sq ft') || units.has('room')).toBe(true);
    expect(lines.some((l) => /materials/i.test(l.description))).toBe(true);
    expect(lines.some((l) => /labor/i.test(l.description))).toBe(true);
    expect(lines.some((l) => /coat|prep/i.test(l.description))).toBe(true);
  });

  it('shifts estimate date with withTodayDateDefaults', () => {
    const now = new Date(2026, 10, 19);
    for (const slug of TRADE_SLUGS) {
      const tool = getToolBySlug(slug)!;
      const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
      expect(out.estimateDate).toBe('2026-11-19');
    }
  });
});
