import { Ellipsis } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Button, Card, Spacer, Text } from "tamagui";

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
      backgroundColor={"#3C3949"}
      p="$3"
      marginTop="$4"
      key={diaryEntry.id}
      onPress={() => router.push(`/diary-entry/${diaryEntry.id}`)}
    >
      <Card.Header flexDirection="row" justifyContent="space-between">
        <Text color={"white"} fontSize={10}>
          {diaryEntry.createdAt.toLocaleDateString()}
        </Text>
        <Button
          hitSlop={15}
          icon={Ellipsis}
          size={"$1"}
          paddingHorizontal={"$3"}
          borderRadius={"$3"}
          backgroundColor={"$accentBackground"}
          onPress={() => onActionButtonPress(diaryEntry.id)}
        />
      </Card.Header>
      <Text color={"white"} fontSize={"$5"}>
        {diaryEntry.title}
      </Text>
      <Spacer scaleY={"$1"} />
      <Text color={"white"} numberOfLines={3}>
        {diaryEntry.content}
      </Text>
      <Card.Footer></Card.Footer>
    </Card>
  );
};
