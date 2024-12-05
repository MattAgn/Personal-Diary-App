/* eslint-disable react-native/no-inline-styles */
import { Pencil, Trash } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Sheet } from "tamagui";

type Props = {
  isSheetOpen: boolean;
  setIsSheetOpen: (isSheetOpen: boolean) => void;
  onDelete: () => void;
  onEdit: () => void;
};

export const ActionSheet = ({
  isSheetOpen,
  setIsSheetOpen,
  onDelete,
  onEdit,
}: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Sheet
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
      />
      <Sheet.Handle />
      <Sheet.Frame
        backgroundColor={"#51355B"}
        paddingBottom={bottom + 10}
        paddingTop={"$5"}
        paddingHorizontal={"$5"}
        gap="$1"
      >
        <Button
          icon={Pencil}
          onPress={onEdit}
          marginBottom={"$3"}
          backgroundColor={"#CDCDCD"}
        >
          Edit
        </Button>
        <Button
          icon={Trash}
          onPress={onDelete}
          color="red"
          backgroundColor={"#CDCDCD"}
        >
          Delete
        </Button>
      </Sheet.Frame>
    </Sheet>
  );
};
