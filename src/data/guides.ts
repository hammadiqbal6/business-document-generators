export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  answerFirst: string;
  publishedAt: string;
  updatedAt: string;
  relatedToolSlugs: string[];
  sections: { heading: string; body: string }[];
  faq: { question: string; answer: string }[];
}

export const guides: Guide[] = [
  {
    slug: 'construction-estimate-that-wins-jobs',
    title: 'How to Write a Construction Estimate That Wins Jobs',
    metaDescription:
      'Learn what to include in a construction estimate, how to price line items, set validity dates, and avoid disputes—plus a free template generator.',
    answerFirst:
      'A winning construction estimate names the scope in measurable terms, separates labor and materials, shows tax and deposit clearly, and states how long the price holds. Use line items tied to the written scope so clients can compare apples to apples.',
    publishedAt: '2026-10-19',
    updatedAt: '2026-10-19',
    relatedToolSlugs: ['construction-estimate-template', 'contractor-invoice', 'work-order'],
    sections: [
      {
        heading: 'Start with scope, not price',
        body:
          'Write what you will demolish, install, haul, and leave behind. Vague scopes force clients to guess—and they choose the lowest number. Tie every major line item to a sentence in the scope section.',
      },
      {
        heading: 'Line-item structure',
        body:
          'Group demolition, materials, labor, and allowances. Show units (sq ft, hr, ls). The SBA notes that transparent pricing builds trust with small-business clients evaluating contractors.',
      },
      {
        heading: 'Validity and change orders',
        body:
          'State a validity window (often 14–30 days). Note that unknown conditions may require change orders. Photograph existing conditions before you price.',
      },
    ],
    faq: [
      {
        question: 'Should estimates include sales tax?',
        answer: 'Follow your state rules. Many estimates show one tax rate on a taxable subtotal and label exempt items.',
      },
      {
        question: 'What deposit is normal?',
        answer: 'Residential remodels often use 25–40% deposits tied to material orders—document it on the estimate.',
      },
    ],
  },
  {
    slug: 'photography-contract-clauses',
    title: 'Photography Contract Clauses Explained (Editable Template)',
    metaDescription:
      'Understand retainer, cancellation, copyright, and usage clauses in photography contracts. Not legal advice—use our free editable template as a starting point.',
    answerFirst:
      'Photography contracts usually cover scope (date, hours, locations), payment and retainer, cancellation, copyright ownership, client usage rights, and liability limits. Edit each clause to match your session type and local law.',
    publishedAt: '2026-10-19',
    updatedAt: '2026-10-19',
    relatedToolSlugs: ['photography-contract-template', 'videography-contract', 'simple-nda'],
    sections: [
      {
        heading: 'Retainer vs balance',
        body:
          'The retainer reserves the date and compensates scheduling risk. State when the balance is due—often one week before the event for weddings.',
      },
      {
        heading: 'Copyright and print release',
        body:
          'Photographers typically retain copyright while granting personal print/social rights. Commercial use needs a separate license. The U.S. Copyright Office publishes creator guidance photographers can cite for clients.',
      },
      {
        heading: 'Cancellation',
        body:
          'Spell out what happens if the client postpones, if weather affects an outdoor shoot, and if you must substitute a second shooter.',
      },
    ],
    faq: [
      {
        question: 'Do I need a model release?',
        answer: 'For commercial use of recognizable people, yes—often as a separate form.',
      },
    ],
  },
  {
    slug: 'catering-quote-deposits',
    title: 'Catering Quotes: Guest Counts, Fees, and Deposits',
    metaDescription:
      'Build catering quotes with per-guest pricing, staff fees, service charges, tax, and deposit terms. Free catering quote generator included.',
    answerFirst:
      'Catering quotes should lock event date, guest count assumptions, menu summary, per-guest or package pricing, staff hours, service fee, tax, and deposit percentage with a final head-count deadline.',
    publishedAt: '2026-10-19',
    updatedAt: '2026-10-19',
    relatedToolSlugs: ['catering-quote', 'event-wedding-vendor-contract', 'quote-estimate-generator'],
    sections: [
      {
        heading: 'Guest count buffers',
        body:
          'Price against a guaranteed minimum and state when final counts are due (often 7 days pre-event). Overage policies prevent margin loss.',
      },
      {
        heading: 'Service fee vs gratuity',
        body:
          'Label administrative or service fees separately from voluntary gratuity so clients understand the total.',
      },
    ],
    faq: [
      {
        question: 'When is a catering quote binding?',
        answer: 'Usually after signed agreement and deposit—until then treat it as an offer subject to availability.',
      },
    ],
  },
  {
    slug: 'tattoo-consent-documentation',
    title: 'Tattoo Consent Forms: What Studios Should Document',
    metaDescription:
      'Health acknowledgements, ID verification, design approval, and aftercare on tattoo consent forms. Free template—not legal or medical advice.',
    answerFirst:
      'Tattoo consent forms should record client identity, design approval, placement, risk acknowledgements, aftercare receipt, and signatures. Follow your local body-art regulations—this article is not medical or legal advice.',
    publishedAt: '2026-10-19',
    updatedAt: '2026-10-19',
    relatedToolSlugs: ['tattoo-consent-form-template', 'receipt-generator'],
    sections: [
      {
        heading: 'ID and age verification',
        body:
          'Document that photo ID was checked. Minors require guardian rules per your jurisdiction.',
      },
      {
        heading: 'Health disclosures',
        body:
          'Ask about allergies, skin conditions, pregnancy/nursing, and medications. CDC infection-control resources are a useful client-education link.',
      },
    ],
    faq: [
      {
        question: 'Can clients sign digitally?',
        answer: 'Many studios use tablets; ensure your e-sign process meets local recordkeeping rules.',
      },
    ],
  },
  {
    slug: 'rental-application-fair-housing',
    title: 'Rental Applications: Fair Housing and What to Ask',
    metaDescription:
      'What belongs on a residential rental application, authorization to verify, and fair housing basics. Free application form generator.',
    answerFirst:
      'A rental application collects contact details, housing and employment history, references, and written authorization to verify—without questions that violate fair housing laws. Pair approvals with a proper lease.',
    publishedAt: '2026-10-19',
    updatedAt: '2026-10-19',
    relatedToolSlugs: ['rental-lease-application', 'receipt-generator'],
    sections: [
      {
        heading: 'Consistent screening',
        body:
          'Use the same questions for every applicant. HUD fair housing guidance reminds landlords to avoid discriminatory criteria.',
      },
      {
        heading: 'Authorization language',
        body:
          'Include permission to run credit and contact prior landlords, plus a statement that the application is not a lease.',
      },
    ],
    faq: [
      {
        question: 'Can I charge an application fee?',
        answer: 'Depends on state/local law—disclose fees upfront where required.',
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
