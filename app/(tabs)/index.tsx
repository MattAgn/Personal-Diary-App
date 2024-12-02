
import { Colors } from '@/constants/Colors';
import { DiaryEntry } from '@/domain/DiaryEntry';
import { fakeDiaryEntries } from '@/utils/fakeDiaryEntries';
import { FlatList } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, Spacer, Text, View } from 'tamagui';
import { PlusCircle } from '@tamagui/lucide-icons';

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets()

  const renderItem = ({ item }: { item: DiaryEntry }) => {
    return (
      <Card p="$3" marginTop="$4">
        <Card.Header flexDirection="row" justifyContent="space-between">
          <Text>{item.title}</Text>
          <Text fontSize={10} >{item.createdAt.toLocaleDateString()}</Text>
        </Card.Header>
        <Text numberOfLines={3}>{item.content}</Text>
        <Card.Footer>
        </Card.Footer>
      </Card>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 30, backgroundColor: Colors["light"].background, marginBottom: bottom }}>
      <View flex={1} >
        <Text>Mon journal</Text>
        <FlatList data={fakeDiaryEntries} renderItem={renderItem} />
        <Spacer scaleY={1} />
        <Button icon={PlusCircle} color={Colors["light"].tint}>Nouvelle entrée</Button>
      </View>
    </SafeAreaView>
  );
}

