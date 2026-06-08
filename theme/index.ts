export * from './tokens';

import { palette, states, type StateKey } from './tokens';

export const theme = {
  bg: palette.plaster,
  surface: palette.paper,
  surfaceAlt: palette.sand,
  text: palette.slate,
  textMuted: palette.slateMuted,
  textFaint: palette.slateFaint,
  brand: palette.cedar,
  brandSoft: palette.cedarSoft,
  border: palette.hairline,
  accent: palette.brass,
} as const;

export function stateColors(key: StateKey) {
  return states[key];
}
