import type { PressableProps, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";

import { PressableWithFeedback } from "./PressableWithFeedback";

const BUTTON_SIZE = 80;

type RoundIconButtonProps = PressableProps & {
  style?: ViewStyle;
  size?: number;
};

export const RoundIconButton = ({
  children,
  style,
  size = BUTTON_SIZE,
  ...props
}: RoundIconButtonProps) => {
  return (
    <PressableWithFeedback
      style={[
        styles.button,
        { height: size, width: size, borderRadius: size / 2 },
        style,
      ]}
      {...props}
    >
      {children}
    </PressableWithFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5E5CE5",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
