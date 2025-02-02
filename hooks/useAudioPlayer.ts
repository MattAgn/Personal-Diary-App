import type { AVPlaybackStatus } from "expo-av";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";

import type { AudioRecording } from "@/domain/DiaryEntry";

export const useAudioPlayer = (audio: AudioRecording) => {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: audio.uri,
      });
      setSound(newSound);
    };

    void loadSound();
  }, [audio.uri]);

  useEffect(() => {
    return () => {
      void sound?.unloadAsync();
    };
  }, [sound]);

  const handlePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  useEffect(() => {
    if (!sound) return;

    const onPlaybackStatusUpdate = async (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;

      // Update playing state
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish) {
        setIsPlaying(false);
        // Stop the playback and reset position
        await sound.stopAsync();
        await sound.setPositionAsync(0);
      }
    };

    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  }, [sound]);

  return {
    isPlaying,
    handlePlayPause,
    isReady: !!sound,
  };
};
