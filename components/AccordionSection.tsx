import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon, type IconName } from './Icon';
import { palette, radius, spacing, motion } from '@/theme';

/**
 * Smoothly expanding section. The chevron rotates and the body fades/grows in.
 * Used for documents, FAQ and any "expandable guided" content.
 */
export function AccordionSection({
  title,
  subtitle,
  icon,
  leading,
  defaultOpen = false,
  tone = palette.cedar,
  children,
}: {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Custom leading node (e.g. a colored icon chip) replacing `icon`. */
  leading?: React.ReactNode;
  defaultOpen?: boolean;
  tone?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rotation = useSharedValue(defaultOpen ? 1 : 0);

  const toggle = () => {
    rotation.value = withTiming(open ? 0 : 1, {
      duration: motion.duration.fast,
      easing: Easing.bezier(...motion.ease),
    });
    setOpen((o) => !o);
  };

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  return (
    <Animated.View layout={LinearTransition.duration(motion.duration.base)} style={styles.wrap}>
      <PressableScale onPress={toggle} activeScale={0.99} style={styles.header}>
        {leading ?? (icon && <Icon name={icon} size={20} color={tone} />)}
        <View style={styles.headText}>
          <AppText variant="bodyStrong">{title}</AppText>
          {subtitle && (
            <AppText variant="caption" color={palette.slateFaint}>
              {subtitle}
            </AppText>
          )}
        </View>
        <Animated.View style={chevronStyle}>
          <Icon name="chevron-down" size={20} color={palette.slateFaint} />
        </Animated.View>
      </PressableScale>
      {open && (
        <Animated.View
          entering={FadeIn.duration(motion.duration.base)}
          exiting={FadeOut.duration(motion.duration.fast)}
          style={styles.body}
        >
          {children}
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: palette.paper,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.hairline,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  headText: { flex: 1, gap: 2 },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xs,
    gap: spacing.sm,
  },
});
