import React from 'react';
import Svg, { G, Path, Line } from 'react-native-svg';
import { palette } from '@/theme';

/**
 * Very subtle zellige geometry — an eight-point star tessellation drawn as
 * faint hairlines. Used at low opacity behind hero areas to suggest Moroccan
 * craft without ornament or noise. Text-free and purely decorative.
 */
export function Zellige({
  size = 220,
  color = palette.hairline,
  opacity = 0.5,
}: {
  size?: number;
  color?: string;
  opacity?: number;
}) {
  // One eight-point star centred in a 60x60 tile, repeated 3x3.
  const star = (cx: number, cy: number, r = 18) => {
    const pts: string[] = [];
    for (let i = 0; i < 16; i++) {
      const ang = (Math.PI / 8) * i - Math.PI / 2;
      const rad = i % 2 === 0 ? r : r * 0.46;
      pts.push(`${(cx + rad * Math.cos(ang)).toFixed(2)},${(cy + rad * Math.sin(ang)).toFixed(2)}`);
    }
    return `M${pts.join(' L')} Z`;
  };

  const tiles: React.ReactNode[] = [];
  const step = 60;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const cx = c * step + 30;
      const cy = r * step + 30;
      tiles.push(
        <G key={`${r}-${c}`}>
          <Path d={star(cx, cy)} fill="none" stroke={color} strokeWidth={1} />
          <Line x1={cx - 30} y1={cy} x2={cx + 30} y2={cy} stroke={color} strokeWidth={0.5} />
          <Line x1={cx} y1={cy - 30} x2={cx} y2={cy + 30} stroke={color} strokeWidth={0.5} />
        </G>
      );
    }
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 240 240" opacity={opacity}>
      {tiles}
    </Svg>
  );
}
