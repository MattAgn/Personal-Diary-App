import { History } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, styled, Text } from "tamagui";

import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";
import { fakeDiaryEntries } from "@/utils/fakeDiaryEntries";

export default function TabTwoScreen() {
  const [_, setDiaryEntries] = useAtom(diaryEntriesAtom);

  const onResetDiary = () => {
    setDiaryEntries(fakeDiaryEntries);
    Alert.alert(
      "Diary reset",
      "Your diary has been reset to the default state",
      [
        {
          text: "OK",
          onPress: () => router.push("/"),
        },
      ],
    );
  };

  return (
    <StyledSafeAreaView>
      <Text fontSize={24}>Settings</Text>
      <Button icon={History} onPress={onResetDiary} scale={1.1}>
        Reset diary
      </Button>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  backgroundColor: Colors.light.background,
  padding: 16,
});
