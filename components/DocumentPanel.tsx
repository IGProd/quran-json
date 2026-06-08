import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { StatusBadge } from './StatusBadge';
import { AccordionSection } from './AccordionSection';
import { palette, spacing, states } from '@/theme';
import { stageLabels as stageLabelMap } from '@/content/documents';
import type { DocumentItem } from '@/content';

/**
 * Expandable document detail: name + necessity badge in the header, and on
 * expand the practical facts — when needed, who issues it, its stage, and a
 * short note.
 */
export function DocumentPanel({ doc }: { doc: DocumentItem }) {
  const tone = doc.necessity === 'essential' ? states.required : states.warning;

  return (
    <AccordionSection
      title={doc.name}
      subtitle={stageLabelMap[doc.stage]}
      tone={tone.tone}
      leading={
        <View style={[styles.iconWrap, { backgroundColor: tone.soft }]}>
          <Icon name={doc.icon as IconName} size={18} color={tone.tone} />
        </View>
      }
    >
      <View style={styles.badgeRow}>
        <StatusBadge
          state={doc.necessity === 'essential' ? 'required' : 'warning'}
          label={doc.necessity === 'essential' ? 'أساسية' : 'حسب الحالة'}
        />
      </View>
      <Detail icon="clock" label="متى تُطلب" value={doc.whenNeeded} />
      <Detail icon="authorities" label="من يسلّمها" value={doc.issuedBy} />
      <Detail icon="info" label="ملاحظة" value={doc.note} />
    </AccordionSection>
  );
}

function Detail({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View style={styles.detail}>
      <Icon name={icon} size={16} color={palette.slateFaint} />
      <View style={styles.detailText}>
        <AppText variant="caption" color={palette.slateFaint}>
          {label}
        </AppText>
        <AppText variant="small">{value}</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeRow: { flexDirection: 'row', marginBottom: spacing.xs },
  detail: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  detailText: { flex: 1, gap: 1 },
});
