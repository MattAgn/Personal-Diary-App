import { router, Stack } from "expo-router";
import { useAtom } from "jotai";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "tamagui";
import { v6 as uuidv6 } from "uuid";

import type { DiaryEntryFormData } from "@/components/DiaryEntryForm";
import { DiaryEntryForm } from "@/components/DiaryEntryForm";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

export default function NewDiaryEntry() {
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);

  const handleSubmit = (data: DiaryEntryFormData) => {
    setDiaryEntries([
      ...diaryEntries,
      {
        id: uuidv6(),
        createdAt: new Date(),
        ...data,
        media: data.media,
      },
    ]);
    router.back();
  };

  return (
    <SafeAreaView>
      <ScrollView p={"$3"}>
        <Stack.Screen options={{ title: "New Diary Entry" }} />
        <DiaryEntryForm onSubmit={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
