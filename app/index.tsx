/* eslint-disable react-native/no-inline-styles */
import { Plus, Settings } from "@tamagui/lucide-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { H1, Input, Spacer, styled, View, XStack } from "tamagui";

import { ActionSheet } from "@/components/ActionSheet";
import {
  DiaryEntriesList,
  DiaryEntriesNoSearchResult,
  DiaryNoEntriesYet,
} from "@/components/DiaryEntriesList";
import { IconButton } from "@/components/IconButton";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

export default function HomeScreen() {
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
    <StyledLinearGradient colors={["#0E1020", "#5C3A65"]}>
      <StyledSafeAreaView edges={["top"]}>
        <MainContainer>
          <HeaderRowContainer>
            <HeaderTitle>My diary</HeaderTitle>
            <IconButton
              size={30}
              onPress={() => router.push("/settings")}
              transparent
            >
              <Settings color={"white"} />
            </IconButton>
          </HeaderRowContainer>
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
          <BottomButtonContainer>
            <IconButton
              onPress={() => router.push("/new-diary-entry")}
              alignSelf="center"
              icon={Plus}
              backgroundColor="#5E5CE5"
              withShadow
            />
          </BottomButtonContainer>
        </MainContainer>
        <ActionSheet
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          onDelete={showDeleteAlert}
          onEdit={editEntry}
        />
      </StyledSafeAreaView>
    </StyledLinearGradient>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
});

const StyledLinearGradient = styled(LinearGradient, {
  flex: 1,
});

const BottomButtonContainer = styled(XStack, {
  justifyContent: "center",
  position: "absolute",
  bottom: 15,
  right: 0,
  left: 0,
  zIndex: 2,
});

const HeaderTitle = styled(H1, {
  color: "white",
  size: "$9",
});

const HeaderRowContainer = styled(XStack, {
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: "$2",
});

const MainContainer = styled(View, {
  flex: 1,
  padding: "$4",
  marginBottom: "$3",
});
