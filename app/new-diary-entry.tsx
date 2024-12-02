import { Save } from "@tamagui/lucide-icons";
import { Stack } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Input } from "tamagui";

export default function NewDiaryEntry() {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "New Diary Entry" }} />
      <Input
        placeholder="What's on your mind?"
        multiline
        numberOfLines={20}
        backgroundColor={"$colorTransparent"}
      />
      <Button icon={Save} color={Colors["light"].tint} margin="$4">
        Save
      </Button>
    </SafeAreaView>
  );
}
