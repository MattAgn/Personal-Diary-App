/* eslint-disable react-native/no-inline-styles */
import type React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, styled, XStack, YStack } from "tamagui";

import { JsStack } from "@/app/_layout";

import { ModalHeader } from "./ModalHeader";

export const BUTTONS_BOTTOM_BAR_HEIGHT = 85;

export function DiaryEntryModalLayout({
  title,
  mainContent,
  bottomActions,
}: DiaryEntryModalLayoutProps) {
  const header = () => <ModalHeader title={title} />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : undefined}
    >
      <ContentContainer>
        <JsStack.Screen options={{ header }} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: "$4" }}>
          {mainContent}
        </ScrollView>

        <BottomActionsBar>{bottomActions}</BottomActionsBar>
      </ContentContainer>
    </KeyboardAvoidingView>
  );
}

const ContentContainer = styled(YStack, {
  justifyContent: "space-between",
  flex: 1,
  backgroundColor: "$background",
});

const BottomActionsBar = styled(XStack, {
  justifyContent: "space-around",
  backgroundColor: "$lightDarkBackground",
  height: BUTTONS_BOTTOM_BAR_HEIGHT,
  marginBottom: 0,
});

type DiaryEntryModalLayoutProps = {
  title: string;
  mainContent: React.ReactNode;
  bottomActions: React.ReactNode;
};
