import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search } from 'lucide-react-native';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

import { useDataStore } from '@/src/stores/useDataStore';
import { palette, radii, spacing, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';
import { AuroraBackground } from '@/src/components/AuroraBackground';
import { TickerNumber } from '@/src/components/TickerNumber';
import { Kicker } from '@/src/components/Kicker';
import { ListTabs } from '@/src/components/ListTabs';
import { UserRow } from '@/src/components/UserRow';

export default function ResultsScreen() {
  const router = useRouter();
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
      <View style={styles.root}>
        <AuroraBackground intensity={0.6} />
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>{t('results.empty')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <AuroraBackground intensity={0.85} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <ArrowLeft size={18} color={palette.textHi} strokeWidth={2} />
        </Pressable>
        <Kicker label="Snapshot · Now" color={palette.purple200} />
        <View style={{ width: 40 }} />
      </View>

      <Animated.View entering={FadeIn.duration(500)}>
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <TickerNumber value={currentResult.followingCount} color={palette.textMid} />
            <Text style={styles.statLabel}>
              {t('results.followingCount').toUpperCase()}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <TickerNumber value={currentResult.followersCount} color={palette.textMid} />
            <Text style={styles.statLabel}>
              {t('results.followersCount').toUpperCase()}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCol}>
            <TickerNumber value={currentResult.notFollowingBack.length} color={palette.accent} />
            <Text style={[styles.statLabel, { color: palette.accent, opacity: 0.9 }]}>
              NOT BACK
            </Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(200).duration(500)}>
        <View style={styles.filterWrap}>
          <ListTabs />
          <View style={styles.searchWrap}>
            <Search size={16} color={palette.textDim} strokeWidth={2} />
            <TextInput
              placeholder={t('results.searchPlaceholder')}
              placeholderTextColor={palette.textDim}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.search}
            />
          </View>
        </View>
      </Animated.View>

      <FlatList
        data={users}
        keyExtractor={(u) => u.username}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeIn.delay(Math.min(index * 30, 600)).duration(400)}>
            <UserRow user={item} index={index} />
          </Animated.View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text style={styles.emptyText}>{t('results.empty')}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg, overflow: 'hidden' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing['4xl'],
    paddingBottom: spacing.lg,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairlineStrong,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingVertical: spacing.lg,
  },
  statCol: { flex: 1, gap: 4 },
  statLabel: {
    ...typography.kicker,
    color: palette.textDim,
    fontSize: 10,
    marginTop: 4,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    height: 46,
    backgroundColor: palette.hairlineStrong,
  },
  filterWrap: {
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm + 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: 2,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairline,
  },
  search: {
    ...typography.body,
    color: palette.textHi,
    fontSize: 15,
    flex: 1,
    paddingVertical: spacing.md - 1,
  },
  listContent: { paddingBottom: spacing['5xl'] + 40 },
  emptyList: { padding: spacing['2xl'], alignItems: 'center' },
  emptyText: { ...typography.body, color: palette.textLo },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 28,
  },
});
