import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Header, QuickActionButton, SectionHeader, LegalNoticeCard } from '@/components';
import { spacing } from '@/theme';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** Hub of remaining destinations: guidance pages, roles, FAQ, sources. */
export function MoreScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="المزيد" subtitle="كل الأدلة والصفحات" />

      <View style={styles.block}>
        <SectionHeader title="الإرشاد السريع" icon="start" />
        <View style={styles.gap}>
          <QuickActionButton icon="start" title="ابدأ الآن" subtitle="إرشاد الساعة الأولى" state="urgent" onPress={() => nav.navigate('StartNow')} />
          <QuickActionButton icon="decision" title="تحديد المسار" subtitle="أسئلة قصيرة" state="info" onPress={() => nav.navigate('DecisionTree')} />
        </View>
      </View>

      <View style={styles.block}>
        <SectionHeader title="حالات خاصة" icon="alert" />
        <View style={styles.gap}>
          <QuickActionButton icon="truck" title="النقل إلى مدينة أخرى" state="transfer" onPress={() => nav.navigate('Transfer')} />
          <QuickActionButton icon="plane-arrival" title="جثمان قادم من الخارج" state="abroad" onPress={() => nav.navigate('FromAbroad')} />
          <QuickActionButton icon="globe" title="وفاة خارج المغرب" state="abroad" onPress={() => nav.navigate('DeathAbroad')} />
          <QuickActionButton icon="scale" title="وفاة غير طبيعية" state="judicial" onPress={() => nav.navigate('Judicial')} />
        </View>
      </View>

      <View style={styles.block}>
        <SectionHeader title="مراجع ومساعدة" icon="sources" />
        <View style={styles.gap}>
          <QuickActionButton icon="authorities" title="من يتولى ماذا" state="completed" onPress={() => nav.navigate('Authorities')} />
          <QuickActionButton icon="faq" title="أسئلة شائعة" state="warning" onPress={() => nav.navigate('Faq')} />
          <QuickActionButton icon="sources" title="المصادر والإشعار" state="completed" onPress={() => nav.navigate('Sources')} />
          <QuickActionButton icon="settings" title="الإعدادات" state="neutral" onPress={() => nav.navigate('Settings')} />
        </View>
      </View>

      <View style={styles.block}>
        <LegalNoticeCard />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl },
  gap: { gap: spacing.sm },
});
