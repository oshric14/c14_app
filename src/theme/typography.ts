/**
 * SimonaPro family names as registered in `src/app/_layout.tsx` via `useFonts`.
 * Use these for the `fontFamily` style so headings pick the right weight cut
 * (NativeWind's `font-bold` can't select a custom-font weight on its own).
 */
export const fontFamily = {
  regular: "SimonaPro",
  medium: "SimonaPro-Medium",
  bold: "SimonaPro-Bold",
  black: "SimonaPro-Black",
} as const;
