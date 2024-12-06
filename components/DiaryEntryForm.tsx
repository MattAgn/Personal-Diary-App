import { Image, Input, Spacer, XStack } from "tamagui";

import { allLabels, type Label } from "@/domain/DiaryEntry";

import { LabelButton } from "./LabelButton";

export type DiaryEntryFormData = {
  title: string;
  content: string;
  media: string | null;
  labels: Label[];
};

type DiaryEntryFormProps = {
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  toggleLabel: (label: Label) => void;
} & DiaryEntryFormData;

export const DiaryEntryForm = ({
  title,
  setTitle,
  content,
  setContent,
  media,
  labels,
  toggleLabel,
}: DiaryEntryFormProps) => {
  return (
    <>
      {media ? (
        <Image
          source={{ uri: media }}
          borderRadius={"$4"}
          width={"100%"}
          paddingHorizontal="$2"
          marginBottom="$5"
          height={200}
          alignSelf="center"
        />
      ) : null}

      <XStack gap={"$2"} flexWrap="wrap" marginBottom="$4">
        {allLabels.map((label) => (
          <LabelButton
            key={label}
            isActive={labels.includes(label)}
            label={label}
            toggleLabel={() => toggleLabel(label)}
          />
        ))}
      </XStack>

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
    </>
  );
};
