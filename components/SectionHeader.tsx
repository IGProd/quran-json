import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { palette, spacing } from '@/theme';

/** Strong section title with an optional leading icon and a short subtitle. */
export function SectionHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        {icon && (
          <View style={styles.iconWrap}>
            <Icon name={icon} size={18} color={palette.cedar} />
          </View>
        )}
        <AppText variant="h2">{title}</AppText>
      </View>
      {subtitle && (
        <AppText variant="small" color={palette.slateMuted}>
          {subtitle}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs, marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: palette.cedarSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
