import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon } from './Icon';
import { palette, radius, spacing, states, motion } from '@/theme';

/**
 * "Mark this step completed" control. On completion the check seals in with a
 * stamp-like spring + a brief ring pulse — a calm, satisfying confirmation.
 */
export function CompletionToggle({
  completed,
  onToggle,
}: {
  completed: boolean;
  onToggle: () => void;
}) {
  const s = states.completed;
  const seal = useSharedValue(completed ? 1 : 0);
  const ring = useSharedValue(0);

  useEffect(() => {
    seal.value = withSpring(completed ? 1 : 0, motion.spring.gentle);
    if (completed) {
      ring.value = withSequence(
        withTiming(1, { duration: motion.duration.fast, easing: Easing.out(Easing.quad) }),
        withTiming(0, { duration: motion.duration.base })
      );
    }
  }, [completed, seal, ring]);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.6 + seal.value * 0.4 }],
    opacity: seal.value,
  }));
  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + ring.value * 0.6 }],
    opacity: ring.value * 0.5,
  }));

  return (
    <PressableScale onPress={onToggle} activeScale={0.98}>
      <View
        style={[
          styles.wrap,
          {
            backgroundColor: completed ? s.soft : palette.paper,
            borderColor: completed ? s.line : palette.hairline,
          },
        ]}
      >
        <View style={styles.box}>
          <Animated.View style={[styles.ring, ringStyle, { borderColor: s.tone }]} />
          <View
            style={[
              styles.circle,
              {
                borderColor: completed ? s.tone : palette.hairline,
                backgroundColor: completed ? s.tone : 'transparent',
              },
            ]}
          >
            <Animated.View style={checkStyle}>
              <Icon name="check" size={16} color={palette.white} />
            </Animated.View>
          </View>
        </View>
        <AppText variant="bodyStrong" color={completed ? s.tone : palette.slate}>
          {completed ? 'تم إنجاز هذه الخطوة' : 'وسم هذه الخطوة كمنجزة'}
        </AppText>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  box: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
