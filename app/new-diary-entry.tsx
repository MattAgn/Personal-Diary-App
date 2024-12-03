import { Camera, Save } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { router, Stack } from "expo-router";
import { useAtom } from "jotai";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Input, ScrollView, Spacer, XStack } from "tamagui";
import { v6 as uuidv6 } from "uuid";

import { allLabels } from "@/domain/DiaryEntry";
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
        labels: [],
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
      <ScrollView p={"$3"}>
        <Stack.Screen options={{ title: "New Diary Entry" }} />
        <Input placeholder="Title" onChangeText={setTitle} />
        <Spacer scaleY={"$1"} />
        <XStack gap={"$2"} flexWrap="wrap">
          {allLabels.map((label) => (
            <Button
              key={label}
              backgroundColor={"$accentBackground"}
              size={"$2"}
              borderRadius={20}
              paddingHorizontal={"$3"}
            >
              {label}
            </Button>
          ))}
        </XStack>
        <Spacer scaleY={"$1"} />
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
