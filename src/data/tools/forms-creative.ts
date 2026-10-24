import type { ToolDefinition } from './types';
import { clause } from './line-item-defaults';
import { formSources, ftcEndorsements, hudFairHousing, copyrightPhotographers } from './shared-sources';

export const tattooConsent: ToolDefinition = {
  slug: 'tattoo-consent-form-template',
  name: 'Tattoo Consent Form Template',
  shortName: 'Tattoo Consent',
  category: 'forms',
  primaryKeyword: 'tattoo consent form template',
  secondaryKeywords: [
    'tattoo release form',
    'tattoo waiver template',
    'tattoo client consent PDF',
  ],
  title: 'Tattoo Consent Form Template – Free Generator',
  metaDescription:
    'Fill a tattoo consent and release form: client details, design notes, health acknowledgements, editable clauses. Export PDF/DOCX. Not legal or medical advice.',
  h1: 'Free Tattoo Consent Form Template',
  answerFirst:
    'A tattoo consent form records client identity, design placement, acknowledgements about risks and aftercare, and permission to proceed. Customize this template in your browser and export PDF or DOCX. It is not legal or medical advice—follow your local licensing rules.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Tattoo Consent & Release',
  toolVersion: '1.0',
  fields: [
    { id: 'studioName', label: 'Studio name', type: 'text', required: true, section: 'Studio' },
    { id: 'artistName', label: 'Artist name', type: 'text', required: true, section: 'Studio' },
    { id: 'clientName', label: 'Client legal name', type: 'text', required: true, section: 'Client' },
    { id: 'clientDob', label: 'Date of birth', type: 'date', required: true, section: 'Client' },
    { id: 'clientPhone', label: 'Phone', type: 'tel', section: 'Client' },
    { id: 'clientEmail', label: 'Email', type: 'email', section: 'Client' },
    { id: 'designDescription', label: 'Design description', type: 'textarea', rows: 3, required: true, section: 'Procedure' },
    { id: 'placement', label: 'Placement', type: 'text', required: true, section: 'Procedure' },
    { id: 'sessionDate', label: 'Session date', type: 'date', required: true, section: 'Procedure' },
    { id: 'idVerified', label: 'Government ID verified', type: 'checkbox', section: 'Procedure' },
    { id: 'aftercareProvided', label: 'Aftercare instructions provided', type: 'checkbox', section: 'Procedure' },
    { id: 'clauses', label: 'Acknowledgements', type: 'clauses', section: 'Acknowledgements' },
  ],
  defaults: {
    studioName: 'InkHarbor Studio',
    artistName: 'R. Nguyen',
    clientName: 'Jordan Avery',
    clientDob: '1994-03-12',
    clientPhone: '(503) 555-0144',
    clientEmail: 'jordan@client.invalid',
    designDescription: 'Blackwork botanical band, approximately 4 inches wide, based on approved stencil.',
    placement: 'Left forearm',
    sessionDate: '2026-10-25',
    idVerified: true,
    aftercareProvided: true,
    clauses: [
      clause('age', 'Age and identity', 'I confirm I am of legal age to receive a tattoo in this jurisdiction and have presented valid photo identification. I am signing voluntarily.'),
      clause('risks', 'Risks', 'I understand tattooing involves puncture of the skin, possible pain, bleeding, scarring, allergic reaction, infection, and dissatisfaction with healed results. I have had an opportunity to ask questions.'),
      clause('health', 'Health disclosure', 'I have disclosed known allergies, medications, skin conditions, pregnancy/nursing status, and relevant medical history to the artist. I am not under the influence of alcohol or impairing drugs.'),
      clause('design', 'Design approval', 'I approve the stencil placement and design described above. I understand minor variations can occur as the tattoo heals.'),
      clause('aftercare', 'Aftercare', 'I agree to follow written aftercare instructions. I understand improper aftercare increases infection and healing risks.'),
      clause('release', 'Release', 'To the extent allowed by law, I release the studio and artist from claims arising from risks I have acknowledged, except for gross negligence or willful misconduct. This is not a waiver of rights that cannot be waived under local law.'),
      clause('photos', 'Photos', 'I [ ] allow / [ ] decline (mark on signed copy) use of healed-process photos for studio portfolio, with face obscured if requested.'),
    ],
  },
  content: {
    howToUse: [
      'Enter studio, artist, and client details.',
      'Describe design and placement; confirm ID and aftercare checkboxes.',
      'Edit acknowledgement clauses to match studio policy and local rules.',
      'Export PDF for wet-ink or e-sign workflows.',
    ],
    whatToInclude: [
      {
        heading: 'What a tattoo consent form should cover',
        body: 'Identity/age verification, design and placement, health disclosures, risk acknowledgements, aftercare, photo permission, and a signature block. Adapt language to your state/country health codes—do not treat this as a licensed medical or legal form.',
      },
      {
        heading: 'Hygiene and client education',
        body: 'Studios should pair consent with sterile technique and clear aftercare. Point clients to reputable infection-control education (for example CDC infection-control resources) and your local body-art regulations.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'The sample form captures a blackwork forearm session with ID verified and aftercare provided, plus editable risk and release acknowledgements the studio can tailor.',
    },
    commonMistakes: [
      'Skipping ID verification documentation.',
      'Using irreversible waiver language that local law prohibits.',
      'No record of stencil approval photos.',
    ],
    tips: [
      'Store signed forms securely per privacy law; this site does not store them.',
      'Not legal or medical advice—have counsel and your health department review your final form.',
    ],
    faq: [
      {
        question: 'Is a tattoo waiver enough to avoid lawsuits?',
        answer:
          'No form eliminates all liability. Consent forms document informed agreement; they do not excuse unsafe practices. Consult an attorney about enforceable language in your area.',
      },
      {
        question: 'Can minors use this form?',
        answer:
          'Only where local law allows tattooing minors—and then typically with parent/guardian consent and ID rules. Default this tool for adults of legal age.',
      },
      {
        question: 'Do tattoo consent forms have to meet state or local rules?',
        answer:
          'Yes—many health departments set minimum acknowledgements, age verification, and recordkeeping for body-art studios. Adapt this template to your licensing checklist; it is not a substitute for required government forms.',
      },
      {
        question: 'How long should studios keep signed consent forms?',
        answer:
          'Follow your local body-art regulations and privacy rules; many studios retain records for several years after the session. Store signed PDFs securely—this site does not keep client forms.',
      },
      {
        question: 'Should aftercare instructions be part of consent?',
        answer:
          'Document that aftercare was provided and acknowledged. Separate written aftercare handouts still help clients heal correctly; the consent form proves they received guidance before the session.',
      },
      {
        question: 'What health disclosures belong on a tattoo consent form?',
        answer:
          'Ask only what your local rules and safe practice require—typically allergies, skin conditions, medications, pregnancy status where relevant, and blood-borne pathogen acknowledgements—without collecting unnecessary medical detail.',
      },
    ],
    sources: formSources,
  },
  relatedSlugs: ['simple-nda', 'photography-contract-template', 'receipt-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const rentalApplication: ToolDefinition = {
  slug: 'rental-lease-application',
  name: 'Rental / Lease Application Form',
  shortName: 'Rental Application',
  category: 'forms',
  primaryKeyword: 'rental application form',
  secondaryKeywords: [
    'lease application template',
    'tenant application form',
    'residential rental application PDF',
  ],
  title: 'Rental Application Form – Free Generator',
  metaDescription:
    'Create a residential rental application: applicant info, employment, references, authorization. Live preview, PDF/DOCX. Not a lease; follow fair housing laws.',
  h1: 'Free Rental / Lease Application Form',
  answerFirst:
    'A rental or lease application collects applicant contact details, desired unit, employment/income, rental history, references, and authorization to verify information. Fill this form in your browser and export PDF or DOCX. It is not a lease and must be used in line with fair housing laws.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: true,
  documentTitle: 'Residential Rental Application',
  toolVersion: '1.0',
  fields: [
    { id: 'propertyAddress', label: 'Property address', type: 'text', required: true, section: 'Property' },
    { id: 'unit', label: 'Unit #', type: 'text', section: 'Property' },
    { id: 'desiredMoveIn', label: 'Desired move-in', type: 'date', section: 'Property' },
    { id: 'monthlyRent', label: 'Listed monthly rent', type: 'currency', inputMode: 'decimal', section: 'Property' },
    { id: 'applicantName', label: 'Applicant full name', type: 'text', required: true, section: 'Applicant' },
    { id: 'applicantEmail', label: 'Email', type: 'email', required: true, section: 'Applicant' },
    { id: 'applicantPhone', label: 'Phone', type: 'tel', required: true, section: 'Applicant' },
    { id: 'dob', label: 'Date of birth', type: 'date', section: 'Applicant' },
    { id: 'currentAddress', label: 'Current address', type: 'textarea', rows: 2, required: true, section: 'Housing history' },
    { id: 'currentLandlord', label: 'Current landlord / contact', type: 'text', section: 'Housing history' },
    { id: 'yearsAtAddress', label: 'Years at current address', type: 'number', inputMode: 'decimal', min: 0, step: 0.1, section: 'Housing history' },
    { id: 'employer', label: 'Employer', type: 'text', section: 'Income' },
    { id: 'jobTitle', label: 'Job title', type: 'text', section: 'Income' },
    { id: 'monthlyIncome', label: 'Gross monthly income', type: 'currency', inputMode: 'decimal', section: 'Income' },
    { id: 'otherOccupants', label: 'Other occupants', type: 'textarea', rows: 2, section: 'Household' },
    { id: 'pets', label: 'Pets', type: 'text', section: 'Household' },
    { id: 'references', label: 'References', type: 'textarea', rows: 3, section: 'References' },
    { id: 'authorization', label: 'Applicant authorization statement', type: 'textarea', rows: 3, section: 'Authorization' },
  ],
  defaults: {
    propertyAddress: '912 Maple Ave',
    unit: '2B',
    desiredMoveIn: '2026-12-01',
    monthlyRent: 1650,
    applicantName: 'Avery Quinn',
    applicantEmail: 'avery@applicant.invalid',
    applicantPhone: '(312) 555-0162',
    dob: '1992-07-08',
    currentAddress: '200 W Lake St #4, Chicago, IL 60601',
    currentLandlord: 'Lakeview Properties – (312) 555-0111',
    yearsAtAddress: 2.5,
    employer: 'Bright Analytics',
    jobTitle: 'Operations coordinator',
    monthlyIncome: 5200,
    otherOccupants: 'None',
    pets: 'One cat, 8 lbs, vaccinated',
    references: 'Sam Patel (colleague) (312) 555-0188\nRiley Gomez (prior landlord) (773) 555-0122',
    authorization:
      'I certify that information provided is true and authorize the landlord or agent to verify credit, rental, and employment history as permitted by law. I understand this application is not a lease.',
  },
  content: {
    howToUse: [
      'Enter property and applicant details.',
      'Complete housing, income, and reference sections.',
      'Confirm the authorization statement; export PDF.',
    ],
    whatToInclude: [
      {
        heading: 'Fair and useful rental applications',
        body: 'Ask only for information you will consistently use to evaluate applicants. Follow fair housing rules—do not use the form to discriminate based on protected characteristics. See HUD fair housing resources for baseline obligations.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'Applicant Avery Quinn applies for unit 2B at $1,650/mo with 2.5 years of rental history and $5,200 gross monthly income—illustrating a complete packet a landlord can verify.',
    },
    commonMistakes: [
      'Treating an application as a signed lease.',
      'Collecting unnecessary sensitive data without a secure process.',
    ],
    tips: [
      'Not legal advice. Pair approved applications with a proper lease reviewed for your jurisdiction.',
      'Disclose application fees where required by local law.',
    ],
    faq: [
      {
        question: 'Does this create a tenancy?',
        answer:
          'No. An application requests consideration; a lease (or local equivalent) creates tenancy after approval and signing.',
      },
      {
        question: 'Can landlords run credit checks?',
        answer:
          'Often yes with authorization and compliance with credit-reporting and privacy laws. Provide required disclosures for your country/state.',
      },
      {
        question: 'How does fair housing affect rental applications?',
        answer:
          'Use the same questions and screening criteria for every applicant. Do not ask for or use information to discriminate based on protected characteristics—see HUD fair housing resources for U.S. baseline obligations.',
      },
      {
        question: 'What should a rental application include?',
        answer:
          'Applicant contact details, desired unit and move-in, housing history, employment/income, other occupants, pets if relevant, references, and written authorization to verify information as permitted by law.',
      },
      {
        question: 'Are application fees allowed?',
        answer:
          'Many places allow reasonable application or screening fees if disclosed and locally regulated. State the amount and what it covers; some jurisdictions cap fees or require refunds when no screening occurs.',
      },
      {
        question: 'How is a rental application different from a lease?',
        answer:
          'The application is a screening packet; the lease (or local equivalent) is the binding occupancy agreement after approval. Never treat a signed application alone as permission to move in.',
      },
    ],
    sources: formSources,
  },
  relatedSlugs: ['simple-nda', 'receipt-generator', 'quote-estimate-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const podcastScript: ToolDefinition = {
  slug: 'podcast-script-template',
  name: 'Podcast Script Template',
  shortName: 'Podcast Script',
  category: 'creative-templates',
  primaryKeyword: 'podcast script template',
  secondaryKeywords: [
    'podcast episode script',
    'interview podcast outline',
    'podcast show notes template',
  ],
  title: 'Podcast Script Template – Free Episode Planner',
  metaDescription:
    'Plan a podcast episode script: cold open, segments, interview cues, CTA, and show notes. Live preview; export PDF/DOCX in your browser.',
  h1: 'Free Podcast Script Template',
  answerFirst:
    'A podcast script template outlines the cold open, intro, segments or interview beats, transitions, CTA, and outro so hosts stay on time and on message. Fill this planner in your browser, preview the rundown, and export PDF or DOCX—nothing is uploaded.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Podcast Episode Script',
  toolVersion: '1.0',
  fields: [
    { id: 'showName', label: 'Show name', type: 'text', required: true, section: 'Episode' },
    { id: 'episodeNumber', label: 'Episode #', type: 'text', required: true, section: 'Episode' },
    { id: 'episodeTitle', label: 'Episode title', type: 'text', required: true, section: 'Episode' },
    { id: 'hostName', label: 'Host(s)', type: 'text', required: true, section: 'Episode' },
    { id: 'guestName', label: 'Guest (optional)', type: 'text', section: 'Episode' },
    { id: 'targetMinutes', label: 'Target length (minutes)', type: 'number', inputMode: 'numeric', min: 1, section: 'Episode' },
    { id: 'coldOpen', label: 'Cold open / hook', type: 'textarea', rows: 3, required: true, section: 'Script' },
    { id: 'intro', label: 'Intro & housekeeping', type: 'textarea', rows: 3, section: 'Script' },
    { id: 'segment1', label: 'Segment 1', type: 'textarea', rows: 4, required: true, section: 'Script' },
    { id: 'segment2', label: 'Segment 2', type: 'textarea', rows: 4, section: 'Script' },
    { id: 'segment3', label: 'Segment 3 / interview beats', type: 'textarea', rows: 4, section: 'Script' },
    { id: 'cta', label: 'CTA / sponsor read', type: 'textarea', rows: 2, section: 'Script' },
    { id: 'outro', label: 'Outro', type: 'textarea', rows: 2, section: 'Script' },
    { id: 'showNotes', label: 'Show notes / links', type: 'textarea', rows: 3, section: 'Publish' },
  ],
  defaults: {
    showName: 'Ops in the Open',
    episodeNumber: '42',
    episodeTitle: 'How small teams ship documentation customers actually use',
    hostName: 'Nina Park',
    guestName: 'Dev Patel (docs lead)',
    targetMinutes: 28,
    coldOpen: '“We deleted our 90-page PDF and support tickets dropped—here’s the 3-page system that replaced it.”',
    intro: 'Welcome + guest intro + episode promise. Reminder: subscribe and rate. Disclose if sponsored.',
    segment1: 'Problem framing (5 min): why internal docs rot; quick audience poll question for later social clip.',
    segment2: 'Framework (10 min): job-to-be-done pages, owners, review cadence. Guest story: onboarding doc rewrite.',
    segment3: 'Tactical list (8 min): templates, analytics on doc search, killing zombie pages. Audience Q tease.',
    cta: 'Try the free checklist linked in show notes. Sponsor: time-tracking tool — midroll 60s.',
    outro: 'Credits, next episode tease, how to contact the show.',
    showNotes: '- Guest site\n- Checklist URL\n- Transcript timestamps to add post-edit',
  },
  content: {
    howToUse: [
      'Name the episode and target length.',
      'Write hook, segments, CTA, and outro in plain language (bullet cues are fine).',
      'Export PDF for the recording booth or co-host.',
    ],
    whatToInclude: [
      {
        heading: 'Script vs outline',
        body: 'Interview shows often use bullet cues; narrative shows need tighter scripts. Either way, mark timed segments, ad slots, and pronunciation notes for names.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'Episode 42 targets 28 minutes with a cold-open hook, three segments, a sponsor CTA, and blank show-notes lines for links—ready to hand a co-host.',
    },
    commonMistakes: ['No timed segments', 'CTA buried after the outro music'],
    tips: ['Record cold open twice; pick the better energy in edit.'],
    faq: [
      {
        question: 'Should every podcast be fully scripted?',
        answer:
          'No. Use full scripts for solo storytelling; use run-of-show outlines for interviews so conversation stays natural.',
      },
      {
        question: 'Do I need a word-for-word podcast script?',
        answer:
          'Only for tightly produced narrative or ad reads. Most interview shows work better with timed segment cues and question lists so hosts stay present with the guest.',
      },
      {
        question: 'How long should a 30-minute episode script be?',
        answer:
          'Plan segments that sum to your target—e.g. 1–2 minutes cold open, short intro, two or three content blocks, CTA, and outro. Leave buffer for laughs, tangents, and midroll ads.',
      },
      {
        question: 'What belongs in a podcast intro?',
        answer:
          'Show identity, host/guest names, episode promise, and any required disclosures (sponsorships). Keep housekeeping short so listeners reach the first content beat quickly.',
      },
      {
        question: 'What formats can I export from this template?',
        answer:
          'Export PDF or DOCX for the booth, co-host, or producer. The template is a planning document—not a DAW session—so timings are guides you confirm while recording.',
      },
    ],
    sources: [ftcEndorsements],
  },
  relatedSlugs: ['real-estate-flyer-template', 'videography-contract', 'quote-estimate-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};

export const realEstateFlyer: ToolDefinition = {
  slug: 'real-estate-flyer-template',
  name: 'Real Estate Flyer Template',
  shortName: 'Real Estate Flyer',
  category: 'creative-templates',
  primaryKeyword: 'real estate flyer template',
  secondaryKeywords: [
    'property flyer template',
    'house for sale flyer',
    'open house flyer generator',
  ],
  title: 'Real Estate Flyer Template – Free Generator',
  metaDescription:
    'Build a real estate listing flyer: price, beds/baths, features, agent contact, open house. Live preview; export PDF/DOCX.',
  h1: 'Free Real Estate Flyer Template',
  answerFirst:
    'A real estate flyer template highlights price, beds and baths, key features, location highlights, open-house times, and agent contact for a listing or open house. Fill this free generator, preview the flyer copy layout, and export PDF or DOCX in your browser.',
  applicationCategory: 'BusinessApplication',
  isLegalAdjacent: false,
  documentTitle: 'Property Flyer',
  toolVersion: '1.0',
  fields: [
    { id: 'headline', label: 'Headline', type: 'text', required: true, section: 'Listing' },
    { id: 'address', label: 'Property address', type: 'text', required: true, section: 'Listing' },
    { id: 'price', label: 'Price', type: 'text', required: true, section: 'Listing', placeholder: '$625,000' },
    { id: 'beds', label: 'Bedrooms', type: 'number', inputMode: 'numeric', min: 0, section: 'Facts' },
    { id: 'baths', label: 'Bathrooms', type: 'number', inputMode: 'decimal', min: 0, step: 0.5, section: 'Facts' },
    { id: 'sqft', label: 'Square feet', type: 'number', inputMode: 'numeric', min: 0, section: 'Facts' },
    { id: 'lotSize', label: 'Lot size', type: 'text', section: 'Facts' },
    { id: 'features', label: 'Feature bullets', type: 'textarea', rows: 4, required: true, section: 'Copy' },
    { id: 'neighborhood', label: 'Neighborhood blurb', type: 'textarea', rows: 2, section: 'Copy' },
    { id: 'openHouse', label: 'Open house', type: 'text', section: 'Showing' },
    { id: 'agentName', label: 'Agent name', type: 'text', required: true, section: 'Agent' },
    { id: 'brokerage', label: 'Brokerage', type: 'text', section: 'Agent' },
    { id: 'agentPhone', label: 'Phone', type: 'tel', required: true, section: 'Agent' },
    { id: 'agentEmail', label: 'Email', type: 'email', section: 'Agent' },
    { id: 'disclaimer', label: 'Equal housing / disclaimer', type: 'textarea', rows: 2, section: 'Agent' },
  ],
  defaults: {
    headline: 'Sunlit Craftsman Near the Park',
    address: '147 Willow Street, Greenville',
    price: '$625,000',
    beds: 3,
    baths: 2,
    sqft: 1680,
    lotSize: '0.18 acre',
    features: '• Updated kitchen with quartz counters\n• Primary suite with walk-in closet\n• Fenced yard + new deck\n• Twin EV-ready garage',
    neighborhood: 'Two blocks from Willow Park and the Saturday market; 12 minutes to downtown.',
    openHouse: 'Sunday 1–3 PM',
    agentName: 'Sam Ortega',
    brokerage: 'Harbor Light Realty',
    agentPhone: '(864) 555-0133',
    agentEmail: 'sam@harborlight.example',
    disclaimer: 'Equal Housing Opportunity. Information deemed reliable but not guaranteed. Verify all details independently.',
  },
  content: {
    howToUse: [
      'Enter listing facts and feature bullets.',
      'Add open-house time and agent contact.',
      'Export PDF for print or email attachment.',
    ],
    whatToInclude: [
      {
        heading: 'Flyer content that converts walkers',
        body: 'Lead with a benefit headline, put price and beds/baths high, use scannable bullets, and make the phone number large. Include equal housing language required in your market.',
      },
    ],
    workedExample: {
      heading: 'Worked example',
      body: 'The sample craftsman flyer lists $625,000, 3/2, 1,680 sq ft, four feature bullets, Sunday open house, and agent contact with a standard reliability disclaimer.',
    },
    commonMistakes: ['Tiny contact info', 'No equal housing statement where required'],
    tips: ['Pair the PDF with MLS photos; this tool focuses on copy layout you can brand later.'],
    faq: [
      {
        question: 'Can I use this as an official MLS sheet?',
        answer:
          'No. It is a marketing flyer. Follow brokerage and MLS rules for required disclosures and photo usage.',
      },
      {
        question: 'Do I need an Equal Housing / fair housing logo on flyers?',
        answer:
          'Many U.S. markets and brokerages expect equal housing opportunity language or logos on advertising. Follow your brokerage policy and local rules; the disclaimer field is a starting point, not legal clearance.',
      },
      {
        question: 'Who owns the listing photos on a flyer?',
        answer:
          'Photo rights usually stay with the photographer or listing broker under their agreement. Only use images you are licensed to market; do not pull MLS photos into third-party ads without permission.',
      },
      {
        question: 'What should a real estate flyer include?',
        answer:
          'Headline, price, address or neighborhood, beds/baths/sq ft, scannable feature bullets, open-house or tour info, agent contact with brokerage, and required fair-housing or reliability disclaimers for your market.',
      },
      {
        question: 'Can I print this flyer for open houses?',
        answer:
          'Yes—export PDF for print or email. Pair it with approved listing photos and verify facts against the MLS before you hand copies to visitors.',
      },
    ],
    sources: [hudFairHousing, copyrightPhotographers],
  },
  relatedSlugs: ['podcast-script-template', 'rental-lease-application', 'quote-estimate-generator'],
  publishedAt: '2026-10-19',
  updatedAt: '2026-10-20',
};
