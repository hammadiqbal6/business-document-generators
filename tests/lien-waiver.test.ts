import { describe, expect, it } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { getToolBySlug, allTools } from '../src/data/tools';
import { guidesForTool } from '../src/data/toolGuideMap';
import { validateForm } from '../src/lib/validation';
import { howToJsonLd, faqPageJsonLd, buildPageTitle } from '../src/lib/seo';
import { withTodayDateDefaults } from '../src/lib/todayDefaults';

const SLUG = 'lien-waiver-generator';

describe('lien waiver generator', () => {
  it('registers with a unique primary keyword and legal-adjacent flag', () => {
    const tool = getToolBySlug(SLUG);
    expect(tool).toBeTruthy();
    expect(tool!.isLegalAdjacent).toBe(true);
    expect(tool!.category).toBe('contracts');
    expect(tool!.primaryKeyword).toBe('lien waiver generator');
    expect(allTools.filter((t) => t.primaryKeyword === tool!.primaryKeyword)).toHaveLength(1);
  });

  it('keeps title within brand budget', () => {
    const tool = getToolBySlug(SLUG)!;
    const title = buildPageTitle(tool.title);
    expect(title.length).toBeGreaterThanOrEqual(25);
    expect(title.length).toBeLessThanOrEqual(65);
    expect(title).toMatch(/Docuklin/i);
  });

  it('validates defaults, guides, HowTo, and FAQ JSON-LD', () => {
    const tool = getToolBySlug(SLUG)!;
    expect(validateForm(tool.fields, tool.defaults)).toHaveLength(0);
    expect(guidesForTool(SLUG).length).toBeGreaterThan(0);
    expect(tool.content.faq.length).toBeGreaterThanOrEqual(3);
    expect(howToJsonLd({
      name: `How to use the ${tool.shortName} generator`,
      description: tool.metaDescription,
      url: `https://docuklin.com/tools/${tool.slug}/`,
      steps: tool.content.howToUse,
    })?.['@type']).toBe('HowTo');
    expect(faqPageJsonLd(tool.content.faq)?.['@type']).toBe('FAQPage');
  });

  it('preview shows conditional progress heading, payment, exceptions, and signature', () => {
    const tool = getToolBySlug(SLUG)!;
    const text = JSON.stringify(buildDocumentBlocks(tool, tool.defaults));
    expect(text).toMatch(/Conditional Waiver and Release on Progress Payment/);
    expect(text).toContain('Summit Build Co.');
    expect(text).toMatch(/\$12,500\.00/);
    expect(text).toMatch(/Exceptions \(not waived\)/);
    expect(text).toMatch(/Retainage/);
    expect(text).toMatch(/Signature/);
    expect(text).toMatch(/statutory/i);
  });

  it('switches heading for unconditional final', () => {
    const tool = getToolBySlug(SLUG)!;
    const values = {
      ...tool.defaults,
      waiverCondition: 'Unconditional',
      waiverStage: 'Final',
    };
    const text = JSON.stringify(buildDocumentBlocks(tool, values));
    expect(text).toMatch(/Unconditional Waiver and Release on Final Payment/);
    expect(text).not.toMatch(/Through date/);
  });

  it('shifts waiver and through dates with withTodayDateDefaults', () => {
    const tool = getToolBySlug(SLUG)!;
    const now = new Date(2026, 10, 19);
    const out = withTodayDateDefaults(tool.fields, tool.defaults, now);
    expect(out.waiverDate).toBe('2026-11-19');
    expect(out.throughDate).toBe('2026-11-19');
  });
});
