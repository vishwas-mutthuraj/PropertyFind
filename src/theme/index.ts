export const Colors = {
  bg: '#0F0F13',
  surface: '#18181F',
  surface2: '#22222C',
  surface3: '#2C2C38',
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.12)',
  text: '#F0EEF8',
  text2: '#9896A8',
  text3: '#5C5A6E',
  accent: '#7C6EF5',
  accent2: '#A89AF9',
  accentBg: 'rgba(124,110,245,0.14)',
  accentBorder: 'rgba(124,110,245,0.3)',
  green: '#4ADE80',
  greenBg: 'rgba(74,222,128,0.1)',
  amber: '#FBBF24',
  amberBg: 'rgba(251,191,36,0.1)',
  red: '#F87171',
 
  overlay: 'rgba(0,0,0,0.9)',
  sheetBg: '#1C1C25',
  gBlue: ['#1E3A5F', '#4A7FAD'] as [string, string],
  gGreen: ['#1A3D2B', '#4A9060'] as [string, string],
  gRose: ['#4A1530', '#A85070'] as [string, string],
  gGold: ['#3D2B0A', '#B8850A'] as [string, string],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 16,
  full: 999,
};

export const Typography = {
  appLogo: { fontSize: 22, fontWeight: '700' as const },
  h1: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h2: { fontSize: 15, fontWeight: '600' as const },
  body: { fontSize: 13, fontWeight: '400' as const, lineHeight: 20 },
  small: { fontSize: 11, fontWeight: '400' as const },
  label: { fontSize: 10, fontWeight: '600' as const, letterSpacing: 0.12 },
  price: { fontSize: 20, fontWeight: '700' as const },
  priceLg: { fontSize: 32, fontWeight: '700' as const },
};
