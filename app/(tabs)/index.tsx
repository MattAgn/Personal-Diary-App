import { Ellipsis, PlusCircle } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { Alert, FlatList } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, Card, Input, Spacer, styled, Text, View } from "tamagui";

import { ActionSheet } from "@/components/ActionSheet";
import { Colors } from "@/constants/Colors";
import type { DiaryEntry } from "@/domain/DiaryEntry";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string>();

  const filteredAndSortedEntries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filteredEntries = diaryEntries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query),
    );
    const sortedEntries = filteredEntries.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return sortedEntries;
  }, [diaryEntries, searchQuery]);

  const openActionSheet = (id: string) => {
    setSelectedEntryId(id);
    setIsSheetOpen(true);
  };

  const deleteEntry = () => {
    setDiaryEntries(
      diaryEntries.filter(
        (currentEntry) => currentEntry.id !== selectedEntryId,
      ),
    );
    setIsSheetOpen(false);
    setSelectedEntryId(undefined);
  };

  const showDeleteAlert = () => {
    Alert.alert("Delete", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteEntry(),
      },
    ]);
  };

  const editEntry = () => {
    setIsSheetOpen(false);
    setSelectedEntryId(undefined);
    router.push(`/diary-entry/${selectedEntryId}?isEditing=true`);
  };

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
            onPress={() => openActionSheet(item.id)}
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
    <StyledSafeAreaView marginBottom={bottom}>
      <View flex={1} padding="$4" marginBottom={"$3"}>
        <Text>My diary</Text>
        <Spacer scaleY={"$1"} />
        <Input
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList data={filteredAndSortedEntries} renderItem={renderItem} />
        <Spacer scaleY={"$2"} />
        <Spacer scaleY={1} />
        <Button
          icon={PlusCircle}
          color={Colors["light"].tint}
          onPress={() => router.push("/new-diary-entry")}
        >
          New entry
        </Button>
      </View>
      <ActionSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        onDelete={showDeleteAlert}
        onEdit={editEntry}
      />
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  backgroundColor: Colors["light"].background,
});
