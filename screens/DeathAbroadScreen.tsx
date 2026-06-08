import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  SectionHeader,
  Card,
  AppText,
  CalmInfoBanner,
  DocumentPanel,
  Button,
  QuickActionButton,
} from '@/components';
import { spacing, palette } from '@/theme';
import { documentById } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

const docs = ['foreign-death-cert', 'consular-registration'];

/** Dedicated page: death occurring outside Morocco (Moroccan citizen). */
export function DeathAbroadScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="وفاة خارج المغرب" subtitle="مسار خاص لمواطن مغربي" onBack={() => nav.goBack()} />

      <View style={styles.block}>
        <CalmInfoBanner message="عند وفاة مواطن مغربي بالخارج، يوجد مسار خاص للتسجيل عبر القنصلية، يختلف عن الوفاة داخل المغرب." />
      </View>

      <View style={styles.block}>
        <SectionHeader title="اختياران أساسيان" icon="decision" />
        <View style={styles.duo}>
          <Card style={styles.half} tone={palette.brass}>
            <AppText variant="bodyStrong">الدفن في الخارج</AppText>
            <AppText variant="small" color={palette.slateMuted}>يتم الدفن في بلد الوفاة وفق إجراءاته، مع تسجيل الوفاة قنصليًا.</AppText>
          </Card>
          <Card style={styles.half} tone={palette.cedar}>
            <AppText variant="bodyStrong">النقل إلى المغرب</AppText>
            <AppText variant="small" color={palette.slateMuted}>ينقل الجثمان إلى المغرب للدفن، عبر مسطرة قنصلية خاصة.</AppText>
          </Card>
        </View>
      </View>

      <View style={styles.block}>
        <SectionHeader title="أهمية وثائق الوفاة بالخارج" icon="globe" />
        <Card>
          <AppText variant="small" color={palette.slateMuted}>
            وثيقة الوفاة الصادرة عن بلد الوفاة هي الأساس. قد تحتاج إلى ترجمة وتصديق، وتُعتمد لاحقًا في التسجيل القنصلي والتضمين بالحالة المدنية بالمغرب.
          </AppText>
        </Card>
      </View>

      <View style={styles.block}>
        <SectionHeader title="الوثائق الأساسية" icon="documents" />
        <View style={styles.gap}>
          {docs.map((id) => {
            const d = documentById(id);
            return d ? <DocumentPanel key={id} doc={d} /> : null;
          })}
        </View>
      </View>

      <View style={styles.block}>
        <QuickActionButton
          icon="plane-arrival"
          title="إن اخترت النقل إلى المغرب"
          subtitle="انتقل إلى مسار دخول الجثمان من الخارج"
          state="abroad"
          onPress={() => nav.navigate('FromAbroad')}
        />
      </View>

      <Button label="افتح مسار التسجيل" icon="arrowNext" onPress={() => nav.navigate('Workflow', { scenarioId: 'registerAbroad' })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
  duo: { flexDirection: 'row', gap: spacing.sm },
  half: { flex: 1, gap: spacing.xs },
  gap: { gap: spacing.sm },
});
