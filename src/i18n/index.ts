import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { ro } from './ro';
import { en } from './en';

export const i18n = new I18n({ ro, en });

i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'en';
i18n.locale = deviceLocale === 'ro' ? 'ro' : 'en';

export function setLocale(locale: 'ro' | 'en'): void {
  i18n.locale = locale;
}

export function t(key: string, options?: Record<string, unknown>): string {
  return i18n.t(key, options);
}
