import { Audio } from "expo-av";
import { useState } from "react";
import { Alert } from "react-native";

import type { AudioRecording } from "@/domain/DiaryEntry";

/**
 * @warning On the Android emulator, you need to enable 'virtual microphone uses host audio input'
 * in the developer options. Otherwise the audio will not be recorded.
 */
export const useAudioRecording = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingToSave, setRecordingToSave] = useState<AudioRecording | null>(
    null,
  );

  const startRecording = async () => {
    try {
      if ((await Audio.getPermissionsAsync()).status !== "granted") {
        const result = await Audio.requestPermissionsAsync();
        if (result.status !== "granted") {
          Alert.alert(
            "Error",
            "Microphone permission not granted, you won't be able to record audio with the app.",
          );
          return;
        }
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const result = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(result.recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      // important to get the duration before stopping the recording
      // otherwise it will be 0 because the recording is reset as soon as it's stopped
      // https://github.com/expo/expo/issues/17909
      const { durationMillis } = await recording.getStatusAsync();
      await recording.stopAndUnloadAsync();
      const duration = Math.round(durationMillis / 1000);
      const uri = recording.getURI();
      if (!uri) throw new Error("Recording URI not found");
      setRecordingToSave({ duration, uri });
    } catch (err) {
      console.error("Failed to stop recording", err);
      return null;
    } finally {
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    startRecording,
    stopRecording,
    recordingToSave,
  };
};
