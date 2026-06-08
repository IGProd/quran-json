import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { Illustration } from './Illustration';
import { palette, radius, spacing, states } from '@/theme';
import type { IllustrationKey } from '@/content';

export interface JourneyPoint {
  label: string;
  hint?: string;
  icon: IconName;
}

/**
 * Visual journey map: a calm illustration plus a dotted path of labelled
 * waypoints (e.g. place of death → crossing → place of burial). Used on the
 * transfer / from-abroad / abroad pages.
 */
export function TransferMapCard({
  illustration = 'map',
  points,
  tone = states.transfer.tone,
}: {
  illustration?: IllustrationKey;
  points: JourneyPoint[];
  tone?: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.illuWrap}>
        <Illustration name={illustration} size={120} tone={tone} />
      </View>
      <View style={styles.points}>
        {points.map((p, i) => {
          const last = i === points.length - 1;
          return (
            <View key={i} style={styles.pointRow}>
              <View style={styles.rail}>
                <View style={[styles.dot, { borderColor: tone, backgroundColor: palette.paper }]}>
                  <Icon name={p.icon} size={14} color={tone} />
                </View>
                {!last && <View style={styles.dottedLine} />}
              </View>
              <View style={styles.pointText}>
                <AppText variant="bodyStrong">{p.label}</AppText>
                {p.hint && (
                  <AppText variant="caption" color={palette.slateFaint}>
                    {p.hint}
                  </AppText>
                )}
              </View>
            </View>
          );
        })}
      </View>
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
  illuWrap: { alignItems: 'center' },
  points: { gap: 0 },
  pointRow: { flexDirection: 'row', gap: spacing.md },
  rail: { width: 30, alignItems: 'center' },
  dot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dottedLine: {
    flex: 1,
    width: 2,
    minHeight: 22,
    marginVertical: 2,
    borderRadius: 1,
    borderLeftWidth: 2,
    borderColor: palette.hairline,
    borderStyle: 'dashed',
  },
  pointText: { flex: 1, paddingTop: 4, paddingBottom: spacing.md },
});
