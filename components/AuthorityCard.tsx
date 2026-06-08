import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { palette, radius, spacing } from '@/theme';
import type { Authority } from '@/content';

/** Card describing a role/authority the family deals with along the journey. */
export function AuthorityCard({ authority }: { authority: Authority }) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <View style={styles.iconWrap}>
          <Icon name={authority.icon as IconName} size={22} color={palette.cedar} />
        </View>
        <View style={styles.flex}>
          <AppText variant="h3">{authority.name}</AppText>
          <AppText variant="caption" color={palette.brass}>
            {authority.role}
          </AppText>
        </View>
      </View>
      <View style={styles.list}>
        {authority.handles.map((h, i) => (
          <View key={i} style={styles.li}>
            <View style={styles.bullet} />
            <AppText variant="small" color={palette.slateMuted} style={styles.flex}>
              {h}
            </AppText>
          </View>
        ))}
      </View>
      <View style={styles.when}>
        <Icon name="clock" size={14} color={palette.slateFaint} />
        <AppText variant="caption" color={palette.slateFaint}>
          {authority.whenInvolved}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.hairline,
    padding: spacing.lg,
    gap: spacing.md,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: palette.cedarSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  list: { gap: spacing.sm },
  li: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.brass,
    marginTop: 8,
  },
  when: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: palette.hairline,
    paddingTop: spacing.md,
  },
});
