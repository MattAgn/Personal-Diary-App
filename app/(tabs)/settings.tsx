import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { styled, Text } from "tamagui";

export default function TabTwoScreen() {
  return (
    <StyledSafeAreaView>
      <Text fontSize={24}>Settings</Text>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView, {
  flex: 1,
  backgroundColor: Colors.light.background,
  padding: 16,
});
