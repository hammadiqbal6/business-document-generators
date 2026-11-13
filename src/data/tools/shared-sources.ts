import type { SourceRef } from './types';

/**
 * Niche reference list for business-document tools (playbook §3.3).
 * URLs re-verified via WebFetch on 2026-10-20.
 */
export const irsIndependentContractor: SourceRef = {
  label: 'IRS — Independent contractor defined',
  url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined',
  usedFor: 'employee vs independent-contractor framing on freelance/contract pages',
};

export const irsRecordkeeping: SourceRef = {
  label: 'IRS — Recordkeeping for small businesses',
  url: 'https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping',
  usedFor: 'why keep invoices, estimates, and payment records',
};

export const liiContract: SourceRef = {
  label: 'Cornell LII Wex — Contract',
  url: 'https://www.law.cornell.edu/wex/contract',
  usedFor: 'basic elements of an enforceable agreement (offer, acceptance, consideration)',
};

export const liiIndependentContractor: SourceRef = {
  label: 'Cornell LII Wex — Independent contractor',
  url: 'https://www.law.cornell.edu/wex/independent_contractor',
  usedFor: 'plain-language definition distinguishing contractors from employees',
};

export const cfrEmployeeTest: SourceRef = {
  label: '26 CFR § 31.3121(d)-1 — Who are employees (LII)',
  url: 'https://www.law.cornell.edu/cfr/text/26/31.3121(d)-1',
  usedFor: 'common-law control test background for contractor vs employee context',
};

export const sbaHome: SourceRef = {
  label: 'U.S. Small Business Administration',
  url: 'https://www.sba.gov/',
  usedFor: 'general small-business counseling and compliance starting point',
};

export const sbaMarketingSales: SourceRef = {
  label: 'SBA — Marketing and sales',
  url: 'https://www.sba.gov/business-guide/manage-your-business/marketing-sales',
  usedFor: 'pricing and sales-plan context for estimates and quotes',
};

export const sbaBreakEven: SourceRef = {
  label: 'SBA — Break-even point',
  url: 'https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point',
  usedFor: 'pricing awareness when building estimates',
};

export const sbaLaunch: SourceRef = {
  label: 'SBA — Launch your business',
  url: 'https://www.sba.gov/business-guide/launch-your-business',
  usedFor: 'licenses, permits, and legal-basics overview (not a substitute for counsel)',
};

export const sbaStayCompliant: SourceRef = {
  label: 'SBA — Stay legally compliant',
  url: 'https://www.sba.gov/business-guide/manage-your-business/stay-legally-compliant',
  usedFor: 'compliance checklist context for contracts and forms',
};

export const copyrightPhotographers: SourceRef = {
  label: 'U.S. Copyright Office — Visual arts (photographers)',
  url: 'https://www.copyright.gov/engage/photographers/',
  usedFor: 'copyright ownership and usage-rights concepts in creative contracts',
};

export const ftcSmallBusinessScams: SourceRef = {
  label: 'FTC — Scams and Your Small Business (July 2023 PDF)',
  url: 'https://search.ftc.gov/system/files/ftc_gov/pdf/908a_scams_and_your_small_business_july_2023_508.pdf',
  usedFor: 'fake invoices, unordered merchandise, and verifying invoices before you pay',
};

export const ftcEndorsements: SourceRef = {
  label: '16 CFR Part 255 — Guides Concerning Use of Endorsements and Testimonials',
  url: 'https://www.ecfr.gov/current/title-16/part-255',
  usedFor: 'material-connection disclosures for sponsor reads and podcast endorsements',
};

export const irsWhatRecords: SourceRef = {
  label: 'IRS — What kind of records should I keep',
  url: 'https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep',
  usedFor: 'invoices, receipts, and receipt books as support for gross receipts',
};

export const irsHowLongRecords: SourceRef = {
  label: 'IRS — How long should I keep records',
  url: 'https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records',
  usedFor: 'general 3-year income-tax retention; 4-year employment-tax records; 6 years if more than 25% of gross income was unreported',
};

export const cdcInfectionControl: SourceRef = {
  label: 'CDC — Infection control basics',
  url: 'https://www.cdc.gov/infection-control/about/',
  usedFor: 'general infection-prevention context for studio consent forms (not medical advice)',
};

export const cfpbRentOrBuy: SourceRef = {
  label: 'CFPB — Rent or buy considerations',
  url: 'https://www.consumerfinance.gov/ask-cfpb/what-should-i-consider-when-deciding-whether-to-rent-or-buy-a-home-en-118/',
  usedFor: 'consumer housing context around rental applications',
};

export const hudRental: SourceRef = {
  label: 'HUD — Rental assistance overview',
  url: 'https://www.hud.gov/topics/rental_assistance',
  usedFor: 'public rental-assistance programs overview',
};

export const hudFairHousing: SourceRef = {
  label: 'HUD — Fair Housing',
  url: 'https://www.hud.gov/fairhousing',
  usedFor: 'fair-housing rules landlords and agents must follow',
};

export const estimateSources: SourceRef[] = [
  sbaStayCompliant,
  sbaBreakEven,
  irsRecordkeeping,
  irsWhatRecords,
  irsHowLongRecords,
  sbaHome,
];

export const contractSources: SourceRef[] = [
  liiContract,
  irsIndependentContractor,
  liiIndependentContractor,
  cfrEmployeeTest,
  ftcSmallBusinessScams,
  sbaLaunch,
  sbaStayCompliant,
  copyrightPhotographers,
];

export const formSources: SourceRef[] = [
  cdcInfectionControl,
  cfpbRentOrBuy,
  hudRental,
  hudFairHousing,
  sbaHome,
];
