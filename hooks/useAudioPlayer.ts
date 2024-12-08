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

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) return;

      if (status.didJustFinish) {
        setIsPlaying(false);
        sound
          .setPositionAsync(0)
          .catch((e) => console.error("Error resetting sound", e));
      }
    });
  }, [sound]);

  return {
    isPlaying,
    handlePlayPause,
    isReady: !!sound,
  };
};
