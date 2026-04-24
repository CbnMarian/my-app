import React, { useState } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, ExternalLink } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, {
  FadeIn,
  FadeInRight,
} from 'react-native-reanimated';

import { AuroraBackground } from '@/src/components/AuroraBackground';
import { Kicker } from '@/src/components/Kicker';
import { getMockupForStep } from '@/src/components/mockups/InstagramMockups';
import { motion, palette, radii, spacing, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';

const STEP_KEYS = [1, 2, 3, 4, 5] as const;
const INSTAGRAM_DOWNLOAD_URL =
  'https://accountscenter.instagram.com/info_and_permissions/dyi/';

export default function TutorialScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState(0);

  const go = (delta: number) => {
    Haptics.selectionAsync().catch(() => {});
    setCurrent((v) => Math.max(0, Math.min(STEP_KEYS.length - 1, v + delta)));
  };

  const close = () => {
    Haptics.selectionAsync().catch(() => {});
    router.back();
  };

  const openInstagram = () => {
    Haptics.selectionAsync().catch(() => {});
    Linking.openURL(INSTAGRAM_DOWNLOAD_URL).catch(() => {});
  };

  const stepKey = STEP_KEYS[current];
  const title = t(`help.step${stepKey}Title`);
  const body = t(`help.step${stepKey}Body`);
  const total = STEP_KEYS.length;
  const isLast = current === STEP_KEYS.length - 1;

  return (
    <View style={styles.root}>
      <AuroraBackground intensity={0.6} />

      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Pressable onPress={close} style={styles.closeBtn} hitSlop={10}>
          <X size={18} color={palette.textHi} strokeWidth={2} />
        </Pressable>
        <Kicker label={t('help.title')} color={palette.textLo} />
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={`mockup-${current}`}
          entering={FadeIn.duration(motion.base)}
          style={styles.mockupWrap}
        >
          {getMockupForStep(stepKey)}
        </Animated.View>

        <View style={styles.progressWrap}>
          {STEP_KEYS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i <= current ? styles.dotActive : styles.dotInactive,
                i === current && styles.dotCurrent,
              ]}
            />
          ))}
        </View>

        <Text style={styles.stepIndicator}>
          {t('help.stepIndicator', { current: current + 1, total })}
        </Text>

        <Animated.View
          key={`text-${current}`}
          entering={FadeInRight.duration(motion.base).springify().damping(20)}
          style={styles.textBlock}
        >
          <Text style={styles.stepTitle}>{title}</Text>
          <Text style={styles.stepBody}>{body}</Text>
        </Animated.View>

        {current === 0 ? (
          <Pressable onPress={openInstagram} style={styles.externalRow}>
            <ExternalLink size={14} color={palette.accent} strokeWidth={2} />
            <Text style={styles.externalText}>{t('help.openInstagram')}</Text>
          </Pressable>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.md }]}>
        <Pressable
          onPress={() => go(-1)}
          disabled={current === 0}
          style={({ pressed }) => [
            styles.secondaryBtn,
            current === 0 && { opacity: 0.3 },
            pressed && { opacity: 0.7 },
          ]}
        >
          <Text style={styles.secondaryText}>{t('help.prev')}</Text>
        </Pressable>

        {isLast ? (
          <Pressable
            onPress={close}
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.primaryText}>{t('help.done')}</Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => go(1)}
            style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.primaryText}>{t('help.next')}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg, overflow: 'hidden' },
  scrollView: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: 'rgba(237, 234, 246, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: palette.hairlineStrong,
  },
  scroll: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    alignItems: 'stretch',
    gap: spacing.lg,
  },
  mockupWrap: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  progressWrap: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: palette.accent,
  },
  dotInactive: {
    backgroundColor: palette.hairlineStrong,
  },
  dotCurrent: {
    width: 24,
  },
  stepIndicator: {
    ...typography.kicker,
    color: palette.textLo,
    alignSelf: 'center',
  },
  textBlock: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  stepTitle: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  stepBody: {
    ...typography.body,
    color: palette.textMid,
    lineHeight: 22,
    textAlign: 'center',
  },
  externalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    alignSelf: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.full,
    backgroundColor: palette.accentSoft,
  },
  externalText: {
    ...typography.bodyMedium,
    color: palette.accent,
    fontSize: 13,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.hairline,
  },
  primaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.accent,
    minWidth: 108,
  },
  primaryText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: palette.textHi,
    fontSize: 14,
    letterSpacing: 0.1,
  },
  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    color: palette.textLo,
    fontSize: 14,
  },
});
