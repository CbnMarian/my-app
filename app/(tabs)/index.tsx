import React, { useCallback } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { parseInstagramZip } from '@/src/services/instagramParser';
import { saveSnapshot } from '@/src/services/snapshotManager';
import { useDataStore } from '@/src/stores/useDataStore';
import { theme, spacing, radii, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { StepCard } from '@/src/components/StepCard';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];
  const router = useRouter();
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
    <ThemedView style={[styles.root, { backgroundColor: colors.bg }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <ThemedText style={{ color: colors.tint, fontWeight: '600', fontSize: 13 }}>
              100% safe • no password
            </ThemedText>
          </View>
          <ThemedText style={[typography.title, { color: colors.text, marginTop: spacing.md }]}>
            {t('home.heroTitle')}
          </ThemedText>
          <ThemedText
            style={[typography.body, { color: colors.textMuted, marginTop: spacing.sm }]}
          >
            {t('home.heroSubtitle')}
          </ThemedText>
        </View>

        <PrimaryButton
          label={isProcessing ? t('common.processing') : t('home.importButton')}
          onPress={handleImport}
          disabled={isProcessing}
          icon={isProcessing ? <ActivityIndicator color="#fff" /> : undefined}
        />

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: '#FEE4E4' }]}>
            <ThemedText style={{ color: '#9A1D1D' }}>{error}</ThemedText>
          </View>
        ) : null}

        <View style={styles.howItWorks}>
          <ThemedText style={[typography.heading, { color: colors.text }]}>
            {t('home.howItWorks')}
          </ThemedText>

          <StepCard
            step={1}
            title={t('home.stepOneTitle')}
            body={t('home.stepOneBody')}
          />
          <StepCard
            step={2}
            title={t('home.stepTwoTitle')}
            body={t('home.stepTwoBody')}
          />
          <StepCard
            step={3}
            title={t('home.stepThreeTitle')}
            body={t('home.stepThreeBody')}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: spacing.xl, paddingTop: spacing['3xl'], gap: spacing.xl },
  hero: { gap: spacing.xs },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.full,
  },
  errorBox: {
    padding: spacing.md,
    borderRadius: radii.md,
  },
  howItWorks: { gap: spacing.md, marginTop: spacing.md },
});
