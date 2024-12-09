/* eslint-disable react-native/no-inline-styles */
import { Camera, Check, Mic, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert } from "react-native";
import { v6 as uuidv6 } from "uuid";

import { AudioRecordingSheet } from "@/components/AudioRecordingSheet";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import { IconButton } from "@/components/IconButton";
import { useAudioRecording } from "@/hooks/useAudioRecording";
import { useDiaryEntryForm } from "@/hooks/useDiaryEntryForm";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

import { DiaryEntryModalLayout } from "../components/DiaryEntryModalLayout";

export default function NewDiaryEntry() {
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);
  const { formData, formActions } = useDiaryEntryForm();

  const [isRecordingSheetOpen, setIsRecordingSheetOpen] = useState(false);
  const { isRecording, startRecording, stopRecording, recordingToSave } =
    useAudioRecording();
  const createdAt = new Date();

  const isFormEmpty =
    formData.title.length === 0 &&
    formData.content.length === 0 &&
    formData.media === null &&
    recordingToSave === null;

  const handleSubmit = () => {
    if (isFormEmpty) {
      router.back();
      return;
    }

    setDiaryEntries([
      ...diaryEntries,
      {
        id: uuidv6(),
        createdAt,
        ...formData,
        audio: recordingToSave,
      },
    ]);
    router.back();
  };

  const handleCancel = () => {
    Alert.alert(
      "Cancel",
      "Are you sure you want to erase this entry? Your changes will not be saved.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: () => router.back() },
      ],
    );
  };

  const formattedDate = createdAt.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
              transparent
              onPress={formActions.pickImage}
              icon={Camera}
              bottomAction
            />
            <IconButton
              transparent
              onPress={() => setIsRecordingSheetOpen(true)}
              icon={Mic}
              bottomAction
            />
            <IconButton
              transparent
              onPress={handleSubmit}
              icon={Check}
              bottomAction
            />
            <IconButton
              transparent
              onPress={handleCancel}
              icon={X}
              bottomAction
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
