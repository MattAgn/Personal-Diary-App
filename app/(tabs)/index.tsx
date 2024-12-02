import { PlusCircle } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { FlatList } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button, Card, Spacer, styled, Text, View } from "tamagui";

import { Colors } from "@/constants/Colors";
import type { DiaryEntry } from "@/domain/DiaryEntry";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [diaryEntries] = useAtom(diaryEntriesAtom);

  const renderItem = ({ item }: { item: DiaryEntry }) => {
    return (
      <Card p="$3" marginTop="$4">
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
        <FlatList data={diaryEntries} renderItem={renderItem} />
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
