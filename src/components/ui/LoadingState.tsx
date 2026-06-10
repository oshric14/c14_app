import { ActivityIndicator, View } from "react-native";

import AppText from "./AppText";

type LoadingStateProps = {
  message?: string;
};

function LoadingState({ message }: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-y-[10px]">
      <ActivityIndicator size="large" color="#E01F26" />
      {message ? <AppText variant="meta">{message}</AppText> : null}
    </View>
  );
}

export default LoadingState;
export type { LoadingStateProps };
