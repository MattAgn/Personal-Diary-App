import { FileDown, History } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, H1, Spacer, styled } from "tamagui";

import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";
import { fakeDiaryEntries } from "@/utils/fakeDiaryEntries";
import { shareDiaryEntriesPdf } from "@/utils/shareDiaryEntriesPdf";

export default function SettingsScreen() {
  const [_, setDiaryEntries] = useAtom(diaryEntriesAtom);

  const onResetDiaryWithFakeData = () => {
    setDiaryEntries(fakeDiaryEntries);
    Alert.alert("Diary reset", "Your diary has been reset with fake data", [
      {
        text: "OK",
        onPress: () => router.replace("/"),
      },
    ]);
  };

  const onResetDiaryWithNoData = () => {
    setDiaryEntries([]);
    Alert.alert(
      "Diary reset",
      "Your diary has been reset to the default state",
      [
        {
          text: "OK",
          onPress: () => router.replace("/"),
        },
      ],
    );
  };

  const handleShareDiaryEntries = async () => {
    await shareDiaryEntriesPdf(fakeDiaryEntries);
  };

  return (
    <StyledSafeAreaView>
      <H1 color="white" size={"$9"}>
        Settings
      </H1>
      <Spacer scaleY={"$2"} />
      <Button icon={History} onPress={onResetDiaryWithFakeData} size={"$5"}>
        Reset diary with fake data
      </Button>
      <Spacer scaleY={"$2"} />
      <Button icon={History} onPress={onResetDiaryWithNoData} size={"$5"}>
        Reset diary with no data
      </Button>
      <Spacer scaleY={"$2"} />
      <Button icon={FileDown} onPress={handleShareDiaryEntries} size={"$5"}>
        Export diary to pdf
      </Button>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  paddingTop: "$6",
  paddingHorizontal: "$4",
  backgroundColor: "#30213E",
});
