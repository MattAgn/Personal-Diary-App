/* eslint-disable @typescript-eslint/no-require-imports */
import "react-native-reanimated";
// important to import this before uuid which is used in the new-diary-entry screen
import "react-native-get-random-values";

import type {
  ParamListBase,
  StackNavigationState,
} from "@react-navigation/native";
import type {
  StackNavigationEventMap,
  StackNavigationOptions,
} from "@react-navigation/stack";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { useFonts } from "expo-font";
import type { ErrorBoundaryProps } from "expo-router";
import { Stack, withLayoutContext } from "expo-router";
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
    <TamaguiProvider config={tamaguiConfig} defaultTheme={"dark"}>
      <JsStack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <JsStack.Screen name="settings" options={modalOptions} />
        <JsStack.Screen name="new-diary-entry" options={modalOptions} />
        <JsStack.Screen name="diary-entry/[id]" options={modalOptions} />
      </JsStack>
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
      backgroundColor="$danger"
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

const { Navigator } = createStackNavigator();

/**
 * This is a workaround to use the modal transition as in ios because native android modal does not behave like a modal
 * Comes from https://github.com/expo/router/issues/640
 */
const modalOptions: StackNavigationOptions = {
  ...TransitionPresets.ModalPresentationIOS,
  presentation: "modal",
  gestureEnabled: true,
};

export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);
