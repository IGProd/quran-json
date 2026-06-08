import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  SectionHeader,
  TransferMapCard,
  DocumentPanel,
  CalmInfoBanner,
  WarningBanner,
  Button,
  type JourneyPoint,
} from '@/components';
import { spacing } from '@/theme';
import { documentById } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

const journey: JourneyPoint[] = [
  { label: 'بلد الوفاة', hint: 'وثيقة الوفاة الصادرة بالخارج', icon: 'globe' },
  { label: 'القنصلية المغربية', hint: 'تجهيز وثائق النقل', icon: 'building' },
  { label: 'العبور الدولي', hint: 'بجواز مرور الجثمان', icon: 'plane-arrival' },
  { label: 'الدفن في المغرب', hint: 'متابعة الإجراءات الداخلية', icon: 'gate' },
];

const docs = ['foreign-death-cert', 'consular-transport', 'non-contagion', 'coffin-record', 'mortuary-pass'];

/** Dedicated page: body entering Morocco from abroad. */
export function FromAbroadScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="جثمان قادم من الخارج" subtitle="من بلد الوفاة إلى الدفن في المغرب" onBack={() => nav.goBack()} />

      <View style={styles.block}>
        <CalmInfoBanner message="عند دخول الجثمان إلى المغرب، تتولى القنصلية المغربية مرافقة المسطرة وتجهيز الوثائق اللازمة." />
      </View>

      <View style={styles.block}>
        <SectionHeader title="خريطة الرحلة" subtitle="مسار واضح حتى الدفن" icon="route" />
        <TransferMapCard illustration="arrival" points={journey} />
      </View>

      <View style={styles.block}>
        <WarningBanner
          title="وثائق صحية ضرورية"
          message="يتطلب النقل الدولي شهادة عدم العدوى ومحضر وضع الجثمان في التابوت قبل العبور."
        />
      </View>

      <View style={styles.block}>
        <SectionHeader title="الوثائق القنصلية والصحية" subtitle="ما يُجهَّز قبل وأثناء النقل" icon="documents" />
        <View style={styles.gap}>
          {docs.map((id) => {
            const d = documentById(id);
            return d ? <DocumentPanel key={id} doc={d} /> : null;
          })}
        </View>
      </View>

      <Button label="افتح المسار الكامل" icon="arrowNext" onPress={() => nav.navigate('Workflow', { scenarioId: 'fromAbroad' })} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
  gap: { gap: spacing.sm },
});
