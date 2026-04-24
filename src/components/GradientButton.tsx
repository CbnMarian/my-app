import React from 'react';
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { ArrowRight } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { motion, palette, radii, spacing, typography } from '@/src/theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

/**
 * Primary CTA — single accent (purple) gradient, no magenta tint.
 * Per DESIGN.md R1: one accent color only.
 */
export function GradientButton({ label, onPress, loading, disabled }: Props) {
  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withSpring(0.97, motion.press);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  };
  const onPressOut = () => {
    scale.value = withSpring(1, motion.pressGentle);
  };

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      style={[styles.wrap, pressStyle, disabled && { opacity: 0.5 }]}
    >
      <LinearGradient
        colors={[palette.accentBright, palette.accent, palette.accentDeep]}
        locations={[0, 0.55, 1]}
        style={styles.button}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.24)', 'rgba(255,255,255,0)']}
          style={styles.topSheen}
          pointerEvents="none"
        />
        <View style={styles.row}>
          {loading ? <ActivityIndicator color="#fff" /> : null}
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <ArrowRight size={18} color={palette.textHi} strokeWidth={2.2} />
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radii.xl,
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  button: {
    borderRadius: radii.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  topSheen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  label: {
    ...typography.button,
    color: palette.textHi,
    flexShrink: 1,
  },
});
