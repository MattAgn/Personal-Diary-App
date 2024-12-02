/* eslint-disable @typescript-eslint/no-require-imports */
import "react-native-reanimated";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";

import { useColorScheme } from "@/hooks/useColorScheme";

import { tamaguiConfig } from "../tamagui.config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !colorScheme) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="new-diary-entry"
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen
            name="diary-entry/[id]"
            options={{
              presentation: "modal",
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
