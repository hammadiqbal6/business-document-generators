import type { ToolDefinition } from './types';
import { clause } from './line-item-defaults';
import { contractSources } from './shared-sources';

const legalNotice =
  'This generator produces editable sample language for discussion. It is not legal advice, not a law-firm product, and not a substitute for an attorney licensed in your jurisdiction. Laws vary by location and situation.';

export const photographyContract: ToolDefinition = {
  slug: 'photography-contract-template',
  name: 'Photography Contract Template',
  shortName: 'Photography Contract',
  category: 'contracts',
  primaryKeyword: 'photography contract template',
  secondaryKeywords: [
    'photographer contract template free',
    'wedding photography contract',
    'portrait photography agreement',
  ],
  title: 'Free Photography Contract Template (PDF)',
  metaDescription:
    'Create a photography contract with retainer, deliverables, usage rights and cancellation clauses. Edit every clause, preview live, download PDF or DOCX free.',
  h1: 'Free Photography Contract Template',
  answerFirst:
    'A photography contract template sets the shoot date, location, fee, deliverables, turnaround, cancellation terms, and image usage rights between photographer and client. Customize the editable clauses below, preview the agreement, and export PDF or DOCX. Not legal advice—review with counsel before signing.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Photography Services Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'photographerName', label: 'Photographer / studio', type: 'text', required: true, section: 'Parties' },
    { id: 'photographerAddress', label: 'Photographer address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'clientName', label: 'Client name', type: 'text', required: true, section: 'Parties' },
    { id: 'clientEmail', label: 'Client email', type: 'email', section: 'Parties' },
    { id: 'eventType', label: 'Session / event type', type: 'text', required: true, section: 'Engagement' },
    { id: 'eventDate', label: 'Date', type: 'date', required: true, section: 'Engagement' },
    { id: 'startTime', label: 'Start time', type: 'text', placeholder: '10:00 AM', section: 'Engagement' },
    { id: 'durationHours', label: 'Coverage hours', type: 'number', inputMode: 'decimal', min: 0.5, step: 0.5, section: 'Engagement' },
    { id: 'location', label: 'Location(s)', type: 'textarea', rows: 2, required: true, section: 'Engagement' },
    { id: 'fee', label: 'Total fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Retainer / deposit', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'deliverables', label: 'Deliverables', type: 'textarea', rows: 3, required: true, section: 'Deliverables' },
    { id: 'turnaroundDays', label: 'Delivery timeline (days)', type: 'number', inputMode: 'numeric', min: 1, section: 'Deliverables' },
    { id: 'usageSummary', label: 'Client usage summary', type: 'textarea', rows: 2, section: 'Deliverables' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    photographerName: 'Lumen Studio',
    photographerAddress: '450 Gallery Ave, Portland, OR 97209',
    clientName: 'Casey & Morgan Ellis',
    clientEmail: 'casey@client.invalid',
    eventType: 'Wedding day coverage',
    eventDate: '2026-06-14',
    startTime: '1:00 PM',
    durationHours: 8,
    location: 'Ceremony: River House Conservatory; Reception: same venue ballroom',
    fee: 3200,
    deposit: 800,
    deliverables: 'Edited high-resolution digital gallery (minimum 400 images); online gallery for 12 months; print-release for personal use.',
    turnaroundDays: 45,
    usageSummary: 'Client may print and share for personal, non-commercial use. Photographer retains copyright and may use images for portfolio unless client opts out in writing.',
    clauses: [
      clause(
        'scope',
        'Scope of services',
        'Photographer will provide photographic coverage for the event type, date, duration, and locations listed above. Additional hours or locations require a written change order and may incur overtime fees.',
      ),
      clause(
        'payment',
        'Fees and payment',
        'Client agrees to pay the total fee. The retainer is due on signing and is non-refundable except as required by law or if Photographer cancels. Remaining balance is due 7 days before the event date unless otherwise stated in writing.',
      ),
      clause(
        'cancellation',
        'Cancellation and rescheduling',
        'If Client cancels, the retainer is retained as liquidated damages reflecting scheduling costs. Rescheduling is subject to Photographer availability. If Photographer cancels for reasons other than Client breach or force majeure, fees paid will be refunded.',
      ),
      clause(
        'copyright',
        'Copyright and usage',
        'Photographer retains copyright in all images. Client receives the personal usage rights summarized above. Commercial, editorial, or third-party licensing requires a separate written license.',
      ),
      clause(
        'liability',
        'Limitation of liability',
        'Photographer’s total liability under this agreement is limited to fees paid for the engagement, except where prohibited by law. Photographer is not liable for venue restrictions, guest interference, or equipment failure beyond reasonable backup practices.',
      ),
      clause(
        'force',
        'Force majeure',
        'Neither party is liable for delays caused by events beyond reasonable control, including severe weather, illness, or government action. Parties will cooperate in good faith to reschedule or adjust services.',
      ),
    ],
  },
  content: {
    howToUse: [
      'Fill photographer and client details, shoot logistics, and fees.',
      'Edit deliverables and usage summary in plain language.',
      'Toggle or edit clause text; remove clauses that do not apply.',
      'Export PDF/DOCX and have both parties review before signing.',
    ],
    whatToInclude: [
      {
        heading: 'Clause-by-clause: what photographers usually cover',
        body: 'Scope (hours/locations), payment and retainer, cancellation, copyright vs license, model releases for commercial work, backup/shot-list expectations, meal breaks for long weddings, and liability limits. Original clause text here is starting language—not copied from third-party templates.',
      },
      {
        heading: 'Usage rights in plain English',
        body: 'Clients often need print rights and social sharing; photographers typically keep copyright for portfolio use. Spell out commercial bans (stock, billboards, resale) unless licensed separately. Cite U.S. Copyright Office guidance for creators when explaining ownership basics to clients.',
      },
    ],
    workedExample: {
      heading: 'Worked example: wedding photography agreement',
      body: 'Sample Lumen Studio contract covers an 8-hour wedding for $3,200 with an $800 retainer, 45-day gallery delivery, personal-use print release, and editable cancellation/copyright clauses. Adjust hours and fee for portrait or brand sessions.',
    },
    commonMistakes: [
      'Leaving usage rights vague (“you can use the photos”).',
      'No overtime rate for ceremonies that run long.',
      'Forgetting meal/break expectations on 8+ hour days.',
    ],
    tips: [
      'Attach a shot-list addendum rather than stuffing it into the fee clause.',
      'Collect a separate model release when images will be used in advertising.',
    ],
    faq: [
      {
        question: 'Is this photography contract legally binding?',
        answer:
          'A signed agreement can be binding, but enforceability depends on local law and the facts. This tool provides editable sample language only—not legal advice. Have an attorney review before you rely on it.',
      },
      {
        question: 'Who owns the photos—client or photographer?',
        answer:
          'In many U.S. freelance arrangements the photographer owns copyright unless a written transfer says otherwise; clients receive a license. Confirm for your country and work-for-hire situations.',
      },
      {
        question: 'Do I need a separate contract for second shooters?',
        answer:
          'Yes. Use a contractor or second-shooter agreement covering pay, deliverable ownership, and non-solicitation if relevant.',
      },
      {
        question: 'What should a photography cancellation clause cover?',
        answer:
          'State how much of the retainer is refundable, the notice window (for example 14–30 days), reschedule fees, and what happens if the photographer cancels. Clear cancel language prevents day-of disputes.',
      },
      {
        question: 'Should usage rights and deliverables be separate clauses?',
        answer:
          'Yes. Deliverables list counts, formats, and turnaround; usage rights say where the client may publish images. Mixing them makes it hard to price commercial licenses or album add-ons later.',
      },
      {
        question: 'Do I need a model release in addition to the contract?',
        answer:
          'Often yes when images will be used in advertising or third-party promotion. The service contract covers the shoot; a model or property release covers publicity use of likeness or locations.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['videography-contract', 'event-wedding-vendor-contract', 'freelance-web-design-contract'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const videographyContract: ToolDefinition = {
  slug: 'videography-contract',
  name: 'Videography Contract Template',
  shortName: 'Videography Contract',
  category: 'contracts',
  primaryKeyword: 'videography contract',
  secondaryKeywords: ['videographer contract template', 'video production agreement', 'wedding videography contract'],
  title: 'Videography Contract Template – Free Generator',
  metaDescription:
    'Create a videography contract: shoot details, deliverables, revisions, licensing, editable clauses. Export PDF/DOCX. Not legal advice.',
  h1: 'Free Videography Contract Template',
  answerFirst:
    'A videography contract defines filming dates, crew, deliverable formats, revision rounds, payment, and licensing for footage. Customize clauses in this free browser tool and export PDF or DOCX. Not legal advice—get local counsel before use.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Videography Services Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'companyName', label: 'Videographer / company', type: 'text', required: true, section: 'Parties' },
    { id: 'clientName', label: 'Client', type: 'text', required: true, section: 'Parties' },
    { id: 'projectTitle', label: 'Project title', type: 'text', required: true, section: 'Project' },
    { id: 'shootDates', label: 'Shoot date(s)', type: 'text', required: true, section: 'Project' },
    { id: 'locations', label: 'Locations', type: 'textarea', rows: 2, section: 'Project' },
    { id: 'fee', label: 'Total fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Deposit', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'deliverables', label: 'Deliverables', type: 'textarea', rows: 3, required: true, section: 'Deliverables' },
    { id: 'revisions', label: 'Included revision rounds', type: 'number', inputMode: 'numeric', min: 0, section: 'Deliverables' },
    { id: 'license', label: 'License summary', type: 'textarea', rows: 2, section: 'Deliverables' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    companyName: 'Frame & Field Films',
    clientName: 'North Shore Wellness LLC',
    projectTitle: 'Brand story – 90s hero video',
    shootDates: '2026-11-03 (primary), 2026-11-04 (B-roll weather hold)',
    locations: 'Clinic lobby and two treatment rooms; outdoor plaza',
    fee: 5400,
    deposit: 1800,
    deliverables: '1× 90-second hero video (4K), 3× 15-second cutdowns for social, project files archived 90 days.',
    revisions: 2,
    license: 'Client receives a worldwide, perpetual license for owned channels and paid social. Resale or stock licensing excluded.',
    clauses: [
      clause('scope', 'Scope', 'Company will capture and edit video as described in the project title and deliverables. Client will provide access, releases, and brand assets by agreed deadlines.'),
      clause('payment', 'Payment', 'Deposit is due on signing. Remaining balance is due on delivery of final files unless otherwise agreed in writing.'),
      clause('revisions', 'Revisions', 'Fee includes the stated revision rounds. Additional revisions are billed at an hourly rate disclosed before work continues.'),
      clause('raw', 'Raw footage', 'Raw footage remains Company property unless Client purchases a raw-footage addendum. Raw delivery is not included by default.'),
      clause('cancel', 'Cancellation', 'If Client cancels within 14 days of the first shoot date, deposit is non-refundable. Company cancellation without cause results in a full refund of fees paid.'),
      clause('credit', 'Credits', 'Client will credit Company where customary (website, YouTube description) unless a no-credit addendum is signed.'),
    ],
  },
  content: {
    howToUse: [
      'Enter parties, shoot dates, and fee structure.',
      'Define deliverables, revisions, and license summary.',
      'Edit clauses; export for signature workflow.',
    ],
    whatToInclude: [
      {
        heading: 'Video-specific clauses',
        body: 'Cover revision rounds, music licensing responsibility, talent releases, raw footage ownership, overtime, and weather holds for outdoor shoots.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'A $5,400 brand film with $1,800 deposit, two revision rounds, and social cutdowns illustrates how to separate creative fee from licensing limits.',
    },
    commonMistakes: ['Unlimited revisions with no hourly overflow', 'Silent music license responsibility'],
    tips: [legalNotice],
    faq: [
      {
        question: 'Should clients get raw footage?',
        answer:
          'Only if priced and licensed. Raw files increase storage and misuse risk; many videographers sell raw as an add-on.',
      },
      {
        question: 'How many revision rounds should a videography contract include?',
        answer:
          'Two rounds is a common default for branded films and wedding highlights. Spell out what counts as a revision versus a new cut, and set an hourly rate for extra rounds before post begins.',
      },
      {
        question: 'Who is responsible for music licensing?',
        answer:
          'State whether the client supplies cleared tracks or the videographer licenses stock/sync music. Unclear music clauses are a frequent source of takedown risk on social platforms.',
      },
      {
        question: 'What cancellation terms are typical for video shoots?',
        answer:
          'Many agreements make the deposit non-refundable inside 14 days of the first shoot date, with weather holds for outdoor work. Mirror deposit and cancel math in both the fee and cancellation clauses.',
      },
      {
        question: 'Should delivery format and timeline be in the contract?',
        answer:
          'Yes—list resolution (e.g. 4K), file types, transfer method, and delivery window in business days. Vague “when ready” language invites scope creep on rush edits.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['photography-contract-template', 'freelance-web-design-contract', 'event-wedding-vendor-contract'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const freelanceWebContract: ToolDefinition = {
  slug: 'freelance-web-design-contract',
  name: 'Freelance / Web Design Contract',
  shortName: 'Web Design Contract',
  category: 'contracts',
  primaryKeyword: 'freelance web design contract',
  secondaryKeywords: ['web design contract template', 'freelance contract template', 'website development agreement'],
  title: 'Freelance Web Design Contract – Free Template',
  metaDescription:
    'Generate a freelance web design contract with scope, milestones, IP transfer, and editable clauses. PDF/DOCX export. Not legal advice.',
  h1: 'Freelance & Web Design Contract Template',
  answerFirst:
    'A freelance web design contract defines scope, milestones, payment schedule, revision limits, and when intellectual property transfers to the client. Use this editable template to draft terms, preview them, and export PDF or DOCX. Not legal advice.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Freelance Web Design Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'freelancerName', label: 'Freelancer / studio', type: 'text', required: true, section: 'Parties' },
    { id: 'clientName', label: 'Client', type: 'text', required: true, section: 'Parties' },
    { id: 'projectName', label: 'Project name', type: 'text', required: true, section: 'Project' },
    { id: 'scope', label: 'Scope summary', type: 'textarea', rows: 4, required: true, section: 'Project' },
    { id: 'milestones', label: 'Milestones & payments', type: 'textarea', rows: 4, required: true, section: 'Project' },
    { id: 'totalFee', label: 'Total fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Deposit', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'timelineWeeks', label: 'Estimated timeline (weeks)', type: 'number', inputMode: 'numeric', min: 1, section: 'Fees' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    freelancerName: 'Rivercode Studio',
    clientName: 'Pine & Co. Retail',
    projectName: 'Marketing site redesign (8–10 pages)',
    scope: 'Design and implement a responsive marketing website: home, about, services (3), blog index, contact. Includes CMS training (1 hr). Excludes copywriting, photography, and ongoing SEO retainers.',
    milestones: '30% deposit on signing (wireframes)\n40% on design approval\n30% on launch',
    totalFee: 6800,
    deposit: 2040,
    timelineWeeks: 6,
    clauses: [
      clause('scope', 'Scope and change requests', 'Services are limited to the scope summary. Out-of-scope requests will be estimated in writing before work proceeds.'),
      clause('client', 'Client responsibilities', 'Client will provide content, feedback, and approvals within 5 business days of each request. Delays may extend the timeline.'),
      clause('ip', 'Intellectual property', 'Upon full payment, Freelancer assigns to Client rights in final deliverables created uniquely for Client, excluding third-party tools, fonts, libraries, and Freelancer’s pre-existing frameworks.'),
      clause('portfolio', 'Portfolio use', 'Freelancer may display the work in portfolios and case studies unless Client requests confidentiality in writing before launch.'),
      clause('warranty', 'Warranty', 'For 30 days after launch, Freelancer will fix defects that materially deviate from the approved scope at no charge. New features are billable.'),
      clause('termination', 'Termination', 'Either party may terminate for material breach uncured within 10 days’ notice. Client pays for work completed through the termination date.'),
    ],
  },
  content: {
    howToUse: [
      'Describe scope and milestone payments clearly.',
      'Edit IP and change-request clauses.',
      'Export and review with both parties.',
    ],
    whatToInclude: [
      {
        heading: 'Web project clauses that prevent scope creep',
        body: 'Define page count, browser support, revision rounds, content deadlines, hosting responsibilities, and what “launch” means (DNS cutover vs staging handoff).',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'A $6,800 redesign with 30/40/30 milestones and a 6-week timeline shows how deposit and IP transfer after full payment can be stated simply.',
    },
    commonMistakes: ['IP transfer before final payment', 'No feedback-turnaround SLA'],
    tips: [legalNotice],
    faq: [
      {
        question: 'Should freelancers use work-for-hire language?',
        answer:
          'It depends on jurisdiction and leverage. Many freelancers assign IP on full payment instead. Ask a lawyer which structure fits your location.',
      },
      {
        question: 'What milestone schedule works for web design contracts?',
        answer:
          'A common pattern is about 30% deposit to start, 40% on design approval, and 30% on launch. Tie each payment to a deliverable so invoices are paperwork, not renegotiation.',
      },
      {
        question: 'How do I limit revision rounds and scope creep?',
        answer:
          'Define page count, included revision rounds, and a written change-request process with new estimates before out-of-scope work. Client feedback deadlines (e.g. five business days) keep timelines honest.',
      },
      {
        question: 'When should IP transfer to the client?',
        answer:
          'Many freelancers assign rights in final unique deliverables only after full payment, while excluding third-party fonts, libraries, and pre-existing frameworks. State that split clearly in the IP clause.',
      },
      {
        question: 'What client responsibilities belong in the contract?',
        answer:
          'Content delivery, timely feedback, hosting or DNS access, and who provides copy or photos. Missing client-duty language is a common cause of “the site is late” disputes.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['simple-nda', 'photography-contract-template', 'quote-estimate-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const eventVendorContract: ToolDefinition = {
  slug: 'event-wedding-vendor-contract',
  name: 'Event / Wedding Vendor Contract',
  shortName: 'Event Vendor Contract',
  category: 'contracts',
  primaryKeyword: 'wedding vendor contract',
  secondaryKeywords: ['event vendor contract template', 'wedding vendor agreement', 'vendor services contract'],
  title: 'Wedding Vendor Contract – Free Template',
  metaDescription:
    'Draft an event or wedding vendor contract: date, venue, fee, setup times, cancellation clauses. Editable; PDF/DOCX. Not legal advice.',
  h1: 'Event & Wedding Vendor Contract Template',
  answerFirst:
    'An event or wedding vendor contract locks the event date, service window, fee, deposit, setup/teardown times, and cancellation rules between vendor and client. Customize editable clauses here and export PDF or DOCX. Not legal advice.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Event Vendor Services Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'vendorName', label: 'Vendor / business', type: 'text', required: true, section: 'Parties' },
    { id: 'serviceType', label: 'Service type', type: 'text', required: true, section: 'Parties', placeholder: 'e.g. Florist, DJ, Officiant' },
    { id: 'clientName', label: 'Client', type: 'text', required: true, section: 'Parties' },
    { id: 'eventDate', label: 'Event date', type: 'date', required: true, section: 'Event' },
    { id: 'venue', label: 'Venue', type: 'text', required: true, section: 'Event' },
    { id: 'serviceWindow', label: 'Service window', type: 'text', required: true, section: 'Event' },
    { id: 'setupNotes', label: 'Setup / teardown notes', type: 'textarea', rows: 2, section: 'Event' },
    { id: 'fee', label: 'Total fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Deposit', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'inclusions', label: 'Inclusions', type: 'textarea', rows: 3, required: true, section: 'Scope' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    vendorName: 'Petal & Pine Florals',
    serviceType: 'Wedding floral design',
    clientName: 'Casey & Morgan Ellis',
    eventDate: '2026-06-14',
    venue: 'River House Conservatory',
    serviceWindow: 'Setup 9:00 AM–12:00 PM; event 1:00–9:00 PM; strike by 10:00 PM',
    setupNotes: 'Vendor needs loading-dock access and one 6-ft table for prep. No open flame per venue rules.',
    fee: 2100,
    deposit: 700,
    inclusions: 'Bridal bouquet, 6 boutonnieres, 10 centerpieces, ceremony arch florals. Delivery and setup included. Teardown not included unless selected.',
    clauses: [
      clause('date', 'Date hold', 'Vendor reserves the event date upon deposit. Client confirms final guest count and venue rules 14 days prior.'),
      clause('payment', 'Payment', 'Deposit due on signing. Balance due 14 days before the event unless otherwise agreed.'),
      clause('cancel', 'Cancellation', 'Deposits are non-refundable after 7 days from signing except where required by law. If Vendor cannot perform, Vendor will attempt a substitute of similar quality or refund fees paid.'),
      clause('force', 'Force majeure', 'If the venue cancels or a government order prevents the event, parties will attempt to reschedule once within 12 months; deposits transfer to the new date.'),
      clause('damage', 'Property', 'Client is responsible for venue damage deposits. Vendor is responsible for Vendor-owned equipment.'),
    ],
  },
  content: {
    howToUse: [
      'Name the vendor service and event logistics.',
      'List inclusions clearly; edit cancellation clauses.',
      'Export for both parties to sign.',
    ],
    whatToInclude: [
      {
        heading: 'Wedding vendor must-haves',
        body: 'Hard date, rain plan if outdoor, overtime fees, meal provision for vendors, insurance requirements, and who provides tables/power/linens.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'A $2,100 floral package with $700 deposit and explicit setup window shows how to prevent day-of access disputes.',
    },
    commonMistakes: ['No strike/teardown responsibility', 'Vague “full service” inclusions'],
    tips: [legalNotice],
    faq: [
      {
        question: 'Do vendors need venue COIs?',
        answer:
          'Many venues require certificates of insurance. Ask the venue early and attach requirements as an exhibit.',
      },
      {
        question: 'What should a wedding vendor cancellation clause include?',
        answer:
          'Deposit refund rules, notice windows, substitute-vendor duties if the vendor cannot perform, and how reschedules transfer the deposit. Match the clause to the payment schedule on the quote.',
      },
      {
        question: 'How does force majeure usually work for events?',
        answer:
          'Sample language often allows one reschedule within a set window (for example 12 months) when a venue cancelation or government order blocks the date, with deposits transferring. Have counsel adapt it for your jurisdiction.',
      },
      {
        question: 'Should setup and teardown times be in the contract?',
        answer:
          'Yes—list load-in, service window, and strike deadlines. Venues enforce dock and noise rules; vague “day of” access notes cause overtime and damage-deposit fights.',
      },
      {
        question: 'What inclusions should event vendors spell out?',
        answer:
          'Exact deliverables (e.g. bouquet counts, hours of DJ play), what the client must supply (tables, power, meals), overtime fees, and outdoor rain plans when relevant.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['photography-contract-template', 'catering-quote', 'videography-contract'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const simpleNda: ToolDefinition = {
  slug: 'simple-nda',
  name: 'Simple NDA Generator',
  shortName: 'Simple NDA',
  category: 'contracts',
  primaryKeyword: 'simple NDA',
  secondaryKeywords: ['NDA template free', 'non disclosure agreement template', 'mutual NDA generator'],
  title: 'Simple NDA Template – Free Generator',
  metaDescription:
    'Generate a simple mutual or one-way NDA with editable definitions and term length. Preview and export PDF/DOCX. Not legal advice.',
  h1: 'Simple NDA (Non-Disclosure Agreement) Generator',
  answerFirst:
    'A simple NDA (non-disclosure agreement) defines confidential information, permitted use, exclusions, and how long secrecy lasts between parties. Draft a mutual or one-way NDA here with editable clauses and export PDF or DOCX. Not legal advice.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Non-Disclosure Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'ndaType', label: 'NDA type', type: 'select', section: 'Type', options: [
      { value: 'Mutual', label: 'Mutual' },
      { value: 'One-way (Discloser → Recipient)', label: 'One-way' },
    ]},
    { id: 'partyA', label: 'Party A (Discloser)', type: 'text', required: true, section: 'Parties' },
    { id: 'partyB', label: 'Party B (Recipient)', type: 'text', required: true, section: 'Parties' },
    { id: 'effectiveDate', label: 'Effective date', type: 'date', required: true, section: 'Parties' },
    { id: 'purpose', label: 'Purpose of disclosure', type: 'textarea', rows: 3, required: true, section: 'Terms' },
    { id: 'termYears', label: 'Confidentiality term (years)', type: 'number', inputMode: 'numeric', min: 1, max: 10, section: 'Terms' },
    { id: 'governingState', label: 'Governing law (state/country)', type: 'text', section: 'Terms' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    ndaType: 'Mutual',
    partyA: 'Rivercode Studio',
    partyB: 'Pine & Co. Retail',
    effectiveDate: '2026-10-19',
    purpose: 'Evaluating a potential website redesign engagement and exchanging brand strategy materials.',
    termYears: 3,
    governingState: 'State of Oregon, USA',
    clauses: [
      clause('def', 'Definition of confidential information', 'Confidential Information means non-public business, technical, or financial information disclosed by a party that is marked confidential or that a reasonable person would understand to be confidential given its nature.'),
      clause('exclusions', 'Exclusions', 'Confidential Information does not include information that is public through no fault of the recipient, independently developed, rightfully received from a third party without duty, or required to be disclosed by law (with notice where legally permitted).'),
      clause('use', 'Use and care', 'Recipient will use Confidential Information only for the stated purpose and will protect it with reasonable care, no less than the care used for its own similar information.'),
      clause('term', 'Term', 'Obligations continue for the confidentiality term stated above after disclosure, except for trade secrets which remain protected while they qualify as trade secrets under applicable law.'),
      clause('return', 'Return or destruction', 'Upon written request, Recipient will return or destroy Confidential Information, except archival copies retained under ordinary backup policies, which remain subject to this NDA.'),
    ],
  },
  content: {
    howToUse: [
      'Choose mutual or one-way.',
      'State the purpose narrowly.',
      'Set term and governing law; edit clauses; export.',
    ],
    whatToInclude: [
      {
        heading: 'NDA clause explanations',
        body: 'Definitions and exclusions prevent overreach. Purpose limits use. Term sets duration. Return/destruction handles offboarding. Non-solicit and IP assignment are separate issues—don’t overload a “simple” NDA unless counsel recommends it.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'A mutual 3-year NDA for evaluating a web redesign keeps the purpose narrow so marketing lists aren’t swept in unintentionally.',
    },
    commonMistakes: ['Eternal NDAs with no exclusions', 'Using NDAs instead of employment/IP agreements'],
    tips: [legalNotice],
    faq: [
      {
        question: 'Is a simple NDA enough for investors or employees?',
        answer:
          'Often no. Investors may refuse broad NDAs; employees usually need invention-assignment and confidentiality in employment docs. Seek counsel.',
      },
      {
        question: 'When should I use a mutual vs one-way NDA?',
        answer:
          'Use one-way when only one party discloses secrets; use mutual when both sides will share confidential materials (for example a studio and a brand exchanging strategy docs).',
      },
      {
        question: 'How long should NDA confidentiality last?',
        answer:
          'Many freelance NDAs use a 2–5 year term after disclosure, with trade secrets protected longer while they remain secrets under applicable law. Eternal terms without exclusions are often hard to negotiate.',
      },
      {
        question: 'What should the confidential-information definition include?',
        answer:
          'Non-public business, technical, or financial information that is marked confidential or that a reasonable person would treat as confidential—plus clear exclusions for public, independently developed, or legally required disclosures.',
      },
      {
        question: 'Do I need a return-or-destruction clause?',
        answer:
          'It helps at offboarding: on written request, the recipient returns or destroys materials, with ordinary backup copies still subject to the NDA. Pair it with a narrow purpose clause so use stays limited.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['freelance-web-design-contract', 'photography-contract-template', 'event-wedding-vendor-contract'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};
