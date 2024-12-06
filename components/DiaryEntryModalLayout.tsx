/* eslint-disable react-native/no-inline-styles */
import type React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  Spacer,
  styled,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

type DiaryEntryModalLayoutProps = {
  title: string;
  mainContent: React.ReactNode;
  bottomActions: React.ReactNode;
};

const BUTTONS_BOTTOM_BAR_HEIGHT = 85;

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
        <YStack justifyContent="space-between" flex={1}>
          <ScrollView>
            <View paddingHorizontal="$4">
              <XStack justifyContent="center" padding="$4">
                <Text color="white" fontSize="$7">
                  {title}
                </Text>
              </XStack>

              <Spacer scaleY="$2" />
              {mainContent}
              <Spacer scaleY="$2" />
            </View>
          </ScrollView>

          <XStack
            justifyContent="space-around"
            backgroundColor="#28282A"
            height={BUTTONS_BOTTOM_BAR_HEIGHT}
            marginBottom={0}
          >
            {bottomActions}
          </XStack>
        </YStack>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  backgroundColor: "#1C1C1E",
});
