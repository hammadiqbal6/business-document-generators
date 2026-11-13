import { geoBootstrapScript } from './consentRegions';

/** Inject geo bootstrap into HTML for cookie-banner / CMP routing. */
export function injectGeoIntoHtml(html: string, countryCode: string | null | undefined): string {
  const snippet = geoBootstrapScript(countryCode);
  if (html.includes('window.__docuklinGeo=')) return html;
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (open) => `${open}${snippet}`);
  }
  if (/<html[^>]*>/i.test(html)) {
    return html.replace(/<html[^>]*>/i, (open) => `${open}${snippet}`);
  }
  return `${snippet}${html}`;
}

export function isHtmlContentType(contentType: string | null): boolean {
  if (!contentType) return false;
  return /^text\/html\b/i.test(contentType);
}
