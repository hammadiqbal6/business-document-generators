import { describe, expect, it } from 'vitest';
import { DEFAULT_SITE_URL, siteConfig } from '../src/config/site';
import { absoluteUrl } from '../src/lib/seo';

describe('site origin', () => {
  it('exports a single DEFAULT_SITE_URL fallback', () => {
    expect(DEFAULT_SITE_URL).toMatch(/^https:\/\//);
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
});
