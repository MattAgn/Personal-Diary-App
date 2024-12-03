import { Save } from "@tamagui/lucide-icons";
import { router, Stack } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "tamagui";
import { v6 as uuidv6 } from "uuid";

import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

export default function NewDiaryEntry() {
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);

  const onSave = () => {
    setDiaryEntries([
      ...diaryEntries,
      {
        id: uuidv6(),
        createdAt: new Date(),
        content,
        title,
      },
    ]);
    router.back();
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "New Diary Entry" }} />
      <Input placeholder="Title" onChangeText={setTitle} />
      <Input
        placeholder="What's on your mind?"
        multiline
        numberOfLines={20}
        backgroundColor={"$colorTransparent"}
        onChangeText={setContent}
      />
      <Button
        icon={Save}
        color={Colors["light"].tint}
        margin="$4"
        onPress={onSave}
      >
        Save
      </Button>
    </SafeAreaView>
  );
}
