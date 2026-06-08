import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  Line,
  G,
  Defs,
  LinearGradient,
  Stop,
  Ellipse,
} from 'react-native-svg';
import { palette } from '@/theme';
import type { IllustrationKey } from '@/content';

/**
 * Calm, text-free vector illustrations. Every scene is abstract and respectful
 * — no corpses, no graphic content, no text inside the image — using soft
 * Moroccan-leaning shapes (arches, paths, courtyards, documents, maps).
 *
 * `tone` tints the accent shapes so an illustration can pick up its scenario's
 * system colour while the line work stays a calm cedar.
 */

interface Props {
  name: IllustrationKey;
  size?: number;
  tone?: string;
}

export function Illustration({ name, size = 160, tone = palette.cedar }: Props) {
  const line = palette.cedar;
  const soft = palette.sand;
  const ink = palette.slateMuted;

  return (
    <Svg width={size} height={size} viewBox="0 0 200 200">
      <Defs>
        <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={palette.paper} />
          <Stop offset="1" stopColor={soft} />
        </LinearGradient>
      </Defs>
      <Circle cx={100} cy={100} r={92} fill="url(#sky)" />
      <Circle cx={100} cy={100} r={92} fill="none" stroke={palette.hairline} strokeWidth={1.5} />
      <G stroke={line} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {scene(name, { line, tone, soft, ink })}
      </G>
    </Svg>
  );
}

interface SceneColors {
  line: string;
  tone: string;
  soft: string;
  ink: string;
}

