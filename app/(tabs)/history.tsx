import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';

import { loadSnapshots } from '@/src/services/snapshotManager';
import { Snapshot } from '@/src/types/instagram';
import { palette, radii, spacing, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';
import { AuroraBackground } from '@/src/components/AuroraBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { Kicker } from '@/src/components/Kicker';
import { TopBar } from '@/src/components/TopBar';

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
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

  return (
    <View style={styles.root}>
      <AuroraBackground intensity={0.7} />
      <TopBar />

      {snapshots.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Kicker label="Your record" color={palette.textLo} />
          <Text style={styles.emptyTitle}>{t('history.empty')}</Text>
          <Text style={styles.emptyBody}>{t('history.emptyHint')}</Text>
        </View>
      ) : (
        <FlatList
          data={snapshots}
          keyExtractor={(s) => s.id}
          contentContainerStyle={[
            styles.list,
            { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 96 },
          ]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={palette.purple300}
            />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Kicker label="Archive · Snapshots" color={palette.purple200} withRule />
              <Text style={styles.title}>{t('history.title')}</Text>
            </View>
          }
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(index * 70).springify().damping(20)}>
              <GlassCard padding={20} radius="lg">
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
                <View style={styles.stats}>
                  <View style={styles.stat}>
                    <Text style={styles.statNum}>{item.followingCount}</Text>
                    <Text style={styles.statLabel}>
                      {t('results.followingCount').toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.stat}>
                    <Text style={styles.statNum}>{item.followersCount}</Text>
                    <Text style={styles.statLabel}>
                      {t('results.followersCount').toUpperCase()}
                    </Text>
                  </View>
                </View>
              </GlassCard>
            </Animated.View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg, overflow: 'hidden' },
  list: {
    paddingHorizontal: spacing.xl,
  },
  header: { gap: spacing.sm, marginBottom: spacing.xl },
  title: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 40,
    letterSpacing: -1.2,
  },
  emptyWrap: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: spacing.md,
  },
  emptyTitle: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 30,
    letterSpacing: -1,
    marginTop: spacing.sm,
  },
  emptyBody: {
    ...typography.body,
    color: palette.textLo,
    maxWidth: 320,
  },
  date: {
    ...typography.caption,
    color: palette.textLo,
    fontSize: 12,
    letterSpacing: 0.4,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xl,
    marginTop: spacing.md,
  },
  stat: { gap: spacing.xs, flex: 1 },
  statNum: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 32,
    letterSpacing: -0.8,
    fontVariant: ['tabular-nums'],
  },
  statLabel: {
    ...typography.kicker,
    color: palette.textDim,
    fontSize: 10,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 42,
    backgroundColor: palette.hairlineStrong,
  },
});
