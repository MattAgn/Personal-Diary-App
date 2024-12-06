import { Button, styled } from "tamagui";

export const IconButton = styled(Button, {
  color: "white",
  size: "$8",
  circular: true,
  variants: {
    destructive: {
      true: {
        color: "red",
      },
    },
    transparent: {
      true: {
        backgroundColor: "$colorTransparent",
        borderColor: "$colorTransparent",
        pressStyle: {
          backgroundColor: "$colorTransparent",
          borderColor: "$colorTransparent",
          opacity: 0.5,
        },
      },
    },
    withShadow: {
      true: {
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 6,
      },
    },
  },
});
