/* eslint-disable react-native/no-inline-styles */
import { XCircle } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { useState } from "react";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Sheet, Spacer, styled } from "tamagui";

import type { Media } from "@/domain/DiaryEntry";

import { IconButton } from "./IconButton";
import { PressableWithFeedback } from "./PressableWithFeedback";

type MediaWithFullScreenDisplayProps = {
  media: Media;
};

export const MediaWithFullScreenDisplay = ({
  media,
}: MediaWithFullScreenDisplayProps) => {
  const { width: screenWidth, height: screenHeight } = useSafeAreaFrame();
  const [isImageFullscreen, setIsImageFullscreen] = useState(false);
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
        <Image
          source={{ uri: media.uri }}
          transition={400}
          style={{
            width: "100%",
            height: MEDIA_HEIGHT,
            borderRadius: 15,
            paddingHorizontal: 10,
          }}
        />
        <Spacer scaleY={"$2"} />
      </PressableWithFeedback>

      <Sheet
        modal
        open={isImageFullscreen}
        onOpenChange={setIsImageFullscreen}
        snapPoints={[100]}
        dismissOnSnapToBottom
      >
        <Sheet.Frame
          backgroundColor={"rgba(0,0,0,0.8)"}
          style={{
            width: screenWidth,
            height: screenHeight,
          }}
        >
          <Image
            source={{ uri: media.uri }}
            transition={300}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />

          <CloseButton
            icon={XCircle}
            onPress={() => setIsImageFullscreen(false)}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const MEDIA_HEIGHT = 200;

const StyledInlineVideo = styled(Video, {
  width: "100%",
  height: MEDIA_HEIGHT,
});

const CloseButton = styled(IconButton, {
  position: "absolute",
  top: "$7",
  right: "$5",
  transparent: true,
  scaleIcon: 1.5,
});
