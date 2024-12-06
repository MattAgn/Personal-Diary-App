import { PlayCircle, X } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { Pressable } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, Image, Spacer, styled, View, YStack } from "tamagui";

import type { Media } from "@/domain/DiaryEntry";

import { BUTTONS_BOTTOM_BAR_HEIGHT } from "./DiaryEntryModalLayout";

type MediaWithFullScreenDisplayProps = {
  media: Media;
};

export const MediaWithFullScreenDisplay = ({
  media,
}: MediaWithFullScreenDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { width: screenWidth, height: screenHeight } = useSafeAreaFrame();
  const isImage = media.type === "image" || media.type === "livePhoto";

  const videoRef = useRef<Video>(null);

  if (!isImage) {
    return (
      <Pressable
        onPress={() => void videoRef.current?.presentFullscreenPlayer()}
      >
        <StyledInlineVideo
          source={{ uri: media.uri }}
          resizeMode={ResizeMode.CONTAIN}
          ref={videoRef}
        />
        <VideoOverlay>
          <PlayCircleIcon />
        </VideoOverlay>
      </Pressable>
    );
  }

  return (
    <>
      <Pressable onPress={() => setIsExpanded(true)}>
        <StyledInlineImage source={{ uri: media.uri }} />
        <Spacer scaleY={"$2"} />
      </Pressable>
      {isExpanded && (
        <Overlay
          width={screenWidth}
          height={screenHeight}
          paddingBottom={BUTTONS_BOTTOM_BAR_HEIGHT}
        >
          <FullScreenImage source={{ uri: media.uri }} />
          <CloseButton icon={X} onPress={() => setIsExpanded(false)} />
        </Overlay>
      )}
    </>
  );
};

const MEDIA_HEIGHT = 200;

const StyledInlineImage = styled(Image, {
  width: "100%",
  height: MEDIA_HEIGHT,
  paddingHorizontal: "$2",
  borderRadius: "$4",
});

const StyledInlineVideo = styled(Video, {
  width: "100%",
  height: MEDIA_HEIGHT,
  paddingHorizontal: "$2",
  borderRadius: "$4",
});

const Overlay = styled(YStack, {
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 2,
  backgroundColor: "rgba(0,0,0,0.9)",
  justifyContent: "center",
  alignItems: "center",
});

const VideoOverlay = styled(View, {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.2)",
});

const CloseButton = styled(Button, {
  position: "absolute",
  top: "$5",
  right: "$5",
  size: "$4",
  circular: true,
  backgroundColor: "$background",
  opacity: 0.8,
});

const FullScreenImage = styled(Image, {
  width: "100%",
  height: "100%",
  objectFit: "contain",
});

const PlayCircleIcon = styled(PlayCircle, {
  color: "white",
  backgroundColor: "black",
  size: 50,
  borderRadius: 25,
});
