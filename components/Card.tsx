import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { palette, radius, spacing, elevation } from '@/theme';

/** Raised surface used across the app. Warm paper, soft border, calm shadow. */
export function Card({
  children,
  style,
  padded = true,
  tone,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
  /** Optional left/start accent stripe color. */
  tone?: string;
}) {
  return (
    <View style={[styles.card, padded && styles.padded, style]}>
      {tone && <View style={[styles.stripe, { backgroundColor: tone }]} />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.hairline,
    overflow: 'hidden',
    ...elevation.card,
  },
  padded: { padding: spacing.lg },
  stripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    // In RTL, `start` resolves to the right edge — the visual leading edge.
    start: 0,
    width: 4,
  },
});
