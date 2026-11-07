/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_SHORT_NAME?: string;
  readonly PUBLIC_SITE_TAGLINE?: string;
  readonly PUBLIC_MANIFEST_DESCRIPTION?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_COPYRIGHT_OWNER?: string;
  readonly PUBLIC_AUTHOR_NAME?: string;
  readonly PUBLIC_AUTHOR_EMAIL?: string;
  readonly PUBLIC_AUTHOR_BIO?: string;
  readonly PUBLIC_AUTHOR_URL?: string;
  readonly PUBLIC_AUTHOR_SAME_AS?: string;
  readonly PUBLIC_ORG_SAME_AS?: string;
  readonly PUBLIC_THEME_COLOR?: string;
  readonly PUBLIC_BACKGROUND_COLOR?: string;
  readonly PUBLIC_LOCALE?: string;
  readonly PUBLIC_HTML_LANG?: string;
  readonly PUBLIC_LAUNCHED_AT?: string;
  readonly PUBLIC_LOGO_PATH?: string;
  readonly PUBLIC_OG_IMAGE_PATH?: string;
  readonly PUBLIC_OG_IMAGE_ALT?: string;
  readonly PUBLIC_OG_IMAGE_FOOTER?: string;
  readonly PUBLIC_OG_DEFAULT_SUBTITLE?: string;
  readonly PUBLIC_TWITTER_HANDLE?: string;
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
  readonly PUBLIC_BING_SITE_VERIFICATION?: string;
  readonly PUBLIC_INDEXNOW_KEY?: string;
  readonly PUBLIC_ADSENSE_PUBLISHER_ID?: string;
  readonly PUBLIC_ADS_ENABLED?: string;
  readonly PUBLIC_ADSENSE_AUTO_ADS?: string;
  /** Footer "Featured on Fazier" badge. Default true when unset. */
  readonly PUBLIC_FAZIER_BADGE_ENABLED?: string;
  /** Shared numeric AdSense display unit id for in-page AdSlot placements. */
  readonly PUBLIC_ADSENSE_SLOT_DISPLAY?: string;
  /** Optional homepage AdSlot unit id (falls back to PUBLIC_ADSENSE_SLOT_DISPLAY). */
  readonly PUBLIC_ADSENSE_SLOT_HOME?: string;
  /** Optional tool-page AdSlot unit id (falls back to PUBLIC_ADSENSE_SLOT_DISPLAY). */
  readonly PUBLIC_ADSENSE_SLOT_TOOL?: string;
  readonly PUBLIC_EMAILJS_SERVICE_ID?: string;
  readonly PUBLIC_EMAILJS_TEMPLATE_ID?: string;
  readonly PUBLIC_EMAILJS_PUBLIC_KEY?: string;
  /** Sister-site origins (no trailing slash). Same names on all five repos. */
  readonly PUBLIC_SITE_URL_PAYMENT_FEES?: string;
  readonly PUBLIC_SITE_URL_BUSINESS_DOCS?: string;
  readonly PUBLIC_SITE_URL_HOME_GARDEN?: string;
  readonly PUBLIC_SITE_URL_FIBER_ARTS?: string;
  readonly PUBLIC_SITE_URL_PET?: string;
  readonly PUBLIC_SISTER_NAME_PAYMENT_FEES?: string;
  readonly PUBLIC_SISTER_NAME_HOME_GARDEN?: string;
  readonly PUBLIC_SISTER_NAME_FIBER_ARTS?: string;
  readonly PUBLIC_SISTER_NAME_PET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
