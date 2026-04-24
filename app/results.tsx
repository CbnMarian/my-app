import React, { useMemo } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDataStore } from '@/src/stores/useDataStore';
import { theme, spacing, radii, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';
import { ListTabs } from '@/src/components/ListTabs';
import { UserRow } from '@/src/components/UserRow';

export default function ResultsScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];
  const { currentResult, selectedList, searchQuery, setSearchQuery } = useDataStore();

  const users = useMemo(() => {
    if (!currentResult) return [];
    const list = currentResult[selectedList];
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((u) => u.username.toLowerCase().includes(q));
  }, [currentResult, selectedList, searchQuery]);

  if (!currentResult) {
    return (
      <ThemedView style={[styles.root, { backgroundColor: colors.bg }]}>
        <ThemedText style={{ color: colors.text, padding: spacing.xl }}>
          {t('results.empty')}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t('common.appName') }} />
      <ThemedView style={[styles.root, { backgroundColor: colors.bg }]}>
        <View style={styles.header}>
          <View style={styles.counts}>
            <View style={styles.countBlock}>
              <ThemedText style={[typography.heading, { color: colors.text }]}>
                {currentResult.followingCount}
              </ThemedText>
              <ThemedText style={{ color: colors.textMuted, fontSize: 12 }}>
                {t('results.followingCount')}
              </ThemedText>
            </View>
            <View style={styles.countBlock}>
              <ThemedText style={[typography.heading, { color: colors.text }]}>
                {currentResult.followersCount}
              </ThemedText>
              <ThemedText style={{ color: colors.textMuted, fontSize: 12 }}>
                {t('results.followersCount')}
              </ThemedText>
            </View>
          </View>

          <ListTabs />

          <TextInput
            placeholder={t('results.searchPlaceholder')}
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={[
              styles.search,
              {
                color: colors.text,
                backgroundColor: colors.bgElevated,
                borderColor: colors.border,
              },
            ]}
          />
        </View>

        <FlatList
          data={users}
          keyExtractor={(u) => u.username}
          contentContainerStyle={{ paddingBottom: spacing['3xl'] }}
          renderItem={({ item }) => <UserRow user={item} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <ThemedText style={{ color: colors.textMuted }}>{t('results.empty')}</ThemedText>
            </View>
          }
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: { padding: spacing.lg, gap: spacing.md },
  counts: { flexDirection: 'row', gap: spacing.xl },
  countBlock: { gap: spacing.xs },
  search: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.md,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 15,
  },
  empty: { padding: spacing.xl, alignItems: 'center' },
});
