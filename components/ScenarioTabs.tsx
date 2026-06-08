import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { palette, radius, spacing } from '@/theme';

export interface TabItem {
  id: string;
  label: string;
}

/**
 * Horizontal pill tabs for filtering (e.g. documents by scenario or category).
 * Scrolls horizontally and respects RTL flow.
 */
export function ScenarioTabs({
  items,
  active,
  onChange,
}: {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {items.map((item) => {
        const on = item.id === active;
        return (
          <PressableScale key={item.id} onPress={() => onChange(item.id)} activeScale={0.96}>
            <View style={[styles.tab, on ? styles.tabOn : styles.tabOff]}>
              <AppText variant="small" color={on ? palette.white : palette.slateMuted}>
                {item.label}
              </AppText>
            </View>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.sm, paddingVertical: spacing.xs },
  tab: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  tabOn: { backgroundColor: palette.cedar, borderColor: palette.cedar },
  tabOff: { backgroundColor: palette.paper, borderColor: palette.hairline },
});
