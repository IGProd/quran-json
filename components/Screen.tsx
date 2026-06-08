import React from 'react';
import { View, ScrollView, StyleSheet, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { palette, spacing, layout } from '@/theme';

/**
 * Standard screen container. Warm plaster background, safe-area aware, and a
 * centred max-width content column so the layout stays calm on large phones.
 */
export function Screen({
  children,
  scroll = true,
  contentStyle,
  ...rest
}: {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ScrollViewProps['contentContainerStyle'];
} & ScrollViewProps) {
  const insets = useSafeAreaInsets();

  if (!scroll) {
    return (
      <View style={[styles.flex, { paddingTop: insets.top }]}>
        <View style={styles.inner}>{children}</View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={[
        { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing.xxxl },
        styles.scrollContent,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      <View style={styles.inner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: palette.plaster },
  scrollContent: { paddingHorizontal: layout.screenPadding },
  inner: { width: '100%', maxWidth: layout.maxContentWidth, alignSelf: 'center' },
});
