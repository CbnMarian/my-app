import React from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IgUser } from '@/src/types/instagram';
import { palette, radii, spacing, theme, typography } from '@/src/theme/tokens';

type Props = {
  user: IgUser;
};

export function UserRow({ user }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];
  const initial = user.username.charAt(0).toUpperCase();

  const open = () => {
    const url = user.profileUrl || `https://www.instagram.com/${user.username}/`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <Pressable
      onPress={open}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.border, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: colors.accent }]}>
        <ThemedText style={{ color: palette.purple500, fontWeight: '700', fontSize: 16 }}>
          {initial}
        </ThemedText>
      </View>
      <View style={styles.meta}>
        <ThemedText style={[typography.body, { color: colors.text, fontWeight: '600' }]}>
          @{user.username}
        </ThemedText>
      </View>
      <ThemedText style={{ color: colors.tint, fontSize: 14, fontWeight: '600' }}>
        →
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flex: 1 },
});
