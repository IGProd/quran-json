import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  Screen,
  Header,
  AppText,
  Icon,
  ProgressBar,
  WorkflowTimeline,
  SectionHeader,
  SourceBadge,
  Illustration,
  EmptyState,
} from '@/components';
import { palette, spacing, radius, states, motion } from '@/theme';
import { scenarioById, sourceById } from '@/content';
import { useProgress } from '@/state/ProgressContext';
import { useAppNavigation } from '@/navigation/useAppNavigation';
import type { RootStackParamList } from '@/navigation/types';

export function WorkflowScreen() {
  const nav = useAppNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Workflow'>>();
  const scenario = scenarioById(route.params.scenarioId);
  const { scenarioProgress, isCompleted } = useProgress();

  if (!scenario) {
    return (
      <Screen>
        <Header title="غير متوفر" onBack={() => nav.goBack()} />
        <EmptyState title="تعذّر عرض هذه الحالة" message="عُد إلى قائمة الحالات واختر من جديد." />
      </Screen>
    );
  }

  const accent = states[scenario.accent];
  const { done, total, ratio } = scenarioProgress(scenario.id);
  const allDone = done === total;
  const nextStep = scenario.steps.find((s) => !isCompleted(s.id));

  return (
    <Screen>
      <Header title={scenario.title} subtitle={scenario.subtitle} onBack={() => nav.goBack()} />

      {/* Hero card */}
      <Animated.View entering={FadeIn.duration(motion.duration.base)}>
        <View style={[styles.hero, { backgroundColor: accent.soft, borderColor: accent.line }]}>
          <View style={styles.heroTop}>
            <View style={styles.heroIllu}>
              <Illustration name={scenario.illustration} size={88} tone={accent.tone} />
            </View>
            <View style={styles.heroText}>
              <AppText variant="body" color={palette.slate}>
                {scenario.hero}
              </AppText>
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.flex}>
              <ProgressBar ratio={ratio} tone={accent.tone} />
            </View>
            <AppText variant="small" color={accent.tone}>
              {done} / {total}
            </AppText>
          </View>

          <View style={[styles.hint, { borderColor: accent.line }]}>
            <Icon name={allDone ? 'check-circle' : 'arrowNext'} size={18} color={accent.tone} />
            <AppText variant="small" color={palette.slateMuted} style={styles.flex}>
              {allDone
                ? 'أنجزت جميع الخطوات. تقبّلوا خالص تعازينا.'
                : `الخطوة التالية: ${nextStep?.title ?? ''}`}
            </AppText>
          </View>
        </View>
      </Animated.View>

      {/* Timeline */}
      <View style={styles.timeline}>
        <SectionHeader title="الخطوات" subtitle="وسم كل خطوة بعد إنجازها" icon="workflows" />
        <WorkflowTimeline scenario={scenario} onDocPress={() => nav.navigate('Documents')} />
      </View>

      {/* Sources */}
      {scenario.sources.length > 0 && (
        <View style={styles.sources}>
          <SectionHeader title="مصادر للتأكد" subtitle="الجهات التي يُرجع إليها" icon="sources" />
          <View style={styles.gap}>
            {scenario.sources.map((sid) => {
              const src = sourceById(sid);
              return src ? <SourceBadge key={sid} source={src} /> : null;
            })}
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  heroTop: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  heroIllu: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    backgroundColor: palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: { flex: 1 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: palette.paper,
    borderRadius: radius.md,
    borderWidth: 1,
    padding: spacing.md,
  },
  timeline: { marginBottom: spacing.xl },
  sources: { marginBottom: spacing.lg },
  gap: { gap: spacing.sm },
});
