import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { palette, typography } from '@/src/theme/tokens';

type Props = TextProps & {
  variant?: 'display' | 'displaySm' | 'heading';
  color?: string;
};

export function Display({ variant = 'display', color = palette.textHi, style, children, ...rest }: Props) {
  const base: TextStyle = typography[variant];
  return (
    <Text {...rest} style={[base, { color }, styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    // iOS tends to cut descenders on serifs; add a small padding
    paddingBottom: 2,
  },
});
