import { siteConfig } from '../config/site';
import type { FaqItem, ToolDefinition } from '../data/tools/types';

export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/**
 * Build the document <title> (also used for og:title / twitter:title).
 * Prefer ~30–60 chars at the source; CI enforces 25–65 (see docs/SEO-GUARDRAILS.md).
 * Skip brand suffix when the title already includes the brand.
 */
export function buildPageTitle(title: string): string {
  const hardMax = 65;
  const clip = (t: string) => (t.length <= hardMax ? t : `${t.slice(0, hardMax - 1).trim()}…`);
  if (
    title.includes(siteConfig.siteName) ||
    title.includes(siteConfig.siteShortName)
  ) {
    return clip(title);
  }
  const shortBrand = siteConfig.siteShortName;
  const suffix = ` | ${shortBrand}`;
  const withShort = `${title}${suffix}`;
  if (withShort.length <= hardMax) return withShort;
  // Reserve space for the brand suffix instead of shipping an unbranded title.
  const room = hardMax - suffix.length;
  if (room >= 25) {
    return `${title.slice(0, room - 1).trim()}…${suffix}`;
  }
  return clip(title);
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

const personId = () => `${siteConfig.author.canonicalPersonUrl}#person`;
const orgId = () => `${absoluteUrl('/')}#organization`;
const websiteId = () => `${absoluteUrl('/')}#website`;

function organizationLogo() {
  return {
    '@type': 'ImageObject',
    url: absoluteUrl(siteConfig.logoPath),
    width: 512,
    height: 512,
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Shared Person node — same @id on all five sibling sites. No photo unless real. */
export function personNode() {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: siteConfig.author.name,
    url: absoluteUrl('/about/'),
    description: siteConfig.author.shortBio,
    sameAs: [...siteConfig.author.sameAs],
    knowsAbout: [...siteConfig.author.knowsAbout],
  };
}

function organizationNode() {
  const email = siteConfig.contactEmail || undefined;
  return {
    '@type': 'Organization',
    '@id': orgId(),
    name: siteConfig.siteName,
    alternateName: [siteConfig.siteShortName],
    url: absoluteUrl('/'),
    ...(email ? { email } : {}),
    logo: organizationLogo(),
    sameAs: [...siteConfig.organizationSameAs],
    founder: { '@id': personId() },
    publishingPrinciples: absoluteUrl('/methodology/'),
    contactPoint: {
      '@type': 'ContactPoint',
      ...(email ? { email } : {}),
      contactType: 'customer support',
      url: absoluteUrl('/contact/'),
    },
  };
}

/** Home-page @graph: WebSite + Organization + Person */
export function homeGraphJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId(),
        name: siteConfig.siteName,
        alternateName: [siteConfig.siteShortName],
        url: absoluteUrl('/'),
        inLanguage: siteConfig.htmlLang,
        description: siteConfig.tagline,
        publisher: { '@id': orgId() },
      },
      organizationNode(),
      personNode(),
    ],
  };
}

/** Kept for BaseLayout on non-home pages — Organization + Person only. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...organizationNode(),
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(),
    name: siteConfig.siteName,
    alternateName: [siteConfig.siteShortName],
    url: absoluteUrl('/'),
    description: siteConfig.tagline,
    inLanguage: siteConfig.htmlLang,
    publisher: { '@id': orgId() },
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    ...personNode(),
  };
}

export function profilePageJsonLd(opts?: { dateCreated?: string; dateModified?: string }) {
  const launched = `${siteConfig.launchedAt}T00:00:00+05:00`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: opts?.dateCreated || launched,
    dateModified: opts?.dateModified || launched,
    mainEntity: {
      ...personNode(),
      // No image — no real headshot available; Google says omit rather than use a placeholder.
    },
  };
}

/** HowTo JSON-LD from numbered steps already shown on the page. */
export function howToJsonLd(opts: {
  name: string;
  description?: string;
  url: string;
  steps: string[];
}) {
  if (!opts.steps.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    step: opts.steps.map((text, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: `Step ${i + 1}`,
      text,
    })),
  };
}

export function toolPageGraphJsonLd(tool: ToolDefinition, pageUrl: string) {
  const citations = tool.content.sources.map((s) => s.url);
  const diagram = absoluteUrl(`/images/tools/${tool.slug}.svg`);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#app`,
        name: tool.name,
        url: pageUrl,
        applicationCategory: tool.applicationCategory,
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        browserRequirements: 'Requires JavaScript for the interactive editor',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: tool.metaDescription,
        author: {
          '@type': 'Person',
          '@id': personId(),
          name: siteConfig.author.name,
          url: absoluteUrl('/about/'),
        },
        publisher: { '@id': orgId() },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: tool.title,
        isPartOf: { '@id': websiteId() },
        mainEntity: { '@id': `${pageUrl}#app` },
        datePublished: `${tool.publishedAt}T00:00:00+05:00`,
        dateModified: `${tool.updatedAt}T00:00:00+05:00`,
        lastReviewed: tool.updatedAt,
        author: { '@id': personId() },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: diagram,
          width: 720,
          height: 400,
        },
        citation: citations,
      },
      personNode(),
    ],
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/** CollectionPage + ItemList for hubs and guides index. */
export function collectionPageJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  const pageUrl = absoluteUrl(opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    name: opts.name,
    description: opts.description,
    url: pageUrl,
    isPartOf: { '@id': websiteId() },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: opts.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    datePublished: `${opts.publishedAt}T00:00:00+05:00`,
    dateModified: `${opts.updatedAt}T00:00:00+05:00`,
    author: [
      {
        '@type': 'Person',
        name: siteConfig.author.name,
        url: absoluteUrl('/about/'),
      },
    ],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.siteName,
      url: absoluteUrl('/'),
      logo: organizationLogo(),
    },
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}

/** @deprecated — use toolPageGraphJsonLd */
export function webApplicationJsonLd(tool: ToolDefinition, pageUrl: string) {
  return toolPageGraphJsonLd(tool, pageUrl);
}
