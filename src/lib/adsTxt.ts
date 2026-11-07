/**
 * Build ads.txt body from an AdSense publisher id (ca-pub-… or pub-…).
 * Empty id → comment placeholder (safe before approval).
 */
export function buildAdsTxt(publisherId: string): string {
  const raw = (publisherId || '').trim();
  if (!raw) {
    return `# AdSense publisher line intentionally omitted until approval.
# Set PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX and rebuild to emit:
# google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;
  }
  const pub = raw.startsWith('ca-pub-')
    ? raw.slice(3)
    : raw.startsWith('pub-')
      ? raw
      : `pub-${raw.replace(/^pub-/, '')}`;
  return `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
}
