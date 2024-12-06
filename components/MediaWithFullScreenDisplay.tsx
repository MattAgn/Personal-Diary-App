import { X } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, Image, Spacer, styled, YStack } from "tamagui";

import type { Media } from "@/domain/DiaryEntry";

import { BUTTONS_BOTTOM_BAR_HEIGHT } from "./DiaryEntryModalLayout";
import { PressableWithFeedback } from "./PressableWithFeedback";

type MediaWithFullScreenDisplayProps = {
  media: Media;
};

export const MediaWithFullScreenDisplay = ({
  media,
}: MediaWithFullScreenDisplayProps) => {
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
  const { width: screenWidth, height: screenHeight } = useSafeAreaFrame();
  const isImage = media.type === "image" || media.type === "livePhoto";

  if (!isImage) {
    return (
      <StyledInlineVideo
        source={{ uri: media.uri }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
      />
    );
  }

  return (
    <>
      <PressableWithFeedback onPress={() => setIsImageFullscreen(true)}>
        <StyledInlineImage source={{ uri: media.uri }} />
        <Spacer scaleY={"$2"} />
      </PressableWithFeedback>
      {isImageFullscreen && (
        <Overlay
          width={screenWidth}
          height={screenHeight}
          paddingBottom={BUTTONS_BOTTOM_BAR_HEIGHT}
        >
          <FullScreenImage source={{ uri: media.uri }} />
          <CloseButton icon={X} onPress={() => setIsImageFullscreen(false)} />
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
