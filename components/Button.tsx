import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon, type IconName } from './Icon';
import { palette, radius, spacing, elevation } from '@/theme';

/** Primary full-width call-to-action. Variants: solid (cedar) / ghost. */
export function Button({
  label,
  onPress,
  icon,
  variant = 'solid',
  loading,
  disabled,
}: {
  label: string;
  onPress: () => void;
  icon?: IconName;
  variant?: 'solid' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
}) {
  const solid = variant === 'solid';
  return (
    <PressableScale onPress={onPress} disabled={disabled || loading} activeScale={0.97}>
      <View
        style={[
          styles.btn,
          solid ? styles.solid : styles.ghost,
          (disabled || loading) && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={solid ? palette.white : palette.cedar} />
        ) : (
          <>
            {icon && <Icon name={icon} size={20} color={solid ? palette.white : palette.cedar} />}
            <AppText variant="h3" color={solid ? palette.white : palette.cedar}>
              {label}
            </AppText>
          </>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 54,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  solid: { backgroundColor: palette.cedar, ...elevation.card },
  ghost: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: palette.cedar },
  disabled: { opacity: 0.5 },
});
