import { Camera, Save } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { router, Stack } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Input, ScrollView, Spacer } from "tamagui";
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
        media: image,
      },
    ]);
    router.back();
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Stack.Screen options={{ title: "New Diary Entry" }} />
        <Input placeholder="Title" onChangeText={setTitle} />
        <Input
          placeholder="What's on your mind?"
          multiline
          numberOfLines={13}
          backgroundColor={"$colorTransparent"}
          onChangeText={setContent}
        />
        <Spacer scaleY={2} />
        {image && (
          <Image
            source={{ uri: image }}
            width={200}
            height={200}
            alignSelf="center"
          />
        )}
        <Button onPress={pickImage} icon={Camera}>
          Add photo or video
        </Button>
        <Button
          icon={Save}
          color={Colors["light"].tint}
          margin="$4"
          onPress={onSave}
        >
          Save
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}
