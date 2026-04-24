import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ChevronRight } from 'lucide-react-native';
import { palette, spacing, typography } from '@/src/theme/tokens';

type Props = {
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
  first?: boolean;
  chevron?: boolean;
};

export function SettingsRow({ label, value, onPress, destructive, first, chevron }: Props) {
  const color = destructive ? palette.danger : palette.textHi;
  const showChevron = chevron ?? (onPress != null && value == null);

  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.row,
        !first && styles.divider,
        pressed && { backgroundColor: 'rgba(255, 255, 255, 0.03)' },
      ]}
    >
      <Text style={[styles.label, { color }]}>{label}</Text>
      <View style={styles.right}>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        {showChevron ? <ChevronRight size={16} color={palette.textDim} strokeWidth={2} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.hairline,
  },
  label: {
    ...typography.bodyMedium,
    fontSize: 15,
  },
  value: {
    ...typography.body,
    color: palette.textLo,
    fontSize: 14,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
