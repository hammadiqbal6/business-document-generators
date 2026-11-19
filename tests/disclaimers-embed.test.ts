import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getToolBySlug } from '../src/data/tools';
import { guides } from '../src/data/guides';
import {
  INVOICE_RECEIPT_GUIDE_LEGAL_NOTE,
  isInvoiceOrReceiptTool,
  toolDisclaimerBanner,
  toolTrustDisclaimer,
} from '../src/lib/disclaimers';
import { siteConfig } from '../src/config/site';

describe('YMYL disclaimers', () => {
  it('flags invoice and receipt tools for tax/legal disclaimer', () => {
    for (const slug of [
      'contractor-invoice',
      'progress-invoice',
      'cleaning-service-invoice',
      'receipt-generator',
    ]) {
      const tool = getToolBySlug(slug)!;
      expect(isInvoiceOrReceiptTool(tool)).toBe(true);
      expect(toolDisclaimerBanner(tool)).toMatch(/not legal or tax advice/i);
      expect(toolTrustDisclaimer(tool)).toMatch(/not legal or tax advice/i);
    }
  });

  it('keeps contract tools on the legal-adjacent banner', () => {
    const tool = getToolBySlug('simple-nda')!;
    expect(tool.isLegalAdjacent).toBe(true);
    expect(toolDisclaimerBanner(tool)).toMatch(/not legal advice/i);
    expect(toolDisclaimerBanner(tool)).not.toMatch(/tax advice/i);
  });

  it('adds legalNote on invoice and receipt guides', () => {
    const slugs = [
      'invoice-vs-estimate',
      'what-to-include-on-a-receipt',
      'cleaning-invoice-rates-line-items',
      'contractor-invoice-example',
      'work-order-vs-invoice-vs-estimate',
    ];
    for (const slug of slugs) {
      const guide = guides.find((g) => g.slug === slug);
      expect(guide?.legalNote, slug).toBe(INVOICE_RECEIPT_GUIDE_LEGAL_NOTE);
    }
  });
});

describe('embed attribution', () => {
  it('ships a Powered by credit with rel="nofollow" in the copy snippet', () => {
    const src = readFileSync(resolve('src/components/content/EmbedSnippet.astro'), 'utf8');
    expect(src).toMatch(/Powered by <a href="\$\{pageUrl\}" rel="nofollow">/);
    expect(src).toContain('Embed this tool');
  });

  it('marks the embed-page credit as nofollow', () => {
    const src = readFileSync(resolve('src/pages/tools/[slug]/embed.astro'), 'utf8');
    expect(src).toMatch(/rel="nofollow"/);
    expect(src).toMatch(/Powered by \{siteConfig\.siteName\}/);
  });

  it('does not load ungated gtag/GA4 on embed pages', () => {
    const src = readFileSync(resolve('src/pages/tools/[slug]/embed.astro'), 'utf8');
    expect(src).not.toMatch(/googletagmanager\.com/);
    expect(src).not.toMatch(/gtag\s*\(/);
    expect(src).not.toMatch(/ga4MeasurementId/);
  });

  it('uses hello@docuklin.com as contact', () => {
    expect(siteConfig.contactEmail).toBe('hello@docuklin.com');
  });
});
