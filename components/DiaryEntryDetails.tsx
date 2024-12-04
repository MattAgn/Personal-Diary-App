import { Image, Spacer, Text, XStack } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

import { LabelPill } from "./LabelPill";

type DiaryEntryDetailsProps = {
  diaryEntry: DiaryEntry;
};

export const DiaryEntryDetails = ({ diaryEntry }: DiaryEntryDetailsProps) => {
  return (
    <>
      <Text fontWeight="bold" fontSize={"$5"}>
        {diaryEntry.title}
      </Text>
      <Spacer scaleY={1} />
      <XStack gap={"$2"} flexWrap="wrap">
        {diaryEntry.labels.map((label) => (
          <LabelPill key={label} label={label} />
        ))}
      </XStack>
      <Spacer scaleY={1} />
      <Text>{diaryEntry.content}</Text>
      <Spacer scaleY={1} />
      {diaryEntry.media && (
        <Image
          source={{ uri: diaryEntry.media }}
          width={200}
          height={200}
          alignSelf="center"
        />
      )}
    </>
  );
};
