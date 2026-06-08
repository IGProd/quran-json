import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Screen, Header, AccordionSection, AppText, Icon, EmptyState } from '@/components';
import { spacing, palette, radius, fonts } from '@/theme';
import { faq } from '@/content';
import { useAppNavigation } from '@/navigation/useAppNavigation';

/** Practical FAQ — short answers, expandable, searchable. */
export function FaqScreen() {
  const nav = useAppNavigation();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return faq;
    return faq.filter((f) => f.question.includes(q) || f.answer.includes(q));
  }, [query]);

  return (
    <Screen>
      <Header title="أسئلة شائعة" subtitle="إجابات قصيرة وعملية" onBack={() => nav.goBack()} />

      <View style={styles.search}>
        <Icon name="faq" size={18} color={palette.slateFaint} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="ابحث في الأسئلة…"
          placeholderTextColor={palette.slateFaint}
          style={styles.input}
          textAlign="right"
        />
      </View>

      {results.length === 0 ? (
        <EmptyState illustration="documents" title="لا توجد نتيجة" message="جرّب كلمة أخرى أو تصفّح كل الأسئلة." />
      ) : (
        <View style={styles.list}>
          {results.map((f) => (
            <AccordionSection key={f.id} title={f.question} icon="info">
              <AppText variant="small" color={palette.slateMuted}>
                {f.answer}
              </AppText>
            </AccordionSection>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: palette.paper,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.hairline,
    paddingHorizontal: spacing.md,
    height: 48,
    marginBottom: spacing.lg,
  },
  input: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: palette.slate,
    writingDirection: 'rtl',
    height: '100%',
  },
  list: { gap: spacing.sm },
});
