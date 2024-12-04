import { PlusCircle } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, Card, Input, Spacer, styled, Text, View } from "tamagui";

import { Colors } from "@/constants/Colors";
import type { DiaryEntry } from "@/domain/DiaryEntry";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [diaryEntries] = useAtom(diaryEntriesAtom);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return diaryEntries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(query) ||
        entry.content.toLowerCase().includes(query),
    );
  }, [diaryEntries, searchQuery]);

  const renderItem = ({ item }: { item: DiaryEntry }) => {
    return (
      <Card
        p="$3"
        marginTop="$4"
        key={item.id}
        onPress={() => router.push(`/diary-entry/${item.id}`)}
      >
        <Card.Header flexDirection="row" justifyContent="space-between">
          <Text>{item.title}</Text>
          <Text fontSize={10}>{item.createdAt.toLocaleDateString()}</Text>
        </Card.Header>
        <Text numberOfLines={3}>{item.content}</Text>
        <Card.Footer></Card.Footer>
      </Card>
    );
  };

  return (
    <StyledSafeAreaView marginBottom={bottom}>
      <View flex={1}>
        <Text>Mon journal</Text>
        <Spacer scaleY={"$1"} />
        <Input
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList data={filteredEntries} renderItem={renderItem} />
        <Spacer scaleY={"$2"} />
        <Spacer scaleY={1} />
        <Button
          icon={PlusCircle}
          color={Colors["light"].tint}
          onPress={() => router.push("/new-diary-entry")}
        >
          Nouvelle entrée
        </Button>
      </View>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  padding: 30,
  backgroundColor: Colors["light"].background,
});
