/**
 * MAGGIE visual theme — "cozy science notebook + friendly health quest".
 *
 * Source palette (locked for Demo 1):
 *   #c17145 #7bdfd9 #234f3f #6e3c3b #a15345 #df9867
 *   #578e49 #51b5a6 #b7f2ea #7ea953 #1f1615
 *
 * Keep these values centralized — screens and components must read from here
 * rather than hardcoding hex, so the look stays consistent and re-themable.
 */

export const palette = {
  clay: '#c17145',
  aqua: '#7bdfd9',
  pine: '#234f3f',
  cocoa: '#6e3c3b',
  rust: '#a15345',
  peach: '#df9867',
  leaf: '#578e49',
  teal: '#51b5a6',
  mint: '#b7f2ea',
  olive: '#7ea953',
  espresso: '#1f1615',
  cream: '#fff7e8',
  ribbonBlue: '#2f7fe5',
  white: '#ffffff',
} as const;

export const colors = {
  background: palette.mint, // #b7f2ea pale mint
  surface: palette.cream, // #fff7e8 warm cream card
  surfaceAlt: '#f3ead2', // slightly deeper cream for nested rows
  text: palette.espresso, // #1f1615 dark espresso
  textMuted: '#5c4e44',
  primary: palette.pine, // #234f3f deep green buttons
  primaryText: palette.cream,
  accentTeal: palette.teal, // #51b5a6
  mint: palette.mint, // #b7f2ea selection / soft fill
  clay: palette.clay, // #c17145 warmth
  peach: palette.peach,
  border: palette.cocoa, // #6e3c3b chunky borders
  warning: palette.rust, // #a15345
  success: palette.leaf, // #578e49
  ribbonBlue: palette.ribbonBlue,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

/** Chunky pixel-game card border shared across surfaces. */
export const cardBorder = {
  borderWidth: 3,
  borderColor: colors.border,
  borderRadius: radius.lg,
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '800' as const, color: colors.text },
  heading: { fontSize: 20, fontWeight: '700' as const, color: colors.text },
  subheading: { fontSize: 16, fontWeight: '700' as const, color: colors.text },
  body: { fontSize: 15, lineHeight: 22, color: colors.text },
  small: { fontSize: 13, lineHeight: 19, color: colors.textMuted },
  button: { fontSize: 17, fontWeight: '800' as const },
} as const;

/** Soft pixel-card shadow (kept subtle; RN shadow + Android elevation). */
export const shadow = {
  shadowColor: palette.espresso,
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.18,
  shadowRadius: 0,
  elevation: 3,
} as const;

export const theme = {
  palette,
  colors,
  radius,
  spacing,
  cardBorder,
  typography,
  shadow,
} as const;

export type MaggieTheme = typeof theme;
export default theme;
