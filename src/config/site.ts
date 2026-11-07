/**
 * SINGLE OWNER CONFIG — prefer env vars (PUBLIC_*) when deploying; this file supplies defaults.
 * Workers Builds should set PUBLIC_* keys (see .env.example + docs/CONFIGURATION.md).
 * Site origin / brand fallbacks live in ./siteDefaults.mjs only.
 *
 * Authorship follows docs/playbook (one-person tool site): named maintainer only,
 * no fabricated reviewers, same Person @id across sibling tool sites.
 */
import { sisterSites, sisterUrl } from './sisterSites';
import {
  DEFAULT_AUTHOR_BIO,
  DEFAULT_AUTHOR_EMAIL,
  DEFAULT_AUTHOR_NAME,
  DEFAULT_AUTHOR_SAME_AS,
  DEFAULT_AUTHOR_URL,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_CONTACT_EMAIL,
  DEFAULT_COPYRIGHT_OWNER,
  DEFAULT_HTML_LANG,
  DEFAULT_LAUNCHED_AT,
  DEFAULT_LOCALE,
  DEFAULT_LOGO_PATH,
  DEFAULT_MANIFEST_DESCRIPTION,
  DEFAULT_OG_DEFAULT_SUBTITLE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_FOOTER,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_ORG_SAME_AS,
  DEFAULT_SITE_NAME,
  DEFAULT_SITE_SHORT_NAME,
  DEFAULT_SITE_TAGLINE,
  DEFAULT_SITE_URL,
  DEFAULT_SISTER_NAME_FIBER_ARTS,
  DEFAULT_SISTER_NAME_HOME_GARDEN,
  DEFAULT_SISTER_NAME_PAYMENT_FEES,
  DEFAULT_SISTER_NAME_PET,
  DEFAULT_THEME_COLOR,
  applyBrandTemplate,
  parseList,
} from './siteDefaults.mjs';

export { DEFAULT_SITE_URL, applyBrandTemplate, parseList };

const env = import.meta.env;

const siteName = env.PUBLIC_SITE_NAME || DEFAULT_SITE_NAME;
const siteShortName = env.PUBLIC_SITE_SHORT_NAME || DEFAULT_SITE_SHORT_NAME;
const authorUrl = (env.PUBLIC_AUTHOR_URL || DEFAULT_AUTHOR_URL).replace(/\/$/, '');
const authorSameAs = parseList(env.PUBLIC_AUTHOR_SAME_AS, DEFAULT_AUTHOR_SAME_AS);
const orgSameAsRaw = parseList(env.PUBLIC_ORG_SAME_AS, DEFAULT_ORG_SAME_AS);
const orgSameAs = orgSameAsRaw.length ? orgSameAsRaw : authorSameAs;
const copyrightOwner =
  (env.PUBLIC_COPYRIGHT_OWNER || DEFAULT_COPYRIGHT_OWNER).trim() || siteName;

/** Stable Person @id shared across sibling tool sites (overridable). */
export const CANONICAL_PERSON_URL = authorUrl;

