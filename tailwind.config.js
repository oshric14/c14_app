/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Keep in sync with src/theme/tokens.ts
      colors: {
        brand: {
          blue: "#141533",
          blueLighter: "#0C0E55",
          blueDeep: "#090840",
          red: "#E01F26",
          redDark: "#CF171E",
          redLight: "#F0444A",
          gray: "#D8D8D8",
        },
      },
      fontFamily: {
        brand: ["SimonaPro"],
      },
      maxWidth: {
        app: "1350px",
      },
    },
  },
  plugins: [],
};
