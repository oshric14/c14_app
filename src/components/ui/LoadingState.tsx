import { ActivityIndicator, View } from "react-native";

import { tokens } from "@/theme/tokens";

import AppText from "./AppText";

type LoadingStateProps = {
  message?: string;
};

function LoadingState({ message }: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-y-[10px]">
      <ActivityIndicator size="large" color={tokens.colors.brand.red} />
      {message ? <AppText variant="meta">{message}</AppText> : null}
    </View>
  );
}

export default LoadingState;
export type { LoadingStateProps };
