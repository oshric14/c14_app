import { View } from "react-native";

import AppText from "./AppText";

type ErrorStateProps = {
  message?: string;
};

function ErrorState({
  message = "לא הצלחנו לטעון את העמוד. נסו שוב מאוחר יותר.",
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-[24px]">
      <AppText variant="error" align="center">
        {message}
      </AppText>
    </View>
  );
}

export default ErrorState;
export type { ErrorStateProps };
