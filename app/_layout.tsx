/* eslint-disable @typescript-eslint/no-require-imports */
import "react-native-reanimated";
// important to import this before uuid which is used in the new-diary-entry screen
import "react-native-get-random-values";

import { useFonts } from "expo-font";
import type { ErrorBoundaryProps } from "expo-router";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Alert } from "react-native";
import { Button, Spacer, TamaguiProvider, Text, View } from "tamagui";

import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

import { tamaguiConfig } from "../tamagui.config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={"light"}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen
          name="settings"
          options={{ presentation: "modal", headerShown: false }}
        />
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
    </TamaguiProvider>
  );
}

export const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => {
  const [_, setDiaryEntries] = useAtom(diaryEntriesAtom);

  const resetStorage = () => {
    setDiaryEntries([]);
    Alert.alert("Your diary has been reset");
    void retry();
  };

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor={"red"}
    >
      <Text fontSize={"$7"}>Something went wrong</Text>
      <Spacer scaleY={"$2"} />
      <Text>{error.message}</Text>
      <Spacer scaleY={"$2"} />
      <Button onPress={retry}>Try Again?</Button>
      <Spacer scaleY={"$2"} />
      <Button onPress={resetStorage}>Empty storage and try again</Button>
    </View>
  );
};
