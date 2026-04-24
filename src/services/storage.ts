import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  snapshots: 'uf:snapshots:v1',
  onboardingSeen: 'uf:onboarding:seen',
  lastComparison: 'uf:last-comparison:v1',
  preferredLocale: 'uf:locale',
  proUnlocked: 'uf:pro-unlocked',
} as const;

export const StorageKeys = KEYS;

export async function getItem<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export async function clearAll(): Promise<void> {
  await AsyncStorage.clear();
}
