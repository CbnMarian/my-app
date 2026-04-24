import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radii } from '@/src/theme/tokens';

type Props = ViewProps & {
  intensity?: number;
  padding?: number;
  radius?: keyof typeof radii;
  borderGradient?: boolean;
};

/**
 * Real glass surface using native BlurView + gradient border sheen.
 */
export function GlassCard({
  children,
  intensity = 28,
  padding = 20,
  radius = 'lg',
  borderGradient = true,
  style,
  ...rest
}: Props) {
  const r = radii[radius];
  return (
    <View
      style={[
        styles.wrap,
        { borderRadius: r },
        style,
      ]}
      {...rest}
    >
      <BlurView
        intensity={intensity}
        tint="dark"
        style={[StyleSheet.absoluteFill, { borderRadius: r }]}
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(20, 20, 28, 0.45)',
            borderRadius: r,
          },
        ]}
      />
      {borderGradient ? (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.18)',
            'rgba(255, 255, 255, 0.04)',
            'rgba(255, 255, 255, 0.02)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: r,
              borderWidth: 1,
              borderColor: 'transparent',
            },
          ]}
        />
      ) : null}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: r,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: palette.glassBorder,
          },
        ]}
      />
      <View style={{ padding }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    position: 'relative',
  },
});
