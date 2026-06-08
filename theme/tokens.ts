/**
 * Design tokens — دليل إجراءات الوفاة
 *
 * Visual identity: a calm Moroccan riad courtyard rendered as a civic,
 * trustworthy public-service interface. Warm off-white plaster, sandstone,
 * muted olive and cedar green, dark slate ink, brass used sparingly.
 *
 * The palette is intentionally low-saturation and warm so the app reads as
 * respectful and never alarming, while still surfacing clear system states.
 */

export const palette = {
  // Surfaces — plaster, sandstone, stone
  plaster: '#F6F1E7', // warm off-white (primary background)
  sand: '#EFE7D6', // light beige surface
  sandDeep: '#E5D9C3', // pressed / nested surface
  paper: '#FBF8F1', // cards, raised surfaces
  hairline: '#DED2BC', // subtle borders / zellige lines

  // Greens — muted olive → cedar
  olive: '#7C7A4E',
  oliveSoft: '#9A9869',
  cedar: '#2F4A3C', // deep green, primary brand
  cedarDeep: '#22382C',
  cedarSoft: '#EAF0EA',

  // Ink — dark slate
  slate: '#27313A', // primary text
  slateMuted: '#566069', // secondary text
  slateFaint: '#8A929A', // tertiary text / captions

  // Brass / copper — accents, used very sparingly
  brass: '#A9853F',
  brassSoft: '#F1E7D2',

  // Pure
  white: '#FFFFFF',
  shadow: '#27313A',
} as const;

/**
 * System states. Each state has a strong tone (text/icon), a soft tone
 * (background fill) and a line tone (border) so badges and banners stay
 * legible and calm at every size.
 */
export const states = {
  info: { tone: '#3A6A7A', soft: '#E4EEF1', line: '#C4DCE3', label: 'معلومة' },
  warning: { tone: '#9A6B1E', soft: '#F6ECD6', line: '#E6D2A8', label: 'تنبيه' },
  urgent: { tone: '#9E4B36', soft: '#F6E3DD', line: '#E6C3B7', label: 'عاجل' },
  judicial: { tone: '#5A4A86', soft: '#EAE6F4', line: '#D0C7E6', label: 'مسطرة قضائية' },
  completed: { tone: '#3C6B4E', soft: '#E3F0E7', line: '#C2DECB', label: 'مُنجز' },
  required: { tone: '#7C6A2E', soft: '#F2ECD7', line: '#DECFA4', label: 'وثيقة مطلوبة' },
  transfer: { tone: '#3F6273', soft: '#E5EEF2', line: '#C5D9E1', label: 'متعلق بالنقل' },
  abroad: { tone: '#6B5240', soft: '#F0E7DC', line: '#DCC9B4', label: 'متعلق بالخارج' },
  neutral: { tone: '#566069', soft: '#ECE5D6', line: '#D6CAB4', label: '' },
} as const;

export type StateKey = keyof typeof states;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
  // A flattened horseshoe arch radius used for hero motifs.
  arch: 120,
} as const;

/**
 * Typography. We deliberately avoid decorative display Arabic faces.
 * The app ships with Cairo (a clean, geometric, highly legible Arabic UI
 * face) and falls back to the platform system Arabic font. Sizes follow a
 * calm modular scale; line-heights are generous for Arabic readability.
 */
export const fonts = {
  regular: 'Cairo_400Regular',
  medium: 'Cairo_500Medium',
  semibold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
} as const;

export const type = {
  display: { fontFamily: fonts.bold, fontSize: 30, lineHeight: 44 },
  h1: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 38 },
  h2: { fontFamily: fonts.semibold, fontSize: 20, lineHeight: 32 },
  h3: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 28 },
  bodyStrong: { fontFamily: fonts.semibold, fontSize: 15, lineHeight: 26 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 26 },
  small: { fontFamily: fonts.medium, fontSize: 13, lineHeight: 22 },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 20 },
  badge: { fontFamily: fonts.semibold, fontSize: 12, lineHeight: 16 },
} as const;

/**
 * Elevation. Soft, warm, low shadows — like daylight in a courtyard,
 * never harsh. Android uses elevation; iOS uses the shadow object.
 */
export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  card: {
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  raised: {
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
} as const;

/**
 * Motion tokens — applying Emil Kowalski's discipline: motion is spring-led,
 * short, and purposeful. Durations are in ms; springs are gentle and never
 * bouncy enough to feel playful.
 */
export const motion = {
  duration: {
    instant: 120,
    fast: 200,
    base: 320,
    slow: 480,
    reveal: 620,
  },
  spring: {
    gentle: { damping: 18, stiffness: 160, mass: 1 },
    soft: { damping: 22, stiffness: 120, mass: 1 },
    press: { damping: 15, stiffness: 320, mass: 0.9 },
  },
  // Standard easing for fades / opacity (cubic, calm ease-out).
  ease: [0.22, 0.61, 0.36, 1] as const,
} as const;

export const layout = {
  screenPadding: spacing.xl,
  maxContentWidth: 560,
  hitSlop: { top: 8, bottom: 8, left: 8, right: 8 },
} as const;
