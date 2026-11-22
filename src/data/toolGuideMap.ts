/**
 * Topical tool ↔ guide links for "Learn more" blocks and related content.
 * Keep every tool pointing at at least one guide; strengthen weak pages.
 */
export const toolToGuides: Record<string, string[]> = {
  'construction-estimate-template': [
    'construction-estimate-that-wins-jobs',
    'how-to-write-a-business-estimate',
    'what-is-a-change-order',
    'line-item-totals-explained',
    'invoice-vs-estimate',
  ],
  'contractor-invoice': [
    'invoice-payment-terms',
    'contractor-invoice-example',
    'invoice-vs-estimate',
    'line-item-totals-explained',
    'what-to-include-on-a-receipt',
  ],
  'progress-invoice': [
    'invoice-payment-terms',
    'contractor-invoice-example',
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'construction-estimate-that-wins-jobs',
  ],
  'photography-contract-template': [
    'photography-contract-clauses',
    'freelance-payment-schedule-milestones',
  ],
  'videography-contract': [
    'wedding-videography-contract',
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
    'freelance-contract-what-to-include',
    'freelance-web-design-contract-clauses',
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
  ],
  'cleaning-service-invoice': [
    'cleaning-invoice-rates-line-items',
    'invoice-payment-terms',
    'line-item-totals-explained',
    'invoice-vs-estimate',
  ],
  'catering-quote': [
    'catering-quotation-example',
    'catering-quote-deposits',
    'wedding-vendor-contract-checklist',
    'invoice-vs-estimate',
  ],
  'event-wedding-vendor-contract': [
    'wedding-vendor-contract-checklist',
    'wedding-videography-contract',
    'catering-quote-deposits',
    'videography-contract-clauses',
  ],
  'rental-lease-application': [
    'rental-application-fair-housing',
    'what-to-include-on-a-receipt',
  ],
  'simple-nda': [
    'nda-basics-for-freelancers',
    'freelance-web-design-contract-clauses',
    'freelance-payment-schedule-milestones',
  ],
  'work-order': [
    'how-to-create-a-work-order',
    'work-order-vs-purchase-order-vs-invoice',
    'work-order-vs-invoice-vs-estimate',
    'invoice-vs-estimate',
  ],
  'receipt-generator': [
    'what-to-include-on-a-receipt',
    'invoice-vs-estimate',
    'wedding-vendor-contract-checklist',
  ],
  'quote-estimate-generator': [
    'how-to-write-a-business-estimate',
    'construction-estimate-that-wins-jobs',
    'invoice-vs-estimate',
    'work-order-vs-invoice-vs-estimate',
    'line-item-totals-explained',
  ],
  'independent-contractor-agreement': [
    'freelance-contract-what-to-include',
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
    'freelance-web-design-contract-clauses',
  ],
  'timesheet-template': [
    'contractor-invoice-example',
    'invoice-payment-terms',
    'line-item-totals-explained',
    'how-to-create-a-work-order',
    'work-order-vs-invoice-vs-estimate',
  ],
  'service-agreement-template': [
    'freelance-contract-what-to-include',
    'freelance-payment-schedule-milestones',
    'freelance-web-design-contract-clauses',
    'nda-basics-for-freelancers',
  ],
  'purchase-order-template': [
    'work-order-vs-purchase-order-vs-invoice',
    'work-order-vs-invoice-vs-estimate',
    'invoice-vs-estimate',
  ],
  'change-order-template': [
    'what-is-a-change-order',
    'construction-estimate-that-wins-jobs',
    'work-order-vs-invoice-vs-estimate',
    'invoice-vs-estimate',
  ],
  'lien-waiver-generator': [
    'construction-estimate-that-wins-jobs',
    'contractor-invoice-example',
    'work-order-vs-invoice-vs-estimate',
    'invoice-vs-estimate',
  ],
  'invoice-late-fee-calculator': [
    'invoice-payment-terms',
    'contractor-invoice-example',
    'invoice-vs-estimate',
    'what-to-include-on-a-receipt',
    'line-item-totals-explained',
  ],
  'roofing-estimate': [
    'construction-estimate-that-wins-jobs',
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'how-to-write-a-business-estimate',
  ],
  'painting-estimate': [
    'how-to-write-a-business-estimate',
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'construction-estimate-that-wins-jobs',
  ],
};

