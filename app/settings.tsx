import { FileDown, History } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { Button, Spacer, styled, View } from "tamagui";

import { ModalHeader } from "@/components/ModalHeader";
import { diaryEntriesAtom } from "@/store/diaryEntriesAtom";
import { fakeDiaryEntries } from "@/utils/fakeDiaryEntries";
import { shareDiaryEntriesPdf } from "@/utils/shareDiaryEntriesPdf";

import { JsStack } from "./_layout";

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

  const header = () => (
    <ModalHeader title="Settings" backgroundColor="#30213E" />
  );

  return (
    <Container>
      <JsStack.Screen options={{ header }} />
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
    </Container>
  );
}

const Container = styled(View, {
  flex: 1,
  paddingHorizontal: "$4",
  backgroundColor: "#30213E",
});
