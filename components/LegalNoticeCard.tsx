import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { Icon } from './Icon';
import { palette, radius, spacing } from '@/theme';

/**
 * Respectful legal/usage notice. Reminds the family this is a simplified guide
 * and that the competent local authority is always the reference.
 */
export function LegalNoticeCard() {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Icon name="shield-check" size={20} color={palette.cedar} />
        <AppText variant="bodyStrong" color={palette.cedar}>
          ملاحظة مهمة
        </AppText>
      </View>
      <AppText variant="small" color={palette.slateMuted}>
        هذا التطبيق دليل مبسّط يساعدك على الفهم والتنظيم في وقت صعب. وهو ليس وثيقة رسمية ولا يغني عن الجهات المختصة.
      </AppText>
      <AppText variant="small" color={palette.slateMuted}>
        قد تختلف بعض الشروط أو الوثائق حسب المدينة أو الحالة. تحقّق دائمًا من السلطة المحلية أو الجهة المعنية للحصول على المعلومة المحدّثة.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.cedarSoft,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#D6E0D6',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
