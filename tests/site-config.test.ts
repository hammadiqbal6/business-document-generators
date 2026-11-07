import { describe, expect, it } from 'vitest';
import {
  DEFAULT_SITE_NAME,
  DEFAULT_SITE_SHORT_NAME,
  DEFAULT_SITE_URL,
  DEFAULT_THEME_COLOR,
  applyBrandTemplate,
  parseList,
} from '../src/config/siteDefaults.mjs';
import { DEFAULT_SITE_URL as exportedUrl, siteConfig } from '../src/config/site';
import { absoluteUrl, homeGraphJsonLd, organizationJsonLd } from '../src/lib/seo';

describe('site origin', () => {
  it('exports a single DEFAULT_SITE_URL fallback', () => {
    expect(DEFAULT_SITE_URL).toBe('https://docuklin.com');
    expect(exportedUrl).toBe(DEFAULT_SITE_URL);
    expect(DEFAULT_SITE_URL.endsWith('/')).toBe(false);
  });

  it('siteConfig.siteUrl has no trailing slash', () => {
    expect(siteConfig.siteUrl.endsWith('/')).toBe(false);
  });

  it('absoluteUrl preserves file paths without forcing a trailing slash', () => {
    expect(absoluteUrl('/og-default.png')).toBe(`${siteConfig.siteUrl}/og-default.png`);
    expect(absoluteUrl('/og-default.png').endsWith('/')).toBe(false);
  });

  it('absoluteUrl keeps page trailing slashes', () => {
    expect(absoluteUrl('/tools/')).toBe(`${siteConfig.siteUrl}/tools/`);
  });

  it('exposes EmailJS public config (empty unless PUBLIC_EMAILJS_* set)', () => {
    expect(siteConfig.emailjs).toEqual({
      serviceId: expect.any(String),
      templateId: expect.any(String),
      publicKey: expect.any(String),
    });
  });

  it('exposes AdSense slot id config (empty unless PUBLIC_ADSENSE_SLOT_* set)', () => {
    expect(siteConfig.adsenseSlots).toEqual({
      display: expect.any(String),
      home: expect.any(String),
      tool: expect.any(String),
    });
  });
});


describe('brand defaults (Docuklin live output)', () => {
  it('uses Docuklin identity defaults when PUBLIC_* are unset', () => {
    expect(siteConfig.siteName).toBe(DEFAULT_SITE_NAME);
    expect(siteConfig.siteShortName).toBe(DEFAULT_SITE_SHORT_NAME);
    expect(siteConfig.themeColor).toBe(DEFAULT_THEME_COLOR);
    expect(siteConfig.copyrightOwner).toBe(siteConfig.siteName);
    expect(siteConfig.ogImageAlt).toContain('Docuklin');
    expect(siteConfig.author.name).toBe('Hammad Iqbal');
    expect(siteConfig.logoPath).toBe('/logo-512.png');
  });

  it('expands {name} / {short} brand templates', () => {
    expect(applyBrandTemplate('{name} · {short}', { name: 'A', shortName: 'B' })).toBe(
      'A · B',
    );
  });

  it('parses comma-separated sameAs / host lists', () => {
    expect(parseList('https://a.example, https://b.example')).toEqual([
      'https://a.example',
      'https://b.example',
    ]);
    expect(parseList('', 'https://only.example')).toEqual(['https://only.example']);
  });

  it('puts configurable name / alternateName / logo / sameAs on Organization JSON-LD', () => {
    const org = organizationJsonLd();
    expect(org.name).toBe(siteConfig.siteName);
    expect(org.alternateName).toEqual([siteConfig.siteShortName]);
    expect(org.logo.url).toBe(`${siteConfig.siteUrl}${siteConfig.logoPath}`);
    expect(org.sameAs).toEqual([...siteConfig.organizationSameAs]);

    const home = homeGraphJsonLd();
    const graphOrg = home['@graph'].find((n: { '@type'?: string }) => n['@type'] === 'Organization');
    expect(graphOrg?.sameAs).toEqual([...siteConfig.organizationSameAs]);
  });
});
