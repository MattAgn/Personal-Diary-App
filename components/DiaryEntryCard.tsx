import { Ellipsis } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Card, Image, Separator, Spacer, Text } from "tamagui";

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
      <Card
        backgroundColor={"#473D52"}
        paddingHorizontal="$3"
        marginTop="$5"
        key={diaryEntry.id}
      >
        <Card.Header
          justifyContent="flex-start"
          paddingHorizontal={0}
          paddingTop={"$2.5"}
          paddingBottom={"$2"}
        >
          {diaryEntry.media ? (
            <Image
              source={{ uri: diaryEntry.media.uri }}
              borderRadius={"$4"}
              width={"100%"}
              height={150}
              marginBottom="$3"
              alignSelf="center"
            />
          ) : null}
          <Text
            color={"white"}
            fontSize={"$5"}
            textAlign="left"
            fontWeight="bold"
          >
            {diaryEntry.title}
          </Text>
        </Card.Header>

        <Text color={"white"} numberOfLines={3}>
          {diaryEntry.content}
        </Text>
        <Spacer scaleY={"$0.5"} />
        <Separator borderColor={"#645A6D"} borderWidth={0.5} marginBottom={5} />
        <Card.Footer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          paddingBottom={5}
        >
          <Text color={"#ABA7B6"} fontSize={12} alignSelf="center">
            {diaryEntry.createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <PressableWithFeedback
            hitSlop={15}
            onPress={() => onActionButtonPress(diaryEntry.id)}
          >
            <Ellipsis size={"$2"} color={"#ABA7B6"} />
          </PressableWithFeedback>
        </Card.Footer>
      </Card>
    </PressableWithFeedback>
  );
};
