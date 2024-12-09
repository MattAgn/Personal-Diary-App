import { Button, styled } from "tamagui";

export const IconButton = styled(Button, {
  size: "$8",
  circular: true,
  pressStyle: {
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
    bottomAction: {
      true: {
        size: "$9",
        // this is very important because circular buttons are more likely to get stuck in pressed state
        // if too close to the bottom of the screen on ios by overlapping on the area reserved for the navigation bar (even with SafeAreaView)
        circular: false,
        pressStyle: {
          backgroundColor: "$greyPurple",
          borderColor: "$greyPurple",
        },
      },
    },
  },
});
