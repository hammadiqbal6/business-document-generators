import { describe, expect, it } from 'vitest';
import {
  buildDocumentBlocks,
  changeOrderRunningTotals,
  computeChangeOrderRevisedTotal,
} from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';

const NEW_SLUGS = [
  'independent-contractor-agreement',
  'timesheet-template',
  'service-agreement-template',
  'purchase-order-template',
  'change-order-template',
] as const;

describe('five new document generators', () => {
  it('registers all five tools with unique primary keywords', () => {
    const keywords = allTools.map((t) => t.primaryKeyword);
    for (const slug of NEW_SLUGS) {
      const tool = getToolBySlug(slug);
      expect(tool, slug).toBeTruthy();
      expect(keywords.filter((k) => k === tool!.primaryKeyword)).toHaveLength(1);
    }
  });

  it('validates defaults, builds preview blocks, and emits HowTo + FAQ JSON-LD', () => {
    for (const slug of NEW_SLUGS) {
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
      expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);
      expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
    }
  });

  it('timesheet shows hours total and amount', () => {
    const tool = getToolBySlug('timesheet-template')!;
    const text = JSON.stringify(buildDocumentBlocks(tool, tool.defaults));
    expect(text).toMatch(/Hours total/i);
    expect(text).toMatch(/Amount/i);
  });

  it('purchase order shows ship-to and PO number', () => {
    const tool = getToolBySlug('purchase-order-template')!;
    const text = JSON.stringify(buildDocumentBlocks(tool, tool.defaults));
    expect(text).toContain('PO-2026-441');
    expect(text).toMatch(/Ship to/i);
  });

  it('change order references original contract, schedule days, and both signatures', () => {
    const tool = getToolBySlug('change-order-template')!;
    const blocks = buildDocumentBlocks(tool, tool.defaults);
    const text = JSON.stringify(blocks);
    expect(text).toContain('CE-2026-014');
    expect(text).toMatch(/Schedule impact \(days\)/i);
    expect(text).toContain('"2"');
    expect(text).toMatch(/Original contract amount/i);
    expect(text).toMatch(/Prior change orders/i);
    expect(text).toMatch(/Revised contract total/i);
    expect(text).toMatch(/Contractor:/i);
    expect(text).toMatch(/Client \/ owner:/i);
    expect(text).toMatch(/Signature/i);
  });

  it('change order running total math: original + prior COs + this CO', () => {
    expect(computeChangeOrderRevisedTotal(18420, 1250, 980)).toBe(20650);
    expect(computeChangeOrderRevisedTotal(10000, 0, -500)).toBe(9500);
    expect(computeChangeOrderRevisedTotal(0, 0, 0)).toBe(0);
    // cents rounding
    expect(computeChangeOrderRevisedTotal(100.105, 0.1, 0.1)).toBe(100.31);

    const fromValues = changeOrderRunningTotals({
      originalAmount: 18420,
      priorChangeOrdersTotal: 1250,
      costImpact: 980,
    });
    expect(fromValues).toEqual({
      originalAmount: 18420,
      priorChangeOrdersTotal: 1250,
      costImpact: 980,
      revisedTotal: 20650,
    });

    const tool = getToolBySlug('change-order-template')!;
    const blocks = buildDocumentBlocks(tool, tool.defaults);
    const totals = blocks.find((b) => b.type === 'totals' && b.totals?.some((t) => t.label === 'Revised contract total'));
    expect(totals?.totals?.find((t) => t.label === 'Revised contract total')?.value).toBe('$20,650.00');
  });

  it('legal-adjacent agreements flag the disclaimer', () => {
    expect(getToolBySlug('independent-contractor-agreement')!.isLegalAdjacent).toBe(true);
    expect(getToolBySlug('service-agreement-template')!.isLegalAdjacent).toBe(true);
  });

  it('shifts editor dates with withTodayDateDefaults for new tools', () => {
    const now = new Date(2026, 10, 13);
    const po = getToolBySlug('purchase-order-template')!;
    const poOut = withTodayDateDefaults(po.fields, po.defaults, now);
    expect(poOut.poDate).toBe('2026-11-13');
    expect(poOut.neededBy).toBe('2026-11-20');

    const ts = getToolBySlug('timesheet-template')!;
    const tsOut = withTodayDateDefaults(ts.fields, ts.defaults, now);
    expect(tsOut.periodEnd).toBe('2026-11-13');
    expect(tsOut.periodStart).toBe('2026-11-09');

    const co = getToolBySlug('change-order-template')!;
    const coOut = withTodayDateDefaults(co.fields, co.defaults, now);
    expect(coOut.coDate).toBe('2026-11-13');
    expect(coOut.originalContractDate).toBe('2026-10-19');
  });
});
