import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Header, AuthorityCard, CalmInfoBanner } from '@/components';
import { spacing } from '@/theme';
import { authorities } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** "Who handles what" — the roles the family interacts with. */
export function AuthoritiesScreen() {
  const nav = useAppNavigation();
  return (
    <Screen>
      <Header title="من يتولى ماذا" subtitle="الجهات المتدخّلة في كل مرحلة" onBack={() => nav.goBack()} />
      <View style={styles.intro}>
        <CalmInfoBanner message="تعرّف على دور كل جهة ومتى تتعامل معها، لتعرف إلى من تتوجه في كل خطوة." />
      </View>
      <View style={styles.list}>
        {authorities.map((a) => (
          <AuthorityCard key={a.id} authority={a} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
  list: { gap: spacing.md },
});
