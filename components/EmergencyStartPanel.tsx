import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon, type IconName } from './Icon';
import { palette, radius, spacing, states } from '@/theme';
import type { ScenarioId } from '@/content';

interface Choice {
  id: ScenarioId;
  label: string;
  icon: IconName;
}

const choices: Choice[] = [
  { id: 'home', label: 'وفاة في البيت', icon: 'home' },
  { id: 'hospital', label: 'وفاة في المستشفى', icon: 'hospital' },
  { id: 'judicial', label: 'وفاة غير طبيعية', icon: 'scale' },
];

/**
 * Calm emergency starter. Three large, unmistakable choices that route the
 * family straight into the right workflow. Tone is steady, never alarming.
 */
export function EmergencyStartPanel({ onSelect }: { onSelect: (id: ScenarioId) => void }) {
  return (
    <View style={styles.panel}>
      <AppText variant="h3" color={palette.white}>
        ابدأ من هنا
      </AppText>
      <AppText variant="small" color="rgba(255,255,255,0.82)">
        اختر ما يناسب حالتك، وسنرشدك خطوة بخطوة.
      </AppText>
      <View style={styles.choices}>
        {choices.map((c) => (
          <PressableScale key={c.id} onPress={() => onSelect(c.id)} activeScale={0.97} style={styles.choiceWrap}>
            <View style={styles.choice}>
              <View style={styles.iconWrap}>
                <Icon name={c.icon} size={24} color={palette.cedar} />
              </View>
              <AppText variant="bodyStrong" center>
                {c.label}
              </AppText>
            </View>
          </PressableScale>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: palette.cedar,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  choices: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  choiceWrap: { flex: 1 },
  choice: {
    backgroundColor: palette.paper,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
    alignItems: 'center',
    minHeight: 108,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: states.completed.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
