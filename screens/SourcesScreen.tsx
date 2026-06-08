import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Header, SourceBadge, LegalNoticeCard, SectionHeader } from '@/components';
import { spacing } from '@/theme';
import { sources } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** Sources & legal notice — respectful, update-ready references. */
export function SourcesScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="المصادر والإشعار" subtitle="من أين تتأكد من المعلومة" onBack={() => nav.goBack()} />

      <View style={styles.block}>
        <LegalNoticeCard />
      </View>

      <View style={styles.block}>
        <SectionHeader title="مصادر رسمية" subtitle="الجهة المرجعية لكل موضوع" icon="sources" />
        <View style={styles.list}>
          {sources.map((s) => (
            <SourceBadge key={s.id} source={s} />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
  list: { gap: spacing.sm },
});
