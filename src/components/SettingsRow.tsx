import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { palette, spacing, theme, typography } from '@/src/theme/tokens';

type Props = {
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
};

export function SettingsRow({ label, value, onPress, destructive }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];
  const labelColor = destructive ? palette.danger : colors.text;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        { borderBottomColor: colors.border, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <ThemedText style={[typography.body, { color: labelColor }]}>{label}</ThemedText>
      {value ? (
        <ThemedText style={[typography.body, { color: colors.textMuted }]}>{value}</ThemedText>
      ) : (
        <View />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
