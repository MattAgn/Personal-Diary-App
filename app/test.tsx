import { Check, Minus, Plus, X } from "@tamagui/lucide-icons";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, XStack, YStack } from "tamagui";

import { ActionSheet } from "@/components/ActionSheet";
import { IconButton } from "@/components/IconButton";
import { ModalHeader } from "@/components/ModalHeader";

import { JsStack } from "./_layout";

export default function HomeScreen() {
  const [displayText, setDisplayText] = useState("Press a button");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const header = () => <ModalHeader title="Test" />;

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ backgroundColor: "transparent", flex: 1 }}
    >
      <JsStack.Screen options={{ header }} />
      <YStack
        f={1}
        ai="center"
        jc="center"
        space="$4"
        backgroundColor={"$background"}
      >
        <Text fontSize="$6">{displayText}</Text>

        <XStack gap="$4">
          <IconButton
            transparent
            icon={Plus}
            onPress={() => setDisplayText("+++++")}
          />
          <IconButton
            transparent
            icon={Minus}
            onPress={() => {
              setIsSheetOpen(true);
              setDisplayText("----");
            }}
          />
          <IconButton
            transparent
            icon={X}
            onPress={() => setDisplayText("XXXXX")}
          />
          <IconButton
            transparent
            icon={Check}
            onPress={() => setDisplayText("VVVVVVVVV")}
          />
        </XStack>
        <ActionSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          onDelete={() => {}}
          onEdit={() => {}}
        ></ActionSheet>
      </YStack>
    </SafeAreaView>
  );
}
