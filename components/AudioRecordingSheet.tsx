/* eslint-disable react-native/no-inline-styles */
import { Mic, Square } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Sheet, Spacer, styled, YStack } from "tamagui";

import { IconButton } from "./IconButton";

type Props = {
  isSheetOpen: boolean;
  setIsSheetOpen: (isSheetOpen: boolean) => void;
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
};

export const AudioRecordingSheet = ({
  isSheetOpen,
  setIsSheetOpen,
  isRecording,
  startRecording,
  stopRecording,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  const handleStopRecording = () => {
    stopRecording();
    setIsSheetOpen(false);
  };

  return (
    <Sheet
      modal
      snapPointsMode="fit"
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
      dismissOnSnapToBottom
      dismissOnOverlayPress
      animation="medium"
    >
      <Sheet.Overlay
        animation="medium"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="rgba(0, 0, 0, 0.6)"
      />
      <SheetFrame paddingBottom={bottom + 10} paddingTop={"$4"}>
        <Sheet.Handle height={"$0.75"} backgroundColor="$greyLight" />
        <Spacer scaleY={"$3"} />
        <YStack alignItems="center" paddingVertical="$4">
          <RecordButton
            icon={isRecording ? Square : Mic}
            onPress={isRecording ? handleStopRecording : startRecording}
            scaleIcon={2}
            {...(isRecording && { backgroundColor: "$danger" })}
          />
        </YStack>
      </SheetFrame>
    </Sheet>
  );
};

const SheetFrame = styled(Sheet.Frame, {
  backgroundColor: "$purpleBackground",
  paddingTop: "$5",
  paddingHorizontal: "$5",
});

const RecordButton = styled(IconButton, {
  backgroundColor: "$accent",
  width: 120,
  height: 120,
  borderRadius: 60,
});
