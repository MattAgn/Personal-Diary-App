import { Input, Spacer, styled, TextArea, XStack } from "tamagui";

import type { Label, Media } from "@/domain/DiaryEntry";
import { allLabels } from "@/domain/DiaryEntry";

import { LabelButton } from "./LabelButton";
import { MediaWithFullScreenDisplay } from "./MediaWithFullScreenDisplay";

export type DiaryEntryFormData = {
  title: string;
  content: string;
  media: Media | null;
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
        <>
          <MediaWithFullScreenDisplay media={media} />
          <Spacer scaleY={"$2"} />
        </>
      ) : null}

      <LabelsRow>
        {allLabels.map((label) => (
          <LabelButton
            key={label}
            isActive={labels.includes(label)}
            label={label}
            toggleLabel={() => toggleLabel(label)}
          />
        ))}
      </LabelsRow>

      <TransparentInput
        placeholder="Title"
        value={title}
        fontSize={"$6"}
        onChangeText={setTitle}
      />
      <Spacer scaleY={"$0.25"} />
      <TransparentTextArea
        placeholder="What's on your mind?"
        fontSize={"$5"}
        value={content}
        onChangeText={setContent}
        numberOfLines={200} // use big number so that text area takes the rest of the screen on android
      />
    </>
  );
};

const TransparentInput = styled(Input, {
  backgroundColor: "$colorTransparent",
  borderColor: "$colorTransparent",
});

const TransparentTextArea = styled(TextArea, {
  backgroundColor: "$colorTransparent",
  borderColor: "$colorTransparent",
  textAlignVertical: "top",
});

const LabelsRow = styled(XStack, {
  gap: "$2",
  flexWrap: "wrap",
  marginBottom: "$4",
  paddingHorizontal: "$4",
});