/** Guide → related guide slugs (topic clusters, not identical lists). */
export const guideToGuides: Record<string, string[]> = {
  'construction-estimate-that-wins-jobs': [
    'how-to-write-a-business-estimate',
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'contractor-invoice-example',
  ],
  'photography-contract-clauses': [
    'videography-contract-clauses',
    'wedding-videography-contract',
    'freelance-payment-schedule-milestones',
  ],
  'catering-quote-deposits': [
    'catering-quotation-example',
    'wedding-vendor-contract-checklist',
    'invoice-vs-estimate',
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
    'how-to-write-a-business-estimate',
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
    'freelance-web-design-contract-clauses',
    'nda-basics-for-freelancers',
    'invoice-vs-estimate',
  ],
  'what-to-include-on-a-receipt': [
    'invoice-vs-estimate',
    'line-item-totals-explained',
    'cleaning-invoice-rates-line-items',
    'wedding-vendor-contract-checklist',
  ],
  'cleaning-invoice-rates-line-items': [
    'line-item-totals-explained',
    'invoice-vs-estimate',
    'what-to-include-on-a-receipt',
  ],
  'nda-basics-for-freelancers': [
    'freelance-web-design-contract-clauses',
    'freelance-payment-schedule-milestones',
  ],
  'work-order-vs-invoice-vs-estimate': [
    'how-to-create-a-work-order',
    'invoice-vs-estimate',
    'how-to-write-a-business-estimate',
  ],
  'videography-contract-clauses': [
    'wedding-videography-contract',
    'photography-contract-clauses',
    'wedding-vendor-contract-checklist',
  ],
  'wedding-vendor-contract-checklist': [
    'wedding-videography-contract',
    'catering-quotation-example',
    'videography-contract-clauses',
    'what-to-include-on-a-receipt',
  ],
  'podcast-script-structure': ['real-estate-flyer-what-to-include'],
  'real-estate-flyer-what-to-include': ['podcast-script-structure'],
  'how-to-write-a-business-estimate': [
    'invoice-vs-estimate',
    'construction-estimate-that-wins-jobs',
    'line-item-totals-explained',
  ],
  'catering-quotation-example': [
    'catering-quote-deposits',
    'wedding-vendor-contract-checklist',
    'line-item-totals-explained',
  ],
  'freelance-web-design-contract-clauses': [
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
  ],
  'how-to-create-a-work-order': [
    'work-order-vs-invoice-vs-estimate',
    'invoice-vs-estimate',
    'contractor-invoice-example',
  ],
  'wedding-videography-contract': [
    'videography-contract-clauses',
    'wedding-vendor-contract-checklist',
    'photography-contract-clauses',
  ],
  'contractor-invoice-example': [
    'invoice-payment-terms',
    'invoice-vs-estimate',
    'construction-estimate-that-wins-jobs',
    'what-to-include-on-a-receipt',
  ],
  'invoice-payment-terms': [
    'contractor-invoice-example',
    'invoice-vs-estimate',
    'what-to-include-on-a-receipt',
  ],
  'what-is-a-change-order': [
    'construction-estimate-that-wins-jobs',
    'how-to-write-a-business-estimate',
    'work-order-vs-invoice-vs-estimate',
  ],
  'work-order-vs-purchase-order-vs-invoice': [
    'work-order-vs-invoice-vs-estimate',
    'how-to-create-a-work-order',
    'invoice-vs-estimate',
  ],
  'freelance-contract-what-to-include': [
    'freelance-web-design-contract-clauses',
    'freelance-payment-schedule-milestones',
    'nda-basics-for-freelancers',
  ],
};

/** Hub slug → guide slugs to feature on the hub page. */
export const hubToGuides: Record<string, string[]> = {
  'estimates-invoices': [
    'invoice-payment-terms',
    'what-is-a-change-order',
    'work-order-vs-purchase-order-vs-invoice',
    'how-to-write-a-business-estimate',
    'invoice-vs-estimate',
    'construction-estimate-that-wins-jobs',
    'contractor-invoice-example',
    'how-to-create-a-work-order',
    'work-order-vs-invoice-vs-estimate',
  ],
  contracts: [
    'freelance-contract-what-to-include',
    'freelance-web-design-contract-clauses',
    'photography-contract-clauses',
    'videography-contract-clauses',
    'wedding-videography-contract',
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
