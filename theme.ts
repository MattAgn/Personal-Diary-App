import { config } from "@tamagui/config/v3";
import { createTamagui, createTokens } from "tamagui";

export const Colors = {
  dark: "#1C1C1E",
  darkLight: "#28282A",
  purpleLight: "#5C3A65",
  purpleDark: "#0E1020",
  purple: "#30213E",
  accent: "#5E5CE5",
  accentLight: "#B794F4",
  white: "#FFFFFF",
  greyPurple: "#473D51",
  greyLight: "#D4D4D4",
  red: "#F00",
};

const tokens = createTokens({
  ...config.tokens,
  color: {
    ...config.tokens.color,
    ...Colors,
  },
});

export const theme = createTamagui({
  ...config,
  tokens,
  themes: {
    dark: {
      // Background colors
      background: Colors.dark,
      darkLightBackground: Colors.darkLight,
      greyPurpleBackground: Colors.greyPurple,
      purpleBackground: Colors.purple,
      accentBackground: Colors.accent,
      // Text colors
      color: Colors.white, // default text color
      darkText: Colors.dark,
      greyText: Colors.greyLight,
      // Other colors
      danger: Colors.red,
      colorTransparent: "transparent",
      borderColorFocus: "transparent",
      placeholderColor: Colors.greyLight,
    },
    light: config.themes.light, // not used
  },
});
