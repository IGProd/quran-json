import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  Screen,
  Header,
  AppText,
  Button,
  PressableScale,
  Icon,
  Illustration,
  ProgressBar,
} from '@/components';
import { palette, spacing, radius, states, motion } from '@/theme';
import { decisionTree, decisionRootId, scenarioById } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/**
 * Visual decision assistant. Each answer reveals the next question with a soft
 * fade; a result routes the family to the matching workflow. History lets them
 * step back, and a reset starts over.
 */
export function DecisionTreeScreen() {
  const nav = useAppNavigation();
  const [currentId, setCurrentId] = useState(decisionRootId);
  const [history, setHistory] = useState<string[]>([]);

  const node = decisionTree[currentId];
  const isResult = node.kind === 'result';
  const depth = history.length;
  const ratio = Math.min(1, depth / 3);

  const choose = (nextId: string) => {
    setHistory((h) => [...h, currentId]);
    setCurrentId(nextId);
  };

  const back = () => {
    if (history.length === 0) {
      nav.goBack();
      return;
    }
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(prev);
  };

  const reset = () => {
    setHistory([]);
    setCurrentId(decisionRootId);
  };

  return (
    <Screen scroll={false}>
      <View style={styles.pad}>
        <Header title="تحديد المسار" subtitle="أسئلة قصيرة لإرشادك" onBack={back} />

        <View style={styles.progressWrap}>
          <ProgressBar ratio={isResult ? 1 : ratio} tone={palette.cedar} />
        </View>

        <Animated.View
          key={currentId}
          entering={FadeIn.duration(motion.duration.base)}
          exiting={FadeOut.duration(motion.duration.fast)}
          style={styles.card}
        >
          {isResult ? (
            <ResultView nodeScenario={node.scenario!} prompt={node.prompt} hint={node.hint} onOpen={() => nav.navigate('Workflow', { scenarioId: node.scenario! })} />
          ) : (
            <View style={styles.qWrap}>
              <View style={styles.qIcon}>
                <Icon name="decision" size={24} color={palette.cedar} />
              </View>
              <AppText variant="h1" center>
                {node.prompt}
              </AppText>
              {node.hint && (
                <AppText variant="small" color={palette.slateMuted} center>
                  {node.hint}
                </AppText>
              )}
              <View style={styles.options}>
                {node.options!.map((opt) => (
                  <PressableScale key={opt.next} onPress={() => choose(opt.next)} activeScale={0.98}>
                    <View style={styles.option}>
                      <AppText variant="bodyStrong" style={styles.flex}>
                        {opt.label}
                      </AppText>
                      <Icon name="chevron-end" size={20} color={palette.slateFaint} />
                    </View>
                  </PressableScale>
                ))}
              </View>
            </View>
          )}
        </Animated.View>

        {depth > 0 && (
          <PressableScale onPress={reset} activeScale={0.96} style={styles.reset}>
            <Icon name="back" size={16} color={palette.slateMuted} />
            <AppText variant="small" color={palette.slateMuted}>
              البدء من جديد
            </AppText>
          </PressableScale>
        )}
      </View>
    </Screen>
  );
}

function ResultView({
  nodeScenario,
  prompt,
  hint,
  onOpen,
}: {
  nodeScenario: string;
  prompt: string;
  hint?: string;
  onOpen: () => void;
}) {
  const scenario = scenarioById(nodeScenario);
  const accent = scenario ? states[scenario.accent] : states.completed;
  return (
    <View style={styles.resultWrap}>
      <View style={[styles.resultIllu, { backgroundColor: accent.soft }]}>
        <Illustration name={scenario?.illustration ?? 'path'} size={120} tone={accent.tone} />
      </View>
      <AppText variant="caption" color={accent.tone} center>
        المسار المناسب لحالتك
      </AppText>
      <AppText variant="h1" center>
        {prompt}
      </AppText>
      {hint && (
        <AppText variant="small" color={palette.slateMuted} center>
          {hint}
        </AppText>
      )}
      <View style={styles.openBtn}>
        <Button label="افتح هذا المسار" icon="arrowNext" onPress={onOpen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.sm },
  progressWrap: { marginBottom: spacing.xl },
  card: { flex: 1, justifyContent: 'center' },
  qWrap: { gap: spacing.md, alignItems: 'center' },
  qIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: palette.cedarSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  options: { width: '100%', gap: spacing.sm, marginTop: spacing.lg },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.paper,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.hairline,
    padding: spacing.lg,
  },
  flex: { flex: 1 },
  resultWrap: { alignItems: 'center', gap: spacing.sm },
  resultIllu: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  openBtn: { width: '100%', marginTop: spacing.xl },
  reset: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  },
});
