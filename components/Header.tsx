import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon } from './Icon';
import { palette, spacing } from '@/theme';

/**
 * Polished RTL top bar. Title sits on the leading (right) side; an optional
 * back button uses an RTL-correct arrow. An optional trailing slot holds
 * actions. Designed to live inside a Screen, not the native header.
 */
export function Header({
  title,
  subtitle,
  onBack,
  trailing,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <View style={styles.bar}>
      {onBack && (
        <PressableScale onPress={onBack} activeScale={0.9} style={styles.back}>
          <Icon name="back" size={22} color={palette.slate} />
        </PressableScale>
      )}
      <View style={styles.titleWrap}>
        <AppText variant="h1">{title}</AppText>
        {subtitle && (
          <AppText variant="small" color={palette.slateMuted}>
            {subtitle}
          </AppText>
        )}
      </View>
      {trailing}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
    minHeight: 44,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: palette.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: { flex: 1, gap: 2 },
});
