import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon, type IconName } from './Icon';
import { palette, radius, spacing, states, type StateKey } from '@/theme';

/**
 * Large quick-action button: leading icon, title, optional subtitle, trailing
 * chevron. `variant` "solid" is for primary CTAs; "soft" for secondary entries.
 */
export function QuickActionButton({
  icon,
  title,
  subtitle,
  onPress,
  state = 'neutral',
  variant = 'soft',
}: {
  icon: IconName;
  title: string;
  subtitle?: string;
  onPress: () => void;
  state?: StateKey;
  variant?: 'solid' | 'soft';
}) {
  const s = states[state === 'neutral' ? 'completed' : state];
  const solid = variant === 'solid';
  const bg = solid ? palette.cedar : palette.paper;
  const fg = solid ? palette.white : palette.slate;
  const iconBg = solid ? 'rgba(255,255,255,0.14)' : s.soft;
  const iconFg = solid ? palette.white : s.tone;

  return (
    <PressableScale onPress={onPress} activeScale={0.98}>
      <View style={[styles.btn, { backgroundColor: bg, borderColor: solid ? palette.cedarDeep : palette.hairline }]}>
        <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
          <Icon name={icon} size={22} color={iconFg} />
        </View>
        <View style={styles.text}>
          <AppText variant="h3" color={fg}>
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="caption" color={solid ? 'rgba(255,255,255,0.8)' : palette.slateFaint}>
              {subtitle}
            </AppText>
          )}
        </View>
        <Icon name="chevron-end" size={20} color={solid ? 'rgba(255,255,255,0.8)' : palette.slateFaint} />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: 2 },
});
