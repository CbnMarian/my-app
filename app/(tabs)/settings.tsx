import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

import { clearAll } from '@/src/services/storage';
import { palette, spacing, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';
import { AuroraBackground } from '@/src/components/AuroraBackground';
import { GlassCard } from '@/src/components/GlassCard';
import { SettingsRow } from '@/src/components/SettingsRow';
import { Kicker } from '@/src/components/Kicker';
import { TopBar } from '@/src/components/TopBar';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const handleClear = () => {
    Alert.alert(t('settings.clearData'), 'Ok?', [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          await clearAll();
        },
      },
    ]);
  };

  return (
    <View style={styles.root}>
      <AuroraBackground intensity={0.6} />
      <TopBar />

      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 72, paddingBottom: insets.bottom + 96 },
        ]}
      >
        <View style={styles.header}>
          <Kicker label="Preferences" color={palette.purple200} withRule />
          <Text style={styles.title}>{t('settings.title')}</Text>
        </View>

        <GlassCard padding={0} radius="lg">
          <SettingsRow label={t('settings.language')} value="Auto" first />
          <SettingsRow label={t('settings.theme')} value="Dark" />
        </GlassCard>

        <GlassCard padding={0} radius="lg">
          <SettingsRow label={t('settings.upgradePro')} onPress={() => {}} first />
        </GlassCard>

        <GlassCard padding={0} radius="lg">
          <SettingsRow label={t('settings.privacy')} onPress={() => {}} first />
          <SettingsRow label={t('settings.terms')} onPress={() => {}} />
          <SettingsRow label={t('settings.about')} onPress={() => {}} />
          <SettingsRow
            label={t('settings.version')}
            value={Constants.expoConfig?.version ?? '0.0.0'}
          />
        </GlassCard>

        <GlassCard padding={0} radius="lg">
          <SettingsRow label={t('settings.clearData')} destructive onPress={handleClear} first />
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bg, overflow: 'hidden' },
  scroll: {
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  header: { gap: spacing.sm, marginBottom: spacing.md },
  title: {
    fontFamily: 'Fraunces_700Bold',
    color: palette.textHi,
    fontSize: 40,
    letterSpacing: -1.2,
  },
});
