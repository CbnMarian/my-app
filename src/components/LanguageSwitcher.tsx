import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Check, ChevronDown } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

import {
  Locale,
  SUPPORTED_LOCALES,
  getFlag,
  getLanguageName,
  t,
  useLocaleStore,
} from '@/src/i18n';
import { motion, palette, radii, spacing, typography } from '@/src/theme/tokens';
import { GlassCard } from './GlassCard';

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  const toggle = () => {
    Haptics.selectionAsync().catch(() => {});
    setOpen((v) => !v);
  };

  const select = async (next: Locale) => {
    Haptics.selectionAsync().catch(() => {});
    await setLocale(next, true);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        onPress={toggle}
        hitSlop={10}
        style={({ pressed }) => [styles.trigger, pressed && { opacity: 0.75 }]}
      >
        <BlurView intensity={28} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.tint} />
        <View style={[styles.row, styles.rowLayer]}>
          <Text style={styles.flag}>{getFlag(locale)}</Text>
          <Text style={styles.code}>{locale.toUpperCase()}</Text>
          <ChevronDown size={14} color={palette.textHi} strokeWidth={2} />
        </View>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Animated.View entering={FadeIn.duration(motion.fast)} style={StyleSheet.absoluteFill} />
        </Pressable>

        <View pointerEvents="box-none" style={styles.modalWrap}>
          <Animated.View entering={SlideInUp.duration(motion.base).springify().damping(20)}>
            <GlassCard padding={0} radius="lg">
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetKicker}>
                  {t('languages.label').toUpperCase()}
                </Text>
              </View>
              {SUPPORTED_LOCALES.map((l, idx) => {
                const active = l === locale;
                return (
                  <Pressable
                    key={l}
                    onPress={() => select(l)}
                    style={({ pressed }) => [
                      styles.item,
                      idx !== 0 && styles.divider,
                      pressed && { backgroundColor: 'rgba(237, 234, 246, 0.04)' },
                    ]}
                  >
                    <Text style={styles.itemFlag}>{getFlag(l)}</Text>
                    <Text
                      style={[
                        styles.itemLabel,
                        active && {
                          color: palette.textHi,
                          fontFamily: 'PlusJakartaSans_600SemiBold',
                        },
                      ]}
                    >
                      {getLanguageName(l)}
                    </Text>
                    {active ? (
                      <Check size={16} color={palette.accent} strokeWidth={2.4} />
                    ) : (
                      <View style={{ width: 16 }} />
                    )}
                  </Pressable>
                );
              })}
            </GlassCard>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: radii.full,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairlineStrong,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(23, 23, 30, 0.55)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 7,
  },
  rowLayer: {
    zIndex: 1,
  },
  flag: { fontSize: 14 },
  code: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: palette.textHi,
    fontSize: 11,
    letterSpacing: 1.2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  modalWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.xl,
    paddingBottom: spacing['3xl'],
  },
  sheetHeader: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  sheetKicker: {
    ...typography.kicker,
    color: palette.textLo,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.hairline,
  },
  itemFlag: { fontSize: 20 },
  itemLabel: {
    flex: 1,
    ...typography.bodyMedium,
    color: palette.textMid,
  },
});
