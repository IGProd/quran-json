import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AppText } from './AppText';
import { Icon } from './Icon';
import { StepCard } from './StepCard';
import { palette, spacing, states, motion } from '@/theme';
import { useProgress } from '@/state/ProgressContext';
import type { Scenario } from '@/content';

/**
 * Vertical progress timeline. A rail of nodes on the leading (right, in RTL)
 * side connects the steps; completed nodes seal with a check, the current node
 * is highlighted, and each step card reveals with a soft staggered entrance.
 */
export function WorkflowTimeline({
  scenario,
  onDocPress,
}: {
  scenario: Scenario;
  onDocPress?: (docId: string) => void;
}) {
  const { isCompleted, toggleStep } = useProgress();
  const firstIncomplete = scenario.steps.findIndex((s) => !isCompleted(s.id));

  return (
    <View style={styles.wrap}>
      {scenario.steps.map((step, i) => {
        const done = isCompleted(step.id);
        const current = i === firstIncomplete;
        const last = i === scenario.steps.length - 1;
        const nodeColor = done ? states.completed.tone : current ? states.urgent.tone : palette.hairline;

        return (
          <Animated.View
            key={step.id}
            entering={FadeInDown.delay(i * 70).duration(motion.duration.base)}
            style={styles.row}
          >
            <View style={styles.rail}>
              <View style={[styles.node, { borderColor: nodeColor, backgroundColor: done ? nodeColor : palette.paper }]}>
                {done ? (
                  <Icon name="check" size={14} color={palette.white} />
                ) : (
                  <AppText variant="badge" color={current ? states.urgent.tone : palette.slateFaint}>
                    {String(i + 1)}
                  </AppText>
                )}
              </View>
              {!last && (
                <View
                  style={[
                    styles.line,
                    { backgroundColor: done ? states.completed.line : palette.hairline },
                  ]}
                />
              )}
            </View>

            <View style={styles.content}>
              <StepCard
                step={step}
                completed={done}
                onToggle={() => toggleStep(step.id)}
                onDocPress={onDocPress}
              />
            </View>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.lg },
  row: { flexDirection: 'row', gap: spacing.md },
  rail: { width: 30, alignItems: 'center' },
  node: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: { flex: 1, width: 2, marginVertical: spacing.xs, borderRadius: 1 },
  content: { flex: 1, paddingBottom: spacing.xs },
});
