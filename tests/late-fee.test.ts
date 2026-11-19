import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';
import {
  buildLateFeeLine,
  buildLateFeeReminder,
  calculateLateFee,
  calendarDaysBetween,
} from '../src/lib/lateFee';
import { isInvoiceOrReceiptTool, toolDisclaimerBanner } from '../src/lib/disclaimers';

describe('invoice late fee calculator', () => {
  const slug = 'invoice-late-fee-calculator';

  it('registers with a unique primary keyword', () => {
    const tool = getToolBySlug(slug);
    expect(tool).toBeTruthy();
    expect(allTools.filter((t) => t.primaryKeyword === tool!.primaryKeyword)).toHaveLength(1);
  });

  it('validates defaults, links guides, and emits HowTo + FAQ JSON-LD', () => {
    const tool = getToolBySlug(slug)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(guidesForTool(slug).length).toBeGreaterThan(0);
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);

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
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('computes the sample monthly % worked example ($80.75 on $4,250)', () => {
    expect(calendarDaysBetween('2026-10-01', '2026-11-13')).toBe(43);
    const result = calculateLateFee({
      invoiceAmount: 4250,
      dueDate: '2026-10-01',
      paymentDate: '2026-11-13',
      gracePeriodDays: 5,
      feeType: 'monthly_percent',
      monthlyPercent: 1.5,
    });
    expect(result.daysPastDue).toBe(43);
    expect(result.chargeableDays).toBe(38);
    expect(result.fee).toBe(80.75);
    expect(result.newTotal).toBe(4330.75);
  });

  it('applies flat fee once after grace and zero when still in grace', () => {
    const late = calculateLateFee({
      invoiceAmount: 1000,
      dueDate: '2026-10-01',
      paymentDate: '2026-10-10',
      gracePeriodDays: 5,
      feeType: 'flat',
      flatFeeAmount: 50,
    });
    expect(late.daysPastDue).toBe(9);
    expect(late.chargeableDays).toBe(4);
    expect(late.fee).toBe(50);
    expect(late.newTotal).toBe(1050);

    const grace = calculateLateFee({
      invoiceAmount: 1000,
      dueDate: '2026-10-01',
      paymentDate: '2026-10-04',
      gracePeriodDays: 5,
      feeType: 'flat',
      flatFeeAmount: 50,
    });
    expect(grace.chargeableDays).toBe(0);
    expect(grace.fee).toBe(0);
    expect(grace.newTotal).toBe(1000);
  });

  it('converts annual rate to a daily charge', () => {
    const result = calculateLateFee({
      invoiceAmount: 3650,
      dueDate: '2026-01-01',
      paymentDate: '2026-01-11',
      gracePeriodDays: 0,
      feeType: 'annual_daily',
      annualPercent: 10,
    });
    // 3650 * 0.10 / 365 * 10 = 10
    expect(result.chargeableDays).toBe(10);
    expect(result.fee).toBe(10);
    expect(result.newTotal).toBe(3660);
  });

  it('preview surfaces days late, fee, total, and suggested wording', () => {
    const tool = getToolBySlug(slug)!;
    const text = JSON.stringify(buildDocumentBlocks(tool, tool.defaults));
    expect(text).toMatch(/Days past due/i);
    expect(text).toMatch(/Late fee/i);
    expect(text).toMatch(/New total due/i);
    expect(text).toMatch(/Suggested late-fee line/i);
    expect(text).toMatch(/Suggested payment reminder/i);
    expect(text).toMatch(/80\.75/);
  });

  it('builds copy-ready late-fee line and reminder strings', () => {
    const result = calculateLateFee({
      invoiceAmount: 4250,
      dueDate: '2026-10-01',
      paymentDate: '2026-11-13',
      gracePeriodDays: 5,
      feeType: 'monthly_percent',
      monthlyPercent: 1.5,
    });
    const ctx = {
      companyName: 'Summit Build Co.',
      clientName: 'Jordan Lee',
      invoiceNumber: 'INV-2026-088',
      invoiceAmount: 4250,
      dueDate: '2026-10-01',
      paymentDate: '2026-11-13',
      result,
    };
    expect(buildLateFeeLine(ctx)).toMatch(/Late payment fee/i);
    expect(buildLateFeeLine(ctx)).toMatch(/80\.75/);
    expect(buildLateFeeReminder(ctx)).toMatch(/INV-2026-088/);
    expect(buildLateFeeReminder(ctx)).toMatch(/4,330\.75|4330\.75/);
  });

  it('flags the invoice disclaimer banner', () => {
    const tool = getToolBySlug(slug)!;
    expect(isInvoiceOrReceiptTool(tool)).toBe(true);
    expect(toolDisclaimerBanner(tool)).toMatch(/not legal or tax advice/i);
  });

  it('shifts invoiceDueDate and paymentDate with withTodayDateDefaults', () => {
    const tool = getToolBySlug(slug)!;
    const now = new Date(2026, 10, 13);
    const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
    expect(out.paymentDate).toBe('2026-11-13');
    expect(out.invoiceDueDate).toBe('2026-10-01');
  });
});
