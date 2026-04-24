import React, { useEffect } from 'react';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { palette, typography } from '@/src/theme/tokens';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = {
  value: number;
  duration?: number;
  style?: TextStyle;
  color?: string;
};

/**
 * Tabular-number counter that animates up on mount / value change.
 * Uses TextInput + animatedProps because Text can't accept animated string props.
 */
export function TickerNumber({ value, duration = 1100, style, color = palette.textHi }: Props) {
  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withTiming(value, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [sv, value, duration]);

  const animatedProps = useAnimatedProps(() => ({
    text: Math.round(sv.value).toString(),
    defaultValue: '0',
  }) as any);

  return (
    <AnimatedTextInput
      editable={false}
      underlineColorAndroid="transparent"
      style={[styles.text, { color }, style]}
      animatedProps={animatedProps}
      defaultValue="0"
    />
  );
}

const styles = StyleSheet.create({
  text: {
    ...typography.numeric,
    fontVariant: ['tabular-nums'],
    padding: 0,
    textAlign: 'left',
  },
});
