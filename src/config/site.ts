/**
 * SINGLE OWNER CONFIG — prefer env vars (PUBLIC_*) when deploying; this file supplies defaults.
 * Workers Builds should set PUBLIC_* keys (see .env.example); fallbacks match production workers.dev.
 */
const DEFAULT_SITE_URL =
  'https://business-document-generators.hammadiqbal117.workers.dev';

export const siteConfig = {
  /** Public site origin (no trailing slash). Used for canonicals, sitemap, OG, robots, llms. */
  siteUrl: import.meta.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  /** Brand shown in header, titles, schema Organization. */
  siteName: import.meta.env.PUBLIC_SITE_NAME || 'DocuForge Tools',
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
  /** Default author display name for Article schema and bylines. */
  defaultAuthor: 'DocuForge Editorial',
  /** Default reviewer for E-E-A-T reviewer boxes. */
  defaultReviewer: 'DocuForge Review Team',
  /** ISO date used as sitewide "published" baseline when a page omits one. */
  launchedAt: '2026-10-19',
  /** Locale for schema and html lang. */
  locale: 'en_US',
  /** Theme color for manifest / browser chrome. */
  themeColor: '#0f3d3e',
} as const;

export type SiteConfig = typeof siteConfig;
