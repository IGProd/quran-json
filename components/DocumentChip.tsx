import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { PressableScale } from './PressableScale';
import { palette, radius, spacing, states } from '@/theme';
import type { DocumentItem } from '@/content';

/**
 * Compact document chip: icon + name + a small necessity dot. Used inside
 * step cards and checklists. Optionally pressable to open a detail panel.
 */
export function DocumentChip({
  doc,
  onPress,
}: {
  doc: DocumentItem;
  onPress?: () => void;
}) {
  const tone = doc.necessity === 'essential' ? states.required : states.warning;

  const content = (
    <View style={[styles.chip, { borderColor: tone.line }]}>
      <View style={[styles.iconWrap, { backgroundColor: tone.soft }]}>
        <Icon name={doc.icon as IconName} size={16} color={tone.tone} />
      </View>
      <AppText variant="small" style={styles.name} numberOfLines={1}>
        {doc.name}
      </AppText>
      <View style={[styles.dot, { backgroundColor: tone.tone }]} />
    </View>
  );

  if (!onPress) return content;
  return (
    <PressableScale onPress={onPress} activeScale={0.97}>
      {content}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: palette.paper,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: spacing.sm,
  },
  iconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { maxWidth: 200 },
  dot: { width: 7, height: 7, borderRadius: 4 },
});
