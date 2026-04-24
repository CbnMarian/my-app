import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { House, Clock, Settings2 } from 'lucide-react-native';

import { HapticTab } from '@/components/haptic-tab';
import { palette } from '@/src/theme/tokens';
import { t } from '@/src/i18n';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.purple300,
        tabBarInactiveTintColor: palette.textDim,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: palette.hairline,
          backgroundColor: 'transparent',
          elevation: 0,
        },
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(10, 10, 12, 0.55)' },
              ]}
            />
          </View>
        ),
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans_500Medium',
          fontSize: 11,
          letterSpacing: 0.3,
          marginTop: -2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('common.appName'),
          tabBarIcon: ({ color }) => <House size={20} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('history.title'),
          tabBarIcon: ({ color }) => <Clock size={20} color={color} strokeWidth={1.8} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('settings.title'),
          tabBarIcon: ({ color }) => <Settings2 size={20} color={color} strokeWidth={1.8} />,
        }}
      />
    </Tabs>
  );
}
