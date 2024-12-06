import { Ellipsis } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Card, Image, Separator, Spacer, styled, Text } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

import { PressableWithFeedback } from "./PressableWithFeedback";

export const DiaryEntryCard = ({
  diaryEntry,
  onActionButtonPress,
}: {
  diaryEntry: DiaryEntry;
  onActionButtonPress: (id: string) => void;
}) => {
  return (
    <PressableWithFeedback
      onPress={() => router.push(`/diary-entry/${diaryEntry.id}`)}
    >
      <StyledCard key={diaryEntry.id}>
        <CardHeader>
          {diaryEntry.media ? (
            <StyledImage source={{ uri: diaryEntry.media.uri }} />
          ) : null}
          <TitleText>{diaryEntry.title}</TitleText>
        </CardHeader>

        <ContentText numberOfLines={3}>{diaryEntry.content}</ContentText>
        <Spacer scaleY={"$0.5"} />
        <StyledSeparator />
        <CardFooter>
          <DateText>
            {diaryEntry.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DateText>
          <PressableWithFeedback
            hitSlop={15}
            onPress={() => onActionButtonPress(diaryEntry.id)}
          >
            <StyledEllipsis />
          </PressableWithFeedback>
        </CardFooter>
      </StyledCard>
    </PressableWithFeedback>
  );
};

const StyledCard = styled(Card, {
  backgroundColor: "#473D52",
  paddingHorizontal: "$3",
  marginTop: "$5",
});

const CardHeader = styled(Card.Header, {
  justifyContent: "flex-start",
  paddingHorizontal: 0,
  paddingTop: "$2.5",
  paddingBottom: "$2",
});

const StyledImage = styled(Image, {
  borderRadius: "$4",
  width: "100%",
  height: 150,
  marginBottom: "$3",
  alignSelf: "center",
});

const TitleText = styled(Text, {
  color: "white",
  fontSize: "$5",
  textAlign: "left",
  fontWeight: "bold",
});

const ContentText = styled(Text, {
  color: "white",
});

const StyledSeparator = styled(Separator, {
  borderColor: "#645A6D",
  borderWidth: 0.5,
  marginBottom: 5,
});

const CardFooter = styled(Card.Footer, {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  paddingBottom: 5,
});

const DateText = styled(Text, {
  color: "#ABA7B6",
  fontSize: 12,
  alignSelf: "center",
});

const StyledEllipsis = styled(Ellipsis, {
  size: "$2",
  color: "#ABA7B6",
});
