import type { DocBlock } from './documentModel';

/** Lazy-loads jsPDF only when the user exports. */
export async function exportPdf(filename: string, blocks: DocBlock[]): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const writeWrapped = (text: string, fontSize: number, style: 'normal' | 'bold' = 'normal') => {
    doc.setFont('helvetica', style);
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    const lineHeight = fontSize * 1.35;
    ensureSpace(lines.length * lineHeight);
    doc.text(lines, margin, y);
    y += lines.length * lineHeight + 6;
  };

  for (const block of blocks) {
    if (block.type === 'heading' && block.text) {
      writeWrapped(block.text, 18, 'bold');
    } else if (block.type === 'subheading' && block.text) {
      writeWrapped(block.text, 13, 'bold');
    } else if (block.type === 'paragraph' && block.text) {
      writeWrapped(block.text, 10, 'normal');
    } else if (block.type === 'hr') {
      ensureSpace(16);
      doc.setDrawColor(180);
      doc.line(margin, y, pageWidth - margin, y);
      y += 14;
    } else if (block.type === 'kv' && block.pairs) {
      for (const pair of block.pairs) {
        writeWrapped(`${pair.label}: ${pair.value}`, 10);
      }
    } else if (block.type === 'table' && block.rows) {
      for (const row of block.rows) {
        writeWrapped(row.join('  ·  '), 9);
      }
    } else if (block.type === 'totals' && block.totals) {
      for (const t of block.totals) {
        writeWrapped(`${t.label}: ${t.value}`, t.emphasize ? 11 : 10, t.emphasize ? 'bold' : 'normal');
      }
    } else if (block.type === 'clauses' && block.clauses) {
      for (const clause of block.clauses) {
        writeWrapped(clause.title, 11, 'bold');
        writeWrapped(clause.body, 10);
      }
    }
  }

  doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
}
