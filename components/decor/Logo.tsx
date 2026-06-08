import React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { palette } from '@/theme';

/**
 * Abstract brand mark: a Moroccan arch resting inside a calm ring, with a
 * single guiding point at its apex. No text, no cliché — a quiet civic symbol
 * of guidance and shelter.
 */
export function Logo({
  size = 96,
  color = palette.cedar,
  accent = palette.brass,
  ring = palette.hairline,
}: {
  size?: number;
  color?: string;
  accent?: string;
  ring?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={46} fill="none" stroke={ring} strokeWidth={2} />
      <Circle cx={50} cy={50} r={38} fill={palette.paper} />
      <G stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <Path d="M34 72 L34 50 C34 38 41 30 50 30 C59 30 66 38 66 50 L66 72" />
        <Path d="M44 72 L44 52 C44 45 46 41 50 41 C54 41 56 45 56 52 L56 72" />
      </G>
      <Circle cx={50} cy={26} r={3.4} fill={accent} />
    </Svg>
  );
}
