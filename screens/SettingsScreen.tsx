import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Screen, Header, Card, AppText, Icon, PressableScale, LegalNoticeCard, type IconName } from '@/components';
import { spacing, palette, states } from '@/theme';
import { useProgress } from '@/state/ProgressContext';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** Minimal settings: reset progress, about, sources, version. */
export function SettingsScreen() {
  const nav = useAppNavigation();
  const { resetAll, completed } = useProgress();
  const completedCount = Object.keys(completed).length;

  const confirmReset = () => {
    Alert.alert(
      'إعادة ضبط التقدم',
      'سيتم مسح كل الخطوات المنجزة. لا يمكن التراجع عن ذلك.',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'مسح', style: 'destructive', onPress: resetAll },
      ]
    );
  };

  return (
    <Screen>
      <Header title="الإعدادات" subtitle="تفضيلات بسيطة" onBack={() => nav.goBack()} />

      <Card style={styles.block}>
        <Row icon="check-circle" label="الخطوات المنجزة" value={`${completedCount} خطوة`} />
      </Card>

      <View style={styles.block}>
        <Item icon="documents" title="إعادة ضبط التقدم" subtitle="مسح كل الخطوات المنجزة" tone={states.urgent.tone} onPress={confirmReset} />
        <Item icon="sources" title="المصادر والإشعار القانوني" subtitle="من أين تتأكد من المعلومة" onPress={() => nav.navigate('Sources')} />
        <Item icon="authorities" title="من يتولى ماذا" subtitle="الجهات المتدخّلة" onPress={() => nav.navigate('Authorities')} />
      </View>

      <View style={styles.block}>
        <LegalNoticeCard />
      </View>

      <View style={styles.footer}>
        <AppText variant="caption" color={palette.slateFaint} center>
          يعمل التطبيق دون اتصال بالإنترنت. الإصدار 1.0.0
        </AppText>
      </View>
    </Screen>
  );
}

function Item({
  icon,
  title,
  subtitle,
  tone = palette.cedar,
  onPress,
}: {
  icon: IconName;
  title: string;
  subtitle?: string;
  tone?: string;
  onPress: () => void;
}) {
  return (
    <PressableScale onPress={onPress} activeScale={0.99}>
      <View style={styles.item}>
        <View style={[styles.itemIcon, { backgroundColor: palette.sand }]}>
          <Icon name={icon} size={20} color={tone} />
        </View>
        <View style={styles.flex}>
          <AppText variant="bodyStrong" color={tone}>
            {title}
          </AppText>
          {subtitle && (
            <AppText variant="caption" color={palette.slateFaint}>
              {subtitle}
            </AppText>
          )}
        </View>
        <Icon name="chevron-end" size={18} color={palette.slateFaint} />
      </View>
    </PressableScale>
  );
}

function Row({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Icon name={icon} size={18} color={states.completed.tone} />
      <AppText variant="small" style={styles.flex}>
        {label}
      </AppText>
      <AppText variant="bodyStrong" color={palette.cedar}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: spacing.xl, gap: spacing.sm },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: palette.paper,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.hairline,
    padding: spacing.md,
  },
  itemIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  footer: { paddingVertical: spacing.lg },
});
