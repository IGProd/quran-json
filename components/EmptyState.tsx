import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Illustration } from './Illustration';
import { palette, spacing } from '@/theme';
import type { IllustrationKey } from '@/content';

/** Elegant empty state — calm illustration + short reassuring copy. */
export function EmptyState({
  illustration = 'path',
  title,
  message,
}: {
  illustration?: IllustrationKey;
  title: string;
  message?: string;
}) {
  return (
    <View style={styles.wrap}>
      <Illustration name={illustration} size={140} tone={palette.oliveSoft} />
      <AppText variant="h3" center>
        {title}
      </AppText>
      {message && (
        <AppText variant="small" color={palette.slateMuted} center>
          {message}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xxxl },
});
