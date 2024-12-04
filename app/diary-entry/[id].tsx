import { PencilLine, Trash } from "@tamagui/lucide-icons";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spacer, styled } from "tamagui";

import { DiaryEntryDetails } from "@/components/DiaryEntryDetails";
import type { DiaryEntryFormData } from "@/components/DiaryEntryForm";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import type { DiaryEntry } from "@/domain/DiaryEntry";
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

      {!isEditing ? (
        <Button onPress={() => setIsEditing(true)} icon={PencilLine}>
          Edit
        </Button>
      ) : null}
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
