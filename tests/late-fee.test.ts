import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';
import {
  buildLateFeeReminder,
  calculateLateFee,
  calendarDaysBetween,
} from '../src/lib/lateFee';
import { isInvoiceOrReceiptTool, toolDisclaimerBanner } from '../src/lib/disclaimers';

const SLUG = 'invoice-late-fee-calculator';

describe('invoice late fee calculator', () => {
  it('registers with a unique primary keyword and guide links', () => {
    const tool = getToolBySlug(SLUG);
    expect(tool).toBeTruthy();
    expect(allTools.filter((t) => t.primaryKeyword === tool!.primaryKeyword)).toHaveLength(1);
    expect(guidesForTool(SLUG).length).toBeGreaterThan(0);
    expect(tool!.relatedSlugs).toEqual(
      expect.arrayContaining(['contractor-invoice', 'cleaning-service-invoice']),
    );
  });

  it('validates defaults and emits HowTo + FAQ JSON-LD', () => {
    const tool = getToolBySlug(SLUG)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);
    expect(howToJsonLd({
      name: `How to use the ${tool.shortName}`,
      description: tool.metaDescription,
      url: `https://docuklin.com/tools/${tool.slug}/`,
      steps: tool.content.howToUse,
    })?.['@type']).toBe('HowTo');
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('calculates flat fee + monthly simple interest after grace', () => {
    expect(calendarDaysBetween('2026-10-01', '2026-11-05')).toBe(35);
    const result = calculateLateFee({
      invoiceAmount: 2500,
      dueDate: '2026-10-01',
      paymentDate: '2026-11-05',
      gracePeriodDays: 5,
      flatFee: 25,
      interestRate: 1.5,
      ratePeriod: 'monthly',
    });
    expect(result.daysLate).toBe(35);
    expect(result.chargeableDays).toBe(30);
    expect(result.flatFeeApplied).toBe(25);
    expect(result.interestAmount).toBe(37.5);
    expect(result.lateFeeTotal).toBe(62.5);
    expect(result.totalDue).toBe(2562.5);
  });

  it('applies annual simple interest with day/365', () => {
    const result = calculateLateFee({
      invoiceAmount: 1000,
      dueDate: '2026-01-01',
      paymentDate: '2026-01-31',
      gracePeriodDays: 0,
      flatFee: 0,
      interestRate: 18,
      ratePeriod: 'annual',
    });
    expect(result.chargeableDays).toBe(30);
    expect(result.interestAmount).toBe(14.79); // 1000 * 0.18 * (30/365)
    expect(result.totalDue).toBe(1014.79);
  });

  it('charges nothing inside the grace period', () => {
    const result = calculateLateFee({
      invoiceAmount: 2500,
      dueDate: '2026-11-01',
      paymentDate: '2026-11-04',
      gracePeriodDays: 5,
      flatFee: 25,
      interestRate: 1.5,
      ratePeriod: 'monthly',
    });
    expect(result.withinGrace).toBe(true);
    expect(result.lateFeeTotal).toBe(0);
    expect(result.totalDue).toBe(2500);
  });

  it('builds preview totals and reminder wording from defaults', () => {
    const tool = getToolBySlug(SLUG)!;
    const blocks = buildDocumentBlocks(tool, tool.defaults);
    const text = JSON.stringify(blocks);
    expect(blocks[0]?.type).toBe('heading');
    expect(text).toMatch(/Late fee total/i);
    expect(text).toMatch(/Total due/i);
    expect(text).toMatch(/62\.50|2,?562\.50/);
    expect(text).toMatch(/Reminder wording/i);
    expect(text).toMatch(/Past-due notice/i);

    const reminder = buildLateFeeReminder({
      companyName: 'Summit Build Co.',
      clientName: 'Jordan Lee',
      invoiceNumber: 'INV-2026-088',
      invoiceAmount: 2500,
      dueDate: '2026-10-01',
      paymentDate: '2026-11-05',
      result: calculateLateFee({
        invoiceAmount: 2500,
        dueDate: '2026-10-01',
        paymentDate: '2026-11-05',
        gracePeriodDays: 5,
        flatFee: 25,
        interestRate: 1.5,
        ratePeriod: 'monthly',
      }),
    });
    expect(reminder).toMatch(/INV-2026-088/);
    expect(reminder).toMatch(/\$2,562\.50/);
  });

  it('shows the invoice/tax disclaimer banner', () => {
    const tool = getToolBySlug(SLUG)!;
    expect(isInvoiceOrReceiptTool(tool)).toBe(true);
    expect(toolDisclaimerBanner(tool)).toMatch(/not legal or tax advice/i);
  });

  it('shifts invoiceDueDate into the past for editor demos', () => {
    const tool = getToolBySlug(SLUG)!;
    const now = new Date(2026, 10, 19);
    const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
    expect(out.paymentDate).toBe('2026-11-19');
    expect(out.invoiceDueDate).toBe('2026-10-15');
  });
});

describe('invoice tools link the late fee calculator', () => {
  it('lists the calculator on contractor and cleaning invoice relatedSlugs', () => {
    expect(getToolBySlug('contractor-invoice')!.relatedSlugs).toContain(SLUG);
    expect(getToolBySlug('cleaning-service-invoice')!.relatedSlugs).toContain(SLUG);
  });
});
