import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Illustration } from './Illustration';
import { Icon } from './Icon';
import { ProgressBar } from './ProgressBar';
import { palette, radius, spacing, states, elevation } from '@/theme';
import { useProgress } from '@/state/ProgressContext';
import type { Scenario } from '@/content';

/**
 * Large, tappable scenario card: text-free illustration, title, subtitle,
 * step count, and a live completion bar. The accent tints the card softly.
 */
export function ScenarioCard({
  scenario,
  onPress,
  compact,
}: {
  scenario: Scenario;
  onPress: () => void;
  compact?: boolean;
}) {
  const { scenarioProgress } = useProgress();
  const { done, total, ratio } = scenarioProgress(scenario.id);
  const accent = states[scenario.accent];

  return (
    <PressableScale onPress={onPress} style={styles.press}>
      <View style={[styles.card, { borderColor: accent.line }]}>
        <View style={[styles.illu, { backgroundColor: accent.soft }]}>
          <Illustration name={scenario.illustration} size={compact ? 72 : 96} tone={accent.tone} />
        </View>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={[styles.iconChip, { backgroundColor: accent.soft }]}>
              <Icon name={scenario.icon as never} size={16} color={accent.tone} />
            </View>
            <AppText variant="h3" style={styles.title}>
              {scenario.title}
            </AppText>
          </View>
          <AppText variant="small" color={palette.slateMuted}>
            {scenario.subtitle}
          </AppText>
          <View style={styles.metaRow}>
            <AppText variant="caption" color={accent.tone}>
              {done > 0 ? `${done} من ${total} خطوات` : `${total} خطوات`}
            </AppText>
            <ProgressBar ratio={ratio} tone={accent.tone} width={84} />
          </View>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  press: { marginBottom: spacing.md },
  card: {
    flexDirection: 'row',
    backgroundColor: palette.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    ...elevation.card,
  },
  illu: {
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
  },
  body: { flex: 1, padding: spacing.lg, gap: 6, justifyContent: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { flex: 1 },
  iconChip: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
});
