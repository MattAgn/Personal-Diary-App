import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

import type { DiaryEntryFormData } from "@/components/DiaryEntryForm";
import type { Label, Media } from "@/domain/DiaryEntry";

export const useDiaryEntryForm = (
  initialValues?: Partial<DiaryEntryFormData>,
) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [content, setContent] = useState(initialValues?.content ?? "");
  const [media, setMedia] = useState<Media | null>(
    initialValues?.media ?? null,
  );
  const [labels, setLabels] = useState<Label[]>(initialValues?.labels ?? []);

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
        setMedia({
          uri: result.assets[0].uri,
          type: result.assets[0].type,
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  return {
    formData: {
      title,
      content,
      media,
      labels,
    },
    formActions: {
      setTitle,
      setContent,
      setLabels,
      toggleLabel,
      pickImage,
    },
  };
};
