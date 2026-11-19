import { describe, expect, it } from 'vitest';
import {
  buildDocumentBlocks,
  computeProgressBilling,
} from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd, buildPageTitle } from '../src/lib/seo';
import { isInvoiceOrReceiptTool, toolDisclaimerBanner } from '../src/lib/disclaimers';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';

const SLUG = 'progress-invoice';

describe('progress invoice generator', () => {
  it('registers with a unique primary keyword and guide links', () => {
    const tool = getToolBySlug(SLUG);
    expect(tool).toBeTruthy();
    expect(allTools.filter((t) => t.primaryKeyword === tool!.primaryKeyword)).toHaveLength(1);
    expect(tool!.primaryKeyword).toBe('progress invoice');
    expect(guidesForTool(SLUG).length).toBeGreaterThan(0);
    expect(isInvoiceOrReceiptTool(tool!)).toBe(true);
    expect(toolDisclaimerBanner(tool!)).toMatch(/not legal or tax advice/i);
  });

  it('validates defaults and emits HowTo + FAQ JSON-LD', () => {
    const tool = getToolBySlug(SLUG)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(buildPageTitle(tool.title).length).toBeGreaterThanOrEqual(25);
    expect(buildPageTitle(tool.title).length).toBeLessThanOrEqual(65);
    expect(tool.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(tool.metaDescription.length).toBeLessThanOrEqual(160);

    const howTo = howToJsonLd({
      name: `How to use the ${tool.shortName} generator`,
      description: tool.metaDescription,
      url: `https://docuklin.com/tools/${tool.slug}/`,
      steps: tool.content.howToUse,
    });
    expect(howTo?.['@type']).toBe('HowTo');
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('computes amount due and balance to finish from percent mode defaults', () => {
    const tool = getToolBySlug(SLUG)!;
    const billing = computeProgressBilling(tool.defaults);
    // $42,000 × 25% = $10,500; 10% retainage = $1,050; due = $9,450
    expect(billing.workThisPeriod).toBe(10500);
    expect(billing.retainageThisPeriod).toBe(1050);
    expect(billing.amountDue).toBe(9450);
    // previously billed $12,600 + $10,500 = $23,100; balance = $18,900
    expect(billing.totalCompleted).toBe(23100);
    expect(billing.balanceToFinish).toBe(18900);
  });

  it('supports dollar-amount complete mode', () => {
    const billing = computeProgressBilling({
      contractValue: 10000,
      completeMode: 'amount',
      amountComplete: 2500,
      previouslyBilled: 4000,
      retainagePercent: 5,
    });
    expect(billing.workThisPeriod).toBe(2500);
    expect(billing.retainageThisPeriod).toBe(125);
    expect(billing.amountDue).toBe(2375);
    expect(billing.balanceToFinish).toBe(3500);
  });

  it('builds preview blocks with progress totals', () => {
    const tool = getToolBySlug(SLUG)!;
    const blocks = buildDocumentBlocks(tool, tool.defaults);
    const text = JSON.stringify(blocks);
    expect(blocks[0]?.type).toBe('heading');
    expect(text).toMatch(/Progress Invoice/i);
    expect(text).toMatch(/Amount due this period/i);
    expect(text).toMatch(/Balance to finish/i);
    expect(text).toMatch(/Retainage/i);
    expect(text).toContain('9,450');
  });

  it('shifts invoice and period dates with withTodayDateDefaults', () => {
    const tool = getToolBySlug(SLUG)!;
    const now = new Date(2026, 10, 19);
    const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
    expect(out.invoiceDate).toBe('2026-11-19');
    expect(out.dueDate).toBe('2026-12-03');
    expect(out.periodEnd).toBe('2026-11-19');
    expect(out.periodStart).toBe('2026-11-15');
  });
});
