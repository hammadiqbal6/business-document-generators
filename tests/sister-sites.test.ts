import { describe, expect, it } from 'vitest';
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
    expect(sisterSiteDefaults.paymentFees).toBe(
      'https://payment-fee-calculators.hammadiqbal117.workers.dev',
    );
    expect(sisterSiteDefaults.businessDocs).toBe(
      'https://business-document-generators.hammadiqbal117.workers.dev',
    );
    expect(sisterSiteDefaults.homeGarden).toBe(
      'https://home-garden-calculators.hammadiqbal117.workers.dev',
    );
    expect(sisterSiteDefaults.fiberArts).toBe(
      'https://fiber-arts-calculators.hammadiqbal117.workers.dev',
    );
    expect(sisterSiteDefaults.pet).toBe('https://pet-calculators.hammadiqbal117.workers.dev');
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

