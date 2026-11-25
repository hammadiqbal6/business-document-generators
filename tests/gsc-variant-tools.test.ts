import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';
import { sumLineItems } from '../src/lib/money';
import type { LineItem } from '../src/data/tools/types';

const ESTIMATE_PRESETS = ['landscaping-estimate', 'flooring-estimate'] as const;
const CONTRACT_PRESETS = [
  'wedding-videography-contract-template',
  'video-production-contract',
] as const;

describe('GSC-priority variant tools', () => {
  it('registers estimate and contract presets with unique primary keywords', () => {
    const keywords = allTools.map((t) => t.primaryKeyword);
    for (const slug of [...ESTIMATE_PRESETS, ...CONTRACT_PRESETS]) {
      const tool = getToolBySlug(slug);
      expect(tool, slug).toBeTruthy();
      expect(keywords.filter((k) => k === tool!.primaryKeyword)).toHaveLength(1);
    }
    expect(getToolBySlug('landscaping-estimate')!.category).toBe('estimates-invoices');
    expect(getToolBySlug('flooring-estimate')!.category).toBe('estimates-invoices');
    expect(getToolBySlug('wedding-videography-contract-template')!.category).toBe('contracts');
    expect(getToolBySlug('video-production-contract')!.category).toBe('contracts');
    expect(getToolBySlug('wedding-videography-contract-template')!.isLegalAdjacent).toBe(true);
    expect(getToolBySlug('video-production-contract')!.isLegalAdjacent).toBe(true);
  });

  it('validates defaults, builds preview, and emits HowTo + FAQ JSON-LD', () => {
    for (const slug of [...ESTIMATE_PRESETS, ...CONTRACT_PRESETS]) {
      const tool = getToolBySlug(slug)!;
      expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
      expect(guidesForTool(slug).length).toBeGreaterThan(0);

      const blocks = buildDocumentBlocks(tool, tool.defaults);
      expect(blocks.length).toBeGreaterThan(2);
      expect(blocks[0]?.type).toBe('heading');

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

  it('landscaping defaults include demo, plants, mulch, and hardscape', () => {
    const tool = getToolBySlug('landscaping-estimate')!;
    const items = tool.defaults.lineItems as LineItem[];
    const text = items.map((i) => i.description.toLowerCase()).join(' | ');
    expect(text).toMatch(/demo|haul/);
    expect(text).toMatch(/plant/);
    expect(text).toMatch(/mulch/);
    expect(text).toMatch(/paver|patio|hardscape/);
    expect(sumLineItems(items)).toBeGreaterThan(0);
  });

  it('flooring defaults include tear-out, underlayment, material waste, and labor', () => {
    const tool = getToolBySlug('flooring-estimate')!;
    const items = tool.defaults.lineItems as LineItem[];
    const text = items.map((i) => i.description.toLowerCase()).join(' | ');
    expect(text).toMatch(/tear-out|tear out|disposal/);
    expect(text).toMatch(/underlayment/);
    expect(text).toMatch(/lvp|material/);
    expect(text).toMatch(/labor|install/);
    expect(sumLineItems(items)).toBeGreaterThan(0);
  });

  it('wedding and video production contracts include clauses and deliverables', () => {
    for (const slug of CONTRACT_PRESETS) {
      const tool = getToolBySlug(slug)!;
      expect(String(tool.defaults.deliverables).length).toBeGreaterThan(40);
      expect(Array.isArray(tool.defaults.clauses)).toBe(true);
      expect((tool.defaults.clauses as unknown[]).length).toBeGreaterThanOrEqual(5);
      const blocks = buildDocumentBlocks(tool, tool.defaults);
      expect(JSON.stringify(blocks)).toMatch(/Deliverable|Revision|License|Payment|Cancel/i);
    }
  });

  it('shifts estimate dates with withTodayDateDefaults', () => {
    const now = new Date(2026, 10, 25);
    for (const slug of ESTIMATE_PRESETS) {
      const tool = getToolBySlug(slug)!;
      const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
      expect(out.estimateDate).toBe('2026-11-25');
    }
  });
});
