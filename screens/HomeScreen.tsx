import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  Screen,
  AppText,
  SectionHeader,
  ScenarioCard,
  QuickActionButton,
  EmergencyStartPanel,
  ChecklistCard,
  CalmInfoBanner,
  PressableScale,
  Icon,
  type ChecklistItem,
} from '@/components';
import { Logo } from '@/components/decor/Logo';
import { palette, spacing, motion } from '@/theme';
import { scenarios, documents, type ScenarioId } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** Featured scenarios shown on the home surface. */
const FEATURED: ScenarioId[] = ['home', 'hospital', 'otherCity', 'fromAbroad'];

export function HomeScreen() {
  const nav = useAppNavigation();

  const essentialDocs: ChecklistItem[] = documents
    .filter((d) => d.necessity === 'essential')
    .map((d) => ({ id: d.id, label: d.name, hint: d.whenNeeded, icon: d.icon as never }));

  const goWorkflow = (id: ScenarioId) => nav.navigate('Workflow', { scenarioId: id });

  return (
    <Screen>
      {/* Top brand bar */}
      <View style={styles.bar}>
        <View style={styles.brand}>
          <Logo size={42} />
          <View>
            <AppText variant="h3">دليل إجراءات الوفاة</AppText>
            <AppText variant="caption" color={palette.slateFaint}>
              مرشد هادئ، خطوة بخطوة
            </AppText>
          </View>
        </View>
        <PressableScale onPress={() => nav.navigate('Settings')} activeScale={0.9} style={styles.gear}>
          <Icon name="settings" size={20} color={palette.slateMuted} />
        </PressableScale>
      </View>

      {/* Main question + emergency start */}
      <Animated.View entering={FadeInDown.duration(motion.duration.base)} style={styles.block}>
        <AppText variant="h1">ما هي حالتك؟</AppText>
        <AppText variant="small" color={palette.slateMuted}>
          اختر ما يناسب وضعك وسنرشدك إلى المسار الصحيح بهدوء.
        </AppText>
        <View style={{ height: spacing.md }} />
        <EmergencyStartPanel onSelect={goWorkflow} />
      </Animated.View>

      {/* Primary entries */}
      <View style={[styles.block, styles.gapSm]}>
        <QuickActionButton
          icon="decision"
          title="لست متأكدًا من حالتي"
          subtitle="أجب عن أسئلة قصيرة لتحديد المسار"
          state="info"
          onPress={() => nav.navigate('DecisionTree')}
        />
        <View style={styles.grid}>
          <View style={styles.col}>
            <QuickActionButton icon="workflows" title="كل المسارات" state="completed" onPress={() => nav.navigate('Main', { screen: 'Scenarios' })} />
          </View>
          <View style={styles.col}>
            <QuickActionButton icon="documents" title="الوثائق" state="required" onPress={() => nav.navigate('Documents')} />
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.col}>
            <QuickActionButton icon="authorities" title="من يتولى ماذا" state="transfer" onPress={() => nav.navigate('Authorities')} />
          </View>
          <View style={styles.col}>
            <QuickActionButton icon="faq" title="أسئلة شائعة" state="warning" onPress={() => nav.navigate('Faq')} />
          </View>
        </View>
      </View>

      {/* First steps now */}
      <View style={styles.block}>
        <SectionHeader title="أول خطوة الآن" subtitle="ما الذي تبدأ به فورًا" icon="start" />
        <QuickActionButton
          icon="start"
          title="ابدأ الآن"
          subtitle="إرشاد سريع وهادئ للساعة الأولى"
          variant="solid"
          onPress={() => nav.navigate('StartNow')}
        />
      </View>

      {/* All workflows preview */}
      <View style={styles.block}>
        <SectionHeader title="المسارات الأكثر طلبًا" subtitle="اختر حالتك لعرض الخطوات" icon="workflows" />
        {FEATURED.map((id) => {
          const sc = scenarios.find((s) => s.id === id)!;
          return <ScenarioCard key={id} scenario={sc} onPress={() => goWorkflow(id)} />;
        })}
        <PressableScale onPress={() => nav.navigate('Main', { screen: 'Scenarios' })} activeScale={0.98} style={styles.seeAll}>
          <AppText variant="bodyStrong" color={palette.cedar}>
            عرض كل الحالات
          </AppText>
          <Icon name="chevron-end" size={18} color={palette.cedar} />
        </PressableScale>
      </View>

      {/* Don't forget these documents */}
      <View style={styles.block}>
        <SectionHeader title="لا تنسَ هذه الوثائق" subtitle="وثائق أساسية يُحتاج إليها غالبًا" icon="documents" />
        <ChecklistCard title="وثائق أساسية" items={essentialDocs} />
      </View>

      {/* When extra authorization is needed */}
      <View style={styles.block}>
        <SectionHeader title="متى تلزم رُخص إضافية" subtitle="حالات تحتاج إذنًا خاصًا" icon="alert" />
        <View style={styles.gapSm}>
          <PressableScale onPress={() => nav.navigate('Transfer')} activeScale={0.99}>
            <CalmInfoBanner title="نقل الجثمان إلى مدينة أخرى" message="قد تحتاج إلى رخصة نقل الجثمان. اضغط لمعرفة التفاصيل." />
          </PressableScale>
          <PressableScale onPress={() => nav.navigate('Judicial')} activeScale={0.99}>
            <CalmInfoBanner title="وفاة غير طبيعية" message="قد يلزم إذن النيابة العامة قبل الدفن. اضغط للتفاصيل." />
          </PressableScale>
          <PressableScale onPress={() => nav.navigate('FromAbroad')} activeScale={0.99}>
            <CalmInfoBanner title="جثمان قادم من الخارج" message="تتدخل القنصلية وتُطلب وثائق خاصة. اضغط للتفاصيل." />
          </PressableScale>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  gear: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: palette.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: { marginBottom: spacing.xxl },
  gapSm: { gap: spacing.sm },
  grid: { flexDirection: 'row', gap: spacing.sm },
  col: { flex: 1 },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
});
