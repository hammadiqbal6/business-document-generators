import type { ToolCategory, ToolDefinition } from './types';
import { CATEGORY_META } from './types';
import {
  cateringQuote,
  cleaningInvoice,
  constructionEstimate,
  contractorInvoice,
  quoteEstimate,
  receiptGenerator,
  workOrder,
} from './estimates';
import {
  eventVendorContract,
  freelanceWebContract,
  photographyContract,
  simpleNda,
  videographyContract,
} from './contracts';
import {
  podcastScript,
  realEstateFlyer,
  rentalApplication,
  tattooConsent,
} from './forms-creative';

export const allTools: ToolDefinition[] = [
  constructionEstimate,
  contractorInvoice,
  photographyContract,
  videographyContract,
  podcastScript,
  realEstateFlyer,
  tattooConsent,
  freelanceWebContract,
  cleaningInvoice,
  cateringQuote,
  eventVendorContract,
  rentalApplication,
  simpleNda,
  workOrder,
  receiptGenerator,
  quoteEstimate,
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return allTools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return allTools.filter((t) => t.category === category);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.relatedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
}

export { CATEGORY_META };
export type { ToolDefinition, ToolCategory };
