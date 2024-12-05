import type { PressableProps, ViewStyle } from "react-native";
import { Pressable, StyleSheet } from "react-native";

const BUTTON_SIZE = 80;

type RoundIconButtonProps = PressableProps & {
  style?: ViewStyle;
};

export const RoundIconButton = ({
  children,
  style,
  ...props
}: RoundIconButtonProps) => {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BUTTON_SIZE / 2,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5E5CE5",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