function scene(name: IllustrationKey, c: SceneColors): React.ReactNode {
  switch (name) {
    case 'home':
      return (
        <>
          <Path d="M62 104 L100 72 L138 104" />
          <Path d="M72 100 L72 138 L128 138 L128 100" />
          <Rect x={92} y={116} width={16} height={22} fill={c.soft} />
          <Path d="M84 100 L84 92" stroke={c.tone} />
        </>
      );
    case 'hospital':
      return (
        <>
          <Rect x={70} y={78} width={60} height={62} rx={4} fill={c.soft} />
          <Line x1={100} y1={92} x2={100} y2={112} stroke={c.tone} />
          <Line x1={90} y1={102} x2={110} y2={102} stroke={c.tone} />
          <Rect x={82} y={122} width={12} height={18} />
          <Rect x={106} y={122} width={12} height={18} />
        </>
      );
    case 'judicial':
      return (
        <>
          <Line x1={100} y1={70} x2={100} y2={132} />
          <Line x1={72} y1={84} x2={128} y2={84} />
          <Path d="M72 84 L62 106 L82 106 Z" fill={c.soft} />
          <Path d="M128 84 L118 106 L138 106 Z" fill={c.soft} />
          <Line x1={86} y1={132} x2={114} y2={132} />
          <Circle cx={100} cy={70} r={4} fill={c.tone} stroke="none" />
        </>
      );
    case 'sameCity':
      return (
        <>
          <Path d="M100 72 C84 72 74 84 74 98 C74 118 100 138 100 138 C100 138 126 118 126 98 C126 84 116 72 100 72 Z" fill={c.soft} />
          <Circle cx={100} cy={98} r={10} stroke={c.tone} />
        </>
      );
    case 'transfer':
      return (
        <>
          <Path d="M60 124 C90 116 110 116 140 124" strokeDasharray="2 7" stroke={c.ink} />
          <Circle cx={60} cy={124} r={5} fill={c.tone} stroke="none" />
          <Circle cx={140} cy={124} r={5} fill={c.tone} stroke="none" />
          <Rect x={84} y={86} width={34} height={22} rx={3} fill={c.soft} />
          <Path d="M118 92 L130 92 L134 100 L134 108 L118 108 Z" fill={c.soft} />
          <Circle cx={96} cy={110} r={5} />
          <Circle cx={126} cy={110} r={5} />
        </>
      );
    case 'arrival':
      return (
        <>
          <Path d="M118 70 L92 96 L100 100 L130 82 Z" fill={c.soft} />
          <Path d="M104 92 L96 104 L102 105 Z" fill={c.tone} stroke="none" />
          <Line x1={66} y1={132} x2={134} y2={132} />
          <Path d="M80 132 C80 118 90 110 100 110" strokeDasharray="2 6" stroke={c.ink} />
        </>
      );
    case 'departure':
      return (
        <>
          <Path d="M82 100 L108 74 L116 80 L96 110 Z" fill={c.soft} />
          <Path d="M96 86 L104 80 L107 86 Z" fill={c.tone} stroke="none" />
          <Line x1={66} y1={132} x2={134} y2={132} />
          <Path d="M84 130 C100 118 112 110 120 100" strokeDasharray="2 6" stroke={c.ink} />
        </>
      );
    case 'consulate':
      return (
        <>
          <Rect x={74} y={92} width={52} height={46} rx={3} fill={c.soft} />
          <Line x1={84} y1={92} x2={84} y2={138} />
          <Line x1={100} y1={92} x2={100} y2={138} />
          <Line x1={116} y1={92} x2={116} y2={138} />
          <Path d="M70 92 L100 74 L130 92" />
          <Line x1={100} y1={74} x2={100} y2={62} stroke={c.tone} />
          <Path d="M100 64 L112 67 L100 70 Z" fill={c.tone} stroke="none" />
        </>
      );
    case 'documents':
      return (
        <>
          <Rect x={70} y={74} width={46} height={58} rx={4} fill={c.soft} transform="rotate(-7 93 103)" />
          <Rect x={84} y={80} width={46} height={58} rx={4} fill={palette.paper} />
          <Line x1={92} y1={96} x2={122} y2={96} stroke={c.ink} />
          <Line x1={92} y1={108} x2={122} y2={108} stroke={c.ink} />
          <Circle cx={114} cy={124} r={9} stroke={c.tone} />
          <Path d="M110 124 L113 127 L119 121" stroke={c.tone} />
        </>
      );
    case 'courtyard':
      return (
        <>
          <Path d="M76 130 L76 96 C76 82 86 72 100 72 C114 72 124 82 124 96 L124 130" fill={c.soft} />
          <Ellipse cx={100} cy={132} rx={26} ry={7} fill={palette.paper} stroke={c.tone} />
          <Line x1={100} y1={126} x2={100} y2={120} stroke={c.tone} />
          <Path d="M64 130 L64 110 M136 130 L136 110" stroke={c.ink} />
        </>
      );
    case 'path':
      return (
        <>
          <Path d="M100 138 C92 120 108 110 100 92 C94 80 104 72 100 64" stroke={c.ink} strokeDasharray="2 6" />
          <Path d="M78 132 L84 112 L90 132 Z" fill={c.soft} />
          <Path d="M112 132 L118 108 L124 132 Z" fill={c.soft} />
          <Line x1={84} y1={132} x2={84} y2={138} />
          <Line x1={118} y1={132} x2={118} y2={138} />
          <Circle cx={100} cy={62} r={4} fill={c.tone} stroke="none" />
        </>
      );
    case 'map':
      return (
        <>
          <Path d="M68 84 L92 76 L116 84 L132 76 L132 124 L116 132 L92 124 L68 132 Z" fill={c.soft} />
          <Line x1={92} y1={76} x2={92} y2={124} stroke={c.ink} />
          <Line x1={116} y1={84} x2={116} y2={132} stroke={c.ink} />
          <Path d="M80 104 C80 98 86 94 90 100 C92 104 86 110 86 110 C86 110 80 108 80 104 Z" fill={c.tone} stroke="none" />
          <Path d="M118 96 C118 92 122 90 125 94 C126 97 121 101 121 101 C121 101 118 99 118 96 Z" fill={c.tone} stroke="none" />
        </>
      );
    default:
      return null;
  }
}
