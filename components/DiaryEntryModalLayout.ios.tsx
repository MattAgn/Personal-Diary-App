/* eslint-disable react-native/no-inline-styles */
import type React from "react";
import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react-native";
import { Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { styled, XStack } from "tamagui";

import { JsStack } from "@/app/_layout";
import { Colors } from "@/theme";

import { ModalHeader } from "./ModalHeader";

export const BUTTONS_BOTTOM_BAR_HEIGHT = 85;

export function DiaryEntryModalLayout({
  title,
  mainContent,
  bottomActions,
}: DiaryEntryModalLayoutProps) {
  const header = () => <ModalHeader title={title} />;
  const { bottom: safeBottomInset } = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardWillShow",
      (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.darkLight }}
    >
      <JsStack.Screen options={{ header }} />
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled
        extraScrollHeight={BUTTONS_BOTTOM_BAR_HEIGHT}
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: Colors.dark,
          paddingBottom: keyboardHeight > 0 ? 0 : BUTTONS_BOTTOM_BAR_HEIGHT,
        }}
      >
        {mainContent}
      </KeyboardAwareScrollView>
      <BottomActionsBar
        style={{
          bottom:
            keyboardHeight > 0 ? keyboardHeight - safeBottomInset + 20 : 0,
        }}
      >
        {bottomActions}
      </BottomActionsBar>
    </SafeAreaView>
  );
}

const BottomActionsBar = styled(XStack, {
  justifyContent: "space-around",
  backgroundColor: "$darkLightBackground",
  paddingVertical: "$2",
  height: BUTTONS_BOTTOM_BAR_HEIGHT,
  position: "absolute",
  left: 0,
  right: 0,
});

type DiaryEntryModalLayoutProps = {
  title: string;
  mainContent: React.ReactNode;
  bottomActions: React.ReactNode;
};
