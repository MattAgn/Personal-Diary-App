import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import { Image, Input, Spacer, XStack } from "tamagui";

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

  const toggleLabel = (selectedLabel: Label) => {
    setLabels((prev) => {
      if (prev.includes(selectedLabel)) {
        return prev.filter((label) => label !== selectedLabel);
      }
      return [...prev, selectedLabel];
    });
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setMedia(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to pick image");
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
      <Input
        placeholder="Title"
        value={title}
        color="white"
        fontSize={"$6"}
        onChangeText={setTitle}
        backgroundColor={"$colorTransparent"}
        borderColor={"$colorTransparent"}
      />
      <Spacer scaleY={"$0.25"} />
      <Input
        placeholder="What's on your mind?"
        multiline
        size={"$5"}
        numberOfLines={7}
        backgroundColor={"$colorTransparent"}
        color="white"
        borderColor={"$colorTransparent"}
        value={content}
        onChangeText={setContent}
      />
      <Spacer scaleY={2} />
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
      <Spacer scaleY={2} />
      {media && (
        <Image
          source={{ uri: media }}
          width={200}
          height={200}
          alignSelf="center"
        />
      )}
    </>
  );
};
