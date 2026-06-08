import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Screen,
  Header,
  SectionHeader,
  EmergencyStartPanel,
  ChecklistCard,
  CalmInfoBanner,
  QuickActionButton,
  type ChecklistItem,
} from '@/components';
import { spacing } from '@/theme';
import type { ScenarioId } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

const firstHour: ChecklistItem[] = [
  { id: 'h1', label: 'التأكد من الوفاة عبر طبيب أو المؤسسة الصحية', icon: 'stethoscope' },
  { id: 'h2', label: 'الحصول على الشهادة الطبية لإثبات الوفاة', icon: 'file-stamp' },
  { id: 'h3', label: 'تحضير بطاقة تعريف المُصرّح وبطاقة المتوفى', icon: 'id-card' },
  { id: 'h4', label: 'إحضار دفتر الحالة المدنية إن كان متوفرًا', icon: 'book' },
  { id: 'h5', label: 'تحديد مكان الدفن لمعرفة إن كان يلزم نقل', icon: 'pin' },
];

const prepare: ChecklistItem[] = [
  { id: 'p1', label: 'تجهيز نسخ من وثائق الهوية', icon: 'id-card' },
  { id: 'p2', label: 'معرفة مكتب الحالة المدنية لمكان الوفاة', icon: 'building' },
  { id: 'p3', label: 'تحديد من سيتولى التصريح من الأقارب', icon: 'users' },
];

/** Calm, emergency-style guidance for the first hour, then route to a path. */
export function StartNowScreen() {
  const nav = useAppNavigation();
  const go = (id: ScenarioId) => nav.navigate('Workflow', { scenarioId: id });

  return (
    <Screen>
      <Header title="ابدأ الآن" subtitle="إرشاد هادئ للساعة الأولى" onBack={() => nav.goBack()} />

      <View style={styles.block}>
        <CalmInfoBanner
          title="خذ نفسًا"
          message="الأمور تسير خطوة بخطوة. ابدأ بما هو أمامك الآن، وسنرشدك إلى ما بعده."
        />
      </View>

      <View style={styles.block}>
        <SectionHeader title="حدّد حالتك" subtitle="اختر لتعرف مسارك بدقة" icon="decision" />
        <EmergencyStartPanel onSelect={go} />
      </View>

      <View style={styles.block}>
        <SectionHeader title="في الساعة الأولى" subtitle="ما الذي تفعله فورًا" icon="clock" />
        <ChecklistCard title="خطوات فورية" items={firstHour} />
      </View>

      <View style={styles.block}>
        <SectionHeader title="قبل التوجه للإدارة" subtitle="ما الذي تجهّزه" icon="documents" />
        <ChecklistCard title="تحضيرات" items={prepare} />
      </View>

      <View style={styles.block}>
        <QuickActionButton
          icon="decision"
          title="لست متأكدًا من المسار؟"
          subtitle="أجب عن أسئلة قصيرة"
          state="info"
          onPress={() => nav.navigate('DecisionTree')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
});
