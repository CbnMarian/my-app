import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

import { parseInstagramZip } from '@/src/services/instagramParser';
import { saveSnapshot } from '@/src/services/snapshotManager';
import { useDataStore } from '@/src/stores/useDataStore';
import { palette, spacing, typography } from '@/src/theme/tokens';
import { t, useLocaleStore } from '@/src/i18n';
import { AuroraBackground } from '@/src/components/AuroraBackground';
import { GradientButton } from '@/src/components/GradientButton';
import { StepCard } from '@/src/components/StepCard';
import { Kicker } from '@/src/components/Kicker';
import { MarqueeBanner } from '@/src/components/MarqueeBanner';
import { TopBar } from '@/src/components/TopBar';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const locale = useLocaleStore((s) => s.locale);
  const { setResult, setError, setProcessing, isProcessing, error } = useDataStore();

  const handleImport = useCallback(async () => {
    try {
      const pick = await DocumentPicker.getDocumentAsync({
        type: ['application/zip', 'application/x-zip-compressed', 'public.zip-archive', '*/*'],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (pick.canceled || !pick.assets?.[0]) return;

      setProcessing(true);
      setError(null);

      const asset = pick.assets[0];
      const file = new File(asset.uri);
      const buffer = await file.arrayBuffer();

      const result = await parseInstagramZip(buffer);
      await saveSnapshot(result);
      setResult(result);
      setProcessing(false);
      router.push('/results');
    } catch (e) {
      const message = e instanceof Error ? e.message : t('errors.unknown');
      setError(message);
      setProcessing(false);
    }
  }, [router, setError, setProcessing, setResult]);

  return (
    <View style={styles.root}>
      <AuroraBackground />
      <TopBar />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 96 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          key={`kicker-${locale}`}
          entering={FadeInDown.duration(600).springify().damping(18)}
        >
          <Kicker label="Observatory · 01" color={palette.textLo} withRule />
        </Animated.View>

        <Animated.View
          key={`hero-${locale}`}
          entering={FadeInUp.delay(120).duration(700).springify().damping(20)}
          style={styles.hero}
        >
          <Text style={styles.headline}>
            {t('home.heroTitleLine1')}{' '}
            <Text style={styles.italic}>{t('home.heroTitleLine1Italic')}</Text>
          </Text>
          <Text style={styles.headline}>{t('home.heroTitleLine2')}</Text>
          <Text style={styles.subhead}>{t('home.heroSubtitle')}</Text>
        </Animated.View>

        <Animated.View
          key={`cta-${locale}`}
          entering={FadeIn.delay(280).duration(500)}
          style={styles.ctaBlock}
        >
          <GradientButton
            label={isProcessing ? t('common.processing') : t('home.importButton')}
            loading={isProcessing}
            onPress={handleImport}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <MarqueeBanner
            items={[
              t('home.heroSubtitle'),
              'No password required',
              'Processed on your device',
              'Never uploaded to a server',
              'Zero tracking · Zero analytics',
              'Data stays with you',
            ]}
          />
        </Animated.View>

        <View style={styles.section}>
          <Kicker label={t('home.howItWorks')} color={palette.textLo} withRule />
          <View style={styles.steps}>
            <StepCard
              step={1}
              title={t('home.stepOneTitle')}
              body={t('home.stepOneBody')}
              delay={320}
            />
            <StepCard
              step={2}
              title={t('home.stepTwoTitle')}
              body={t('home.stepTwoBody')}
              delay={420}
            />
            <StepCard
              step={3}
              title={t('home.stepThreeTitle')}
              body={t('home.stepThreeBody')}
              delay={520}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg, overflow: 'hidden' },
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  hero: { gap: spacing.md },
  headline: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1.2,
  },
  italic: {
    fontFamily: 'Fraunces_600SemiBold_Italic',
    color: palette.textHi,
  },
  subhead: {
    ...typography.body,
    color: palette.textMid,
    fontSize: 15,
    marginTop: spacing.sm,
    maxWidth: 320,
    lineHeight: 22,
  },
  ctaBlock: { gap: spacing.lg },
  errorText: {
    ...typography.caption,
    color: palette.danger,
    textAlign: 'center',
  },
  section: { gap: spacing.lg, marginTop: spacing.md },
  steps: { gap: spacing.md },
});
