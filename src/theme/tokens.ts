/**
 * Design tokens — single source of truth.
 *
 * Aesthetic: "Observatory" — editorial dark, restrained, 60-30-10 rule applied.
 * Accent color: PURPLE only. No magenta, amber, or teal as accents.
 * See DESIGN.md for full design system.
 */

export const palette = {
  // 60% — Dominant (backgrounds)
  bg: '#0E0E12',
  bgBase: '#0E0E12',
  surface1: '#17171E',
  surface2: '#1F1F29',

  // 30% — Secondary (text + neutral)
  textHi: '#EDEAF6',
  textMid: '#B3AFCA',
  textLo: '#7A7893',
  textDim: '#4E4C62',
  hairline: 'rgba(237, 234, 246, 0.08)',
  hairlineStrong: 'rgba(237, 234, 246, 0.14)',
  glassBorder: 'rgba(237, 234, 246, 0.10)',

  // 10% — Accent (purple only, desaturated for dark mode)
  accent: '#8B55FF',
  accentBright: '#A474FF',
  accentDeep: '#5E29D1',
  accentSoft: 'rgba(139, 85, 255, 0.14)',
  accentSofter: 'rgba(139, 85, 255, 0.08)',
  accentGlow: 'rgba(139, 85, 255, 0.35)',

  // States (use sparingly)
  danger: '#F26268',

  // Light mode (rarely used, dark-first app)
  white: '#FFFFFF',
  gray900: '#0E0E10',
  gray700: '#3A3A40',
  gray500: '#8A8A92',
  gray300: '#D4D4D8',
  gray100: '#F4F4F5',

  // DEPRECATED — kept only for migration safety, do not use in new code
  black: '#0E0E12',
  offBlack: '#17171E',
  surface: '#17171E',
  surfaceDim: '#17171E',
  surfaceRaised: '#1F1F29',
  purple900: '#5E29D1',
  purple700: '#5E29D1',
  purple500: '#8B55FF',
  purple400: '#A474FF',
  purple300: '#B892FF',
  purple200: '#D2B8FF',
  purple100: '#EADBFF',
  purple50: '#F7F0FF',
} as const;

export const theme = {
  dark: {
    bg: palette.bg,
    bgElevated: palette.surface1,
    bgRaised: palette.surface2,
    text: palette.textHi,
    textMuted: palette.textLo,
    textDim: palette.textDim,
    tint: palette.accent,
    border: palette.hairline,
    borderStrong: palette.hairlineStrong,
    accent: palette.accent,
    success: palette.accent,
  },
  light: {
    bg: palette.white,
    bgElevated: palette.gray100,
    bgRaised: palette.white,
    text: palette.gray900,
    textMuted: palette.gray500,
    textDim: palette.gray300,
    tint: palette.accent,
    border: palette.gray300,
    borderStrong: palette.gray500,
    accent: palette.accent,
    success: palette.accent,
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
  '4xl': 64,
  '5xl': 96,
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  '2xl': 36,
  full: 9999,
} as const;

export const fonts = {
  display: 'Fraunces_600SemiBold',
  displayBold: 'Fraunces_700Bold',
  displayItalic: 'Fraunces_600SemiBold_Italic',
  sans: 'PlusJakartaSans_400Regular',
  sansMedium: 'PlusJakartaSans_500Medium',
  sansSemiBold: 'PlusJakartaSans_600SemiBold',
  sansBold: 'PlusJakartaSans_700Bold',
} as const;

export const typography = {
  displayXL: { fontFamily: fonts.displayBold, fontSize: 42, lineHeight: 46, letterSpacing: -1.2 },
  display: { fontFamily: fonts.displayBold, fontSize: 32, lineHeight: 38, letterSpacing: -0.8 },
  displaySm: { fontFamily: fonts.display, fontSize: 24, lineHeight: 30, letterSpacing: -0.4 },
  heading: { fontFamily: fonts.sansSemiBold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2 },
  subheading: { fontFamily: fonts.sansMedium, fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: fonts.sans, fontSize: 16, lineHeight: 24 },
  bodyMedium: { fontFamily: fonts.sansMedium, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 18 },
  kicker: {
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 2.4,
  },
  numeric: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1,
  },
  button: { fontFamily: fonts.sansSemiBold, fontSize: 16, lineHeight: 22, letterSpacing: 0.2 },
} as const;

export const motion = {
  fast: 150,
  base: 260,
  slow: 480,
  breathe: 7000,
  press: { damping: 18, stiffness: 240 },
  pressGentle: { damping: 20, stiffness: 200 },
} as const;

export const shadows = {
  glow: {
    shadowColor: palette.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;
