/* eslint-disable react-native/no-inline-styles */
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.darkLight }}
    >
      <JsStack.Screen options={{ header }} />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.dark }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "space-between",
          backgroundColor: Colors.dark,
        }}
        behavior="height"
        keyboardVerticalOffset={-BUTTONS_BOTTOM_BAR_HEIGHT}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {mainContent}
        </ScrollView>
        <BottomActionsBar>{bottomActions}</BottomActionsBar>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BottomActionsBar = styled(XStack, {
  justifyContent: "space-around",
  backgroundColor: "$darkLightBackground",
  paddingVertical: "$2",
  width: "100%",
  height: BUTTONS_BOTTOM_BAR_HEIGHT,
});

type DiaryEntryModalLayoutProps = {
  title: string;
  mainContent: React.ReactNode;
  bottomActions: React.ReactNode;
};
