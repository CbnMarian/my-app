import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useDataStore } from '@/src/stores/useDataStore';
import { palette, radii, spacing, theme, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';

const TABS = [
  { key: 'notFollowingBack', i18n: 'results.notFollowingBack' },
  { key: 'youDontFollowBack', i18n: 'results.youDontFollowBack' },
  { key: 'mutual', i18n: 'results.mutual' },
] as const;

export function ListTabs() {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];
  const { selectedList, setSelectedList, currentResult } = useDataStore();

  return (
    <View style={[styles.wrap, { backgroundColor: colors.bgElevated }]}>
      {TABS.map((tab) => {
        const isActive = selectedList === tab.key;
        const count = currentResult ? currentResult[tab.key].length : 0;
        return (
          <Pressable
            key={tab.key}
            onPress={() => setSelectedList(tab.key)}
            style={[
              styles.tab,
              {
                backgroundColor: isActive ? palette.purple500 : 'transparent',
              },
            ]}
          >
            <ThemedText
              style={[
                typography.caption,
                {
                  color: isActive ? palette.white : colors.text,
                  fontWeight: '600',
                },
              ]}
            >
              {t(tab.i18n)} {count > 0 ? `(${count})` : ''}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    padding: spacing.xs,
    borderRadius: radii.md,
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.sm + 2,
    alignItems: 'center',
  },
});
