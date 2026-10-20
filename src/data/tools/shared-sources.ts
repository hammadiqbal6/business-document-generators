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
  label: 'FTC — Scams and your small business',
  url: 'https://www.ftc.gov/business-guidance/resources/scams-your-small-business-guide-business',
  usedFor: 'contract red flags and avoiding blank or altered agreements',
};

export const ftcEndorsements: SourceRef = {
  label: 'FTC — Endorsement guides (what people are asking)',
  url: 'https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking',
  usedFor: 'sponsor/disclosure expectations for podcast scripts',
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

export const estimateSources: SourceRef[] = [sbaMarketingSales, sbaBreakEven, irsRecordkeeping, sbaHome];

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
