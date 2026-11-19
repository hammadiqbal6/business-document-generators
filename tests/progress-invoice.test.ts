import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import {
  computeProgressInvoiceTotals,
  progressLineEarned,
} from '../src/lib/progressInvoice';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { isInvoiceOrReceiptTool, toolDisclaimerBanner } from '../src/lib/disclaimers';

describe('progress invoice math', () => {
  it('computes earned to date per SOV line', () => {
    expect(progressLineEarned(12000, 75)).toBe(9000);
    expect(progressLineEarned(5000, 100)).toBe(5000);
    expect(progressLineEarned(8000, 40)).toBe(3200);
  });

  it('computes this period, retainage, and amount due from worked example defaults', () => {
    const totals = computeProgressInvoiceTotals({
      lines: [
        { description: 'Demolition', scheduledValue: 5000, percentComplete: 100 },
        { description: 'Framing', scheduledValue: 12000, percentComplete: 75 },
        { description: 'Electrical', scheduledValue: 8000, percentComplete: 40 },
      ],
      previouslyBilled: 8000,
      retainagePercent: 10,
      taxRate: 0,
    });

    expect(totals.contractSum).toBe(25000);
    expect(totals.earnedToDate).toBe(17200);
    expect(totals.thisPeriodGross).toBe(9200);
    expect(totals.retainageThisPeriod).toBe(920);
    expect(totals.amountDueBeforeTax).toBe(8280);
    expect(totals.tax).toBe(0);
    expect(totals.amountDueThisPeriod).toBe(8280);
  });

  it('applies tax after retainage', () => {
    const totals = computeProgressInvoiceTotals({
      lines: [{ description: 'Phase A', scheduledValue: 10000, percentComplete: 50 }],
      previouslyBilled: 0,
      retainagePercent: 10,
      taxRate: 8,
    });
    // earned 5000; retainage 500; before tax 4500; tax 360; due 4860
    expect(totals.thisPeriodGross).toBe(5000);
    expect(totals.retainageThisPeriod).toBe(500);
    expect(totals.amountDueBeforeTax).toBe(4500);
    expect(totals.tax).toBe(360);
    expect(totals.amountDueThisPeriod).toBe(4860);
  });

  it('never bills a negative this-period when previously billed exceeds earned', () => {
    const totals = computeProgressInvoiceTotals({
      lines: [{ description: 'Phase A', scheduledValue: 1000, percentComplete: 50 }],
      previouslyBilled: 900,
      retainagePercent: 10,
    });
    expect(totals.earnedToDate).toBe(500);
    expect(totals.thisPeriodGross).toBe(0);
    expect(totals.amountDueThisPeriod).toBe(0);
  });
});

describe('progress invoice tool', () => {
  const slug = 'progress-invoice';

  it('is registered with a unique primary keyword', () => {
    const tool = getToolBySlug(slug)!;
    expect(tool).toBeTruthy();
    expect(tool.primaryKeyword).toBe('progress invoice template');
    expect(allTools.filter((t) => t.primaryKeyword === tool.primaryKeyword)).toHaveLength(1);
  });

  it('validates defaults, links guides, builds preview, and emits schema', () => {
    const tool = getToolBySlug(slug)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(guidesForTool(slug).length).toBeGreaterThan(0);
    expect(guidesForTool(slug)).toContain('contractor-invoice-example');

    const blocks = buildDocumentBlocks(tool, tool.defaults);
    const text = JSON.stringify(blocks);
    expect(blocks[0]?.type).toBe('heading');
    expect(text).toMatch(/Schedule of values/i);
    expect(text).toMatch(/Amount due this period/i);
    expect(text).toContain('8,280.00');
    expect(text).toContain('PI-2026-02');

    expect(howToJsonLd({
      name: `How to use the ${tool.shortName} generator`,
      description: tool.metaDescription,
      url: `https://docuklin.com/tools/${tool.slug}/`,
      steps: tool.content.howToUse,
    })?.['@type']).toBe('HowTo');
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(4);
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('gets the invoice/receipt not-legal-or-tax-advice banner', () => {
    const tool = getToolBySlug(slug)!;
    expect(isInvoiceOrReceiptTool(tool)).toBe(true);
    expect(toolDisclaimerBanner(tool)).toMatch(/not legal or tax advice/i);
  });
});
