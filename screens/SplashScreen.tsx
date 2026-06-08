import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { AppText, Button } from '@/components';
import { Logo } from '@/components/decor/Logo';
import { Zellige } from '@/components/decor/Zellige';
import { palette, spacing, motion } from '@/theme';
import { useProgress } from '@/state/ProgressContext';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/**
 * Respectful opening screen: a faint zellige field, the brand mark breathing
 * gently, and a single clear "enter" call to action. Public-service calm.
 */
export function SplashScreen() {
  const nav = useAppNavigation();
  const { onboarded } = useProgress();
  const breathe = useSharedValue(0);

  useEffect(() => {
    breathe.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 2600, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [breathe]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + breathe.value * 0.04 }],
  }));

  const enter = () => {
    nav.replace(onboarded ? 'Main' : 'Onboarding');
  };

  return (
    <View style={styles.root}>
      <View style={styles.pattern} pointerEvents="none">
        <Zellige size={420} opacity={0.35} />
      </View>

      <View style={styles.center}>
        <Animated.View entering={FadeIn.duration(motion.duration.slow)} style={logoStyle}>
          <Logo size={120} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(250).duration(motion.duration.slow)} style={styles.titleBlock}>
          <AppText variant="display" center>
            دليل إجراءات الوفاة
          </AppText>
          <AppText variant="body" color={palette.slateMuted} center>
            مرشد هادئ يساعد الأسرة، خطوة بخطوة، من إثبات الوفاة إلى الدفن.
          </AppText>
        </Animated.View>
      </View>

      <Animated.View entering={FadeInDown.delay(500).duration(motion.duration.slow)} style={styles.footer}>
        <Button label="ادخل" icon="arrowNext" onPress={enter} />
        <AppText variant="caption" color={palette.slateFaint} center>
          دليل مبسّط للتوجيه، لا يغني عن الجهات المختصة.
        </AppText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.plaster,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxxl,
    justifyContent: 'space-between',
  },
  pattern: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    opacity: 0.8,
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.xl },
  titleBlock: { gap: spacing.sm, alignItems: 'center', paddingHorizontal: spacing.md },
  footer: { gap: spacing.md },
});
