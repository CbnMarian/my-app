import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ro } from './ro';
import { en } from './en';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';

export const SUPPORTED_LOCALES = ['en', 'ro', 'es', 'fr', 'it'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  ro: '🇷🇴',
  es: '🇪🇸',
  fr: '🇫🇷',
  it: '🇮🇹',
};

const LOCALE_STORAGE_KEY = 'uf:locale';

export const i18n = new I18n({ ro, en, es, fr, it });
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

function detectDeviceLocale(): Locale {
  const code = Localization.getLocales()[0]?.languageCode ?? 'en';
  return (SUPPORTED_LOCALES as readonly string[]).includes(code)
    ? (code as Locale)
    : 'en';
}

i18n.locale = detectDeviceLocale();

type LocaleState = {
  locale: Locale;
  autoDetect: boolean;
  setLocale: (locale: Locale, manual?: boolean) => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: i18n.locale as Locale,
  autoDetect: true,
  setLocale: async (locale, manual = true) => {
    i18n.locale = locale;
    set({ locale, autoDetect: !manual });
    if (manual) {
      await AsyncStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  },
  hydrate: async () => {
    const saved = await AsyncStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && (SUPPORTED_LOCALES as readonly string[]).includes(saved)) {
      i18n.locale = saved;
      set({ locale: saved as Locale, autoDetect: false });
    } else {
      const detected = detectDeviceLocale();
      i18n.locale = detected;
      set({ locale: detected, autoDetect: true });
    }
  },
}));

export function t(key: string, options?: Record<string, unknown>): string {
  return i18n.t(key, options);
}

export function getFlag(locale: Locale): string {
  return LOCALE_FLAGS[locale];
}

export function getLanguageName(locale: Locale): string {
  return i18n.t(`languages.${locale}`);
}
