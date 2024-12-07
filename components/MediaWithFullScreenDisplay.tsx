/* eslint-disable react-native/no-inline-styles */
import { X } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { Image } from "expo-image";
import { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, Spacer, styled, YStack } from "tamagui";

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
  const opacity = useSharedValue(0);

  const handlePress = () => {
    setIsImageFullscreen(true);
    opacity.value = withTiming(1, { duration: 500 });
  };

  const handleClose = () => {
    opacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(setIsImageFullscreen)(false);
    });
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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
      <PressableWithFeedback onPress={handlePress}>
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

      {isImageFullscreen && (
        <AnimatedOverlay
          style={overlayStyle}
          width={screenWidth}
          height={screenHeight}
          paddingBottom={BUTTONS_BOTTOM_BAR_HEIGHT}
        >
          <Image
            source={{ uri: media.uri }}
            transition={300}
            style={{ width: "100%", height: "100%" }}
            contentFit="contain"
          />
          <CloseButton icon={X} onPress={handleClose} />
        </AnimatedOverlay>
      )}
    </>
  );
};

const MEDIA_HEIGHT = 200;

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

const AnimatedOverlay = Animated.createAnimatedComponent(Overlay);

const CloseButton = styled(Button, {
  position: "absolute",
  top: "$5",
  right: "$5",
  size: "$4",
  circular: true,
  backgroundColor: "$background",
  opacity: 0.8,
});
