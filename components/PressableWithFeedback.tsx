import type { PressableProps, ViewProps } from "react-native";
import { Pressable } from "react-native";

type PressableWithFeedbackProps = Omit<PressableProps, "style"> &
  Pick<ViewProps, "style">;

export type PressableWithFeedbackState = "default" | "disabled";
export const PressableWithFeedback = ({
  children,
  style,
  disabled,
  ...props
}: PressableWithFeedbackProps) => {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }, style]}
      disabled={disabled}
      accessibilityRole="button"
      {...props}
    >
      {children}
    </Pressable>
  );
};
