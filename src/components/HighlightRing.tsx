import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { palette, radii } from '@/src/theme/tokens';

type Props = {
  children?: React.ReactNode;
  style?: ViewStyle;
  radius?: number;
  color?: string;
};

/**
 * Pulsing highlight ring used in tutorial mockups to point at the tap target.
 * Two concentric rings that breathe out and fade.
 */
export function HighlightRing({
  children,
  style,
  radius = radii.full,
  color = palette.accent,
}: Props) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.out(Easing.cubic) }),
      -1,
      false,
    );
  }, [pulse]);

  const ring1 = useAnimatedStyle(() => ({
    opacity: 0.85 * (1 - pulse.value),
    transform: [{ scale: 1 + pulse.value * 0.45 }],
  }));

  const ring2 = useAnimatedStyle(() => ({
    opacity: 0.55 * (1 - pulse.value),
    transform: [{ scale: 1 + pulse.value * 0.7 }],
  }));

  return (
    <View style={[styles.wrap, style]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          {
            borderRadius: radius,
            borderColor: color,
          },
          ring1,
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.ring,
          {
            borderRadius: radius,
            borderColor: color,
            borderWidth: 1.5,
          },
          ring2,
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderWidth: 2,
  },
});
