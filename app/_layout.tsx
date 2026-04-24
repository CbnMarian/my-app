import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useAppFonts } from '@/src/theme/fonts';
import { palette } from '@/src/theme/tokens';
import { useLocaleStore } from '@/src/i18n';

SplashScreen.preventAutoHideAsync().catch(() => {});

export const unstable_settings = {
  anchor: '(tabs)',
};

const NavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: palette.bg,
    card: palette.bg,
    text: palette.textHi,
    border: palette.hairline,
    primary: palette.accent,
  },
};

export default function RootLayout() {
  const fontsLoaded = useAppFonts();
  const hydrate = useLocaleStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NavTheme}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: palette.bg },
            animation: 'fade',
            animationDuration: 260,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="results"
            options={{
              headerShown: false,
              animation: 'slide_from_bottom',
              animationDuration: 320,
            }}
          />
          <Stack.Screen
            name="tutorial"
            options={{
              headerShown: false,
              animation: 'slide_from_bottom',
              animationDuration: 320,
            }}
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
