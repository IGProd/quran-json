import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  SectionHeader,
  TransferMapCard,
  DocumentPanel,
  WarningBanner,
  CalmInfoBanner,
  Button,
  AppText,
  Card,
  type JourneyPoint,
} from '@/components';
import { spacing, palette } from '@/theme';
import { documentById } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

const journey: JourneyPoint[] = [
  { label: 'مكان الوفاة', hint: 'تبدأ المسطرة من هنا', icon: 'pin' },
  { label: 'رخصة نقل الجثمان', hint: 'من السلطة المحلية', icon: 'truck' },
  { label: 'مدينة الدفن', hint: 'متابعة الدفن عند الوصول', icon: 'gate' },
];

const transferDocs = ['transfer-permit', 'death-record', 'burial-permit'];

/** Dedicated page: transfer & burial in another city. */
export function TransferScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="النقل إلى مدينة أخرى" subtitle="ما الذي يتغيّر عند نقل الجثمان" onBack={() => nav.goBack()} />

      <View style={styles.block}>
        <CalmInfoBanner message="عندما يكون الدفن في غير مدينة الوفاة، تُضاف مسطرة نقل الجثمان إلى الخطوات المعتادة." />
      </View>

      <View style={styles.block}>
        <SectionHeader title="نفس المدينة أم مدينة أخرى؟" icon="decision" />
        <View style={styles.duo}>
          <Card style={styles.half}>
            <AppText variant="bodyStrong" color={palette.cedar}>نفس المدينة</AppText>
            <AppText variant="small" color={palette.slateMuted}>لا يلزم إذن نقل. تكفي رخصة الدفن المحلية.</AppText>
          </Card>
          <Card style={styles.half}>
            <AppText variant="bodyStrong" color={palette.brass}>مدينة أخرى</AppText>
            <AppText variant="small" color={palette.slateMuted}>تُطلب رخصة نقل الجثمان قبل المغادرة.</AppText>
          </Card>
        </View>
      </View>

      <View style={styles.block}>
        <SectionHeader title="رحلة النقل" subtitle="من مكان الوفاة إلى مكان الدفن" icon="route" />
        <TransferMapCard points={journey} />
      </View>

      <View style={styles.block}>
        <WarningBanner
          title="من أين تبدأ؟"
          message="تبدأ مسطرة رخصة النقل عادةً من السلطة المحلية لمكان الوفاة، قبل الانتقال إلى مدينة الدفن."
        />
      </View>

      <View style={styles.block}>
        <SectionHeader title="وثائق النقل" subtitle="ما يُطلب في هذا المسار" icon="documents" />
        <View style={styles.gap}>
          {transferDocs.map((id) => {
            const d = documentById(id);
            return d ? <DocumentPanel key={id} doc={d} /> : null;
          })}
        </View>
      </View>

      <Button label="افتح مسار النقل الكامل" icon="arrowNext" onPress={() => nav.navigate('Workflow', { scenarioId: 'otherCity' })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
  duo: { flexDirection: 'row', gap: spacing.sm },
  half: { flex: 1, gap: spacing.xs },
  gap: { gap: spacing.sm },
});
