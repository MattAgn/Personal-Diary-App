import { X } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Pressable } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Button, Image, YStack } from "tamagui";

type MediaWithFullScreenDisplayProps = {
  mediaUri: string;
};

export const MediaWithFullScreenDisplay = ({
  mediaUri,
}: MediaWithFullScreenDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { width: screenWidth, height: screenHeight } = useSafeAreaFrame();

  return (
    <>
      <Pressable onPress={() => setIsExpanded(true)}>
        <Image
          source={{ uri: mediaUri }}
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
          paddingBottom="90"
        >
          <Image
            source={{ uri: mediaUri }}
            width="100%"
            height="100%"
            objectFit="contain"
          />
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
