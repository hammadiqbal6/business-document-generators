/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_TAGLINE?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_TWITTER_HANDLE?: string;
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  readonly PUBLIC_INDEXNOW_KEY?: string;
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
  readonly PUBLIC_ADS_ENABLED?: string;
  readonly PUBLIC_ADSENSE_AUTO_ADS?: string;
  /** Sister-site origins (no trailing slash). Same names on all five repos. */
  readonly PUBLIC_SITE_URL_PAYMENT_FEES?: string;
  readonly PUBLIC_SITE_URL_BUSINESS_DOCS?: string;
  readonly PUBLIC_SITE_URL_HOME_GARDEN?: string;
  readonly PUBLIC_SITE_URL_FIBER_ARTS?: string;
  readonly PUBLIC_SITE_URL_PET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
