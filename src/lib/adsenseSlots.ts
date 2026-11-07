/**
 * Resolve AdSense display unit IDs from build-time PUBLIC_* env values.
 * AdSense data-ad-slot must be a numeric ad unit id (not a placement label).
 */

export type AdPlacement = 'home-top' | 'tool-mid';

export interface AdsenseSlotConfig {
  /** Shared display unit id (PUBLIC_ADSENSE_SLOT_DISPLAY). */
  display: string;
  /** Optional homepage override (PUBLIC_ADSENSE_SLOT_HOME). */
  home: string;
  /** Optional tool-page override (PUBLIC_ADSENSE_SLOT_TOOL). */
  tool: string;
}

/** True when value looks like an AdSense numeric ad unit id. */
export function isNumericAdUnitId(value: string | undefined | null): boolean {
  return /^\d{6,}$/.test((value || '').trim());
}

/**
 * Pick the unit id for a placement. Per-placement override wins over the
 * shared display id when it is numeric. Returns '' when no usable numeric
 * id is configured.
 */
export function resolveAdUnitId(
  placement: AdPlacement | string,
  slots: AdsenseSlotConfig,
): string {
  const override =
    placement === 'home-top'
      ? slots.home
      : placement === 'tool-mid'
        ? slots.tool
        : '';
  if (isNumericAdUnitId(override)) return override.trim();
  if (isNumericAdUnitId(slots.display)) return slots.display.trim();
  return '';
}
