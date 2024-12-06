import { X } from "@tamagui/lucide-icons";
import { ResizeMode, Video } from "expo-av";
import { useState } from "react";
import { Pressable } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, Image, YStack } from "tamagui";

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

  return (
    <>
      <Pressable onPress={() => setIsExpanded(true)}>
        <Image
          source={{ uri: media.uri }}
          borderRadius={"$4"}
          width={"100%"}
          paddingHorizontal="$2"
          marginBottom="$5"
          height={200}
          alignSelf="center"
        />
      </Pressable>
      {isExpanded && (
        <YStack
          position="absolute"
          top={0}
          left={0}
          width={screenWidth}
          height={screenHeight}
          zIndex={2}
          backgroundColor="rgba(0,0,0,0.9)"
          justifyContent="center"
          alignItems="center"
          paddingBottom={BUTTONS_BOTTOM_BAR_HEIGHT}
        >
          {media.type === "image" ? (
            <Image
              source={{ uri: media.uri }}
              width="100%"
              height="100%"
              objectFit="contain"
            />
          ) : (
            <Video
              source={{ uri: media.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode={ResizeMode.CONTAIN}
            />
          )}
          <Button
            position="absolute"
            top="$5"
            right="$5"
            size="$4"
            circular
            icon={X}
            backgroundColor="$background"
            opacity={0.8}
            onPress={() => setIsExpanded(false)}
          />
        </YStack>
      )}
    </>
  );
};
