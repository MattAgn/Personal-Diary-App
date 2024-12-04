import { Text } from "tamagui";

export const LabelPill = ({ label }: { label: string }) => {
  return (
    <Text
      backgroundColor={"$accentBackground"}
      color={"$accentForeground"}
      borderRadius={20}
      paddingHorizontal={"$3"}
      paddingVertical={"$1.5"}
    >
      {label}
    </Text>
  );
};
