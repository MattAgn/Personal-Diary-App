/* eslint-disable react-native/no-inline-styles */
import type React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Spacer, styled, Text, XStack, YStack } from "tamagui";

export const BUTTONS_BOTTOM_BAR_HEIGHT = 85;

export function DiaryEntryModalLayout({
  title,
  mainContent,
  bottomActions,
}: DiaryEntryModalLayoutProps) {
  return (
    <StyledSafeAreaView edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : undefined}
      >
        <ContentContainer>
          <ScrollView paddingHorizontal="$4">
            <HeaderContainer>
              <HeaderText>{title}</HeaderText>
            </HeaderContainer>

            <Spacer scaleY="$2" />
            {mainContent}
            <Spacer scaleY="$2" />
          </ScrollView>

          <BottomActionsBar>{bottomActions}</BottomActionsBar>
        </ContentContainer>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
const ContentContainer = styled(YStack, {
  justifyContent: "space-between",
  flex: 1,
});

const HeaderText = styled(Text, {
  color: "white",
  fontSize: "$7",
});

const HeaderContainer = styled(XStack, {
  justifyContent: "center",
  padding: "$4",
});

const BottomActionsBar = styled(XStack, {
  justifyContent: "space-around",
  backgroundColor: "#28282A",
  height: BUTTONS_BOTTOM_BAR_HEIGHT,
  marginBottom: 0,
});

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  backgroundColor: "#1C1C1E",
});

type DiaryEntryModalLayoutProps = {
  title: string;
  mainContent: React.ReactNode;
  bottomActions: React.ReactNode;
};
