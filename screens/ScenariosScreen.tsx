import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Header, ScenarioCard, CalmInfoBanner } from '@/components';
import { spacing } from '@/theme';
import { scenarios, type ScenarioId } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** All eight branches as large, illustrated, tappable scenario cards. */
export function ScenariosScreen() {
  const nav = useAppNavigation();
  const go = (id: ScenarioId) => nav.navigate('Workflow', { scenarioId: id });

  return (
    <Screen>
      <Header title="كل الحالات" subtitle="اختر الحالة الأقرب لوضعك" />
      <View style={styles.intro}>
        <CalmInfoBanner message="كل حالة تعرض مسارًا واضحًا بخطوات قصيرة. يمكنك وسم كل خطوة بعد إنجازها." />
      </View>
      {scenarios.map((s) => (
        <ScenarioCard key={s.id} scenario={s} onPress={() => go(s.id)} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
});
