import { Camera, Save } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Button, Image, Input, Spacer, XStack } from "tamagui";

import type { Label } from "@/domain/DiaryEntry";
import { allLabels } from "@/domain/DiaryEntry";

import { LabelButton } from "./LabelButton";

export type DiaryEntryFormData = {
  title: string;
  content: string;
  media: string | null;
  labels: Label[];
};

type DiaryEntryFormProps = {
  initialTitle?: string;
  initialContent?: string;
  initialMedia?: string | null;
  initialLabels?: Label[];
  onSubmit: (data: DiaryEntryFormData) => void;
};

export const DiaryEntryForm = ({
  initialTitle = "",
  initialContent = "",
  initialMedia = null,
  initialLabels = [],
  onSubmit,
}: DiaryEntryFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [media, setMedia] = useState<string | null>(initialMedia);
  const [labels, setLabels] = useState<Label[]>(initialLabels);

  const toggleLabel = (label: Label) => {
    setLabels((prev) => {
      if (prev.includes(label)) {
        return prev.filter((l) => l !== label);
      }
      return [...prev, label];
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      media,
      labels,
    });
  };

  return (
    <>
      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Spacer scaleY={"$1"} />
      <XStack gap={"$2"} flexWrap="wrap">
        {allLabels.map((label) => (
          <LabelButton
            key={label}
            isActive={labels.includes(label)}
            label={label}
            toggleLabel={() => toggleLabel(label)}
          />
        ))}
      </XStack>
      <Spacer scaleY={"$1"} />
      <Input
        placeholder="What's on your mind?"
        multiline
        numberOfLines={5}
        backgroundColor={"$colorTransparent"}
        value={content}
        onChangeText={setContent}
      />
      <Spacer scaleY={2} />
      {media && (
        <Image
          source={{ uri: media }}
          width={200}
          height={200}
          alignSelf="center"
        />
      )}
      <Button onPress={pickImage} icon={Camera}>
        Select photo
      </Button>
      <Button
        icon={Save}
        color={Colors["light"].tint}
        margin="$4"
        onPress={handleSubmit}
      >
        Save
      </Button>
    </>
  );
};
