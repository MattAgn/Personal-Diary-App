import { X } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { styled, Text, XStack } from "tamagui";

import { IconButton } from "./IconButton";

export const ModalHeader = ({
  title,
  backgroundColor = "$background",
}: {
  title: string;
  backgroundColor?: string;
}) => (
  <HeaderContainer backgroundColor={backgroundColor}>
    {/* Empty icon button to center the title and the have close button on the right*/}
    <IconButton icon={null} transparent />
    <HeaderText>{title}</HeaderText>
    <IconButton icon={X} transparent onPress={() => router.back()} />
  </HeaderContainer>
);

const HeaderContainer = styled(XStack, {
  justifyContent: "space-between",
  alignItems: "center",
});

const HeaderText = styled(Text, {
  fontSize: "$7",
});
