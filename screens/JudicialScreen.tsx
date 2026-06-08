import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  SectionHeader,
  Card,
  AppText,
  Icon,
  WarningBanner,
  CalmInfoBanner,
  DocumentPanel,
  Button,
} from '@/components';
import { spacing, palette, states, radius } from '@/theme';
import { documentById } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

const docs = ['prosecutor-permit', 'autopsy-report'];

const gatedSteps = [
  { label: 'إخبار السلطات بظروف الوفاة', locked: false },
  { label: 'تدخّل النيابة العامة والمعاينة', locked: true },
  { label: 'إذن النيابة العامة بالدفن', locked: true },
  { label: 'التسجيل ثم الدفن', locked: true },
];

/** Dedicated page: unusual / judicial death — respectful and clear. */
export function JudicialScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="وفاة غير طبيعية" subtitle="مسار مختلف يحتاج تدخّل القضاء" onBack={() => nav.goBack()} />

      <View style={styles.block}>
        <CalmInfoBanner
          title="هذا المسار ليس كالوفاة الطبيعية"
          message="في الظروف غير الطبيعية أو المشتبه فيها، تختلف الخطوات، وقد تحتاج العائلة إلى الانتظار قبل متابعة الدفن."
        />
      </View>

      <View style={styles.block}>
        <SectionHeader title="لماذا قد يتأخر الدفن" icon="clock" />
        <Card>
          <AppText variant="small" color={palette.slateMuted}>
            تتثبّت النيابة العامة من ظروف الوفاة، وقد تأمر بمعاينة أو خبرة طبية. هذا الإجراء لحماية الحقوق، ولا يمكن متابعة الدفن قبل الحصول على إذنها.
          </AppText>
        </Card>
      </View>

      <View style={styles.block}>
        <SectionHeader title="الخطوات بترتيبها" subtitle="بعض المراحل مرهونة بإذن قضائي" icon="lock" />
        <Card padded={false} style={styles.gated}>
          {gatedSteps.map((s, i) => {
            const last = i === gatedSteps.length - 1;
            return (
              <View key={i} style={[styles.gateRow, !last && styles.gateBorder]}>
                <View style={[styles.gateIcon, { backgroundColor: s.locked ? states.judicial.soft : states.urgent.soft }]}>
                  <Icon name={s.locked ? 'lock' : 'alert'} size={16} color={s.locked ? states.judicial.tone : states.urgent.tone} />
                </View>
                <AppText variant="small" style={styles.flex}>
                  {s.label}
                </AppText>
                {s.locked && (
                  <AppText variant="caption" color={states.judicial.tone}>
                    مرهون بالإذن
                  </AppText>
                )}
              </View>
            );
          })}
        </Card>
      </View>

      <View style={styles.block}>
        <WarningBanner message="لا تُتخذ خطوات الدفن قبل تدخّل النيابة العامة في هذه الحالات." />
      </View>

      <View style={styles.block}>
        <SectionHeader title="الوثائق القضائية" icon="documents" />
        <View style={styles.gap}>
          {docs.map((id) => {
            const d = documentById(id);
            return d ? <DocumentPanel key={id} doc={d} /> : null;
          })}
        </View>
      </View>

      <Button label="افتح المسار القضائي الكامل" icon="arrowNext" onPress={() => nav.navigate('Workflow', { scenarioId: 'judicial' })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
  gap: { gap: spacing.sm },
  flex: { flex: 1 },
  gated: { borderRadius: radius.lg },
  gateRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg },
  gateBorder: { borderBottomWidth: 1, borderBottomColor: palette.hairline },
  gateIcon: { width: 30, height: 30, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
});
