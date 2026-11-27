/** GA4 helpers — queue via dataLayer when the gtag stub is not ready yet. */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | 'tool_opened'
  | 'tool_export_pdf'
  | 'tool_export_docx'
  | 'tool_convert_to_invoice'
  | 'outbound_reference_click'
  | 'embed_snippet_copied';

/**
 * Send a GA4 event. Prefer `gtag` when present (it pushes onto `dataLayer`).
 * If the Analytics stub has not run yet, push the same command shape onto
 * `dataLayer` so the event is not dropped when the tag configures later.
 */
export function trackEvent(
  name: AnalyticsEvent,
  params: Record<string, string | number | boolean | undefined> = {},
): void {
  if (typeof window === 'undefined') return;

  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) cleaned[key] = value;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, cleaned);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  // Mirror gtag('event', name, params) so queued hits flush when gtag.js loads.
  window.dataLayer.push(['event', name, cleaned]);
}
