import type { ToolCategory, ToolDefinition } from './types';
import { CATEGORY_META } from './types';
import {
  cateringQuote,
  changeOrderTemplate,
  cleaningInvoice,
  constructionEstimate,
  contractorInvoice,
  flooringEstimate,
  progressInvoice,
  invoiceLateFeeCalculator,
  landscapingEstimate,
  paintingEstimate,
  purchaseOrderTemplate,
  quoteEstimate,
  receiptGenerator,
  roofingEstimate,
  timesheetTemplate,
  workOrder,
} from './estimates';
import {
  eventVendorContract,
  freelanceWebContract,
  independentContractorAgreement,
  lienWaiverGenerator,
  photographyContract,
  serviceAgreementTemplate,
  simpleNda,
  videoProductionContract,
  videographyContract,
  weddingVideographyContract,
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
  independentContractorAgreement,
  timesheetTemplate,
  serviceAgreementTemplate,
  purchaseOrderTemplate,
  changeOrderTemplate,
  lienWaiverGenerator,
  progressInvoice,
  invoiceLateFeeCalculator,
  roofingEstimate,
  paintingEstimate,
  landscapingEstimate,
  flooringEstimate,
  weddingVideographyContract,
  videoProductionContract,
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return allTools.find((t) => t.slug === slug);
}

/**
 * Explicit featured set for home + footer (includes high-impression quote/receipt tools).
 * Do not derive from allTools.slice — array order hid money pages from global chrome.
 */
export const featuredToolSlugs = [
  'quote-estimate-generator',
  'receipt-generator',
  'construction-estimate-template',
  'contractor-invoice',
  'catering-quote',
  'photography-contract-template',
] as const;

export function getFeaturedTools(): ToolDefinition[] {
  return featuredToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolDefinition => Boolean(t));
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