export const siteConfig = {
  /** Public site origin (no trailing slash). Used for canonicals, sitemap, OG, robots, llms. */
  siteUrl: env.PUBLIC_SITE_URL || DEFAULT_SITE_URL,
  /** Brand shown in header, titles, schema Organization. */
  siteName,
  /** Short name for apple-mobile-web-app-title / manifest / JSON-LD alternateName. */
  siteShortName,
  /** Short tagline for homepage and Organization description. */
  tagline: env.PUBLIC_SITE_TAGLINE || DEFAULT_SITE_TAGLINE,
  /** Manifest / PWA description (shorter than tagline). */
  manifestDescription: env.PUBLIC_MANIFEST_DESCRIPTION || DEFAULT_MANIFEST_DESCRIPTION,
  /** Contact email for Contact page and schema. */
  contactEmail: env.PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL,
  /** Footer © line owner. */
  copyrightOwner,
  /**
   * EmailJS (free plan) — public IDs only. All three required to show the contact form.
   * Private key must never be committed. See docs/CONTACT-EMAILJS.md.
   */
  emailjs: {
    serviceId: (env.PUBLIC_EMAILJS_SERVICE_ID || '').trim(),
    templateId: (env.PUBLIC_EMAILJS_TEMPLATE_ID || '').trim(),
    publicKey: (env.PUBLIC_EMAILJS_PUBLIC_KEY || '').trim(),
  },
  /** Optional Twitter/X handle without @. */
  twitterHandle: env.PUBLIC_TWITTER_HANDLE || '',
  /** Google AdSense publisher ID, e.g. ca-pub-XXXXXXXXXXXXXXXX. Leave empty to disable ads. */
  adsensePublisherId: env.PUBLIC_ADSENSE_PUBLISHER_ID || '',
  /** Set true only after AdSense approval and publisher ID is set. */
  adsEnabled: (env.PUBLIC_ADS_ENABLED || 'false') === 'true',
  /** Enable Auto ads (documented in docs/ADSENSE.md). Requires adsEnabled. */
  adsenseAutoAds: (env.PUBLIC_ADSENSE_AUTO_ADS || 'false') === 'true',
  /**
   * Numeric AdSense ad unit IDs for fixed in-page display slots.
   * Shared `display` covers all placements; optional home/tool override.
   * Non-numeric / empty → AdSlot renders nothing (Auto ads unaffected).
   */
  adsenseSlots: {
    display: (env.PUBLIC_ADSENSE_SLOT_DISPLAY || '').trim(),
    home: (env.PUBLIC_ADSENSE_SLOT_HOME || '').trim(),
    tool: (env.PUBLIC_ADSENSE_SLOT_TOOL || '').trim(),
  },

  /** GA4 measurement ID, e.g. G-XXXXXXXXXX. Empty = no GA4 script. */
  ga4MeasurementId: env.PUBLIC_GA4_MEASUREMENT_ID || 'G-HR4DDMD97H',
  /**
   * Google Search Console HTML tag content value (meta name="google-site-verification").
   * Prefer PUBLIC_GSC_VERIFICATION; PUBLIC_GOOGLE_SITE_VERIFICATION kept as a fallback alias.
   */
  googleSiteVerification:
    env.PUBLIC_GSC_VERIFICATION ||
    env.PUBLIC_GOOGLE_SITE_VERIFICATION ||
    '0-q_NxhBgfgCm4WOLfbe9VrHrjbLzaxh8SXsbo2Q-UU',

  /** Bing Webmaster Tools meta verification content. */
  bingSiteVerification: env.PUBLIC_BING_SITE_VERIFICATION || '',
  /** IndexNow key (also place matching file at /public/{key}.txt). */
  indexNowKey: env.PUBLIC_INDEXNOW_KEY || '4d6f1ea5473a0968a83c67ceda5a0387',

  author: {
    name: env.PUBLIC_AUTHOR_NAME || DEFAULT_AUTHOR_NAME,
    email: env.PUBLIC_AUTHOR_EMAIL || DEFAULT_AUTHOR_EMAIL,
    shortBio: env.PUBLIC_AUTHOR_BIO || DEFAULT_AUTHOR_BIO,
    canonicalPersonUrl: authorUrl,
    sameAs: (authorSameAs.length ? authorSameAs : [authorUrl]) as string[],
    knowsAbout: [
      'business document templates',
      'in-browser PDF generators',
      'small-business paperwork',
    ],
  },

  /** @deprecated use author.name */
  defaultAuthor: env.PUBLIC_AUTHOR_NAME || DEFAULT_AUTHOR_NAME,

  /** ISO date used as sitewide "published" baseline when a page omits one. */
  launchedAt: env.PUBLIC_LAUNCHED_AT || DEFAULT_LAUNCHED_AT,
  /** Locale for og:locale. */
  locale: env.PUBLIC_LOCALE || DEFAULT_LOCALE,
  /** <html lang>. */
  htmlLang: env.PUBLIC_HTML_LANG || DEFAULT_HTML_LANG,
  /** Theme color for manifest / browser chrome / CSS --brand. */
  themeColor: env.PUBLIC_THEME_COLOR || DEFAULT_THEME_COLOR,
  /** Manifest background_color. */
  backgroundColor: env.PUBLIC_BACKGROUND_COLOR || DEFAULT_BACKGROUND_COLOR,
  /** Organization logo path. */
  logoPath: env.PUBLIC_LOGO_PATH || DEFAULT_LOGO_PATH,
  /** Organization sameAs profile URLs. */
  organizationSameAs: orgSameAs as string[],
  /** Default Open Graph image (1200×630). */
  ogImagePath: env.PUBLIC_OG_IMAGE_PATH || DEFAULT_OG_IMAGE_PATH,
  ogImageAlt: applyBrandTemplate(env.PUBLIC_OG_IMAGE_ALT || DEFAULT_OG_IMAGE_ALT, {
    name: siteName,
    shortName: siteShortName,
  }),
  /** Footer line baked into generated OG SVGs. */
  ogImageFooter: applyBrandTemplate(
    env.PUBLIC_OG_IMAGE_FOOTER || DEFAULT_OG_IMAGE_FOOTER,
    { name: siteName, shortName: siteShortName },
  ),
  /** Subtitle on og-default.svg. */
  ogDefaultSubtitle: env.PUBLIC_OG_DEFAULT_SUBTITLE || DEFAULT_OG_DEFAULT_SUBTITLE,

  /**
   * Sibling tool sites by the same maintainer (listed only on /about/).
   * Origins come from PUBLIC_SITE_URL_* env vars via sisterSites config.
   */
  siblingSites: [
    {
      name: env.PUBLIC_SISTER_NAME_PAYMENT_FEES || DEFAULT_SISTER_NAME_PAYMENT_FEES,
      url: sisterUrl('paymentFees'),
    },
    {
      name: env.PUBLIC_SISTER_NAME_HOME_GARDEN || DEFAULT_SISTER_NAME_HOME_GARDEN,
      url: sisterUrl('homeGarden'),
    },
    {
      name: env.PUBLIC_SISTER_NAME_FIBER_ARTS || DEFAULT_SISTER_NAME_FIBER_ARTS,
      url: sisterUrl('fiberArts'),
    },
    {
      name: env.PUBLIC_SISTER_NAME_PET || DEFAULT_SISTER_NAME_PET,
      url: sisterUrl('pet'),
    },
  ],

  /** Raw sister origins (no trailing slash) for any other consumers. */
  sisterSites,
} as const;

export type SiteConfig = typeof siteConfig;
export { sisterSites, sisterUrl };
