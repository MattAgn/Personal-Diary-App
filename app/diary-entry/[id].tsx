/* eslint-disable react-native/no-inline-styles */
import { Camera, Check, Mic, PencilLine, Trash } from "@tamagui/lucide-icons";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert } from "react-native";

import { AudioRecordingSheet } from "@/components/AudioRecordingSheet";
import { DiaryEntryDetails } from "@/components/DiaryEntryDetails";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import { IconButton } from "@/components/IconButton";
import type { DiaryEntry } from "@/domain/DiaryEntry";
import { useAudioRecording } from "@/hooks/useAudioRecording";
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

  const { isRecording, startRecording, stopRecording, recordingToSave } =
    useAudioRecording();
  const [isRecordingSheetOpen, setIsRecordingSheetOpen] = useState(false);

  if (!entry) {
    return <Redirect href="/+not-found" />;
  }

  const isEditing = isEditingParam === "true";
  const setIsEditing = (value: boolean) => {
    router.setParams({ isEditing: value ? "true" : "false" });
  };

  const saveEdits = () => {
    setEntry({ ...formData, audio: recordingToSave });
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
      <>
        <DiaryEntryModalLayout
          title={formattedDate}
          mainContent={
            <DiaryEntryForm
              {...formActions}
              {...formData}
              audio={recordingToSave}
            />
          }
          bottomActions={
            <>
              <IconButton
                onPress={formActions.pickImage}
                icon={Camera}
                transparent
                bottomAction
              />
              <IconButton
                onPress={() => setIsRecordingSheetOpen(true)}
                icon={Mic}
                transparent
                bottomAction
              />
              <IconButton
                onPress={saveEdits}
                icon={Check}
                transparent
                bottomAction
              />
              <IconButton
                onPress={() => showDeleteAlert()}
                icon={Trash}
                transparent
                bottomAction
                color="$danger"
              />
            </>
          }
        />

        <AudioRecordingSheet
          isSheetOpen={isRecordingSheetOpen}
          setIsSheetOpen={setIsRecordingSheetOpen}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
        />
      </>
    );
  }

  return (
    <DiaryEntryModalLayout
      title={formattedDate}
      mainContent={<DiaryEntryDetails diaryEntry={entry} />}
      bottomActions={
        <>
          <IconButton
            onPress={() => setIsEditing(true)}
            icon={PencilLine}
            transparent
            bottomAction
          />
          <IconButton
            onPress={() => showDeleteAlert()}
            destructive
            icon={Trash}
            transparent
            bottomAction
          />
        </>
      }
    />
  );
}
