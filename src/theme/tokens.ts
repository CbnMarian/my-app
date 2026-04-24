/**
 * Design tokens — single source of truth for colors, spacing, radii, typography.
 * Keep in sync with constants/theme.ts (legacy).
 */

export const palette = {
  purple50: '#F3EFFF',
  purple100: '#E8E2FF',
  purple500: '#7C35FF',
  purple700: '#5A1FD1',
  dark: '#0E0E10',
  gray900: '#1A1A1E',
  gray700: '#3A3A40',
  gray500: '#8A8A92',
  gray300: '#D4D4D8',
  gray100: '#F4F4F5',
  white: '#FFFFFF',
  danger: '#E5484D',
  success: '#30A46C',
  warning: '#F5A524',
} as const;

export const theme = {
  light: {
    bg: palette.white,
    bgElevated: palette.gray100,
    text: palette.dark,
    textMuted: palette.gray500,
    tint: palette.purple500,
    border: palette.gray300,
    accent: palette.purple100,
  },
  dark: {
    bg: palette.dark,
    bgElevated: palette.gray900,
    text: palette.white,
    textMuted: palette.gray500,
    tint: palette.purple500,
    border: palette.gray700,
    accent: palette.purple700,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  heading: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: '400' as const, lineHeight: 18 },
  button: { fontSize: 16, fontWeight: '600' as const, lineHeight: 22 },
} as const;
