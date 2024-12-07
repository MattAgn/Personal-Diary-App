import Animated, { LinearTransition } from "react-native-reanimated";
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
        key={item.id}
      />
    );
  };

  return (
    <Animated.FlatList
      data={entries}
      renderItem={renderItem}
      ListEmptyComponent={EmptyListComponent}
      itemLayoutAnimation={LinearTransition.duration(400)}
      layout={LinearTransition.duration(400)}
      keyExtractor={(item) => item.id}
    />
  );
}

export const DiaryEntriesNoSearchResult = () => {
  return (
    <View alignItems="center" padding="$4">
      <Text color={"white"} fontSize={"$5"}>
        No entries found matching your search
      </Text>
    </View>
  );
};

export const DiaryNoEntriesYet = () => {
  return (
    <View alignItems="center" padding="$4">
      <Text color={"white"} fontSize={"$5"}>
        No entries yet, add your first one!
      </Text>
    </View>
  );
};
