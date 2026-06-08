import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { states, type StateKey, radius, spacing } from '@/theme';
import { badgeMeta } from '@/content';
import type { BadgeKey } from '@/content';

/**
 * Small status chip. Can be driven either by a semantic step badge
 * (`badge`) or directly by a system state + label. Calm, legible, soft-filled.
 */
export function StatusBadge({
  badge,
  state,
  label,
}: {
  badge?: BadgeKey;
  state?: StateKey;
  label?: string;
}) {
  const resolvedState: StateKey = badge ? badgeMeta[badge].state : state ?? 'neutral';
  const resolvedLabel = label ?? (badge ? badgeMeta[badge].label : states[resolvedState].label);
  const s = states[resolvedState];

  return (
    <View style={[styles.chip, { backgroundColor: s.soft, borderColor: s.line }]}>
      <View style={[styles.dot, { backgroundColor: s.tone }]} />
      <AppText variant="badge" color={s.tone}>
        {resolvedLabel}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
});
