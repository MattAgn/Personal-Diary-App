import { Spacer, Text, XStack } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

import { LabelPill } from "./LabelPill";
import { MediaWithFullScreenDisplay } from "./MediaWithFullScreenDisplay";

type DiaryEntryDetailsProps = {
  diaryEntry: DiaryEntry;
};

export const DiaryEntryDetails = ({ diaryEntry }: DiaryEntryDetailsProps) => {
  return (
    <>
      {diaryEntry.media ? (
        <>
          <MediaWithFullScreenDisplay media={diaryEntry.media} />
          <Spacer scaleY={"$2"} />
        </>
      ) : null}

      {diaryEntry.labels.length > 0 && (
        <XStack gap={"$2"} flexWrap="wrap" marginBottom="$4">
          {diaryEntry.labels.map((label) => (
            <LabelPill key={label} label={label} />
          ))}
        </XStack>
      )}

      <Text fontWeight="bold" fontSize={"$7"}>
        {diaryEntry.title}
      </Text>
      <Spacer scaleY={1} />
      <Text fontSize={"$5"}>{diaryEntry.content}</Text>
      <Spacer scaleY={1} />
    </>
  );
};
