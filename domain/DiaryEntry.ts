import type { ImagePickerAsset } from "expo-image-picker";

export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  media: Media | null;
  labels: Label[];
};

export const allLabels = [
  "happy",
  "sad",
  "angry",
  "anxious",
  "neutral",
  "peaceful",
] as const;

export type Label = (typeof allLabels)[number];
export type Media = {
  uri: string;
  type: ImagePickerAsset["type"];
};
