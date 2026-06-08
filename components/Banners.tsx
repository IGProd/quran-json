import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon, type IconName } from './Icon';
import { states, type StateKey, radius, spacing } from '@/theme';

interface BannerProps {
  title?: string;
  message: string;
  state: StateKey;
  icon: IconName;
}

/** Generic soft banner used by the calm/warning variants below. */
function Banner({ title, message, state, icon }: BannerProps) {
  const s = states[state];
  return (
    <View style={[styles.wrap, { backgroundColor: s.soft, borderColor: s.line }]}>
      <Icon name={icon} size={20} color={s.tone} />
      <View style={styles.body}>
        {title && (
          <AppText variant="bodyStrong" color={s.tone}>
            {title}
          </AppText>
        )}
        <AppText variant="small" color={s.tone}>
          {message}
        </AppText>
      </View>
    </View>
  );
}

/** Reassuring, low-urgency information. */
export function CalmInfoBanner({ title, message }: { title?: string; message: string }) {
  return <Banner state="info" icon="info" title={title} message={message} />;
}

/** A caution that something depends on a condition or another authority. */
export function WarningBanner({
  title,
  message,
  urgent,
}: {
  title?: string;
  message: string;
  urgent?: boolean;
}) {
  return (
    <Banner
      state={urgent ? 'urgent' : 'warning'}
      icon="alert"
      title={title}
      message={message}
    />
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  body: { flex: 1, gap: 2 },
});
