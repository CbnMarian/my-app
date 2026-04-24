import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useDataStore } from '@/src/stores/useDataStore';
import { palette, radii, spacing, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';

const TABS = [
  { key: 'notFollowingBack', i18n: 'results.notFollowingBack' },
  { key: 'youDontFollowBack', i18n: 'results.youDontFollowBack' },
  { key: 'mutual', i18n: 'results.mutual' },
] as const;

export function ListTabs() {
  const { selectedList, setSelectedList, currentResult } = useDataStore();
  const activeIdx = TABS.findIndex((tab) => tab.key === selectedList);
  const indicator = useSharedValue(activeIdx);

  React.useEffect(() => {
    indicator.value = withSpring(activeIdx, { damping: 20, stiffness: 210 });
  }, [activeIdx, indicator]);

  const indicatorStyle = useAnimatedStyle(() => ({
    left: `${(indicator.value / TABS.length) * 100}%`,
  }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      {TABS.map((tab) => {
        const isActive = selectedList === tab.key;
        const count = currentResult ? currentResult[tab.key].length : 0;
        return (
          <Pressable
            key={tab.key}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setSelectedList(tab.key);
            }}
            style={styles.tab}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {t(tab.i18n)}
            </Text>
            {count > 0 ? (
              <Text style={[styles.count, isActive && styles.countActive]}>{count}</Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairline,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: `${100 / 3}%`,
    borderRadius: radii.md,
    backgroundColor: 'rgba(124, 53, 255, 0.35)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
  },
  label: {
    ...typography.caption,
    color: palette.textLo,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
  },
  labelActive: {
    color: palette.textHi,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  count: {
    ...typography.caption,
    color: palette.textDim,
    fontSize: 11,
    fontFamily: 'Fraunces_600SemiBold',
  },
  countActive: {
    color: palette.purple200,
  },
});
