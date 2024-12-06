/* eslint-disable react-native/no-inline-styles */
import { Camera, Save, Trash } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  ScrollView,
  Spacer,
  styled,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { v6 as uuidv6 } from "uuid";

import type { DiaryEntryFormData } from "@/components/DiaryEntryForm";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

const BOTTONS_BOTTOM_BAR_HEIGHT = 85;

export default function NewDiaryEntry() {
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);

  const createdAt = new Date();
  const handleSubmit = (data: DiaryEntryFormData) => {
    setDiaryEntries([
      ...diaryEntries,
      {
        id: uuidv6(),
        createdAt,
        ...data,
        media: data.media,
      },
    ]);
    router.back();
  };

  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <StyledSafeAreaView edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : undefined}
      >
        <YStack justifyContent="space-between" flex={1}>
          <ScrollView>
            <View paddingHorizontal={"$4"}>
              <XStack justifyContent="center" padding="$4">
                <Text color="white" fontSize={"$7"}>
                  {formattedDate}
                </Text>
              </XStack>

              <Spacer scaleY={"$2"} />

              <DiaryEntryForm onSubmit={handleSubmit} />

              <Spacer scaleY={"$2"} />
            </View>
          </ScrollView>
          <XStack
            justifyContent="space-around"
            backgroundColor={"#28282A"}
            height={BOTTONS_BOTTOM_BAR_HEIGHT}
            marginBottom={0}
          >
            <Button
              onPress={() => {}}
              icon={Camera}
              color={"white"}
              backgroundColor={"$colorTransparent"}
              size={"$8"}
            />
            <Button
              onPress={() => {}}
              icon={Save}
              color={"white"}
              backgroundColor={"$colorTransparent"}
              size={"$8"}
            />
            <Button
              onPress={() => {}}
              color={"red"}
              backgroundColor={"$colorTransparent"}
              icon={Trash}
              size={"$8"}
            />
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
