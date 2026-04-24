import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { HelpCircle } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

import { palette, radii } from '@/src/theme/tokens';

export function HelpButton() {
  const router = useRouter();

  const open = () => {
    Haptics.selectionAsync().catch(() => {});
    router.push('/tutorial');
  };

  return (
    <Pressable
      onPress={open}
      hitSlop={10}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.75 }]}
    >
      <BlurView intensity={28} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} />
      <View style={styles.iconWrap}>
        <HelpCircle size={18} color={palette.textHi} strokeWidth={1.8} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairlineStrong,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23, 23, 30, 0.55)',
  },
  iconWrap: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
