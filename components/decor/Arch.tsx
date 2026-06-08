import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { palette } from '@/theme';

/**
 * A minimal Moroccan (pointed horseshoe) arch outline. Used to frame hero
 * illustrations and section motifs. Kept as a thin, refined line — a hint of
 * riad architecture, never ornamental clutter.
 */
export function Arch({
  width = 140,
  height = 170,
  color = palette.hairline,
  strokeWidth = 2,
  filled,
  fill = palette.sand,
}: {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  filled?: boolean;
  fill?: string;
}) {
  // Pointed horseshoe arch path in a 100x120 viewBox.
  const d =
    'M14 118 L14 54 ' + // left jamb
    'C14 28 30 8 50 8 ' + // left shoulder into point
    'C70 8 86 28 86 54 ' + // right shoulder
    'L86 118'; // right jamb
  const closed = d + ' L72 118 L72 56 C72 38 62 24 50 24 C38 24 28 38 28 56 L28 118 Z';
  return (
    <Svg width={width} height={height} viewBox="0 0 100 120">
      <Defs>
        <LinearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={fill} stopOpacity={0.9} />
          <Stop offset="1" stopColor={fill} stopOpacity={0.4} />
        </LinearGradient>
      </Defs>
      {filled && <Path d={closed} fill="url(#archFill)" />}
      <Path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
