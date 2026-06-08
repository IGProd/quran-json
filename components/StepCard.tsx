import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { StatusBadge } from './StatusBadge';
import { DocumentChip } from './DocumentChip';
import { CompletionToggle } from './CompletionToggle';
import { WarningBanner } from './Banners';
import { palette, radius, spacing, states } from '@/theme';
import { documentById } from '@/content';
import type { WorkflowStep } from '@/content';

/**
 * A single guided step. Shows the short summary, why it matters, what to do
 * now, the documents needed, who handles it, what comes next, any dependency
 * warning, and the completion toggle.
 */
export function StepCard({
  step,
  completed,
  onToggle,
  onDocPress,
}: {
  step: WorkflowStep;
  completed: boolean;
  onToggle: () => void;
  onDocPress?: (docId: string) => void;
}) {
  const docs = step.documents.map(documentById).filter(Boolean);

  return (
    <View style={[styles.card, completed && styles.cardDone]}>
      <View style={styles.header}>
        <AppText variant="h3" style={styles.title}>
          {step.title}
        </AppText>
      </View>

      <View style={styles.badges}>
        {step.badges.map((b) => (
          <StatusBadge key={b} badge={b} />
        ))}
      </View>

      <AppText variant="body" color={palette.slateMuted}>
        {step.summary}
      </AppText>

      <View style={styles.whyRow}>
        <Icon name="info" size={16} color={states.info.tone} />
        <AppText variant="small" color={states.info.tone} style={styles.flex}>
          {step.why}
        </AppText>
      </View>

      <Row icon="start" label="ماذا تفعل الآن" value={step.doNow} />
      <Row icon="authorities" label="من يتولاها" value={step.handledBy} />

      {docs.length > 0 && (
        <View style={styles.docsBlock}>
          <View style={styles.rowHead}>
            <Icon name="documents" size={16} color={palette.slateFaint} />
            <AppText variant="caption" color={palette.slateFaint}>
              ما تحتاجه
            </AppText>
          </View>
          <View style={styles.chips}>
            {docs.map((d) => (
              <DocumentChip key={d!.id} doc={d!} onPress={onDocPress ? () => onDocPress(d!.id) : undefined} />
            ))}
          </View>
        </View>
      )}

      <Row icon="arrowNext" label="ما يأتي بعد ذلك" value={step.next} />

      {step.dependsOn && (
        <WarningBanner message={step.dependsOn} title="يتوقف على جهة أخرى" />
      )}

      <CompletionToggle completed={completed} onToggle={onToggle} />
    </View>
  );
}

function Row({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowHead}>
        <Icon name={icon} size={16} color={palette.slateFaint} />
        <AppText variant="caption" color={palette.slateFaint}>
          {label}
        </AppText>
      </View>
      <AppText variant="small">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.paper,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.hairline,
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardDone: { borderColor: states.completed.line, backgroundColor: '#FBFCFA' },
  header: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  whyRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    backgroundColor: states.info.soft,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  flex: { flex: 1 },
  row: { gap: 4 },
  rowHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  docsBlock: { gap: spacing.sm },
  chips: { gap: spacing.sm },
});
