import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, spacing, typography } from '@/src/theme/tokens';

type Props = {
  label: string;
  color?: string;
  withRule?: boolean;
};

/**
 * Editorial small-caps kicker label, optionally with a decorative horizontal rule beside it.
 */
export function Kicker({ label, color = palette.textLo, withRule = false }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.text, { color }]}>{label.toUpperCase()}</Text>
      {withRule ? <View style={[styles.rule, { backgroundColor: color, opacity: 0.35 }]} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  text: {
    ...typography.kicker,
  },
  rule: {
    flex: 1,
    height: StyleSheet.hairlineWidth * 2,
  },
});
