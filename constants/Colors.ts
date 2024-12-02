/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#2C3E50", // Softer dark blue-gray, easier on eyes than pure black
    background: "#FFC09F", // Very light gray-white, warmer than pure white
    tint: "#7C5CBF", // Soft purple, creates a personal/thoughtful feeling
    icon: "#9BA3AF", // Muted gray, less harsh than original
    tabIconDefault: "#9BA3AF",
    tabIconSelected: "#7C5CBF",

    // Additional colors you might want for your diary app:
    cardBackground: "#FFFFFF", // Pure white for entry cards
    borderColor: "#E5E9F0", // Subtle borders
    placeholder: "#A0AEC0", // Soft gray for input placeholders
    highlight: "#E9ECFB", // Very light purple for selections/highlights
    accent: "#B794F4", // Lighter purple for secondary elements
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};
