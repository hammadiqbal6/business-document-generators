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
  {
    slug: 'invoice-vs-estimate',
    title: 'Invoice vs Estimate: When to Use Each Document',
    metaDescription:
      'Learn the difference between an estimate and an invoice, when to send each, and how deposits and change orders fit. Free templates for both.',
    answerFirst:
      'An estimate (or quote) proposes price and scope before work starts; an invoice bills for work done or a deposit due. Use an estimate to win the job, then convert agreed line items into an invoice when you request payment.',
    publishedAt: '2026-10-20',
    updatedAt: '2026-10-20',
    relatedToolSlugs: [
      'quote-estimate-generator',
      'construction-estimate-template',
      'contractor-invoice',
      'receipt-generator',
    ],
    sections: [
      {
        heading: 'What an estimate does',
        body:
          'An estimate sets expectations: parties, job address, scope, line items, tax, deposit, and how long the price holds. It is usually an offer, not a demand for payment. Keep validity dates short on material-heavy jobs so lumber or fixture prices do not strand you.',
      },
      {
        heading: 'What an invoice does',
        body:
          'An invoice requests payment: invoice number, dates, bill-to, line items for completed or progress-billed work, tax, amount paid, and amount due with payment instructions. Pair it with a receipt once money clears.',
      },
      {
        heading: 'Avoid keyword confusion on your site',
        body:
          'Use “estimate” or “quote” language when proposing work, and “invoice” when billing. Mixing both on one PDF without a clear document type confuses clients and your own bookkeeping. Our generators keep construction estimates, contractor invoices, and a generic quote tool on separate pages for that reason.',
      },
      {
        heading: 'Worked example',
        body:
          'A kitchen remodel might start as a construction estimate totaling $8,420 with a 30% deposit. After cabinet install, you send a contractor invoice for the deposit or progress draw, then a final invoice for the balance. Each document reuses the same line-item math: quantity × rate, then tax.',
      },
    ],
    faq: [
      {
        question: 'Is a quote the same as an estimate?',
        answer:
          'In practice many trades use the words interchangeably. Some industries treat a “quote” as firmer. Label the document clearly and state whether prices can change.',
      },
      {
        question: 'When should I send a receipt?',
        answer:
          'After payment posts. A receipt confirms amount received and method; it does not replace the invoice that requested the money.',
      },
    ],
  },
  {
    slug: 'line-item-totals-explained',
    title: 'How Line-Item Totals Work on Estimates and Invoices',
    metaDescription:
      'Plain-English math for quantity × rate, subtotals, tax, deposits and amount due—with a worked example you can recreate in our free generators.',
    answerFirst:
      'Most trade documents price each line as quantity × rate, sum those amounts into a subtotal, apply a tax percentage, then show deposits or amounts already paid. Understanding that chain prevents underbilling when you mix labor hours and lump-sum materials.',
    publishedAt: '2026-10-20',
    updatedAt: '2026-10-20',
    relatedToolSlugs: [
      'construction-estimate-template',
      'contractor-invoice',
      'quote-estimate-generator',
      'cleaning-service-invoice',
    ],
    sections: [
      {
        heading: 'The core formula',
        body:
          'Line amount = quantity × rate. Subtotal = sum of line amounts. Tax = subtotal × (tax rate ÷ 100). Total = subtotal + tax. Deposit = total × (deposit % ÷ 100) when you collect an upfront percentage. Amount due on an invoice = total − amount already paid.',
      },
      {
        heading: 'Worked example',
        body:
          'Three lines: 24 hr × $75 labor = $1,800; materials lump sum $4,200; flooring 220 sq ft × $2.50 = $550. Subtotal $6,550. Tax at 8.31% ≈ $544.31. Total ≈ $7,094.31. A 30% deposit is about $2,128.29. Change any rate in the construction estimate generator and the live preview recalculates the same way.',
      },
      {
        heading: 'Units and common mistakes',
        body:
          'Keep units consistent (hr, sq ft, ls). Do not put a full package price in the rate column and also set quantity above 1 unless you mean it. Label tax-exempt lines. Round money to cents in the PDF your client sees.',
      },
      {
        heading: 'How to use our generators',
        body:
          'Open the editor, fill company and client fields, add lines, set tax and deposit, then Export PDF. Optional Save locally uses browser localStorage only. The static sample preview on each tool page shows the defaults before JavaScript loads.',
      },
    ],
    faq: [
      {
        question: 'Should labor and materials be separate lines?',
        answer:
          'Yes when tax treatment or client comparison benefits. Separating them also makes change orders clearer.',
      },
      {
        question: 'Does the generator file my taxes?',
        answer:
          'No. It only multiplies and sums the numbers you enter. Confirm rates with your accountant or local rules.',
      },
    ],
  },
  {
    slug: 'freelance-payment-schedule-milestones',
    title: 'Freelance Payment Schedules: Deposits and Milestones',
    metaDescription:
      'How to structure deposits and milestone payments in freelance and web design contracts, plus a free contract template with editable clauses.',
    answerFirst:
      'A clear payment schedule names the deposit to start, amounts tied to milestones (design approval, development handoff, launch), and when the final balance is due. Put those numbers in the contract before work begins so invoices are paperwork, not negotiation.',
    publishedAt: '2026-10-20',
    updatedAt: '2026-10-20',
    relatedToolSlugs: [
      'freelance-web-design-contract',
      'contractor-invoice',
      'simple-nda',
      'receipt-generator',
    ],
    sections: [
      {
        heading: 'Why schedules beat “net 30 someday”',
        body:
          'Freelancers get stuck when scope creeps but payment stays vague. Milestones tied to deliverables (wireframes approved, staging site live) give both sides a shared definition of done. IRS independent-contractor materials stress that control and business terms should be clear—your contract is where payment clarity lives.',
      },
      {
        heading: 'A simple three-part pattern',
        body:
          'Common web projects use 30–40% to start, 30–40% at a mid milestone, and the balance before final files or go-live. State late-fee or pause-work language with an attorney if you enforce it. Our freelance web design contract template includes editable payment clauses you can align to that pattern.',
      },
      {
        heading: 'Invoices and processor fees',
        body:
          'When you invoice each milestone, match line items to the contract schedule. If clients pay by card, factor processor fees into your pricing so net cash still covers the work—see the fee calculators on our sister payment site when that applies.',
      },
      {
        heading: 'NDAs and kickoff',
        body:
          'If kickoff requires confidential brand assets, a simple NDA can sit beside the services agreement. Keep them separate documents so payment terms and confidentiality obligations stay readable.',
      },
    ],
    faq: [
      {
        question: 'Should the deposit be refundable?',
        answer:
          'Say so explicitly. Many freelancers make the deposit non-refundable after a short cancellation window because calendar time was reserved.',
      },
      {
        question: 'Is this legal advice?',
        answer:
          'No. Payment clauses are samples. Have a licensed attorney review contracts for your jurisdiction and industry.',
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
