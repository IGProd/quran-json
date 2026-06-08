import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon } from './Icon';
import { palette, radius, spacing } from '@/theme';
import type { SourceItem } from '@/content';

/** Official-source card: authority, the topic it covers, and where to verify. */
export function SourceBadge({ source }: { source: SourceItem }) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.iconWrap}>
          <Icon name="sources" size={18} color={palette.brass} />
        </View>
        <View style={styles.flex}>
          <AppText variant="bodyStrong">{source.title}</AppText>
          <AppText variant="caption" color={palette.brass}>
            {source.authority}
          </AppText>
        </View>
      </View>
      <AppText variant="small" color={palette.slateMuted}>
        {source.topic}
      </AppText>
      {source.reference && (
        <View style={styles.ref}>
          <Icon name="pin" size={14} color={palette.slateFaint} />
          <AppText variant="caption" color={palette.slateFaint} style={styles.flex}>
            {source.reference}
          </AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.paper,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.brassSoft,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: palette.brassSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  ref: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
