import { PencilLine, Save } from "@tamagui/lucide-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input, Spacer, styled, Text } from "tamagui";

import { useCreateDiaryEntryAtom } from "@/store/diaryEntriesAtom";

export default function DiaryEntry() {
  const { id } = useLocalSearchParams();
  const diaryEntryAtom = useCreateDiaryEntryAtom(
    typeof id === "string" ? id : "",
  );
  const [entry, setEntry] = useAtom(diaryEntryAtom);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(entry?.content);

  if (typeof id !== "string") {
    throw new Error("Single id is required");
  }

  const saveEdits = () => {
    setEntry({ content });
    setIsEditing(false);
  };

  return (
    <StyledSafeAreaView>
      <Stack.Screen options={{ title: entry?.title }} />
      <Spacer scaleY={1} />
      {isEditing ? (
        <Input
          value={content}
          onChangeText={(text) => setContent(text)}
          multiline
          numberOfLines={20}
          backgroundColor={"$colorTransparent"}
        />
      ) : (
        <Text>{entry?.content}</Text>
      )}
      <Spacer scaleY={1} />
      <Text>{entry?.createdAt.toLocaleDateString()}</Text>
      {isEditing ? (
        <Button onPress={() => saveEdits()} icon={Save}>
          Save
        </Button>
      ) : (
        <Button onPress={() => setIsEditing(true)} icon={PencilLine}>
          Edit
        </Button>
      )}
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  paddingHorizontal: 16,
});
