import React from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { clearAll } from '@/src/services/storage';
import { theme, spacing, radii, typography } from '@/src/theme/tokens';
import { t } from '@/src/i18n';
import { SettingsRow } from '@/src/components/SettingsRow';

export default function SettingsScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = theme[scheme];

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
    <ThemedView style={[styles.root, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ThemedText style={[typography.title, { color: colors.text, marginBottom: spacing.lg }]}>
          {t('settings.title')}
        </ThemedText>

        <View style={[styles.section, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
          <SettingsRow label={t('settings.language')} value="Auto" />
          <SettingsRow label={t('settings.theme')} value="Auto" />
        </View>

        <View style={[styles.section, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
          <SettingsRow label={t('settings.upgradePro')} value="→" />
        </View>

        <View style={[styles.section, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
          <SettingsRow label={t('settings.privacy')} value="→" />
          <SettingsRow label={t('settings.terms')} value="→" />
          <SettingsRow label={t('settings.about')} value="→" />
          <SettingsRow
            label={t('settings.version')}
            value={Constants.expoConfig?.version ?? '0.0.0'}
          />
        </View>

        <View style={[styles.section, { backgroundColor: colors.bgElevated, borderColor: colors.border }]}>
          <SettingsRow label={t('settings.clearData')} destructive onPress={handleClear} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { padding: spacing.xl, paddingTop: spacing['3xl'], gap: spacing.md },
  section: {
    borderRadius: radii.lg,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
});
