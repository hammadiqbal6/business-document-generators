import { describe, expect, it } from 'vitest';
import { quoteEstimate } from '../src/data/tools/estimates';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import {
  invoiceHandoffHref,
  isEstimateHandoffUrl,
  mapEstimateToInvoiceValues,
} from '../src/lib/estimateToInvoiceHandoff';

describe('mapEstimateToInvoiceValues', () => {
  it('carries company, client, line items, and tax into invoice fields', () => {
    const estimate = {
      ...quoteEstimate.defaults,
      companyName: 'Acme Co',
      companyEmail: 'billing@acme.example',
      companyPhone: '555-0100',
      companyLogo: 'data:image/png;base64,AAA',
      clientName: 'Jordan Client',
      clientEmail: 'jordan@client.example',
      docNumber: 'E-42',
      projectTitle: 'Lobby refresh',
      description: 'Paint and trim',
      taxRate: 6.5,
      notes: 'Excludes permits',
      lineItems: [
        { description: 'Labor', quantity: 8, unit: 'hr', rate: 75 },
        { description: 'Paint', quantity: 2, unit: 'gal', rate: 40 },
      ],
    };

    const invoice = mapEstimateToInvoiceValues(estimate, new Date(2026, 10, 19));

    expect(invoice.companyName).toBe('Acme Co');
    expect(invoice.companyEmail).toBe('billing@acme.example');
    expect(invoice.companyPhone).toBe('555-0100');
    expect(invoice.clientName).toBe('Jordan Client');
    expect(invoice.lineItems).toEqual(estimate.lineItems);
    expect(invoice.taxRate).toBe(6.5);
    expect(invoice.poNumber).toBe('E-42');
    expect(invoice.invoiceNumber).toBe('INV-E-42');
    expect(invoice.invoiceDate).toBe('2026-11-19');
    expect(invoice.dueDate).toBe('2026-12-03');
    expect(invoice.amountPaid).toBe(0);
    expect(String(invoice.notes)).toContain('From estimate E-42');
    expect(String(invoice.notes)).toContain('Project: Lobby refresh');
    expect(String(invoice.notes)).toContain('Client email: jordan@client.example');
    // Logo must not ride along (invoice has no logo field; keeps payload small).
    expect(invoice).not.toHaveProperty('companyLogo');
  });
});

describe('isEstimateHandoffUrl / invoiceHandoffHref', () => {
  it('documents query + hash handoff', () => {
    expect(invoiceHandoffHref()).toBe('/tools/contractor-invoice/?from=estimate#handoff');
    expect(isEstimateHandoffUrl('?from=estimate', '#handoff')).toBe(true);
    expect(isEstimateHandoffUrl('from=estimate', 'handoff')).toBe(true);
    expect(isEstimateHandoffUrl('', '#from-estimate')).toBe(true);
    expect(isEstimateHandoffUrl('?foo=1', '#other')).toBe(false);
  });
});

describe('quote-estimate documentModel', () => {
  it('shows Valid until and optional logo image block', () => {
    const values = {
      ...quoteEstimate.defaults,
      companyLogo: 'data:image/png;base64,iVBORw0KGgo=',
      validUntil: '2026-12-01',
    };
    const blocks = buildDocumentBlocks(quoteEstimate, values);
    expect(blocks.some((b) => b.type === 'image' && b.src?.startsWith('data:image/'))).toBe(true);
    const kv = blocks.find(
      (b) => b.type === 'kv' && b.pairs?.some((p) => p.label === 'Valid until'),
    );
    expect(kv?.pairs?.find((p) => p.label === 'Valid until')?.value).toBe('2026-12-01');
  });

  it('includes FAQ: Can an estimate be used as an invoice?', () => {
    const faq = quoteEstimate.content.faq.find(
      (f) => f.question === 'Can an estimate be used as an invoice?',
    );
    expect(faq).toBeTruthy();
    expect(faq!.answer.toLowerCase()).toContain('no');
    expect(faq!.answer).toContain('/guides/invoice-vs-estimate/');
  });
});
