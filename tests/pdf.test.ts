import { describe, expect, it, vi } from 'vitest';
import { buildDocumentBlocks } from '../src/components/generators/documentModel';
import { constructionEstimate } from '../src/data/tools/estimates';

const saveMock = vi.fn();

vi.mock('jspdf', () => ({
  jsPDF: class {
    internal = { pageSize: { getWidth: () => 612, getHeight: () => 792 } };
    setFont() {}
    setFontSize() {}
    splitTextToSize(text: string) {
      return [text];
    }
    text() {}
    line() {}
    setDrawColor() {}
    addPage() {}
    save = saveMock;
  },
}));

describe('exportPdf', () => {
  it('builds blocks and invokes jsPDF save', async () => {
    const blocks = buildDocumentBlocks(constructionEstimate, constructionEstimate.defaults);
    expect(blocks.length).toBeGreaterThan(2);
    expect(blocks.some((b) => b.type === 'table')).toBe(true);

    const { exportPdf } = await import('../src/components/generators/exportPdf');
    await exportPdf('test.pdf', blocks);
    expect(saveMock).toHaveBeenCalledWith('test.pdf');
  });
});
