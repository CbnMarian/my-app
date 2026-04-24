import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useFocusEffect } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadSnapshots } from '@/src/services/snapshotManager';
import { Snapshot } from '@/src/types/instagram';
import { theme, spacing, radii, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    const data = await loadSnapshots();
    setSnapshots(data);
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (snapshots.length === 0) {
    return (
      <ThemedView style={[styles.root, { backgroundColor: colors.bg }]}>
        <View style={styles.empty}>
          <ThemedText style={[typography.heading, { color: colors.text }]}>
            {t('history.empty')}
          </ThemedText>
          <ThemedText
            style={[typography.body, { color: colors.textMuted, textAlign: 'center' }]}
          >
            {t('history.emptyHint')}
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.root, { backgroundColor: colors.bg }]}>
      <FlatList
        data={snapshots}
        keyExtractor={(s) => s.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        ListHeaderComponent={
          <ThemedText style={[typography.title, { color: colors.text, marginBottom: spacing.lg }]}>
            {t('history.title')}
          </ThemedText>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: colors.bgElevated, borderColor: colors.border },
            ]}
          >
            <ThemedText style={{ color: colors.textMuted, fontSize: 13 }}>
              {formatDate(item.createdAt)}
            </ThemedText>
            <View style={styles.stats}>
              <View style={styles.stat}>
                <ThemedText style={[typography.heading, { color: colors.text }]}>
                  {item.followingCount}
                </ThemedText>
                <ThemedText style={{ color: colors.textMuted, fontSize: 12 }}>
                  {t('results.followingCount')}
                </ThemedText>
              </View>
              <View style={styles.stat}>
                <ThemedText style={[typography.heading, { color: colors.text }]}>
                  {item.followersCount}
                </ThemedText>
                <ThemedText style={{ color: colors.textMuted, fontSize: 12 }}>
                  {t('results.followersCount')}
                </ThemedText>
              </View>
            </View>
          </View>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { padding: spacing.xl, paddingTop: spacing['3xl'], gap: spacing.md },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.md,
  },
  stats: { flexDirection: 'row', gap: spacing.xl },
  stat: { gap: spacing.xs },
});
