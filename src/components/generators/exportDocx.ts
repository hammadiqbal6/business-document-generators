import type { DocBlock } from './documentModel';

/** Lazy-loads docx + file-saver only on export. */
export async function exportDocx(filename: string, blocks: DocBlock[]): Promise<void> {
  const docx = await import('docx');
  const { saveAs } = await import('file-saver');
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } =
    docx;

  const children: InstanceType<typeof Paragraph | typeof Table>[] = [];

  for (const block of blocks) {
    if (block.type === 'heading' && block.text) {
      children.push(
        new Paragraph({
          text: block.text,
          heading: HeadingLevel.HEADING_1,
          spacing: { after: 200 },
        }),
      );
    } else if (block.type === 'subheading' && block.text) {
      children.push(
        new Paragraph({
          text: block.text,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 160, after: 120 },
        }),
      );
    } else if (block.type === 'paragraph' && block.text) {
      for (const line of block.text.split('\n')) {
        children.push(new Paragraph({ children: [new TextRun({ text: line, size: 20 })], spacing: { after: 80 } }));
      }
    } else if (block.type === 'hr') {
      children.push(new Paragraph({ text: '————————————————', spacing: { before: 120, after: 120 } }));
    } else if (block.type === 'kv' && block.pairs) {
      for (const pair of block.pairs) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${pair.label}: `, bold: true, size: 20 }),
              new TextRun({ text: pair.value, size: 20 }),
            ],
            spacing: { after: 60 },
          }),
        );
      }
    } else if (block.type === 'table' && block.rows) {
      const rows = block.rows.map(
        (row, idx) =>
          new TableRow({
            children: row.map(
              (cell) =>
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [new TextRun({ text: cell, bold: idx === 0, size: 18 })],
                    }),
                  ],
                  width: { size: 20, type: WidthType.PERCENTAGE },
                }),
            ),
          }),
      );
      children.push(
        new Table({
          rows,
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      );
      children.push(new Paragraph({ text: '' }));
    } else if (block.type === 'totals' && block.totals) {
      for (const t of block.totals) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${t.label}: `, bold: true, size: 20 }),
              new TextRun({ text: t.value, bold: Boolean(t.emphasize), size: t.emphasize ? 22 : 20 }),
            ],
            spacing: { after: 40 },
          }),
        );
      }
    } else if (block.type === 'clauses' && block.clauses) {
      for (const clause of block.clauses) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: clause.title, bold: true, size: 22 })],
            spacing: { before: 140, after: 60 },
          }),
        );
        children.push(
          new Paragraph({
            children: [new TextRun({ text: clause.body, size: 20 })],
            spacing: { after: 100 },
          }),
        );
      }
    }
  }

  const document = new Document({
    sections: [{ children }],
  });
  const blob = await Packer.toBlob(document);
  saveAs(blob, filename.endsWith('.docx') ? filename : `${filename}.docx`);
}
