import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  ScenarioTabs,
  DocumentPanel,
  CalmInfoBanner,
  EmptyState,
  AppText,
  type TabItem,
} from '@/components';
import { spacing, palette } from '@/theme';
import { documents, docCategoryLabels, stageLabels, type DocCategory, type Stage } from '@/content';

const ALL = 'all';

/** Documents organised by category, with each item expandable to its detail. */
export function DocumentsScreen() {
  const [category, setCategory] = useState<string>(ALL);

  const tabs: TabItem[] = useMemo(
    () => [
      { id: ALL, label: 'الكل' },
      ...(Object.keys(docCategoryLabels) as DocCategory[]).map((c) => ({
        id: c,
        label: docCategoryLabels[c],
      })),
    ],
    []
  );

  const visible = useMemo(
    () => (category === ALL ? documents : documents.filter((d) => d.category === category)),
    [category]
  );

  // Group the visible documents by journey stage for a scannable structure.
  const grouped = useMemo(() => {
    const map = new Map<Stage, typeof documents>();
    visible.forEach((d) => {
      const arr = map.get(d.stage) ?? [];
      arr.push(d);
      map.set(d.stage, arr);
    });
    return Array.from(map.entries());
  }, [visible]);

  return (
    <Screen>
      <Header title="الوثائق" subtitle="ما تحتاجه في كل مرحلة" />
      <View style={styles.intro}>
        <CalmInfoBanner message="اضغط على أي وثيقة لمعرفة متى تُطلب ومن يسلّمها وملاحظة سريعة حولها." />
      </View>

      <View style={styles.tabs}>
        <ScenarioTabs items={tabs} active={category} onChange={setCategory} />
      </View>

      {grouped.length === 0 ? (
        <EmptyState illustration="documents" title="لا توجد وثائق في هذا التصنيف" />
      ) : (
        grouped.map(([stage, docs]) => (
          <View key={stage} style={styles.group}>
            <AppText variant="small" color={palette.brass} style={styles.groupTitle}>
              {stageLabels[stage]}
            </AppText>
            <View style={styles.gap}>
              {docs.map((d) => (
                <DocumentPanel key={d.id} doc={d} />
              ))}
            </View>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.md },
  tabs: { marginBottom: spacing.lg },
  group: { marginBottom: spacing.xl },
  groupTitle: { marginBottom: spacing.sm },
  gap: { gap: spacing.sm },
});
