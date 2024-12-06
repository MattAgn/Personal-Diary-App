/* eslint-disable react-native/no-inline-styles */
import { Camera, Check, PencilLine, Trash } from "@tamagui/lucide-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spacer, styled, Text, View, XStack, YStack } from "tamagui";

import { DiaryEntryDetails } from "@/components/DiaryEntryDetails";
import type { DiaryEntryFormData } from "@/components/DiaryEntryForm";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import type { DiaryEntry } from "@/domain/DiaryEntry";
import {
  diaryEntriesAtom,
  useCreateDiaryEntryAtom,
} from "@/store/diaryEntriesAtom";

const BOTTONS_BOTTOM_BAR_HEIGHT = 85;

export default function DiaryEntry() {
  const { id, isEditing: isEditingParam } = useLocalSearchParams<{
    id: string;
    isEditing?: string;
  }>();
  const diaryEntryAtom = useCreateDiaryEntryAtom(id);

  const [entry, setEntry] = useAtom(diaryEntryAtom);
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);

  if (!entry) {
    return <Redirect href="/+not-found" />;
  }

  const isEditing = isEditingParam === "true";
  const setIsEditing = (value: boolean) => {
    router.setParams({ isEditing: value ? "true" : "false" });
  };

  const saveEdits = (updatedEntry: DiaryEntryFormData) => {
    setEntry(updatedEntry);
    setIsEditing(false);
  };

  const deleteEntry = () => {
    setDiaryEntries(
      diaryEntries.filter((currentEntry) => currentEntry.id !== id),
    );
    router.back();
  };

  const showDeleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteEntry(),
      },
    ]);
  };

  const formattedDate = entry.createdAt.toLocaleDateString("en-US", {
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
              {isEditing ? (
                <DiaryEntryForm
                  initialTitle={entry.title}
                  initialContent={entry.content}
                  initialMedia={entry.media}
                  initialLabels={entry.labels}
                  onSubmit={saveEdits}
                />
              ) : (
                <DiaryEntryDetails diaryEntry={entry} />
              )}

              <Spacer scaleY={"$2"} />
            </View>
          </ScrollView>
          <XStack
            justifyContent="space-around"
            backgroundColor={"#28282A"}
            height={BOTTONS_BOTTOM_BAR_HEIGHT}
            marginBottom={0}
          >
            {!isEditing ? (
              <>
                <Button
                  onPress={() => setIsEditing(true)}
                  icon={PencilLine}
                  color={"white"}
                  backgroundColor={"$colorTransparent"}
                  size={"$8"}
                />
                <Button
                  onPress={() => showDeleteAlert()}
                  color={"red"}
                  backgroundColor={"$colorTransparent"}
                  icon={Trash}
                  size={"$8"}
                />
              </>
            ) : (
              <>
                <Button
                  onPress={() => saveEdits(entry)}
                  icon={Camera}
                  color={"white"}
                  backgroundColor={"$colorTransparent"}
                  size={"$8"}
                />
                <Button
                  onPress={() => saveEdits(entry)}
                  icon={Check}
                  color={"white"}
                  backgroundColor={"$colorTransparent"}
                  size={"$8"}
                />
                <Button
                  onPress={() => showDeleteAlert()}
                  color={"red"}
                  backgroundColor={"$colorTransparent"}
                  icon={Trash}
                  size={"$8"}
                />
              </>
            )}
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
