/* eslint-disable react-native/no-inline-styles */
import { Camera, Check, X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "tamagui";
import { v6 as uuidv6 } from "uuid";

import { AudioRecordingSheet } from "@/components/AudioRecordingSheet";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import { iconActionButtonProps } from "@/components/IconButton";
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
            <Button
              {...iconActionButtonProps}
              onPress={formActions.pickImage}
              icon={Camera}
            />
            <Button
              {...iconActionButtonProps}
              onPress={() => setIsRecordingSheetOpen(true)}
            />
            <Button
              {...iconActionButtonProps}
              onPress={handleSubmit}
              icon={Check}
            />
            <Button
              {...iconActionButtonProps}
              onPress={handleCancel}
              icon={X}
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
