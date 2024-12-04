import { PlusCircle } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { Alert } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, Input, Spacer, styled, Text, View } from "tamagui";

import { ActionSheet } from "@/components/ActionSheet";
import {
  DiaryEntriesList,
  DiaryEntriesNoSearchResult,
  DiaryNoEntriesYet,
} from "@/components/DiaryEntriesList";
import { Colors } from "@/constants/Colors";
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
    const sortedEntriesNewestFirst = filteredEntries.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return sortedEntriesNewestFirst;
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
        <DiaryEntriesList
          entries={filteredAndSortedEntries}
          onActionButtonPress={openActionSheet}
          EmptyListComponent={
            searchQuery !== "" ? (
              <DiaryEntriesNoSearchResult />
            ) : (
              <DiaryNoEntriesYet />
            )
          }
        />
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
