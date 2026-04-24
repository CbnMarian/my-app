import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, radii, spacing } from '@/src/theme/tokens';

type Props = {
  items: string[];
  speed?: number;
};

/**
 * Editorial news-ticker banner. Purple pulse dot (single accent per DESIGN.md R1).
 */
export function MarqueeBanner({ items, speed = 40 }: Props) {
  const [rowWidth, setRowWidth] = useState(0);
  const x = useSharedValue(0);
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (rowWidth === 0) return;
    const duration = (rowWidth / speed) * 1000;
    x.value = 0;
    x.value = withRepeat(
      withTiming(-rowWidth, { duration, easing: Easing.linear }),
      -1,
      false,
    );
  }, [rowWidth, speed, x]);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1600, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [pulse]);

  const trackStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: 0.6 + pulse.value * 0.4,
    transform: [{ scale: 1 + pulse.value * 0.3 }],
  }));

  const dotHaloStyle = useAnimatedStyle(() => ({
    opacity: 0.1 + pulse.value * 0.2,
    transform: [{ scale: 1.4 + pulse.value * 1.0 }],
  }));

  const renderRow = (measure: boolean) => (
    <View
      style={styles.row}
      onLayout={
        measure
          ? (e: LayoutChangeEvent) => setRowWidth(e.nativeEvent.layout.width)
          : undefined
      }
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <View style={styles.separator} />
          <Text style={styles.text}>{item}</Text>
        </React.Fragment>
      ))}
    </View>
  );

  return (
    <View style={styles.wrap}>
      <View style={styles.indicator}>
        <Animated.View style={[styles.pulseHalo, dotHaloStyle]} />
        <Animated.View style={[styles.pulseDot, dotStyle]} />
      </View>

      <View style={styles.marqueeContainer}>
        <Animated.View style={[styles.track, trackStyle]}>
          {renderRow(true)}
          {renderRow(false)}
        </Animated.View>

        <LinearGradient
          colors={[palette.bg, 'rgba(14,14,18,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.fadeLeft}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['rgba(14,14,18,0)', palette.bg]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.fadeRight}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: 'rgba(237, 234, 246, 0.03)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairline,
  },
  indicator: {
    width: 40,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: palette.hairline,
    backgroundColor: palette.accentSofter,
    position: 'relative',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.accent,
    shadowColor: palette.accent,
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
  },
  pulseHalo: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.accent,
  },
  marqueeContainer: {
    flex: 1,
    overflow: 'hidden',
    height: '100%',
    justifyContent: 'center',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: palette.textDim,
    marginHorizontal: spacing.md + 2,
  },
  text: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: palette.textMid,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 18,
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 28,
  },
});
