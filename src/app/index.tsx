import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-brand-blue">
      <View className="flex-1 items-center justify-center gap-2">
        <Text className="text-3xl font-bold text-white">now14</Text>
        <Text className="text-base text-brand-red">עכשיו 14</Text>
      </View>
    </SafeAreaView>
  );
}
