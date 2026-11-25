import type { ToolDefinition } from './types';
import { clause } from './line-item-defaults';
import { contractSources, lienWaiverSources } from './shared-sources';

const legalNotice =
  'This generator produces editable sample language for discussion. It is not legal advice, not a law-firm product, and not a substitute for an attorney licensed in your jurisdiction. Laws vary by location and situation.';

const lienWaiverStateNote =
  'State lien-waiver forms vary. Some states publish statutory wording (California’s Contractors State License Board is one example). This page is sample language only—not a substitute for your state’s form or advice from a licensed attorney.';

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
  title: 'Photography Contract Template (Free PDF)',
  metaDescription:
    'Photography contract with retainer, deliverables, usage rights and cancellation. Free PDF/Word generator for photographers.',
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
  updatedAt: '2026-11-22',
};

export const videographyContract: ToolDefinition = {
  slug: 'videography-contract',
  name: 'Videography Contract Template',
  shortName: 'Videography Contract',
  category: 'contracts',
  primaryKeyword: 'videography contract',
  secondaryKeywords: [
    'videographer contract template',
    'video contract template',
    'freelance videographer agreement',
  ],
  title: 'Videography Contract Template (Free Wedding & Video)',
  metaDescription:
    'Videography contract with shoot details, deliverables, deposit, copyright, revisions and cancellation. Free PDF/Word, wedding and corporate presets.',
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
      'Enter parties, shoot dates, locations, and fee structure.',
      'Define deliverables, revision rounds, and the license summary in plain language.',
      'Edit deposit, copyright, raw-footage, cancellation, and weather clauses to match how you work.',
      'Export PDF or Word and have both parties review with their own counsel before signing.',
    ],
    whatToInclude: [
      {
        heading: 'What to include in a videography contract',
        body: 'Name the parties, shoot date(s), locations, crew size if it matters, deliverable formats and runtimes, included revision rounds, total fee, deposit, remaining balance timing, and who owns or licenses the finished film. Add music licensing responsibility, talent or location releases, overtime, and how cancellations or weather holds work.\n\nWedding coverage and corporate brand films use the same skeleton with different deliverables. For a wedding-day preset (ceremony-to-reception hours, highlight length, rain plan), use /tools/wedding-videography-contract-template/. For commercial / brand video production (hero runtime, social cutdowns, channel licenses, milestone billing), use /tools/video-production-contract/. This page stays the general videography starting point.',
      },
      {
        heading: 'Deposit and payment schedule',
        body: 'Spell out the deposit amount, when it is due, and whether it is refundable. Many videographers take roughly one-third on signing to hold the calendar, with the balance due on delivery or a few days before the shoot. Put the same numbers in the fee fields and the payment clause so the client is not reading two stories.\n\nIf the job has milestones (rough cut, picture lock, final files), tie each invoice to a deliverable. Late-payment pauses on non-critical edits are fine when you state them up front.',
      },
      {
        heading: 'Copyright, licence, and portfolio use',
        body: 'In many freelance U.S. arrangements the videographer keeps copyright and grants the client a license for listed channels. Say whether the license is perpetual, worldwide, and limited to owned sites and paid social—or broader. Commercial resale, stock, or white-label reuse usually needs a separate written license.\n\nPortfolio and showreel use is common; give the client a clear opt-out in writing before the shoot if they need confidentiality. Credits on YouTube or the project page help when both sides want the work shown. This is general information, not legal advice—confirm ownership rules for your country and any work-for-hire facts.',
      },
      {
        heading: 'Raw footage, revisions, permits, and weather',
        body: 'Raw footage is often excluded unless the client buys an add-on. Say how long project files stay archived (for example 90 days) and what a revision round means versus a new cut. Two included rounds is a common working pattern for brand films and wedding highlights; price extras hourly before post starts.\n\nPermits and location access: state who books city film permits, venue permissions, and drone authorizations. Outdoor shoots need a weather hold or backup indoor plan so a washout does not turn into an unpaid reshoot fight. Music licensing responsibility belongs in writing—client-supplied cleared tracks versus stock you license.',
      },
    ],
    workedExample: {
      heading: 'Worked example: corporate brand film (and a wedding variant)',
      body: 'Frame & Field Films prices North Shore Wellness a $5,400 brand story: one 90-second 4K hero, three 15-second cutdowns, two revision rounds, and a worldwide license for owned channels and paid social. Deposit $1,800 on signing; balance on final delivery. Raw footage stays with the company unless the client buys an addendum. Weather hold sits on the outdoor plaza day.\n\nWedding variant (illustrative): same generator, swap project title to “Wedding day film,” list 8 hours of coverage, a 5–7 minute highlight, speech cutdowns, and personal-use sharing. Pair the signed video agreement with /tools/photography-contract-template/ when a stills photographer is on the same day, and with /tools/event-wedding-vendor-contract/ for other vendors.',
    },
    commonMistakes: [
      'Unlimited revisions with no hourly overflow',
      'Silent music license responsibility',
      'Promising raw footage without pricing storage and license limits',
      'No weather or permit language on outdoor or venue-restricted shoots',
    ],
    tips: [
      legalNotice,
      'Attach a shot list or rundown as an exhibit instead of stuffing every beat into the fee clause.',
      'Collect talent and location releases when faces or private property will appear in marketing cuts.',
    ],
    faq: [
      {
        question: 'What should a videography contract include?',
        answer:
          'Parties, shoot dates and locations, deliverables and formats, revision rounds, fee and deposit schedule, copyright or license summary, cancellation and weather terms, music licensing responsibility, and whether raw footage is included. Edit the clauses here, then have counsel review before you rely on them.',
      },
      {
        question: 'How much deposit should a videographer ask for?',
        answer:
          'There is no single correct percent. Many shops take about one-third on signing to hold the date, with the balance due before the shoot or on delivery. State the amount, due date, and refund rule in both the fee fields and the payment clause.',
      },
      {
        question: 'Who owns the copyright in the video?',
        answer:
          'In many U.S. freelance jobs the videographer owns copyright unless a written transfer says otherwise; the client receives a license for listed uses. Work-for-hire and employment facts can change that. Confirm for your country—this is not legal advice.',
      },
      {
        question: 'Can the videographer use the film in a portfolio?',
        answer:
          'Often yes when the contract says so. Give the client a written portfolio opt-out before the shoot if they need confidentiality, and note credit expectations on public pages.',
      },
      {
        question: 'Should clients get raw footage?',
        answer:
          'Only if priced and licensed. Raw files increase storage and misuse risk; many videographers sell raw as an add-on and keep project archives for a stated window (for example 90 days).',
      },
      {
        question: 'How many revision rounds should a videography contract include?',
        answer:
          'Two rounds is a common default for branded films and wedding highlights. Spell out what counts as a revision versus a new cut, and set an hourly rate for extra rounds before post begins.',
      },
      {
        question: 'What cancellation terms are typical for video shoots?',
        answer:
          'Many agreements make the deposit non-refundable inside about 14 days of the first shoot date, with weather holds for outdoor work. Mirror deposit and cancel math in both the fee and cancellation clauses.',
      },
      {
        question: 'Who handles permits and location access?',
        answer:
          'Say it in writing. Some clients book venue and city permits; some productions include them. Drone, music, and talent releases are easy to forget until a platform takedown or a venue turns the crew away.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: [
    'wedding-videography-contract-template',
    'video-production-contract',
    'photography-contract-template',
    'event-wedding-vendor-contract',
    'simple-nda',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-25',
};

/** Wedding-day preset of the videography contract fields — GSC: wedding videography / wedding videographer. */
export const weddingVideographyContract: ToolDefinition = {
  slug: 'wedding-videography-contract-template',
  name: 'Wedding Videography Contract Template',
  shortName: 'Wedding Video Contract',
  category: 'contracts',
  primaryKeyword: 'wedding videography contract template',
  secondaryKeywords: [
    'contract for wedding videographer',
    'wedding video agreement',
    'wedding videographer contract',
    'freelance videographer contract template',
  ],
  title: 'Wedding Videography Contract Template (Free)',
  metaDescription:
    'Wedding videography contract with day timeline, highlight film, ceremony audio, deposit, rain plan and cancellation. Free PDF/Word. Not legal advice.',
  h1: 'Free Wedding Videography Contract Template',
  answerFirst:
    'A wedding videography contract locks the day timeline, coverage hours, highlight and speech deliverables, deposit, rain or venue-change plan, and usage rights before the date is held. Fill those fields here, preview live, and export PDF or DOCX. Not legal advice—have counsel review before you rely on it.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Wedding Videography Services Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'companyName', label: 'Videographer / company', type: 'text', required: true, section: 'Parties' },
    { id: 'clientName', label: 'Couple / client', type: 'text', required: true, section: 'Parties' },
    { id: 'projectTitle', label: 'Project title', type: 'text', required: true, section: 'Project' },
    { id: 'shootDates', label: 'Wedding date(s)', type: 'text', required: true, section: 'Project' },
    { id: 'locations', label: 'Locations & timeline', type: 'textarea', rows: 3, section: 'Project' },
    { id: 'fee', label: 'Total fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Retainer / deposit', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'deliverables', label: 'Deliverables', type: 'textarea', rows: 3, required: true, section: 'Deliverables' },
    { id: 'revisions', label: 'Included revision rounds', type: 'number', inputMode: 'numeric', min: 0, section: 'Deliverables' },
    { id: 'license', label: 'License summary', type: 'textarea', rows: 2, section: 'Deliverables' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    companyName: 'Evergreen Wedding Films',
    clientName: 'Jordan & Avery Patel',
    projectTitle: 'Wedding day film – highlight + ceremony',
    shootDates: '2026-09-12 (ceremony 3:30pm; reception to 11:00pm)',
    locations:
      'Getting ready: Harbor Inn suite (10:00–13:00). Ceremony: Lakeside Pavilion (15:30). Cocktail + reception: Pavilion ballroom and patio. Travel between venues ≤20 minutes.',
    fee: 4200,
    deposit: 1680,
    deliverables:
      '8 hours of coverage with one lead + one second shooter. 5–7 minute highlight film (1080p/4K download) within 90 days. Full ceremony edit optional add-on. Speech cutdowns for two toasts. Raw footage not included unless purchased.',
    revisions: 2,
    license:
      'Couple receives a personal-use license for sharing with family and on personal social accounts. Commercial use, resale, or stock licensing requires a separate written license.',
    clauses: [
      clause(
        'scope',
        'Scope & timeline',
        'Company will film the wedding day within the stated coverage hours and locations. A shot-list or timeline exhibit may be attached. Overtime beyond package hours is billed at the hourly rate disclosed before the event.',
      ),
      clause(
        'payment',
        'Retainer & balance',
        'Retainer is due on signing to reserve the date. Remaining balance is due 30 days before the wedding unless otherwise agreed in writing. Late balance may pause editing until paid.',
      ),
      clause(
        'revisions',
        'Revisions',
        'Fee includes the stated revision rounds for the highlight film (song choice and length). Additional revisions are billed hourly before work continues.',
      ),
      clause(
        'raw',
        'Raw footage',
        'Raw footage remains Company property unless Client purchases a raw-footage addendum. Project files are archived for 90 days after final delivery.',
      ),
      clause(
        'weather',
        'Weather & venue change',
        'Outdoor segments follow the couple’s rain plan or move indoors at the same venue when weather prevents safe filming. A venue change more than 50 miles may require a travel addendum.',
      ),
      clause(
        'cancel',
        'Cancellation',
        'If Client cancels more than 60 days before the wedding date, retainer is transferable once to a new date within 12 months subject to availability. Cancellation inside 60 days: retainer is non-refundable. Company cancellation without cause results in a full refund of fees paid.',
      ),
      clause(
        'credit',
        'Credits & portfolio',
        'Client will credit Company where customary (YouTube description, wedding website). Company may use short clips in a portfolio unless Client delivers a written portfolio opt-out before the wedding day.',
      ),
    ],
  },
  content: {
    howToUse: [
      'Enter the couple’s names, wedding date, and multi-location timeline.',
      'List coverage hours, highlight length, speech cutdowns, and whether raw footage is sold.',
      'Set retainer, balance due date, rain plan, and cancellation windows in the clauses.',
      'Export PDF or Word and have both parties review with their own counsel before signing.',
    ],
    whatToInclude: [
      {
        heading: 'What a wedding videography contract should lock',
        body: 'Wedding-day video fights usually start with timeline, overtime, and deliverable length—not with fancy legalese. Write getting-ready start, ceremony call time, reception end, and travel between venues. Name crew count (lead + second). State highlight runtime, ceremony edit policy, speech cutdowns, and delivery window in days.\n\nRetainer amount, balance due date, rain or venue-change plan, music licensing responsibility, and personal-vs-commercial usage belong on the same PDF. For general clause vocabulary across wedding and commercial jobs, see /tools/videography-contract/ and /guides/videography-contract-clauses/. For wedding logistics narrative, see /guides/wedding-videography-contract/.',
      },
      {
        heading: 'Retainer, overtime, and rain plans',
        body: 'Many wedding studios take about 40% on signing to hold the calendar, with balance due about 30 days before the event—treat those percents as a working pattern, not a rule. Put overtime hourly rates in writing before the reception runs late. Outdoor vows need a rain plan so a washout does not become an unpaid reshoot.\n\nWhen a stills photographer is on the same day, pair this video agreement with /tools/photography-contract-template/. Other vendors can use /tools/event-wedding-vendor-contract/.',
      },
      {
        heading: 'Rights for couples vs commercial reuse',
        body: 'Couples usually need personal sharing rights for family and social posts. Commercial reuse (ads, stock, white-label) should be excluded unless priced. Portfolio use is common; give a written opt-out before the day if the couple needs privacy. This is general information, not legal advice.',
      },
    ],
    workedExample: {
      heading: 'Worked example: 8-hour wedding highlight package (illustrative)',
      body: 'Evergreen Wedding Films books Jordan & Avery Patel for 8 hours with a lead and second shooter. Sample package: $4,200 total, $1,680 retainer (~40%), balance 30 days before 12 Sep 2026. Deliverables: 5–7 minute highlight within 90 days, two speech cutdowns, two revision rounds. Rain plan moves patio vows indoors. Raw footage sold only as an add-on. Swap every number for your own rates before you send the PDF.',
    },
    commonMistakes: [
      'Coverage hours without ceremony and reception end times.',
      'Silent overtime rate when the reception runs late.',
      'No rain or venue-change language for outdoor segments.',
      'Promising raw footage without pricing storage and license limits.',
    ],
    tips: [
      legalNotice,
      'Attach the day-of timeline as an exhibit instead of stuffing every cue into the fee clause.',
      'Collect location and talent releases when private property or recognizable guests appear in marketing cuts.',
    ],
    faq: [
      {
        question: 'What should a wedding videography contract include?',
        answer:
          'Couple and studio names, wedding date, locations and coverage hours, crew count, highlight and speech deliverables, revision rounds, retainer and balance dates, rain or venue-change plan, usage rights, cancellation window, and whether raw footage is included.',
      },
      {
        question: 'How much retainer should a wedding videographer take?',
        answer:
          'There is no single correct percent. Many studios take about 40% on signing with balance due about 30 days before the wedding. State amount, due date, and refund rules in both the fee fields and the payment clause.',
      },
      {
        question: 'Who owns the wedding video copyright?',
        answer:
          'In many U.S. freelance jobs the videographer owns copyright and grants the couple a personal-use license unless a written transfer says otherwise. Confirm for your country—this is not legal advice.',
      },
      {
        question: 'Should couples get raw footage?',
        answer:
          'Only if priced and licensed. Many wedding videographers sell raw as an add-on and keep project archives for a stated window (for example 90 days).',
      },
      {
        question: 'Is this wedding videography contract template free?',
        answer:
          'Yes. Edit in the browser, preview live, and download PDF or DOCX with no account. Not attorney-reviewed.',
      },
      {
        question: 'Wedding video contract vs general videography contract?',
        answer:
          'This preset ships with wedding-day timeline, rain plan, and personal-use defaults. For mixed or commercial brand films, start at /tools/videography-contract/ or /tools/video-production-contract/.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: [
    'videography-contract',
    'video-production-contract',
    'photography-contract-template',
    'event-wedding-vendor-contract',
  ],
  publishedAt: '2026-11-25',
  updatedAt: '2026-11-25',
};

/** Commercial / brand video preset — GSC: video production contract. */
export const videoProductionContract: ToolDefinition = {
  slug: 'video-production-contract',
  name: 'Video Production Contract Template',
  shortName: 'Video Production Contract',
  category: 'contracts',
  primaryKeyword: 'video production contract',
  secondaryKeywords: [
    'video production agreement',
    'video production contract template',
    'freelance videographer contract template',
    'corporate video contract',
  ],
  title: 'Video Production Contract Template (Free)',
  metaDescription:
    'Video production contract for brand films: shoot days, deliverables, milestones, license, revisions and cancellation. Free PDF/Word. Not legal advice.',
  h1: 'Free Video Production Contract Template',
  answerFirst:
    'A video production contract sets shoot days, deliverable runtimes, revision rounds, milestone fees, and channel licenses for commercial or brand films. Fill the form here, preview live, and export PDF or DOCX. Not legal advice—get local counsel before you rely on the PDF.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Video Production Services Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'companyName', label: 'Production company', type: 'text', required: true, section: 'Parties' },
    { id: 'clientName', label: 'Client', type: 'text', required: true, section: 'Parties' },
    { id: 'projectTitle', label: 'Project title', type: 'text', required: true, section: 'Project' },
    { id: 'shootDates', label: 'Shoot date(s)', type: 'text', required: true, section: 'Project' },
    { id: 'locations', label: 'Locations', type: 'textarea', rows: 2, section: 'Project' },
    { id: 'fee', label: 'Total fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Deposit / kickoff fee', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'deliverables', label: 'Deliverables', type: 'textarea', rows: 3, required: true, section: 'Deliverables' },
    { id: 'revisions', label: 'Included revision rounds', type: 'number', inputMode: 'numeric', min: 0, section: 'Deliverables' },
    { id: 'license', label: 'License summary', type: 'textarea', rows: 2, section: 'Deliverables' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    companyName: 'Northframe Production Co.',
    clientName: 'BrightLedger Software Inc.',
    projectTitle: 'Product launch – 60s hero + social cutdowns',
    shootDates: '2026-10-08 (studio), 2026-10-09 (customer site B-roll)',
    locations: 'Rented sound stage, Building B; client HQ lobby and open office (floor 3)',
    fee: 12500,
    deposit: 4167,
    deliverables:
      '1× 60-second hero (4K), 4× 15-second vertical cutdowns, captioned masters, project archive 120 days. Rough cut and picture-lock milestones listed in payment clause.',
    revisions: 2,
    license:
      'Client receives a worldwide, perpetual license for owned websites, product UI, and paid social. Broadcast, resale, and white-label redistribution excluded unless amended in writing.',
    clauses: [
      clause(
        'scope',
        'Scope',
        'Company will produce and edit video as described in the project title and deliverables. Client will provide brand assets, product access, releases, and feedback by agreed deadlines.',
      ),
      clause(
        'payment',
        'Milestones & payment',
        'Kickoff deposit is due on signing. Remaining balance is due on delivery of final files unless milestones are listed: rough cut invoice, picture-lock invoice, then final delivery. Work may pause if a milestone invoice is more than 10 business days overdue.',
      ),
      clause(
        'revisions',
        'Revisions',
        'Fee includes the stated revision rounds after the first rough cut. Brand-compliance notes that change approved creative direction may be billed as a new cut at an hourly rate disclosed before work continues.',
      ),
      clause(
        'raw',
        'Raw footage & archives',
        'Raw footage remains Company property unless Client purchases a raw-footage addendum. Project files are archived for 120 days after final delivery, then may be deleted.',
      ),
      clause(
        'music',
        'Music & talent',
        'Client warrants rights to logos and talent likenesses it supplies. Stock music licensed by Company is cleared for the listed channels only; broadcast or paid media upgrades are Client’s responsibility unless added in writing.',
      ),
      clause(
        'cancel',
        'Cancellation',
        'If Client cancels after kickoff, deposit is non-refundable and completed milestone work is invoiced. Company cancellation without cause results in a full refund of unearned fees paid.',
      ),
      clause(
        'credit',
        'Credits',
        'Client will credit Company where customary (YouTube description, case study page) unless a no-credit addendum is signed for confidential launches.',
      ),
    ],
  },
  content: {
    howToUse: [
      'Enter production company and client names, shoot days, and locations.',
      'Define hero runtime, social cutdowns, milestones, and the channel license.',
      'Edit deposit, revision, music, and cancellation clauses to match how you bill.',
      'Export PDF or Word and have both parties review with their own counsel before signing.',
    ],
    whatToInclude: [
      {
        heading: 'What belongs in a video production contract',
        body: 'Commercial video jobs need shoot days, call times, locations, deliverable runtimes and formats, included revision rounds, total fee, kickoff deposit, and milestone billing if you invoice at rough cut and picture lock. Spell out who clears music, logos, and talent releases.\n\nLicense language should name channels (owned web, paid social, broadcast) and exclude resale or white-label reuse unless priced. For wedding-day coverage, use /tools/wedding-videography-contract-template/ instead. For a general videography starting point, use /tools/videography-contract/.',
      },
      {
        heading: 'Milestones vs single delivery payment',
        body: 'Brand films often invoice in stages: kickoff, rough cut, picture lock, final files. Tie each invoice to a deliverable so AP can match the PO. Late-payment pauses on non-critical edits are fine when you state them up front. Put the same dollars in the fee fields and the payment clause.',
      },
      {
        heading: 'License, portfolio, and confidential launches',
        body: 'Say whether the license is perpetual and worldwide for listed channels. Confidential product launches may need a portfolio opt-out and NDA—pair with /tools/simple-nda/ when you only need confidentiality before the full production agreement. This page is sample language, not legal advice.',
      },
    ],
    workedExample: {
      heading: 'Worked example: product launch hero film (illustrative)',
      body: 'Northframe Production Co. prices BrightLedger a $12,500 launch package: 60-second 4K hero, four 15-second vertical cutdowns, two revision rounds, and a worldwide license for owned web and paid social. Kickoff deposit about one-third ($4,167); balance on final delivery (or split across rough-cut and picture-lock invoices if the client’s AP requires it). Music cleared for listed channels only. Swap rates and runtimes for your crew before you send the PDF.',
    },
    commonMistakes: [
      'Unlimited brand revisions with no hourly overflow.',
      'Silent music or talent clearance responsibility.',
      'License that forgets paid social or broadcast limits.',
      'No milestone language when AP will not pay a single balloon invoice.',
    ],
    tips: [
      legalNotice,
      'Attach a shot list or creative brief as an exhibit instead of stuffing every beat into the fee clause.',
      'Collect talent and location releases before marketing cuts go live.',
    ],
    faq: [
      {
        question: 'What should a video production contract include?',
        answer:
          'Parties, shoot dates and locations, deliverable runtimes and formats, revision rounds, fee and deposit or milestone schedule, license channels, music and talent clearance, cancellation terms, and whether raw footage is included.',
      },
      {
        question: 'How is a video production contract different from a wedding video contract?',
        answer:
          'Production agreements emphasize brand deliverables, milestone billing, and channel licenses. Wedding agreements emphasize day timeline, overtime, and personal-use sharing. Use /tools/wedding-videography-contract-template/ for nuptials.',
      },
      {
        question: 'Who owns copyright in a branded video?',
        answer:
          'In many U.S. freelance jobs the production company owns copyright and grants the client a license for listed uses unless a written transfer says otherwise. Work-for-hire facts can change that. Not legal advice.',
      },
      {
        question: 'How many revision rounds should a production contract include?',
        answer:
          'Two rounds after the first rough cut is a common working pattern for brand films. Define what counts as a revision versus a new creative direction, and price extras hourly.',
      },
      {
        question: 'Is this video production contract template free?',
        answer:
          'Yes. Fill it in the browser, preview live, and download PDF or DOCX with no signup. Not attorney-reviewed.',
      },
      {
        question: 'Do I still need an NDA?',
        answer:
          'If you only need confidentiality before pitching, start with /tools/simple-nda/. A production agreement covers scope, payment, and licenses; an NDA does not replace those terms.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: [
    'videography-contract',
    'wedding-videography-contract-template',
    'simple-nda',
    'freelance-web-design-contract',
  ],
  publishedAt: '2026-11-25',
  updatedAt: '2026-11-25',
};

export const freelanceWebContract: ToolDefinition = {
  slug: 'freelance-web-design-contract',
  name: 'Freelance / Web Design Contract',
  shortName: 'Web Design Contract',
  category: 'contracts',
  primaryKeyword: 'freelance web design contract',
  secondaryKeywords: ['web design contract template', 'freelance contract template', 'website development agreement'],
  title: 'Freelance Web Design Contract Template (Free)',
  metaDescription:
    'Web design contract with scope, milestones, revisions, IP transfer and kill fee. Free PDF/Word generator.',
  h1: 'Free Freelance Web Design Contract',
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
  relatedSlugs: ['independent-contractor-agreement', 'simple-nda', 'service-agreement-template'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-22',
};

export const eventVendorContract: ToolDefinition = {
  slug: 'event-wedding-vendor-contract',
  name: 'Event / Wedding Vendor Contract',
  shortName: 'Event Vendor Contract',
  category: 'contracts',
  primaryKeyword: 'wedding vendor contract',
  secondaryKeywords: ['event vendor contract template', 'wedding vendor agreement', 'vendor services contract'],
  title: 'Wedding Vendor Contract Template (Free PDF)',
  metaDescription:
    'Vendor contract for weddings and events: date, venue, fee, deposit, cancellation, insurance and force majeure. Free PDF/Word.',
  h1: 'Free Wedding & Event Vendor Contract',
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
        body: 'Hard date, rain plan if outdoor, overtime fees, meal provision for vendors, insurance requirements, and who provides tables/power/linens. Run the seven-point review in /guides/wedding-vendor-contract-checklist/ before you pay any deposit.',
      },
      {
        heading: 'Match the contract to the quote and deposit receipt',
        body: 'Compare hours, fees, and deposit dollars to the vendor quote before signing. Catering price math belongs in /tools/catering-quote/. When the deposit clears, issue a payment receipt from /tools/receipt-generator/ and keep the field list in /guides/what-to-include-on-a-receipt/.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'A $2,100 floral package with $700 deposit and explicit setup window shows how to prevent day-of access disputes. After the deposit clears, send receipt RCPT-style PDF referencing this contract so refund fights have a paper trail.',
    },
    commonMistakes: ['No strike/teardown responsibility', 'Vague “full service” inclusions'],
    tips: [
      legalNotice,
      'Store the signed PDF beside the quote and deposit receipt in one event folder.',
    ],
    faq: [
      {
        question: 'Do vendors need venue COIs?',
        answer:
          'Many venues require certificates of insurance. Ask the venue early and attach requirements as an exhibit.',
      },
      {
        question: 'What should a wedding vendor cancellation clause include?',
        answer:
          'Deposit refund rules, notice windows, substitute-vendor duties if the vendor cannot perform, and how reschedules transfer the deposit. Match the clause to the payment schedule on the quote. Full review checklist: /guides/wedding-vendor-contract-checklist/.',
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
  relatedSlugs: [
    'photography-contract-template',
    'videography-contract',
    'wedding-videography-contract-template',
    'catering-quote',
    'receipt-generator',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-25',
};

export const simpleNda: ToolDefinition = {
  slug: 'simple-nda',
  name: 'Simple NDA Generator',
  shortName: 'Simple NDA',
  category: 'contracts',
  primaryKeyword: 'simple NDA',
  secondaryKeywords: ['NDA template free', 'non disclosure agreement template', 'mutual NDA generator'],
  title: 'Simple NDA Template: Free Mutual or One-Way Generator',
  metaDescription:
    'Generate a simple mutual or one-way NDA with editable definitions and term. Free PDF/Word, not legal advice.',
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
      {
        heading: 'Freelancer / simple one-page checklist',
        body: 'For a short freelance discovery call or proposal review, keep the NDA to one page when you can: parties, effective date, narrow purpose (“evaluating a website redesign”), definition of confidential information, exclusions, care standard, term in years, and return-or-destruction. Skip non-compete language unless counsel says you need it.\n\nOne-way fits when only the client shares brand strategy or pricing. Mutual fits when you also disclose your process docs, rates, or unreleased work. Mark the type at the top so nobody signs the wrong flavor.',
      },
      {
        heading: 'Exclusions that keep the NDA fair',
        body: 'Carve out information that is already public, independently developed without use of the disclosure, rightfully received from a third party without a duty, or required by law (with notice where legally permitted). Without those exclusions, everyday industry knowledge gets trapped and the other side may refuse to sign.',
      },
    ],
    workedExample: {
      heading: 'Worked example: mutual NDA before a web redesign',
      body: 'Rivercode Studio and Pine & Co. Retail sign a mutual 3-year NDA to evaluate a website redesign. Purpose stays narrow so marketing email lists are not swept in. Exclusions cover public info and independent development. After the engagement starts, the parties move fee and IP language into a freelance web design contract rather than stretching the NDA into a full services agreement.',
    },
    commonMistakes: [
      'Eternal NDAs with no exclusions',
      'Using NDAs instead of employment/IP agreements',
      'A purpose so broad that ordinary business chat becomes “confidential”',
    ],
    tips: [
      legalNotice,
      'Pair a signed NDA with the service or freelance contract that actually describes the paid work.',
    ],
    faq: [
      {
        question: 'How do I write a simple NDA?',
        answer:
          'Name the parties, choose mutual or one-way, state a narrow purpose, define confidential information with exclusions, set the term, and add return-or-destruction. Export PDF from this generator and have counsel review before you rely on it.',
      },
      {
        question: 'What is the difference between a mutual and one-way NDA?',
        answer:
          'One-way protects disclosures from one party (often the client). Mutual protects both sides when each will share confidential materials—common when a freelancer and a brand exchange strategy docs.',
      },
      {
        question: 'How long should an NDA last?',
        answer:
          'Many freelance NDAs use a 2–5 year term after disclosure, with trade secrets protected longer while they remain secrets under applicable law. Eternal terms without exclusions are often hard to negotiate.',
      },
      {
        question: 'Is an NDA enforceable without a signature?',
        answer:
          'Usually you want a signed writing. Some places recognize other forms of agreement, but an unsigned PDF is a weak place to stand in a dispute. This is general information, not legal advice.',
      },
      {
        question: 'What is excluded from confidential information?',
        answer:
          'Typical exclusions: information that is public through no fault of the recipient, independently developed, rightfully received from a third party without duty, or required to be disclosed by law (with notice where legally permitted).',
      },
      {
        question: 'Is a simple NDA enough for investors or employees?',
        answer:
          'Often no. Investors may refuse broad NDAs; employees usually need invention-assignment and confidentiality in employment docs. Seek counsel.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: [
    'freelance-web-design-contract',
    'photography-contract-template',
    'independent-contractor-agreement',
  ],
  publishedAt: '2026-10-19',
  updatedAt: '2026-11-22',
};

export const independentContractorAgreement: ToolDefinition = {
  slug: 'independent-contractor-agreement',
  name: 'Independent Contractor Agreement',
  shortName: 'Contractor Agreement',
  category: 'contracts',
  primaryKeyword: 'independent contractor agreement',
  secondaryKeywords: [
    'independent contractor agreement template',
    'contractor agreement form',
    'freelance contractor contract',
  ],
  title: 'Independent Contractor Agreement Template (Free)',
  metaDescription:
    'Independent contractor agreement with scope, pay, IP, confidentiality and termination. Free PDF/Word; not legal advice.',
  h1: 'Free Independent Contractor Agreement',
  answerFirst:
    'An independent contractor agreement names the parties, describes the work, sets pay and invoices, clarifies who owns deliverables, and states how either side can end the engagement. Customize the editable clauses below, preview the agreement, and export PDF or DOCX. Not legal advice—classification and wording depend on your facts and jurisdiction.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Independent Contractor Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'clientName', label: 'Client / hiring company', type: 'text', required: true, section: 'Parties' },
    { id: 'clientAddress', label: 'Client address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'contractorName', label: 'Contractor name / business', type: 'text', required: true, section: 'Parties' },
    { id: 'contractorAddress', label: 'Contractor address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'effectiveDate', label: 'Effective date', type: 'date', required: true, section: 'Engagement' },
    { id: 'projectName', label: 'Project / engagement title', type: 'text', required: true, section: 'Engagement' },
    { id: 'scope', label: 'Scope of work', type: 'textarea', rows: 4, required: true, section: 'Engagement' },
    { id: 'fee', label: 'Fee / rate', type: 'currency', inputMode: 'decimal', required: true, section: 'Payment' },
    { id: 'paySchedule', label: 'Payment schedule', type: 'textarea', rows: 3, required: true, section: 'Payment' },
    { id: 'expenses', label: 'Expense policy', type: 'textarea', rows: 2, section: 'Payment' },
    { id: 'termSummary', label: 'Term / end date', type: 'text', section: 'Engagement' },
    { id: 'governingState', label: 'Governing law (state/country)', type: 'text', section: 'Engagement' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    clientName: 'Pine & Co. Retail',
    clientAddress: '210 Market Street, Portland, OR 97204',
    contractorName: 'Rivercode Studio LLC',
    contractorAddress: '88 Alberta St, Portland, OR 97211',
    effectiveDate: '2026-11-13',
    projectName: 'Q1 catalog microsite build',
    scope:
      'Design and implement a five-page marketing microsite (home, catalog, about, FAQ, contact), including staging handoff and one hour of CMS training. Excludes ongoing SEO retainers, paid ads setup, and photography.',
    fee: 4800,
    paySchedule:
      '40% ($1,920) due on signing; 40% ($1,920) on design approval; 20% ($960) on launch. Contractor invoices Net 14.',
    expenses: 'Pre-approved third-party costs (fonts, stock) billed at cost with receipts. Travel not included.',
    termSummary: 'Through project launch or 90 days from the effective date, whichever comes first, unless extended in writing.',
    governingState: 'State of Oregon, USA',
    clauses: [
      clause(
        'status',
        'Independent contractor status',
        'Contractor is an independent contractor, not an employee, partner, or agent of Client. Contractor controls the means and methods of performing the work, supplies tools unless otherwise agreed, and is responsible for taxes, insurance, and licenses required for the services.',
      ),
      clause(
        'scope',
        'Scope and change requests',
        'Services are limited to the scope of work above. Out-of-scope requests require a written change order with revised fees and timeline before work proceeds.',
      ),
      clause(
        'payment',
        'Fees and invoicing',
        'Client will pay the fee according to the payment schedule. Late amounts may accrue interest only if stated in a signed writing and allowed by applicable law. Contractor will provide invoices with enough detail for Client accounts payable.',
      ),
      clause(
        'ip',
        'Work product and intellectual property',
        'Upon full payment, Contractor assigns to Client rights in final deliverables created uniquely for Client under this agreement, excluding Contractor’s pre-existing tools, templates, libraries, and third-party materials. Third-party licenses remain subject to their terms.',
      ),
      clause(
        'confidential',
        'Confidentiality',
        'Each party will protect non-public business information received from the other and use it only to perform this engagement, except for information that is public, independently developed, or required to be disclosed by law.',
      ),
      clause(
        'termination',
        'Termination',
        'Either party may terminate for material breach uncured within 10 days after written notice. Client may terminate for convenience with 7 days’ notice and will pay for work satisfactorily completed through the termination date.',
      ),
    ],
  },
  content: {
    howToUse: [
      'Enter client and contractor names, addresses, and the effective date.',
      'Describe the project scope, fee, and payment schedule in plain language.',
      'Review and edit the independent-contractor, IP, and termination clauses.',
      'Export PDF or DOCX and have both parties review with their own counsel before signing.',
    ],
    whatToInclude: [
      {
        heading: 'What an independent contractor agreement usually covers',
        body: 'Start with the legal names of both parties, a clear scope, deliverables, deadlines, and how invoices get paid. Add who owns the work product after payment, how confidential information is handled, and how either side can end the job. The IRS explains that worker classification turns on facts such as behavioral control, financial control, and the relationship of the parties—not on the document title alone—so treat this template as discussion language, not a classification stamp.',
      },
      {
        heading: 'Payment, expenses, and records',
        body: 'Spell out fixed fees versus hourly rates, milestone triggers, Net terms, and whether expenses need pre-approval. Keep signed agreements with invoices and payment records. IRS small-business recordkeeping guidance treats invoices and related papers as support for gross receipts and expenses; retention periods vary with the type of tax record.',
      },
      {
        heading: 'IP, confidentiality, and change orders',
        body: 'Say when rights in unique deliverables transfer (often after full payment) and what stays with the contractor—frameworks, libraries, and pre-existing templates. Keep confidentiality proportional to what you actually share. Route scope changes through a short written change order so fee and timeline disputes do not start as verbal “quick adds.”',
      },
    ],
    workedExample: {
      heading: 'Worked example: catalog microsite engagement',
      body: 'Pine & Co. Retail hires Rivercode Studio LLC for a $4,800 five-page microsite. The sample uses a 40/40/20 invoice schedule, Oregon governing law, assignment of unique deliverables after full payment, and a convenience-termination clause that still pays completed work. Swap the scope and fee for consulting, design, or trade subcontracting—then re-read the classification and tax clauses with counsel.',
    },
    commonMistakes: [
      'Calling someone a contractor while controlling hours, tools, and methods like an employee.',
      'Leaving IP transfer vague until after launch day.',
      'Skipping written change orders when the client expands scope mid-project.',
      'Omitting invoice timing so accounts payable cannot match milestones.',
    ],
    tips: [
      legalNotice,
      'Pair this agreement with a W-9 (U.S.) collection process when Client will issue Form 1099-NEC.',
      'If the work is creative or web-related, cross-check milestones against your quote PDF.',
    ],
    faq: [
      {
        question: 'What is an independent contractor agreement?',
        answer:
          'It is a written understanding between a hiring company and a self-employed worker that sets scope, pay, ownership of deliverables, confidentiality, and exit terms. It is not, by itself, proof of contractor status for tax or labor law.',
      },
      {
        question: 'How is an independent contractor different from an employee?',
        answer:
          'U.S. tax guidance looks at behavioral control, financial control, and the type of relationship. Employees are typically directed on how to work and receive employment tax withholding; contractors usually control methods, invoice for services, and pay their own self-employment taxes. Facts matter more than labels—see IRS and Cornell LII materials linked in Sources.',
      },
      {
        question: 'How are independent contractors usually paid?',
        answer:
          'Common patterns are fixed project fees with milestone invoices, hourly rates with weekly or biweekly invoices, or retainers. State Net terms, expense rules, and what triggers each invoice so payment is paperwork, not renegotiation.',
      },
      {
        question: 'How do you terminate an independent contractor agreement?',
        answer:
          'Follow the notice and cure periods in the signed writing. Many forms allow termination for uncured breach and a shorter convenience termination that still pays completed work. Do not invent penalties after the fact.',
      },
      {
        question: 'Is this independent contractor agreement legally binding?',
        answer:
          'A signed agreement can be binding if it meets your jurisdiction’s contract requirements, but enforceability and worker classification depend on local law and the real working relationship. This generator is not legal advice and is not a substitute for an attorney.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['freelance-web-design-contract', 'simple-nda', 'service-agreement-template'],
  publishedAt: '2026-11-13',
  updatedAt: '2026-11-22',
};

export const serviceAgreementTemplate: ToolDefinition = {
  slug: 'service-agreement-template',
  name: 'Service Agreement Template',
  shortName: 'Service Agreement',
  category: 'contracts',
  primaryKeyword: 'service agreement template',
  secondaryKeywords: [
    'service agreement form',
    'service contract template',
    'business service agreement',
  ],
  title: 'Service Agreement Template (Free, Word & PDF)',
  metaDescription:
    'Service agreement with parties, scope, fees, term, IP and termination. Free Word and PDF generator, not legal advice.',
  h1: 'Free Service Agreement Template',
  answerFirst:
    'A service agreement template sets who is hiring whom, what services are included, how fees and invoices work, how long the term runs, and what happens if either party ends early. Fill the fields, edit clauses, and export PDF or DOCX in your browser. Not legal advice.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Service Agreement',
  toolVersion: '1.0',
  fields: [
    { id: 'providerName', label: 'Service provider', type: 'text', required: true, section: 'Parties' },
    { id: 'providerAddress', label: 'Provider address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'clientName', label: 'Client', type: 'text', required: true, section: 'Parties' },
    { id: 'clientAddress', label: 'Client address', type: 'textarea', rows: 2, section: 'Parties' },
    { id: 'effectiveDate', label: 'Effective date', type: 'date', required: true, section: 'Services' },
    { id: 'serviceType', label: 'Service type', type: 'text', required: true, section: 'Services' },
    { id: 'scope', label: 'Services / scope', type: 'textarea', rows: 4, required: true, section: 'Services' },
    { id: 'serviceLocation', label: 'Service location', type: 'text', section: 'Services' },
    { id: 'fee', label: 'Fee', type: 'currency', inputMode: 'decimal', required: true, section: 'Fees' },
    { id: 'deposit', label: 'Deposit', type: 'currency', inputMode: 'decimal', section: 'Fees' },
    { id: 'billingTerms', label: 'Billing terms', type: 'textarea', rows: 3, required: true, section: 'Fees' },
    { id: 'termSummary', label: 'Term / renewal', type: 'textarea', rows: 2, section: 'Term' },
    { id: 'governingState', label: 'Governing law', type: 'text', section: 'Term' },
    { id: 'clauses', label: 'Clauses', type: 'clauses', section: 'Clauses' },
  ],
  defaults: {
    providerName: 'ClearPath Facilities LLC',
    providerAddress: '55 Harbor Ave, Seattle, WA 98104',
    clientName: 'North Shore Wellness LLC',
    clientAddress: '900 Cascade Blvd, Seattle, WA 98109',
    effectiveDate: '2026-11-13',
    serviceType: 'Monthly facilities maintenance',
    scope:
      'Scheduled monthly walkthrough, filter changes on HVAC units listed in Exhibit A, lightbulb and ballast replacements in common areas, and written punch-list after each visit. Excludes major repairs, roofing, and after-hours emergency response unless separately quoted.',
    serviceLocation: 'North Shore Wellness clinic – Cascade Blvd',
    fee: 1200,
    deposit: 0,
    billingTerms: 'Flat $1,200 per month, invoiced on the 1st, Net 15. Materials under $75 included; larger parts billed at cost with prior email approval.',
    termSummary: 'Initial term 12 months; then month-to-month until either party gives 30 days’ written notice.',
    governingState: 'State of Washington, USA',
    clauses: [
      clause(
        'services',
        'Services',
        'Provider will perform the services described in the scope above in a professional manner. Services outside that scope require a written change order or separate quote.',
      ),
      clause(
        'fees',
        'Fees and payment',
        'Client will pay fees and approved expenses according to the billing terms. Provider may pause non-critical work if invoices remain unpaid beyond the stated Net period after written notice.',
      ),
      clause(
        'access',
        'Access and client duties',
        'Client will provide reasonable site access, keys or codes, and a point of contact. Delays caused by denied access may shift the schedule without penalty to Provider.',
      ),
      clause(
        'warranty',
        'Limited warranty',
        'Provider will re-perform defective services reported within 30 days of the visit at no extra labor charge when the defect stems from Provider workmanship. Parts warranties follow the manufacturer.',
      ),
      clause(
        'liability',
        'Limitation of liability',
        'Except where prohibited by law, Provider’s total liability under this agreement is limited to fees paid for the three months preceding the claim. Neither party is liable for indirect or consequential damages.',
      ),
      clause(
        'termination',
        'Term and termination',
        'The term summary above controls renewal and notice. Either party may terminate for material breach uncured within 15 days after written notice.',
      ),
    ],
  },
  content: {
    howToUse: [
      'Name the provider and client, then the service type and location.',
      'Write a measurable scope and billing terms (flat, hourly, or retainer).',
      'Edit warranty, access, and termination clauses to match how you actually work.',
      'Export PDF/DOCX for both parties to review—this is not legal advice.',
    ],
    whatToInclude: [
      {
        heading: 'Service agreement checklist (what to include)',
        body: 'Identify the parties, effective date, service description, location, fees, invoice timing, term or renewal, and exit notice. Add access duties, warranty limits, IP or work-product ownership if deliverables are unique, and how change orders work. Cornell LII’s contract overview still centers offer, acceptance, and consideration—your PDF should make those elements obvious in plain language rather than hiding them in jargon.',
      },
      {
        heading: 'Services you sell: retainers and maintenance',
        body: 'Use this template when you sell ongoing services—monthly maintenance, consulting retainers, facilities visits, landscaping rounds, or IT support blocks. Flat monthly fees, hourly buckets, and retainer-plus-overage all fit if the billing terms say how invoices run.\n\nWrite the visit list or hours included so “general maintenance” is not a blank check. Attach an exhibit for equipment lists or response-time targets instead of stuffing every SLA metric into one paragraph.',
      },
      {
        heading: 'Service agreement vs niche contracts',
        body: 'Use this general service agreement when the work is ongoing maintenance, consulting, or multi-visit services that do not already fit a specialized Docuklin template (photography, videography, wedding vendor, or web design). If the relationship is clearly a project freelance build with IP handoff, prefer the freelance web design contract. If worker classification is the main risk, start from the independent contractor agreement.',
      },
      {
        heading: 'Deposits, renewals, and proof',
        body: 'If you take a deposit, say whether it applies to the first invoice or is refundable. For renewals, state notice windows in calendar days. Keep signed PDFs with invoices; IRS recordkeeping pages list invoices and related papers among records that support business income and expenses.',
      },
    ],
    workedExample: {
      heading: 'Worked example: monthly facilities service',
      body: 'ClearPath Facilities bills North Shore Wellness $1,200 per month for scheduled HVAC filter changes and common-area lighting, with materials under $75 included and larger parts pre-approved by email. The sample runs 12 months, then month-to-month with 30 days’ notice. Replace the scope lines for IT support, landscaping, or coaching retainers.',
    },
    commonMistakes: [
      'Vague scopes like “general maintenance” with no visit list.',
      'No Net terms or late-invoice pause language.',
      'Warranty promises that outrun what manufacturers cover on parts.',
      'Treating this educational template as attorney-reviewed counsel.',
    ],
    tips: [
      legalNotice,
      'Attach an exhibit for equipment lists or SLAs instead of stuffing them into one paragraph.',
      'If you need contractor vs employee language, start from the independent contractor agreement.',
    ],
    faq: [
      {
        question: 'What should a service agreement include?',
        answer:
          'Parties, effective date, detailed services, fees and invoice timing, term or renewal, client access duties, warranty or re-performance limits, change-order rules, and termination notice. Add governing law only after counsel confirms it fits your situation.',
      },
      {
        question: 'Is a service agreement the same as a contract?',
        answer:
          'A signed service agreement is a type of contract when it has offer, acceptance, and consideration under your local rules. People often say “contract” for any signed deal; this template is the commercial services version. Enforceability depends on jurisdiction and facts—not legal advice.',
      },
      {
        question: 'Can freelancers use a service agreement?',
        answer:
          'Yes for ongoing services you sell (retainers, maintenance, consulting). If classification, IP assignment, or 1099 issues are central, use /tools/independent-contractor-agreement/ or /tools/freelance-web-design-contract/ instead.',
      },
      {
        question: 'How do retainer or maintenance fees work in a service agreement?',
        answer:
          'State the monthly or periodic fee, what visits or hours are included, what counts as overage, and when invoices go out (for example Net 15). Recurring maintenance often skips a large deposit and relies on clear Net terms.',
      },
      {
        question: 'Is a service agreement legally binding?',
        answer:
          'A signed agreement can be binding if it meets your jurisdiction’s contract requirements, but enforceability depends on local law and the real relationship. This generator is editable sample language only—not legal advice.',
      },
      {
        question: 'How long should a service agreement last?',
        answer:
          'Pick a term that matches the work: a fixed 6–12 months with renewal notice, or month-to-month after an initial period. Put the notice window in calendar days so neither side is guessing.',
      },
    ],
    sources: contractSources,
  },
  relatedSlugs: ['independent-contractor-agreement', 'freelance-web-design-contract', 'quote-estimate-generator'],
  publishedAt: '2026-11-13',
  updatedAt: '2026-11-22',
};

export const lienWaiverGenerator: ToolDefinition = {
  slug: 'lien-waiver-generator',
  name: 'Lien Waiver Generator',
  shortName: 'Lien Waiver',
  category: 'contracts',
  primaryKeyword: 'lien waiver generator',
  secondaryKeywords: [
    'lien waiver template',
    'conditional lien waiver',
    'unconditional lien waiver',
    'partial lien waiver',
    'final lien waiver',
  ],
  title: 'Lien Waiver Form: Free Generator (Conditional & Final)',
  metaDescription:
    'Fill a conditional or unconditional, partial or final lien waiver. Free PDF. State rules vary; not legal advice.',
  h1: 'Free Lien Waiver Generator',
  answerFirst:
    'A lien waiver releases mechanic’s-lien rights for a stated payment—conditional until funds clear or unconditional after payment, and partial through a date or final at closeout. Pick the type, fill parties and amount, preview, export PDF or DOCX. State forms vary; not legal advice.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Lien Waiver and Release',
  toolVersion: '1.0',
  fields: [
    {
      id: 'waiverCondition',
      label: 'Conditional or unconditional',
      type: 'select',
      required: true,
      section: 'Waiver type',
      options: [
        { value: 'Conditional', label: 'Conditional (effective when payment is received)' },
        { value: 'Unconditional', label: 'Unconditional (effective when signed)' },
      ],
      help: 'Use conditional before the payment clears. Save unconditional for after you have the money.',
    },
    {
      id: 'waiverScope',
      label: 'Partial or final',
      type: 'select',
      required: true,
      section: 'Waiver type',
      options: [
        { value: 'Partial', label: 'Partial / progress (through a date)' },
        { value: 'Final', label: 'Final (job closeout payment)' },
      ],
    },
    { id: 'claimantName', label: 'Claimant (who is waiving)', type: 'text', required: true, section: 'Parties' },
    { id: 'claimantAddress', label: 'Claimant address', type: 'textarea', rows: 2, section: 'Parties' },
    {
      id: 'claimantRole',
      label: 'Claimant role',
      type: 'select',
      section: 'Parties',
      options: [
        { value: 'General contractor', label: 'General contractor' },
        { value: 'Subcontractor', label: 'Subcontractor' },
        { value: 'Supplier / materialman', label: 'Supplier / materialman' },
        { value: 'Laborer', label: 'Laborer' },
        { value: 'Other', label: 'Other' },
      ],
    },
    { id: 'customerName', label: 'Customer / owner / GC receiving waiver', type: 'text', required: true, section: 'Parties' },
    { id: 'projectName', label: 'Project name', type: 'text', required: true, section: 'Job' },
    { id: 'propertyAddress', label: 'Property / job address', type: 'textarea', rows: 2, required: true, section: 'Job' },
    { id: 'jobNumber', label: 'Job / contract #', type: 'text', section: 'Job' },
    { id: 'invoiceNumber', label: 'Invoice / pay app #', type: 'text', section: 'Job' },
    { id: 'paymentAmount', label: 'Payment amount covered', type: 'currency', inputMode: 'decimal', required: true, section: 'Payment' },
    {
      id: 'throughDate',
      label: 'Through date (partial waivers)',
      type: 'date',
      section: 'Payment',
      help: 'Labor and materials furnished through this date. Leave blank on final waivers if you prefer.',
    },
    { id: 'waiverDate', label: 'Waiver date', type: 'date', required: true, section: 'Payment' },
    {
      id: 'exceptions',
      label: 'Exceptions (retainage, disputed items)',
      type: 'textarea',
      rows: 3,
      section: 'Payment',
      help: 'Call out unpaid retainage, punch-list holdbacks, or disputed extras you are not releasing.',
    },
    { id: 'governingState', label: 'Project state / jurisdiction', type: 'text', section: 'Payment' },
    {
      id: 'releaseText',
      label: 'Release language (editable)',
      type: 'textarea',
      rows: 5,
      section: 'Release',
      help: 'Defaults update when you change conditional/unconditional and partial/final. Edit for your job—replace with a statutory form when your state requires one.',
    },
    { id: 'signerName', label: 'Signer name', type: 'text', section: 'Signatures' },
    { id: 'signerTitle', label: 'Signer title', type: 'text', section: 'Signatures' },
  ],
  defaults: {
    waiverCondition: 'Conditional',
    waiverScope: 'Partial',
    claimantName: 'North Ridge Electric LLC',
    claimantAddress: '410 Industrial Court, Denver, CO 80216',
    claimantRole: 'Subcontractor',
    customerName: 'Summit Build Co.',
    projectName: 'Lee residence – kitchen remodel',
    propertyAddress: '88 Cedar Lane, Denver, CO 80220',
    jobNumber: 'SB-2026-014',
    invoiceNumber: 'NRE-118',
    paymentAmount: 4200,
    throughDate: '2026-11-15',
    waiverDate: '2026-11-19',
    exceptions:
      'Does not release unpaid retainage of $600 or any change-order work not yet invoiced.',
    governingState: 'Colorado, USA',
    releaseText:
      'Upon actual receipt of the payment amount stated above, Claimant waives and releases mechanic’s-lien, stop-notice, and payment-bond rights for labor, services, equipment, or materials furnished to the project through the through date, only to the extent of that payment. This waiver is conditional on payment clearing. Rights for retainage, disputed amounts, and work after the through date are reserved as listed in Exceptions.',
    signerName: 'M. Ortiz',
    signerTitle: 'Member / Manager, North Ridge Electric LLC',
  },
  content: {
    howToUse: [
      'Choose conditional vs unconditional and partial vs final for this pay cycle.',
      'Enter the claimant, customer, job address, payment amount, and through date when the waiver is partial.',
      'Edit exceptions for retainage or disputed extras; adjust the release paragraph if your GC needs different wording.',
      'Preview, export PDF or DOCX, and sign only the type that matches whether payment has actually cleared.',
    ],
    whatToInclude: [
      {
        heading: 'Conditional vs unconditional, in job-site English',
        body: 'Conditional means the release kicks in when the stated payment is actually received. Unconditional means you are saying you already got paid—or you are giving up lien rights the moment you sign. On progress draws I almost never sign unconditional until the deposit hits the bank. If a GC pushes for unconditional before funding, ask for a joint check or wait until the wire clears.',
      },
      {
        heading: 'Partial (progress) vs final',
        body: 'Partial waivers cover work through a named date and a named dollar amount. Final waivers sit with closeout: last payment, punch list settled, retainage released per the contract. Mixing them up is how people accidentally wipe rights on unpaid extras. Keep the invoice number and job number on the PDF so AP can match the pay app.',
      },
      {
        heading: 'State forms are not interchangeable',
        body: 'A mechanic’s lien is a statutory interest that secures payment for improving property; the details live in state law, not in a national “standard” PDF. California’s Contractors State License Board publishes conditional and unconditional progress and final waiver forms; other states use different wording or require substantial compliance with a statute. If your project state has a prescribed form, use that form. This generator is a fill-in starting draft for discussion, not a replacement for statutory paper.',
      },
    ],
    workedExample: {
      heading: 'Worked example: conditional partial waiver on a kitchen remodel',
      body: 'North Ridge Electric bills Summit Build $4,200 on invoice NRE-118 through 2026-11-15 for rough-in on the Lee kitchen job. They issue a conditional partial waiver for that amount, carve out $600 retainage plus uninvoiced change-order work, and hold the unconditional version until the check clears. Same numbers later show up on the progress invoice and change-order file so the job folder stays consistent.',
    },
    commonMistakes: [
      'Signing an unconditional waiver before the payment clears.',
      'Using a final waiver on a mid-job progress payment.',
      'Leaving retainage and disputed extras out of the exceptions box.',
      'Assuming one PDF works in every state when the project state publishes its own form.',
    ],
    tips: [
      legalNotice,
      lienWaiverStateNote,
      'Pair each waiver with the matching contractor invoice or pay app in your records.',
      'Photo or PDF the signed waiver with the deposit confirmation when you switch from conditional to unconditional.',
    ],
    faq: [
      {
        question: 'What is a lien waiver?',
        answer:
          'It is a written release of mechanic’s-lien (and often related stop-notice or bond-claim) rights for labor or materials tied to a stated payment on a construction job. Owners and GCs collect them so a paid invoice does not turn into a surprise lien later.',
      },
      {
        question: 'What is the difference between conditional and unconditional lien waivers?',
        answer:
          'A conditional waiver takes effect only when the listed payment is actually received. An unconditional waiver is effective when signed, so you should use it after payment has cleared—not as a promise that you will get paid later.',
      },
      {
        question: 'When should I use a partial vs final lien waiver?',
        answer:
          'Use a partial (progress) waiver for a draw that covers work through a date while the job continues. Use a final waiver with the last payment when you intend to release remaining lien rights for the job, subject to any exceptions you still list.',
      },
      {
        question: 'Do lien waiver forms differ by state?',
        answer:
          'Yes. Some states prescribe statutory forms or safe-harbor wording. California’s CSLB, for example, explains conditional and unconditional progress and final releases. Always check the project state’s rules and swap in a required form when the statute says you must.',
      },
      {
        question: 'Is this lien waiver generator legal advice?',
        answer:
          'No. It produces editable sample language for discussion. It is not a law-firm product, not attorney-reviewed, and not a substitute for counsel or for a statutory form your state requires.',
      },
      {
        question: 'Should subcontractors sign unconditional waivers before payday?',
        answer:
          'Usually no. Sign conditional with the pay app, then issue unconditional after the funds clear if the GC still needs one. Giving up lien rights before payment leaves you with fewer remedies if a check bounces or a bankruptcy hits mid-stream.',
      },
    ],
    sources: lienWaiverSources,
  },
  relatedSlugs: [
    'progress-invoice',
    'change-order-template',
    'contractor-invoice',
    'construction-estimate-template',
  ],
  publishedAt: '2026-11-19',
  updatedAt: '2026-11-22',
};
