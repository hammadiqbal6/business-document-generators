import { describe, expect, it } from 'vitest';
import { DEFAULT_SITE_URL } from '../src/config/siteDefaults.mjs';
import { sisterSiteDefaults, sisterSites, sisterUrl } from '../src/config/sisterSites';

describe('sisterSites config', () => {
  it('exposes five origins without trailing slashes', () => {
    expect(Object.keys(sisterSites).sort()).toEqual([
      'businessDocs',
      'fiberArts',
      'homeGarden',
      'paymentFees',
      'pet',
    ]);
    for (const url of Object.values(sisterSites)) {
      expect(url).toMatch(/^https:\/\//);
      expect(url.endsWith('/')).toBe(false);
    }
  });

  it('documents workers.dev defaults for when env vars are missing', () => {
    expect(sisterSiteDefaults.paymentFees).toMatch(/payment-fee-calculators/);
    // This site's origin default is the single siteDefaults export (not duplicated).
    expect(sisterSiteDefaults.businessDocs).toBe(DEFAULT_SITE_URL);
    expect(sisterSiteDefaults.homeGarden).toMatch(/home-garden-calculators/);
    expect(sisterSiteDefaults.fiberArts).toMatch(/fiber-arts-calculators/);
    expect(sisterSiteDefaults.pet).toMatch(/pet-calculators/);
  });

  it('builds absolute sister paths with trailing slash from live config', () => {
    expect(sisterUrl('paymentFees', '/tools/stripe-fee-calculator/')).toBe(
      `${sisterSites.paymentFees}/tools/stripe-fee-calculator/`,
    );
    expect(sisterUrl('homeGarden', 'calculators/concrete-calculator')).toBe(
      `${sisterSites.homeGarden}/calculators/concrete-calculator/`,
    );
  });
});

