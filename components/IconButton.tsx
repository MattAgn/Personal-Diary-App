import { Button, styled } from "tamagui";

export const IconButton = styled(Button, {
  size: "$8",
  circular: true,
  pressStyle: {
    backgroundColor: "$colorTransparent",
    borderColor: "$colorTransparent",
    opacity: 0.5,
  },
  variants: {
    destructive: {
      true: {
        color: "$danger",
      },
    },
    transparent: {
      true: {
        backgroundColor: "$colorTransparent",
        borderColor: "$colorTransparent",
      },
    },
    withShadow: {
      true: {
        shadowColor: "$dark",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
      },
    },
  },
});

/**
 * Used on action buttons in the new diary entry screen and the diary-entry/[id] screen.
 * For some unknown reason, the buttons don't behave properly (not always clickable)
 * when using the styled(Button) directly. Seems also to be linked with the "transparent" pressed style but not sure
 */
export const iconActionButtonProps = {
  color: "white",
  size: "$8",
  circular: true,
  backgroundColor: "$darkLightBackground",
  pressStyle: {
    opacity: 0.5,
    backgroundColor: "$greyPurple",
    borderColor: "$greyPurple",
  },
};
