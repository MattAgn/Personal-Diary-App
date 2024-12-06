/* eslint-disable react-native/no-inline-styles */
import { Camera, Check, PencilLine, Trash } from "@tamagui/lucide-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { Button, XStack } from "tamagui";

import { DiaryEntryDetails } from "@/components/DiaryEntryDetails";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import type { DiaryEntry } from "@/domain/DiaryEntry";
import { useDiaryEntryForm } from "@/hooks/useDiaryEntryForm";
import {
  diaryEntriesAtom,
  useCreateDiaryEntryAtom,
} from "@/store/diaryEntriesAtom";

import { DiaryEntryModalLayout } from "../../components/DiaryEntryModalLayout";

export default function DiaryEntry() {
  const { id, isEditing: isEditingParam } = useLocalSearchParams<{
    id: string;
    isEditing?: string;
  }>();
  const diaryEntryAtom = useCreateDiaryEntryAtom(id);

  const [entry, setEntry] = useAtom(diaryEntryAtom);
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);
  const { formData, formActions } = useDiaryEntryForm({
    title: entry?.title,
    content: entry?.content,
    media: entry?.media,
    labels: entry?.labels,
  });

  if (!entry) {
    return <Redirect href="/+not-found" />;
  }

  const isEditing = isEditingParam === "true";
  const setIsEditing = (value: boolean) => {
    router.setParams({ isEditing: value ? "true" : "false" });
  };

  const saveEdits = () => {
    setEntry(formData);
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

  if (isEditing) {
    return (
      <DiaryEntryModalLayout
        title={formattedDate}
        mainContent={<DiaryEntryForm {...formActions} {...formData} />}
        bottomActions={
          <>
            <Button
              onPress={formActions.pickImage}
              icon={Camera}
              color={"white"}
              backgroundColor={"$colorTransparent"}
              size={"$8"}
            />
            <Button
              onPress={saveEdits}
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
        }
      />
    );
  }

  return (
    <DiaryEntryModalLayout
      title={formattedDate}
      mainContent={<DiaryEntryDetails diaryEntry={entry} />}
      bottomActions={
        <XStack justifyContent="space-around">
          <Button
            onPress={() => setIsEditing(true)}
            icon={PencilLine}
            size={"$8"}
            color={"white"}
            backgroundColor={"$colorTransparent"}
          />
          <Button
            onPress={() => showDeleteAlert()}
            icon={Trash}
            size={"$8"}
            color={"red"}
            backgroundColor={"$colorTransparent"}
          />
        </XStack>
      }
    />
  );
}
