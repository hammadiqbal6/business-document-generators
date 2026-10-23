/**
 * Topical tool ↔ guide links for "Learn more" blocks and related content.
 * Keep every tool pointing at at least one guide; strengthen weak pages.
 */
export const toolToGuides: Record<string, string[]> = {
  'construction-estimate-template': [
    'construction-estimate-that-wins-jobs',
    'line-item-totals-explained',
    'invoice-vs-estimate',
  ],
  'contractor-invoice': [
    'invoice-vs-estimate',
    'line-item-totals-explained',
    'what-to-include-on-a-receipt',
  ],
  'photography-contract-template': [
    'photography-contract-clauses',
    'freelance-payment-schedule-milestones',
  ],
  'videography-contract': [
    'videography-contract-clauses',
    'photography-contract-clauses',
    'wedding-vendor-contract-checklist',
  ],
  'podcast-script-template': ['podcast-script-structure'],
  'real-estate-flyer-template': ['real-estate-flyer-what-to-include'],
  'tattoo-consent-form-template': [
    'tattoo-consent-documentation',
    'what-to-include-on-a-receipt',
  ],
  'freelance-web-design-contract': [
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
  ],
  'cleaning-service-invoice': [
    'cleaning-invoice-rates-line-items',
    'line-item-totals-explained',
    'invoice-vs-estimate',
  ],
  'catering-quote': [
    'catering-quote-deposits',
    'wedding-vendor-contract-checklist',
    'invoice-vs-estimate',
  ],
  'event-wedding-vendor-contract': [
    'wedding-vendor-contract-checklist',
    'catering-quote-deposits',
    'videography-contract-clauses',
  ],
  'rental-lease-application': [
    'rental-application-fair-housing',
    'what-to-include-on-a-receipt',
  ],
  'simple-nda': [
    'nda-basics-for-freelancers',
    'freelance-payment-schedule-milestones',
  ],
  'work-order': [
    'work-order-vs-invoice-vs-estimate',
    'invoice-vs-estimate',
    'line-item-totals-explained',
  ],
  'receipt-generator': [
    'what-to-include-on-a-receipt',
    'invoice-vs-estimate',
  ],
  'quote-estimate-generator': [
    'invoice-vs-estimate',
    'work-order-vs-invoice-vs-estimate',
    'line-item-totals-explained',
  ],
};

/** Guide → related guide slugs (topic clusters, not identical lists). */
export const guideToGuides: Record<string, string[]> = {
  'construction-estimate-that-wins-jobs': [
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'work-order-vs-invoice-vs-estimate',
  ],
  'photography-contract-clauses': [
    'videography-contract-clauses',
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
  ],
  'catering-quote-deposits': [
    'wedding-vendor-contract-checklist',
    'invoice-vs-estimate',
    'line-item-totals-explained',
  ],
  'tattoo-consent-documentation': [
    'what-to-include-on-a-receipt',
    'nda-basics-for-freelancers',
  ],
  'rental-application-fair-housing': [
    'what-to-include-on-a-receipt',
    'nda-basics-for-freelancers',
  ],
  'invoice-vs-estimate': [
    'work-order-vs-invoice-vs-estimate',
    'line-item-totals-explained',
    'what-to-include-on-a-receipt',
  ],
  'line-item-totals-explained': [
    'invoice-vs-estimate',
    'cleaning-invoice-rates-line-items',
    'construction-estimate-that-wins-jobs',
  ],
  'freelance-payment-schedule-milestones': [
    'nda-basics-for-freelancers',
    'photography-contract-clauses',
    'invoice-vs-estimate',
  ],
  'what-to-include-on-a-receipt': [
    'invoice-vs-estimate',
    'line-item-totals-explained',
    'cleaning-invoice-rates-line-items',
  ],
  'cleaning-invoice-rates-line-items': [
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'what-to-include-on-a-receipt',
  ],
  'nda-basics-for-freelancers': [
    'freelance-payment-schedule-milestones',
    'photography-contract-clauses',
  ],
  'work-order-vs-invoice-vs-estimate': [
    'invoice-vs-estimate',
    'line-item-totals-explained',
    'construction-estimate-that-wins-jobs',
  ],
  'videography-contract-clauses': [
    'photography-contract-clauses',
    'wedding-vendor-contract-checklist',
    'freelance-payment-schedule-milestones',
  ],
  'wedding-vendor-contract-checklist': [
    'catering-quote-deposits',
    'videography-contract-clauses',
    'photography-contract-clauses',
  ],
  'podcast-script-structure': ['real-estate-flyer-what-to-include'],
  'real-estate-flyer-what-to-include': ['podcast-script-structure'],
};

/** Hub slug → guide slugs to feature on the hub page. */
export const hubToGuides: Record<string, string[]> = {
  'estimates-invoices': [
    'invoice-vs-estimate',
    'line-item-totals-explained',
    'construction-estimate-that-wins-jobs',
    'what-to-include-on-a-receipt',
    'cleaning-invoice-rates-line-items',
    'work-order-vs-invoice-vs-estimate',
    'catering-quote-deposits',
  ],
  contracts: [
    'photography-contract-clauses',
    'videography-contract-clauses',
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
    'wedding-vendor-contract-checklist',
  ],
  forms: ['tattoo-consent-documentation', 'rental-application-fair-housing'],
  'creative-templates': ['podcast-script-structure', 'real-estate-flyer-what-to-include'],
};

export function guidesForTool(toolSlug: string): string[] {
  return toolToGuides[toolSlug] ?? [];
}

export function relatedGuidesFor(guideSlug: string): string[] {
  return guideToGuides[guideSlug] ?? [];
}
