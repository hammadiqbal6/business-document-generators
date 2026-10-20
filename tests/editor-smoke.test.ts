import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Guards the B1 regression: define:vars must not inline the lazy-loader script,
 * and the mount module must exist for Vite to bundle.
 */
describe('DocumentGeneratorLazy loader', () => {
  const lazyPath = path.resolve('src/components/generators/DocumentGeneratorLazy.astro');
  const mountPath = path.resolve('src/lib/mountDocumentGenerator.tsx');

  it('keeps a bundled script (no define:vars on the loader)', () => {
    const src = fs.readFileSync(lazyPath, 'utf8');
    expect(src).not.toMatch(/<script\s+define:vars/);
    expect(src).toMatch(/data-tool=\{toolJson\}/);
    expect(src).toMatch(/import\('\.\.\/\.\.\/lib\/mountDocumentGenerator\.tsx'\)/);
  });

  it('exposes mountDocumentGenerator', () => {
    const src = fs.readFileSync(mountPath, 'utf8');
    expect(src).toMatch(/export function mountDocumentGenerator/);
  });
});
