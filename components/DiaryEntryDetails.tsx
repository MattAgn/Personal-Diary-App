import { Image, Spacer, Text, XStack } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

import { LabelPill } from "./LabelPill";

type DiaryEntryDetailsProps = {
  diaryEntry: DiaryEntry;
};

export const DiaryEntryDetails = ({ diaryEntry }: DiaryEntryDetailsProps) => {
  return (
    <>
      {diaryEntry.media ? (
        <Image
          source={{ uri: diaryEntry.media }}
          borderRadius={"$4"}
          width={"100%"}
          paddingHorizontal="$2"
          marginBottom="$5"
          height={200}
          alignSelf="center"
        />
      ) : null}
      <Text fontWeight="bold" fontSize={"$7"} color="white">
        {diaryEntry.title}
      </Text>
      <Spacer scaleY={1} />
      <XStack gap={"$2"} flexWrap="wrap">
        {diaryEntry.labels.map((label) => (
          <LabelPill key={label} label={label} />
        ))}
      </XStack>
      <Spacer scaleY={1} />
      <Text color="white" fontSize={"$5"}>
        {diaryEntry.content}
      </Text>
      <Spacer scaleY={1} />
    </>
  );
};
