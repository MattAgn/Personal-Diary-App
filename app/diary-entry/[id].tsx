import { PencilLine, Save, Trash } from "@tamagui/lucide-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Input, Spacer, styled, Text, XStack } from "tamagui";

import { LabelPill } from "@/components/LabelPill";
import {
  diaryEntriesAtom,
  useCreateDiaryEntryAtom,
} from "@/store/diaryEntriesAtom";

export default function DiaryEntry() {
  const { id, isEditing: isEditingParam } = useLocalSearchParams<{
    id: string;
    isEditing?: string;
  }>();
  const diaryEntryAtom = useCreateDiaryEntryAtom(id);

  const [entry, setEntry] = useAtom(diaryEntryAtom);
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);
  const [content, setContent] = useState(entry?.content);

  const isEditing = isEditingParam === "true";
  const setIsEditing = (value: boolean) => {
    router.setParams({ isEditing: value ? "true" : "false" });
  };

  const saveEdits = () => {
    setEntry({ content });
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

  return (
    <StyledSafeAreaView>
      <Stack.Screen
        options={{
          title: entry?.createdAt.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        }}
      />
      <Spacer scaleY={1} />
      <Text fontWeight="bold" fontSize={"$5"}>
        {entry?.title}
      </Text>
      <Spacer scaleY={1} />
      <XStack gap={"$2"} flexWrap="wrap">
        {entry?.labels.map((label) => <LabelPill key={label} label={label} />)}
      </XStack>
      <Spacer scaleY={1} />
      {isEditing ? (
        <Input
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
          numberOfLines={20}
          backgroundColor={"$colorTransparent"}
        />
      ) : (
        <Text>{entry?.content}</Text>
      )}
      <Spacer scaleY={1} />

      <Spacer scaleY={1} />
      {entry?.media && (
        <Image
          source={{ uri: entry.media }}
          width={200}
          height={200}
          alignSelf="center"
        />
      )}
      {isEditing ? (
        <Button onPress={() => saveEdits()} icon={Save}>
          Save
        </Button>
      ) : (
        <Button onPress={() => setIsEditing(true)} icon={PencilLine}>
          Edit
        </Button>
      )}
      <Button onPress={() => showDeleteAlert()} color={"red"} icon={Trash}>
        Delete
      </Button>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  paddingHorizontal: 16,
});
