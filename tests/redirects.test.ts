import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('public/_redirects live-404 aliases', () => {
  const redirects = readFileSync(resolve('public/_redirects'), 'utf8');

  it('aliases WordPress-style sitemap_index.xml', () => {
    expect(redirects).toMatch(/\/sitemap_index\.xml\s+\/sitemap-index\.xml\s+301\b/);
  });

  it('sends guessed invoice tool URLs to contractor-invoice', () => {
    expect(redirects).toMatch(/\/tools\/invoice\/\s+\/tools\/contractor-invoice\/\s+301\b/);
    expect(redirects).toMatch(
      /\/tools\/invoice-generator\/\s+\/tools\/contractor-invoice\/\s+301\b/,
    );
  });

  it('aliases privacy-policy to /privacy/', () => {
    expect(redirects).toMatch(/\/privacy-policy\/\s+\/privacy\/\s+301\b/);
  });

  it('sends guessed estimate/quote URLs to quote-estimate-generator', () => {
    expect(redirects).toMatch(
      /\/tools\/estimate-generator\/\s+\/tools\/quote-estimate-generator\/\s+301\b/,
    );
    expect(redirects).toMatch(
      /\/tools\/quote-generator\/\s+\/tools\/quote-estimate-generator\/\s+301\b/,
    );
    expect(redirects).toMatch(/\/tools\/estimate\/\s+\/tools\/quote-estimate-generator\/\s+301\b/);
  });

  it('quiets crawler /tools/:slug/null paths', () => {
    expect(redirects).toMatch(/\/tools\/:slug\/null\/?\s+\/tools\/:slug\/\s+301\b/);
  });
});
