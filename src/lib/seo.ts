import { CANONICAL_PERSON_URL, siteConfig } from '../config/site';
import type { FaqItem, ToolDefinition } from '../data/tools/types';

export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

/** Prefer writing titles ≤60 chars at the source. Skip brand suffix when already long. */
export function buildPageTitle(title: string): string {
  if (title.includes(siteConfig.siteName) || title.includes('DocuForge')) {
    return title;
  }
  const shortBrand = siteConfig.siteShortName;
  const withShort = `${title} | ${shortBrand}`;
  if (withShort.length <= 60) return withShort;
  if (title.length <= 60) return title;
  return title;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

const personId = `${CANONICAL_PERSON_URL}#person`;
const orgId = () => `${absoluteUrl('/')}#organization`;
const websiteId = () => `${absoluteUrl('/')}#website`;

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
    '@id': personId,
    name: siteConfig.author.name,
    url: absoluteUrl('/about/'),
    description: siteConfig.author.shortBio,
    sameAs: [...siteConfig.author.sameAs],
    knowsAbout: [...siteConfig.author.knowsAbout],
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
        inLanguage: 'en',
        description: siteConfig.tagline,
        publisher: { '@id': orgId() },
      },
      {
        '@type': 'Organization',
        '@id': orgId(),
        name: siteConfig.siteName,
        url: absoluteUrl('/'),
        email: siteConfig.contactEmail,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/logo-512.png'),
          width: 512,
          height: 512,
        },
        founder: { '@id': personId },
        publishingPrinciples: absoluteUrl('/methodology/'),
        contactPoint: {
          '@type': 'ContactPoint',
          email: siteConfig.contactEmail,
          contactType: 'customer support',
          url: absoluteUrl('/contact/'),
        },
      },
      personNode(),
    ],
  };
}

/** Kept for BaseLayout on non-home pages — Organization + Person only. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': orgId(),
    name: siteConfig.siteName,
    url: absoluteUrl('/'),
    email: siteConfig.contactEmail,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo-512.png'),
      width: 512,
      height: 512,
    },
    founder: { '@id': personId },
    publishingPrinciples: absoluteUrl('/methodology/'),
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
    inLanguage: 'en',
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
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: opts?.dateCreated || `${siteConfig.launchedAt}T00:00:00+05:00`,
    dateModified: opts?.dateModified || '2026-10-20T00:00:00+05:00',
    mainEntity: {
      ...personNode(),
      // No image — no real headshot available; Google says omit rather than use a placeholder.
    },
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
          '@id': personId,
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
        author: { '@id': personId },
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
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logo-512.png'),
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}

/** @deprecated — use toolPageGraphJsonLd */
export function webApplicationJsonLd(tool: ToolDefinition, pageUrl: string) {
  return toolPageGraphJsonLd(tool, pageUrl);
}
