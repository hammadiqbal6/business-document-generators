import { describe, expect, it } from 'vitest';
import { addDaysIso, localTodayIso, withTodayDateDefaults } from '../src/lib/todayDefaults';
import type { FieldDef } from '../src/data/tools/types';
import { featuredToolSlugs, getFeaturedTools, getToolBySlug } from '../src/data/tools';
import { howToJsonLd } from '../src/lib/seo';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';

describe('withTodayDateDefaults', () => {
  const fields: FieldDef[] = [
    { id: 'docDate', label: 'Date', type: 'date' },
    { id: 'validUntil', label: 'Valid until', type: 'date' },
    { id: 'dueDate', label: 'Due', type: 'date' },
    { id: 'clientDob', label: 'DOB', type: 'date' },
    { id: 'companyName', label: 'Name', type: 'text' },
  ];

  it('sets document dates to the provided “today” and offsets validity/due', () => {
    const now = new Date(2026, 10, 13); // 2026-11-13 local
    const out = withTodayDateDefaults(
      fields,
      {
        docDate: '2026-10-19',
        validUntil: '2026-11-02',
        dueDate: '2026-11-02',
        clientDob: '1994-03-12',
        companyName: 'Acme',
      },
      now,
    );
    expect(out.docDate).toBe('2026-11-13');
    expect(out.validUntil).toBe(addDaysIso('2026-11-13', 14));
    expect(out.dueDate).toBe(addDaysIso('2026-11-13', 14));
    expect(out.clientDob).toBe('1994-03-12');
    expect(out.companyName).toBe('Acme');
    expect(localTodayIso(now)).toBe('2026-11-13');
  });
});

describe('featured tools', () => {
  it('explicitly includes quote-estimate-generator and receipt-generator', () => {
    expect(featuredToolSlugs).toContain('quote-estimate-generator');
    expect(featuredToolSlugs).toContain('receipt-generator');
    const featured = getFeaturedTools();
    expect(featured.map((t) => t.slug)).toEqual([...featuredToolSlugs]);
  });
});

describe('receipt preview surfaces invoice ref and balance', () => {
  it('includes Invoice / reference # and Balance remaining in document blocks', () => {
    const tool = getToolBySlug('receipt-generator');
    expect(tool).toBeTruthy();
    const blocks = buildDocumentBlocks(tool!, {
      ...tool!.defaults,
      invoiceRef: 'INV-1042',
      amountPaid: 500,
      balanceRemaining: 1500,
    });
    const text = JSON.stringify(blocks);
    expect(text).toContain('Invoice / reference #');
    expect(text).toContain('INV-1042');
    expect(text).toMatch(/Balance remaining/i);
    expect(text).toMatch(/1,?500/);
  });
});

describe('tool HowTo JSON-LD', () => {
  it('builds HowTo from howToUse steps for money tools', () => {
    for (const slug of ['receipt-generator', 'quote-estimate-generator', 'podcast-script-template']) {
      const tool = getToolBySlug(slug)!;
      const ld = howToJsonLd({
        name: `How to use the ${tool.shortName} generator`,
        description: tool.metaDescription,
        url: `https://docuklin.com/tools/${tool.slug}/`,
        steps: tool.content.howToUse,
      });
      expect(ld?.['@type']).toBe('HowTo');
      expect((ld as { step: unknown[] }).step.length).toBe(tool.content.howToUse.length);
    }
  });
});
