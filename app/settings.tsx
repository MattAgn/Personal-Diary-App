import { Cog, FileDown, History } from "@tamagui/lucide-icons";
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
  const [diaryEntries, setDiaryEntries] = useAtom(diaryEntriesAtom);

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
    await shareDiaryEntriesPdf(diaryEntries);
  };

  const header = () => (
    <ModalHeader title="Settings" backgroundColor="$purpleBackground" />
  );

  return (
    <Container>
      <JsStack.Screen options={{ header }} />
      <StyledButton icon={History} onPress={onResetDiaryWithFakeData}>
        Reset diary with fake data
      </StyledButton>
      <Spacer scaleY={"$2"} />
      <StyledButton icon={History} onPress={onResetDiaryWithNoData}>
        Reset diary with no data
      </StyledButton>
      <Spacer scaleY={"$2"} />
      <StyledButton icon={FileDown} onPress={handleShareDiaryEntries}>
        Export diary to pdf
      </StyledButton>
      <Spacer scaleY={"$2"} />
      <StyledButton icon={Cog} onPress={() => router.push("/test")}>
        Test page
      </StyledButton>
    </Container>
  );
}

const Container = styled(View, {
  flex: 1,
  paddingHorizontal: "$4",
  backgroundColor: "$purpleBackground",
});

const StyledButton = styled(Button, {
  backgroundColor: "$purpleLight",
  size: "$5",
});
