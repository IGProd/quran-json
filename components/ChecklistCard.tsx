import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { PressableScale } from './PressableScale';
import { Icon, type IconName } from './Icon';
import { palette, radius, spacing, states } from '@/theme';

export interface ChecklistItem {
  id: string;
  label: string;
  hint?: string;
  icon?: IconName;
}

/**
 * A self-contained checklist. Items toggle locally with a calm check fill —
 * a quick "what to prepare" organiser the family can tick off as they gather
 * documents. State is intentionally local (a scratch list, not saved progress).
 */
export function ChecklistCard({
  title,
  items,
}: {
  title: string;
  items: ChecklistItem[];
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const doneCount = items.filter((i) => checked[i.id]).length;

  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <AppText variant="h3">{title}</AppText>
        <AppText variant="caption" color={palette.slateFaint}>
          {doneCount} / {items.length}
        </AppText>
      </View>
      <View style={styles.list}>
        {items.map((item) => {
          const isOn = Boolean(checked[item.id]);
          return (
            <PressableScale
              key={item.id}
              activeScale={0.99}
              onPress={() => setChecked((p) => ({ ...p, [item.id]: !p[item.id] }))}
            >
              <View style={styles.row}>
                <View
                  style={[
                    styles.box,
                    {
                      borderColor: isOn ? states.completed.tone : palette.hairline,
                      backgroundColor: isOn ? states.completed.tone : 'transparent',
                    },
                  ]}
                >
                  {isOn && <Icon name="check" size={14} color={palette.white} />}
                </View>
                {item.icon && <Icon name={item.icon} size={18} color={palette.slateMuted} />}
                <View style={styles.flex}>
                  <AppText
                    variant="small"
                    color={isOn ? palette.slateFaint : palette.slate}
                    style={isOn ? styles.struck : undefined}
                  >
                    {item.label}
                  </AppText>
                  {item.hint && (
                    <AppText variant="caption" color={palette.slateFaint}>
                      {item.hint}
                    </AppText>
                  )}
                </View>
              </View>
            </PressableScale>
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
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  list: { gap: spacing.xs },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  struck: { textDecorationLine: 'line-through' },
});
