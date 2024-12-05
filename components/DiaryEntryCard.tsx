import { Ellipsis } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";
import { Card, Separator, Spacer, Text } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

export const DiaryEntryCard = ({
  diaryEntry,
  onActionButtonPress,
}: {
  diaryEntry: DiaryEntry;
  onActionButtonPress: (id: string) => void;
}) => {
  return (
    <Card
      backgroundColor={"#473D52"}
      paddingHorizontal="$3"
      marginTop="$5"
      key={diaryEntry.id}
      onPress={() => router.push(`/diary-entry/${diaryEntry.id}`)}
    >
      <Card.Header
        justifyContent="flex-start"
        paddingLeft={0}
        paddingBottom={10}
      >
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
        <Pressable
          hitSlop={15}
          onPress={() => onActionButtonPress(diaryEntry.id)}
        >
          <Ellipsis size={"$2"} color={"#ABA7B6"} />
        </Pressable>
      </Card.Footer>
    </Card>
  );
};
