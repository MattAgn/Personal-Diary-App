import { Pause, Play } from "@tamagui/lucide-icons";
import { Spacer, styled, Text, XStack } from "tamagui";

import type { AudioRecording } from "@/domain/DiaryEntry";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import { IconButton } from "./IconButton";

type Props = {
  audio: AudioRecording;
};

export const AudioPlayer = ({ audio }: Props) => {
  const { isPlaying, handlePlayPause, isReady } = useAudioPlayer(audio);

  return (
    <AudioPlayerContainer>
      <PlayButton
        icon={isPlaying ? Pause : Play}
        onPress={handlePlayPause}
        circular
        disabled={!isReady}
      />
      <Spacer width="$3" />
      <Text>Duration: {audio.duration}s</Text>
    </AudioPlayerContainer>
  );
};

const AudioPlayerContainer = styled(XStack, {
  backgroundColor: "$purpleLight",
  padding: "$4",
  borderRadius: "$4",
  alignItems: "center",
});

const PlayButton = styled(IconButton, {
  backgroundColor: "$purple8",
  size: "$4",
  disabledStyle: {
    backgroundColor: "$greyLight",
  },
});
