/* eslint-disable react-native/no-inline-styles */
import type React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, styled, XStack, YStack } from "tamagui";

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

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.darkLight }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 160 : undefined}
      >
        <ContentContainer>
          <JsStack.Screen options={{ header }} />
          <ScrollView contentContainerStyle={{ paddingHorizontal: "$1" }}>
            {mainContent}
          </ScrollView>

          <BottomActionsBar>{bottomActions}</BottomActionsBar>
        </ContentContainer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ContentContainer = styled(YStack, {
  justifyContent: "space-between",
  flex: 1,
  backgroundColor: "$background",
});

const BottomActionsBar = styled(XStack, {
  justifyContent: "space-around",
  backgroundColor: "$darkLightBackground",
  paddingTop: "$2",
});

type DiaryEntryModalLayoutProps = {
  title: string;
  mainContent: React.ReactNode;
  bottomActions: React.ReactNode;
};
