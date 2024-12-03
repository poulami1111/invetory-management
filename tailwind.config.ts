import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";
import type { DefaultColors } from "tailwindcss/types/generated/colors";
const baseColors = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "pink",
];

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
};



const generateThemeObject = (
  colors: DefaultColors,
  mapping: Record<string, string>,
  invert = false
) => {
  const theme: Record<string, Record<string, string>> = {};

  baseColors.forEach((color) => {
    // Assert that the color exists in DefaultColors
    if (color in colors) {
      const colorShades = colors[color as keyof DefaultColors];
      if (typeof colorShades === "object" && colorShades !== null) {
        theme[color] = {};
        Object.entries(mapping).forEach(([key, value]) => {
          const shadeKey = invert ? value : key;
          theme[color][key] = colorShades[shadeKey as keyof typeof colorShades] as string;
        });
      }
    }
  });

  return theme; // Ensure the theme object is returned
};

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [createThemes(themes)],
} satisfies Config;

export default config;
