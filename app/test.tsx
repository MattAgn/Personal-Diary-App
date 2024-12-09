/* eslint-disable react-native/no-inline-styles */
import { Minus, Plus, X } from "@tamagui/lucide-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, styled, Text, XStack, YStack } from "tamagui";

import { IconButton } from "@/components/IconButton";
import { ModalHeader } from "@/components/ModalHeader";
import { Colors } from "@/theme";

import { JsStack } from "./_layout";

/**
 * This is a test screen to test the bottom actions bar
 */
export default function TestScreen() {
  const [displayText, setDisplayText] = useState("Press a button");

  const header = () => <ModalHeader title="Test" />;

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: Colors.darkLight }}
    >
      <ContentContainer>
        <JsStack.Screen options={{ header }} />
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: "$1",
            backgroundColor: "grey",
          }}
        >
          <Text fontSize="$6">{displayText}</Text>
        </ScrollView>

        <BottomActionsBar>
          {displayText === "XXXXXXX" ? (
            <XStack gap="$8" justifyContent="space-between">
              <IconButton
                transparent
                bottomAction
                icon={Minus}
                onPress={() => setDisplayText("----")}
              />
              <IconButton
                transparent
                bottomAction
                icon={Plus}
                onPress={() => setDisplayText("+++++")}
              />
              <IconButton
                transparent
                bottomAction
                icon={X}
                onPress={() => setDisplayText("XXXXXXX")}
              />
            </XStack>
          ) : (
            <XStack>
              <IconButton
                transparent
                bottomAction
                icon={X}
                onPress={() => setDisplayText("XXXXXXX")}
              />
            </XStack>
          )}
        </BottomActionsBar>
      </ContentContainer>
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
