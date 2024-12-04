import { Ellipsis } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { FlatList } from "react-native";
import { Button, Card, Spacer, Text, View } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

type DiaryEntriesListProps = {
  entries: DiaryEntry[];
  onActionButtonPress: (id: string) => void;
};

export function DiaryEntriesList({
  entries,
  onActionButtonPress,
}: DiaryEntriesListProps) {
  const renderItem = ({ item }: { item: DiaryEntry }) => {
    return (
      <Card
        p="$3"
        marginTop="$4"
        key={item.id}
        onPress={() => router.push(`/diary-entry/${item.id}`)}
      >
        <Card.Header flexDirection="row" justifyContent="space-between">
          <Text fontSize={10}>{item.createdAt.toLocaleDateString()}</Text>
          <Button
            hitSlop={15}
            icon={Ellipsis}
            size={"$1"}
            paddingHorizontal={"$3"}
            borderRadius={"$3"}
            backgroundColor={"$accentBackground"}
            onPress={() => onActionButtonPress(item.id)}
          />
        </Card.Header>
        <Text>{item.title}</Text>
        <Spacer scaleY={"$1"} />
        <Text numberOfLines={3}>{item.content}</Text>
        <Card.Footer></Card.Footer>
      </Card>
    );
  };

  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyList />}
    />
  );
}

const EmptyList = () => {
  return (
    <View alignItems="center" padding="$4">
      <Text fontSize={"$5"}>No entries found matching your search</Text>
    </View>
  );
};
