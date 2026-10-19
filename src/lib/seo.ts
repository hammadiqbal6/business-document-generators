import { siteConfig } from '../config/site';
import type { ToolDefinition } from '../data/tools/types';

export function absoluteUrl(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
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

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.siteName,
    url: absoluteUrl('/'),
    description: siteConfig.tagline,
    inLanguage: 'en-US',
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
  };
}

export function organizationJsonLd() {
  const sameAs: string[] = [];
  if (siteConfig.twitterHandle) {
    sameAs.push(`https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`);
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: siteConfig.siteName,
    url: absoluteUrl('/'),
    email: siteConfig.contactEmail,
    logo: absoluteUrl('/favicon.svg'),
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function webApplicationJsonLd(tool: ToolDefinition, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    applicationCategory: tool.applicationCategory,
    operatingSystem: 'Web browser',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: tool.metaDescription,
    url: pageUrl,
    isAccessibleForFree: true,
    datePublished: tool.publishedAt,
    dateModified: tool.updatedAt,
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
    datePublished: opts.publishedAt,
    dateModified: opts.updatedAt,
    author: {
      '@type': 'Person',
      name: siteConfig.defaultAuthor,
    },
    publisher: { '@id': `${absoluteUrl('/')}#organization` },
    mainEntityOfPage: absoluteUrl(opts.path),
  };
}
