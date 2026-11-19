#!/usr/bin/env node
/** Rebuild src/data/guides.ts from tmp/guides-export.json (keeps TypeScript interface header). */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const guidesPath = path.join(root, 'src/data/guides.ts');
const jsonPath = path.join(root, 'tmp/guides-export.json');

const header = `export interface GuideSection {
  heading: string;
  body: string;
  table?: { caption?: string; headers: string[]; rows: string[][] };
}

export interface GuideSource {
  label: string;
  url: string;
  usedFor?: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  answerFirst: string;
  publishedAt: string;
  updatedAt: string;
  relatedToolSlugs: string[];
  relatedGuideSlugs?: string[];
  legalNote?: string;
  /** Optional HowTo steps when the guide is procedural (must match on-page content). */
  howTo?: string[];
  /** Visible Sources list (IRS, SBA, Cornell LII, Copyright Office, etc.). */
  sources?: GuideSource[];
  sections: GuideSection[];
  faq: { question: string; answer: string }[];
}

export const guides: Guide[] =
`;

const guides = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const footer = `

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
`;

const body = JSON.stringify(guides, null, 2);
fs.writeFileSync(guidesPath, header + body + footer);
console.log(`Wrote ${guides.length} guides to ${guidesPath}`);
