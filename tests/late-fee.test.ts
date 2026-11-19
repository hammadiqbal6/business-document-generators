import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { calculateLateFee, parseLateFeeMode } from '../src/lib/lateFee';
import { validateForm } from '../src/lib/validation';
import { faqPageJsonLd, howToJsonLd } from '../src/lib/seo';

describe('calculateLateFee', () => {
  it('prorates monthly percent by chargeable days ÷ 30', () => {
    // 4215 × 0.015 × (12/30) = 25.29
    const result = calculateLateFee({
      principal: 4215,
      feeMode: 'monthlyPercent',
      monthlyPercent: 1.5,
      daysLate: 17,
      gracePeriodDays: 5,
    });
    expect(result.chargeableDays).toBe(12);
    expect(result.fee).toBe(25.29);
    expect(result.totalDue).toBe(4240.29);
  });

  it('applies flat fee once after grace', () => {
    const result = calculateLateFee({
      principal: 1000,
      feeMode: 'flat',
      flatFee: 35,
      daysLate: 10,
      gracePeriodDays: 3,
    });
    expect(result.chargeableDays).toBe(7);
    expect(result.fee).toBe(35);
    expect(result.totalDue).toBe(1035);
  });

  it('returns zero fee inside the grace period', () => {
    const monthly = calculateLateFee({
      principal: 500,
      feeMode: 'monthlyPercent',
      monthlyPercent: 2,
      daysLate: 3,
      gracePeriodDays: 5,
    });
    expect(monthly.chargeableDays).toBe(0);
    expect(monthly.fee).toBe(0);
    expect(monthly.totalDue).toBe(500);

    const flat = calculateLateFee({
      principal: 500,
      feeMode: 'flat',
      flatFee: 40,
      daysLate: 2,
      gracePeriodDays: 5,
    });
    expect(flat.fee).toBe(0);
    expect(flat.totalDue).toBe(500);
  });

  it('treats negative inputs as zero', () => {
    const result = calculateLateFee({
      principal: -100,
      feeMode: 'monthlyPercent',
      monthlyPercent: -2,
      daysLate: -4,
      gracePeriodDays: -1,
    });
    expect(result.chargeableDays).toBe(0);
    expect(result.fee).toBe(0);
    expect(result.totalDue).toBe(0);
  });

  it('parses fee mode defaults to monthly percent', () => {
    expect(parseLateFeeMode('flat')).toBe('flat');
    expect(parseLateFeeMode('monthlyPercent')).toBe('monthlyPercent');
    expect(parseLateFeeMode('other')).toBe('monthlyPercent');
  });
});

describe('late-fee-calculator tool', () => {
  it('registers with guides, validation, preview totals, and schema', () => {
    const tool = getToolBySlug('late-fee-calculator')!;
    expect(tool).toBeTruthy();
    expect(tool.primaryKeyword).toBe('late fee calculator');
    expect(tool.isLegalAdjacent).toBe(true);
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(guidesForTool(tool.slug)).toContain('contractor-invoice-example');

    const blocks = buildDocumentBlocks(tool, tool.defaults);
    const text = JSON.stringify(blocks);
    expect(blocks[0]?.type).toBe('heading');
    expect(text).toMatch(/Late fee/i);
    expect(text).toMatch(/Total due/i);
    expect(text).toContain('25.29');
    expect(text).toMatch(/Legal caps/i);

    expect(
      howToJsonLd({
        name: `How to use the ${tool.shortName} generator`,
        description: tool.metaDescription,
        url: `https://docuklin.com/tools/${tool.slug}/`,
        steps: tool.content.howToUse,
      })?.['@type'],
    ).toBe('HowTo');
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });
});
