import React from 'react';
import { Pressable, PressableProps, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { motion, layout } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends PressableProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** How far to scale down on press (0.97 ≈ subtle). */
  activeScale?: number;
}

/**
 * Pressable with a calm spring scale on touch. Applies Emil Kowalski's rule:
 * the feedback is quick, springy and small — felt, not seen.
 */
export function PressableScale({ children, style, activeScale = 0.97, ...rest }: Props) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      hitSlop={layout.hitSlop}
      onPressIn={() => {
        scale.value = withSpring(activeScale, motion.spring.press);
      }}
      onPressOut={() => {
        scale.value = withSpring(1, motion.spring.press);
      }}
      style={[animatedStyle, style]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
