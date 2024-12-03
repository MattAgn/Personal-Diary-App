import { Stack, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { SafeAreaView } from "react-native-safe-area-context";
import { Spacer, styled, Text } from "tamagui";

import { useCreateDiaryEntryAtom } from "@/store/diaryEntriesAtom";

export default function DiaryEntry() {
  const { id } = useLocalSearchParams();
  const diaryEntryAtom = useCreateDiaryEntryAtom(
    typeof id === "string" ? id : "",
  );
  const [entry] = useAtom(diaryEntryAtom);

  if (typeof id !== "string") {
    throw new Error("Single id is required");
  }

  return (
    <StyledSafeAreaView>
      <Stack.Screen options={{ title: entry?.title }} />
      <Spacer scaleY={1} />
      <Text>{entry?.content}</Text>
      <Spacer scaleY={1} />
      <Text>{entry?.createdAt.toLocaleDateString()}</Text>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  paddingHorizontal: 16,
});
