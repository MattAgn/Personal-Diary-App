import { Button } from "tamagui";

type Props = {
  isActive: boolean;
  toggleLabel: () => void;
  label: string;
};

export const LabelButton = ({ isActive, label, toggleLabel }: Props) => {
  return (
    <Button
      backgroundColor={isActive ? "$accentBackground" : "$greyPurpleBackground"}
      size={"$2"}
      borderRadius={20}
      paddingHorizontal={"$3"}
      onPress={toggleLabel}
    >
      {label}
    </Button>
  );
};
