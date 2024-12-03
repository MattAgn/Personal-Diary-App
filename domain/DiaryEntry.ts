export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  media: string | null;
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
