import { FlatList } from "react-native";
import { Text, View } from "tamagui";

import type { DiaryEntry } from "@/domain/DiaryEntry";

import { DiaryEntryCard } from "./DiaryEntryCard";

type DiaryEntriesListProps = {
  entries: DiaryEntry[];
  onActionButtonPress: (id: string) => void;
  EmptyListComponent: React.ReactElement;
};

export function DiaryEntriesList({
  entries,
  onActionButtonPress,
  EmptyListComponent,
}: DiaryEntriesListProps) {
  const renderItem = ({ item }: { item: DiaryEntry }) => {
    return (
      <DiaryEntryCard
        diaryEntry={item}
        onActionButtonPress={onActionButtonPress}
      />
    );
  };

  return (
    <FlatList
      data={entries}
      renderItem={renderItem}
      ListEmptyComponent={EmptyListComponent}
    />
  );
}

export const DiaryEntriesNoSearchResult = () => {
  return (
    <View alignItems="center" padding="$4">
      <Text fontSize={"$5"}>No entries found matching your search</Text>
    </View>
  );
};
export const DiaryNoEntriesYet = () => {
  return (
    <View alignItems="center" padding="$4">
      <Text fontSize={"$5"}>No entries yet, add your first one!</Text>
    </View>
  );
};
