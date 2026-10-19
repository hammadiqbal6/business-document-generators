import { createRoot } from 'react-dom/client';
import DocumentGenerator from '../components/generators/DocumentGenerator';
import type { ToolDefinition } from '../data/tools/types';

export function mountDocumentGenerator(
  el: HTMLElement,
  tool: ToolDefinition,
  embed = false,
): void {
  const root = createRoot(el);
  root.render(<DocumentGenerator tool={tool} embed={embed} />);
}
