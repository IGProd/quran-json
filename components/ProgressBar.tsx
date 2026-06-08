import React, { useEffect } from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { palette, radius, motion } from '@/theme';

/**
 * Slim progress line that animates to its new ratio. Used on scenario cards
 * and the workflow header — the line advances as steps are completed.
 */
export function ProgressBar({
  ratio,
  tone = palette.cedar,
  width = '100%' as DimensionValue,
  height = 6,
}: {
  ratio: number;
  tone?: string;
  width?: DimensionValue;
  height?: number;
}) {
  const clamped = Math.max(0, Math.min(1, ratio));
  const value = useSharedValue(clamped);

  useEffect(() => {
    value.value = withTiming(clamped, {
      duration: motion.duration.slow,
      easing: Easing.bezier(...motion.ease),
    });
  }, [clamped, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${value.value * 100}%`,
  }));

  return (
    <View style={[styles.track, { width, height, borderRadius: height / 2 }]}>
      <Animated.View
        style={[styles.fill, animatedStyle, { backgroundColor: tone, borderRadius: height / 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { backgroundColor: palette.sandDeep, overflow: 'hidden' },
  fill: { height: '100%' },
});
