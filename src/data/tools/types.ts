export type ToolCategory =
  | 'estimates-invoices'
  | 'contracts'
  | 'forms'
  | 'creative-templates';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'currency'
  | 'select'
  | 'checkbox'
  | 'lineItems'
  | 'clauses';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  help?: string;
  options?: FieldOption[];
  inputMode?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
  /** Group fields visually in the form */
  section?: string;
  /** Default for clause/line-item templates */
  defaultValue?: string | number | boolean;
}

export interface LineItem {
  description: string;
  quantity: number;
  unit: string;
  rate: number;
}

export interface ClauseItem {
  id: string;
  title: string;
  body: string;
  enabled: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentSection {
  heading: string;
  /** HTML-safe markdown-ish paragraphs; rendered as paragraphs/lists in Astro */
  body: string;
}

export interface SourceRef {
  label: string;
  url: string;
  /** What this page uses the source for (shown in TrustBlock). */
  usedFor?: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  shortName: string;
  category: ToolCategory;
  /** Primary keyword for ranking */
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaDescription: string;
  h1: string;
  /** Answer-first 40–60 word opener for snippets / AI Overviews */
  answerFirst: string;
  applicationCategory: string;
  /** Show legal disclaimer banner */
  isLegalAdjacent: boolean;
  fields: FieldDef[];
  defaults: Record<string, unknown>;
  /** Document title used in preview/export */
  documentTitle: string;
  /** Semver-ish generator version shown in TrustBlock */
  toolVersion?: string;
  /** Plain-language formula / totals note for TrustBlock */
  formulaNote?: string;
  content: {
    howToUse: string[];
    whatToInclude: ContentSection[];
    workedExample: ContentSection;
    commonMistakes: string[];
    tips: string[];
    faq: FaqItem[];
    sources: SourceRef[];
  };
  relatedSlugs: string[];
  publishedAt: string;
  /** Change only when formula, sources, or substantive text changes */
  updatedAt: string;
}

export const CATEGORY_META: Record<
  ToolCategory,
  { slug: string; name: string; description: string }
> = {
  'estimates-invoices': {
    slug: 'estimates-invoices',
    name: 'Estimates & Invoices',
    description:
      'Construction estimates, contractor invoices, cleaning quotes, catering quotes, receipts, work orders, and general quote generators.',
  },
  contracts: {
    slug: 'contracts',
    name: 'Contracts & Agreements',
    description:
      'Photography, videography, freelance/web design, event/wedding vendor contracts, and simple NDAs — editable clauses, not legal advice.',
  },
  forms: {
    slug: 'forms',
    name: 'Forms & Applications',
    description:
      'Tattoo consent forms, rental/lease applications, and other fillable client forms with PDF export.',
  },
  'creative-templates': {
    slug: 'creative-templates',
    name: 'Creative Templates',
    description:
      'Podcast script templates and real estate flyer layouts you can fill and export.',
  },
};
