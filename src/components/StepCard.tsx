import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassCard } from './GlassCard';
import { palette, radii, spacing, typography } from '@/src/theme/tokens';

type Props = {
  step: number;
  title: string;
  body: string;
  delay?: number;
};

export function StepCard({ step, title, body, delay = 0 }: Props) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).springify().damping(18)}>
      <GlassCard padding={18} radius="lg">
        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{String(step).padStart(2, '0')}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        </View>
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md + 2,
    alignItems: 'flex-start',
  },
  badge: {
    borderRadius: radii.full,
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(124, 53, 255, 0.18)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  badgeText: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.purple100,
    fontSize: 14,
    letterSpacing: -0.3,
  },
  content: { flex: 1, gap: spacing.xs + 2, paddingTop: 3 },
  title: {
    ...typography.bodyMedium,
    color: palette.textHi,
    fontSize: 16,
    letterSpacing: -0.1,
  },
  body: {
    ...typography.caption,
    color: palette.textLo,
    lineHeight: 19,
  },
});
