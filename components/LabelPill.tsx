import { Text } from "tamagui";

export const LabelPill = ({ label }: { label: string }) => {
  return (
    <Text
      backgroundColor={"$accentLight"}
      color={"$darkText"}
      borderRadius={20}
      paddingHorizontal={"$3"}
      paddingVertical={"$1.5"}
    >
      {label}
    </Text>
  );
};
