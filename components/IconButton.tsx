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
