import React from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { ArrowUpRight } from 'lucide-react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { IgUser } from '@/src/types/instagram';
import { motion, palette, radii, spacing, typography } from '@/src/theme/tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  user: IgUser;
  index?: number;
};

/**
 * Simple, neutral user row.
 * Per DESIGN.md AP1: no rainbow gradient rings. Single subtle border on avatar.
 */
export function UserRow({ user }: Props) {
  const scale = useSharedValue(1);
  const initial = user.username.charAt(0).toUpperCase();

  const open = () => {
    Haptics.selectionAsync().catch(() => {});
    const url = user.profileUrl || `https://www.instagram.com/${user.username}/`;
    Linking.openURL(url).catch(() => {});
  };

  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={open}
      onPressIn={() => (scale.value = withSpring(0.98, motion.press))}
      onPressOut={() => (scale.value = withSpring(1, motion.pressGentle))}
      style={[styles.row, pressStyle]}
    >
      <View style={styles.avatar}>
        <Text style={styles.initial}>{initial}</Text>
      </View>

      <View style={styles.meta}>
        <Text style={styles.username}>@{user.username}</Text>
        <Text style={styles.sub}>instagram.com/{user.username}</Text>
      </View>

      <View style={styles.chevron}>
        <ArrowUpRight size={16} color={palette.textMid} strokeWidth={2} />
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md + 2,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.hairline,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accentSofter,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairlineStrong,
  },
  initial: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 17,
  },
  meta: { flex: 1, gap: 2 },
  username: {
    ...typography.bodyMedium,
    color: palette.textHi,
    fontSize: 15,
  },
  sub: {
    ...typography.caption,
    color: palette.textDim,
    fontSize: 12,
  },
  chevron: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accentSofter,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairline,
  },
});
