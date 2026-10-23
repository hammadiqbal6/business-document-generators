/**
 * SINGLE OWNER CONFIG — prefer env vars (PUBLIC_*) when deploying; this file supplies defaults.
 * Workers Builds should set PUBLIC_* keys (see .env.example). Site origin fallback is
 * DEFAULT_SITE_URL from ./siteDefaults.mjs only — see docs/CUSTOM-DOMAIN.md.
 *
 * Authorship follows docs/playbook (one-person tool site): named maintainer only,
 * no fabricated reviewers, same Person @id across sibling tool sites.
 */
import { sisterSites, sisterUrl } from './sisterSites';
import { DEFAULT_SITE_URL } from './siteDefaults.mjs';

export { DEFAULT_SITE_URL };

/** Stable Person @id shared across all five sibling tool sites. */
export const CANONICAL_PERSON_URL = 'https://github.com/hammadiqbal6';

export const siteConfig = {
  /** Public site origin (no trailing slash). Used for canonicals, sitemap, OG, robots, llms. */
  siteUrl: import.meta.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  /** Brand shown in header, titles, schema Organization. */
  siteName: import.meta.env.PUBLIC_SITE_NAME || 'DocuForge Tools',
  /** Short name for apple-mobile-web-app-title / manifest. */
  siteShortName: 'DocuForge',
  /** Short tagline for homepage and Organization description. */
  tagline:
    import.meta.env.PUBLIC_SITE_TAGLINE ||
    'Free niche business document generators — fill a form, preview live, export PDF or DOCX. Nothing leaves your browser.',
  /** Contact email for Contact page and schema. */
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || 'hammadiqbal117@gmail.com',
  /** Optional Twitter/X handle without @. */
  twitterHandle: import.meta.env.PUBLIC_TWITTER_HANDLE || '',
  /** Google AdSense publisher ID, e.g. ca-pub-XXXXXXXXXXXXXXXX. Leave empty to disable ads. */
  adsensePublisherId: import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID || '',
  /** Set true only after AdSense approval and publisher ID is set. */
  adsEnabled: (import.meta.env.PUBLIC_ADS_ENABLED || 'false') === 'true',
  /** Enable Auto ads (documented in docs/ADSENSE.md). Requires adsEnabled. */
  adsenseAutoAds: (import.meta.env.PUBLIC_ADSENSE_AUTO_ADS || 'false') === 'true',
  /** GA4 measurement ID, e.g. G-XXXXXXXXXX. Empty = no GA4 script. */
  ga4MeasurementId: import.meta.env.PUBLIC_GA4_MEASUREMENT_ID || 'G-HR4DDMD97H',
  /**
   * Google Search Console HTML tag content value (meta name="google-site-verification").
   * Prefer PUBLIC_GSC_VERIFICATION; PUBLIC_GOOGLE_SITE_VERIFICATION kept as a fallback alias.
   */
  googleSiteVerification:
    import.meta.env.PUBLIC_GSC_VERIFICATION ||
    import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION ||
    '0-q_NxhBgfgCm4WOLfbe9VrHrjbLzaxh8SXsbo2Q-UU',

  /** Bing Webmaster Tools meta verification content. */
  bingSiteVerification: import.meta.env.PUBLIC_BING_SITE_VERIFICATION || '',
  /** IndexNow key (also place matching file at /public/{key}.txt). */
  indexNowKey: import.meta.env.PUBLIC_INDEXNOW_KEY || '4d6f1ea5473a0968a83c67ceda5a0387',

  author: {
    name: 'Hammad Iqbal',
    email: 'hammadiqbal117@gmail.com',
    /** Honest short bio — no invented credentials. */
    shortBio:
      'I build and maintain free in-browser tools. I turn published public sources into practical generators and show which sources each page uses. I am not a lawyer, accountant, or licensed professional advisor.',
    /** Canonical Person @id (same on all sibling sites). */
    canonicalPersonUrl: CANONICAL_PERSON_URL,
    /** Real profile URLs only. */
    sameAs: [CANONICAL_PERSON_URL] as string[],
    knowsAbout: [
      'business document templates',
      'in-browser PDF generators',
      'small-business paperwork',
    ],
  },

  /** @deprecated use author.name */
  defaultAuthor: 'Hammad Iqbal',

  /** ISO date used as sitewide "published" baseline when a page omits one. */
  launchedAt: '2026-10-19',
  /** Locale for schema and html lang. */
  locale: 'en_US',
  /** Theme color for manifest / browser chrome. */
  themeColor: '#0f6b5c',
  /** Default Open Graph image (1200×630 PNG). */
  ogImagePath: '/og-default.png',
  ogImageAlt: 'DocuForge Tools — free invoice, estimate, and contract templates with PDF export',

  /**
   * Sibling tool sites by the same maintainer (listed only on /about/).
   * Origins come from PUBLIC_SITE_URL_* env vars via sisterSites config.
   */
  siblingSites: [
    {
      name: 'FeeCalc (payment fee calculators)',
      url: sisterUrl('paymentFees'),
    },
    {
      name: 'YardCalc (home & garden calculators)',
      url: sisterUrl('homeGarden'),
    },
    {
      name: 'FiberCalc (knitting & crochet calculators)',
      url: sisterUrl('fiberArts'),
    },
    {
      name: 'PetCalc (pet calculators)',
      url: sisterUrl('pet'),
    },
  ],

  /** Raw sister origins (no trailing slash) for any other consumers. */
  sisterSites,
} as const;

export type SiteConfig = typeof siteConfig;
export { sisterSites, sisterUrl };
