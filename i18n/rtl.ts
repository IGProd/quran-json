import { I18nManager } from 'react-native';

/**
 * Force the whole app into right-to-left layout. Arabic is the only locale,
 * so we lock RTL on at startup rather than depending on device language.
 *
 * Note: flipping I18nManager requires an app reload to fully take effect on
 * native. Expo's `extra.forcesRTL` in app.json ensures the binary boots RTL,
 * and this call keeps JS in sync during development reloads.
 */
export function enforceRTL(): void {
  try {
    I18nManager.allowRTL(true);
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  } catch {
    // I18nManager can throw on web; layout there falls back to CSS direction.
  }
}

/** True when the runtime is laying out RTL. Used for directional icons/motion. */
export const isRTL = true;

/**
 * Mirror a horizontal offset for RTL. A positive logical "start" offset
 * should move content toward the right edge in RTL.
 */
export function startOffset(value: number): number {
  return isRTL ? -value : value;
}
