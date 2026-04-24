import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { palette, spacing, radii, theme, typography } from '@/src/theme/tokens';

type Props = {
  step: number;
  title: string;
  body: string;
};

export function StepCard({ step, title, body }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.bgElevated, borderColor: colors.border },
      ]}
    >
      <View style={[styles.stepBadge, { backgroundColor: colors.accent }]}>
        <ThemedText style={{ color: palette.purple500, fontWeight: '700' }}>
          {step}
        </ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText style={[typography.button, { color: colors.text }]}>{title}</ThemedText>
        <ThemedText style={[typography.caption, { color: colors.textMuted }]}>
          {body}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1, gap: spacing.xs },
});
