import React from 'react';
import { Text, TextProps } from 'react-native';
import { type as typeScale, palette } from '@/theme';

type Variant = keyof typeof typeScale;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  center?: boolean;
  children: React.ReactNode;
}

/**
 * RTL-aware text. Defaults to right alignment and the app's Arabic type scale.
 * All copy in the app flows through here so typography and direction stay
 * consistent and no English styling leaks in.
 */
export function AppText({
  variant = 'body',
  color = palette.slate,
  center,
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      style={[
        typeScale[variant],
        { color, textAlign: center ? 'center' : 'right', writingDirection: 'rtl' },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
