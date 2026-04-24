import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, radii, spacing } from '@/src/theme/tokens';

type Props = {
  children: React.ReactNode;
  statusBarTone?: 'light' | 'dark';
};

/**
 * Phone-shaped frame wrapping the mockup Instagram UI.
 * Stylized, not pixel-perfect. Dark mode to match our aesthetic.
 */
export function PhoneMockup({ children, statusBarTone = 'light' }: Props) {
  return (
    <View style={styles.outer}>
      <View style={styles.frame}>
        <View style={styles.notch} />
        <View style={styles.inner}>
          <View style={styles.statusBar}>
            <Text style={[styles.time, { color: statusBarTone === 'light' ? '#fff' : '#000' }]}>
              9:41
            </Text>
            <View style={styles.statusRight}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: statusBarTone === 'light' ? '#fff' : '#000' },
                ]}
              />
              <View
                style={[
                  styles.statusBars,
                  { backgroundColor: statusBarTone === 'light' ? '#fff' : '#000' },
                ]}
              />
            </View>
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  frame: {
    width: 240,
    height: 420,
    borderRadius: 36,
    backgroundColor: '#000',
    padding: 4,
    borderWidth: 1,
    borderColor: palette.hairlineStrong,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
    elevation: 20,
  },
  notch: {
    position: 'absolute',
    top: 8,
    left: '50%',
    transform: [{ translateX: -38 }],
    width: 76,
    height: 18,
    borderRadius: radii.full,
    backgroundColor: '#000',
    zIndex: 2,
  },
  inner: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    height: 28,
  },
  time: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
  },
  statusRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statusDot: {
    width: 12,
    height: 6,
    borderRadius: 2,
  },
  statusBars: {
    width: 12,
    height: 6,
    borderRadius: 2,
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
});
