import React, { useRef, useState } from 'react';
import { View, StyleSheet, useWindowDimensions, FlatList, ViewToken } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText, Button, Illustration, PressableScale } from '@/components';
import { palette, spacing, radius } from '@/theme';
import { onboarding } from '@/content';
import { useProgress } from '@/state/ProgressContext';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** Visual-first onboarding: swipeable slides, page dots, skip and finish. */
export function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const nav = useAppNavigation();
  const { completeOnboarding } = useProgress();
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const last = index === onboarding.length - 1;

  const finish = () => {
    completeOnboarding();
    nav.replace('Main');
  };

  const onViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setIndex(viewableItems[0].index);
  }).current;

  const next = () => {
    if (last) finish();
    else listRef.current?.scrollToIndex({ index: index + 1, animated: true });
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <PressableScale onPress={finish} activeScale={0.94}>
          <AppText variant="small" color={palette.slateMuted}>
            تخطٍّ
          </AppText>
        </PressableScale>
      </View>

      <FlatList
        ref={listRef}
        data={onboarding}
        keyExtractor={(s) => s.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewable}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.illu}>
              <Illustration name={item.illustration} size={Math.min(width * 0.62, 260)} />
            </View>
            <Animated.View entering={FadeIn} style={styles.copy}>
              <AppText variant="h1" center>
                {item.title}
              </AppText>
              <AppText variant="body" color={palette.slateMuted} center>
                {item.body}
              </AppText>
            </Animated.View>
          </View>
        )}
      />

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.dots}>
          {onboarding.map((s, i) => (
            <View
              key={s.id}
              style={[
                styles.dot,
                i === index ? styles.dotOn : styles.dotOff,
              ]}
            />
          ))}
        </View>
        <Button label={last ? 'ابدأ الآن' : 'التالي'} icon={last ? 'arrowNext' : undefined} onPress={next} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.plaster },
  topBar: { alignItems: 'flex-start', paddingHorizontal: spacing.xl, height: 40, justifyContent: 'center' },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.xxl, gap: spacing.xxl },
  illu: { alignItems: 'center', justifyContent: 'center' },
  copy: { gap: spacing.md, alignItems: 'center' },
  footer: { paddingHorizontal: spacing.xl, gap: spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  dot: { height: 8, borderRadius: 4 },
  dotOn: { width: 22, backgroundColor: palette.cedar },
  dotOff: { width: 8, backgroundColor: palette.hairline },
});
