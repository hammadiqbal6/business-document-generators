/** GA4 helpers — safe no-ops when gtag is absent or consent denied. */

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
  | 'outbound_reference_click'
  | 'embed_snippet_copied';

export function trackEvent(
  name: AnalyticsEvent,
  params: Record<string, string | number | boolean | undefined> = {},
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
