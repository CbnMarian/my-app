import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '@/src/theme/tokens';
import { LanguageSwitcher } from './LanguageSwitcher';
import { HelpButton } from './HelpButton';

/**
 * Top-right floating controls. No full-width strip — each pill has its own
 * blur backdrop (see LanguageSwitcher / HelpButton) so they float naturally
 * over content without creating a visual "header zone".
 * Per DESIGN.md R9: floating element backdrop is ON the element, not around.
 */
export function TopBar() {
  const insets = useSafeAreaInsets();
  return (
    <View
      pointerEvents="box-none"
      style={[styles.wrap, { top: insets.top + spacing.sm + 4 }]}
    >
      <LanguageSwitcher />
      <HelpButton />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    right: spacing.xl,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
