import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { palette } from '@/src/theme/tokens';

const { width, height } = Dimensions.get('window');
const BLOB_SIZE = Math.max(width, height) * 1.4;

/**
 * Monochromatic aurora. Two purple blobs at different intensities & positions,
 * drifting slowly + breathing. No other colors — per DESIGN.md R1.
 */
export function AuroraBackground({ intensity = 1 }: { intensity?: number }) {
  const drift1 = useSharedValue(0);
  const drift2 = useSharedValue(0);
  const breathe = useSharedValue(0);

  useEffect(() => {
    drift1.value = withRepeat(
      withTiming(1, { duration: 18000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    drift2.value = withRepeat(
      withTiming(1, { duration: 24000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
    breathe.value = withRepeat(
      withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [drift1, drift2, breathe]);

  const blobOne = useAnimatedStyle(() => ({
    transform: [
      { translateX: -BLOB_SIZE * 0.35 + drift1.value * 80 },
      { translateY: -BLOB_SIZE * 0.35 + drift1.value * 60 },
      { scale: 1 + breathe.value * 0.06 },
    ],
    opacity: (0.55 + breathe.value * 0.12) * intensity,
  }));

  const blobTwo = useAnimatedStyle(() => ({
    transform: [
      { translateX: width - BLOB_SIZE * 0.55 - drift2.value * 80 },
      { translateY: height - BLOB_SIZE * 0.6 - drift2.value * 100 },
      { scale: 1 + breathe.value * 0.04 },
    ],
    opacity: (0.30 + breathe.value * 0.08) * intensity,
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={[StyleSheet.absoluteFill, { backgroundColor: palette.bg }]} />

      <Animated.View style={[styles.blob, blobOne]}>
        <LinearGradient
          colors={[
            'rgba(139, 85, 255, 0.55)',
            'rgba(94, 41, 209, 0.22)',
            'rgba(14, 14, 18, 0)',
          ]}
          locations={[0, 0.45, 1]}
          style={styles.gradient}
          start={{ x: 0.3, y: 0.3 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <Animated.View style={[styles.blob, blobTwo]}>
        <LinearGradient
          colors={[
            'rgba(139, 85, 255, 0.28)',
            'rgba(94, 41, 209, 0.12)',
            'rgba(14, 14, 18, 0)',
          ]}
          locations={[0, 0.45, 1]}
          style={styles.gradient}
          start={{ x: 0.2, y: 0.2 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      <LinearGradient
        colors={['rgba(14,14,18,0)', 'rgba(14,14,18,0.4)', 'rgba(14,14,18,0.8)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    width: BLOB_SIZE,
    height: BLOB_SIZE,
    borderRadius: BLOB_SIZE / 2,
  },
  gradient: {
    flex: 1,
    borderRadius: BLOB_SIZE / 2,
  },
});
