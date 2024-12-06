/* eslint-disable react-native/no-inline-styles */
import { Pencil, Trash } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Sheet, Spacer, styled } from "tamagui";

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
      <SheetOverlay />
      <SheetFrame paddingBottom={bottom + 10} paddingTop={"$4"}>
        <Sheet.Handle height={"$0.75"} />
        <Spacer scaleY={"$3"} />
        <EditButton icon={Pencil} onPress={onEdit}>
          Edit
        </EditButton>
        <DeleteButton icon={Trash} onPress={onDelete}>
          Delete
        </DeleteButton>
      </SheetFrame>
    </Sheet>
  );
};

const SheetOverlay = styled(Sheet.Overlay, {
  animation: "medium",
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
});

const SheetFrame = styled(Sheet.Frame, {
  backgroundColor: "#51355B",
  paddingTop: "$5",
  paddingHorizontal: "$5",
  gap: "$1",
});

const EditButton = styled(Button, {
  marginBottom: "$3",
  backgroundColor: "#CDCDCD",
});

const DeleteButton = styled(Button, {
  color: "red",
  backgroundColor: "#CDCDCD",
});
