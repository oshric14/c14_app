/**
 * Design tokens — single source of truth for styling.
 *
 * Derived from the web front (now14_frontend): brand colors come from
 * `tailwind.config.ts`, fonts/backgrounds from `app/globals.css`.
 *
 * NOTE: the brand colors + font family are also mirrored in
 * `tailwind.config.js` so NativeWind `className` utilities work
 * (e.g. `bg-brand-blue`, `font-brand`). Keep the two in sync.
 */

export const colors = {
  /** Core brand palette (from the web tailwind config). */
  brand: {
    blue: "#141533", // NowBlue — primary navy
    blueLighter: "#0C0E55", // NowBlueLighter
    blueDeep: "#090840", // gradient end / deep navy
    red: "#E01F26", // NowRed — accent / live / CTA
    redDark: "#CF171E",
    redLight: "#F0444A",
    gray: "#D8D8D8", // NowGray
  },
  text: {
    primary: "#141533",
    onDark: "#FFFFFF",
    muted: "#60646C",
  },
  background: {
    light: "#FFFFFF",
    dark: "#000000",
    scrollTrack: "#E6EBEF",
  },
  /** Weather widget accents (from globals.css). */
  weather: {
    raindrop: "#2885C7",
    raindropDark: "#1D4ED8",
    raindropAccent: "#60A5FA",
  },
  splash: "#208AEF", // app.json splash background
} as const;

/** Brand font family. Must be loaded via expo-font before it renders. */
export const fonts = {
  brand: "SimonaPro",
} as const;

/** SimonaPro weights as they exist on the web. */
export const fontWeights = {
  thin: "200",
  regular: "400",
  medium: "500",
  bold: "600",
  black: "800",
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
} as const;

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const layout = {
  maxContentWidth: 1350, // matches the web `app` max-width
} as const;

/** Navy gradient stops (web `NowBlueGradient`, 180deg). */
export const gradients = {
  navy: ["transparent", "#090840"] as const,
} as const;

export const tokens = {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  spacing,
  radius,
  layout,
  gradients,
} as const;

export type Tokens = typeof tokens;
