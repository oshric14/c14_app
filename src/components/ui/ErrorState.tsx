import { Pressable, View } from "react-native";

import { tokens } from "@/theme/tokens";

import AppText from "./AppText";

type ErrorStateProps = {
  actionLabel?: string;
  message?: string;
  onActionPress?: () => void;
};

function ErrorState({
  actionLabel,
  message = "לא הצלחנו לטעון את העמוד. נסו שוב מאוחר יותר.",
  onActionPress,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-[24px] py-[28px]">
      <AppText variant="error" align="center">
        {message}
      </AppText>

      {actionLabel && onActionPress ? (
        <Pressable
          onPress={onActionPress}
          className="mt-[16px] min-w-[150px] items-center rounded-full px-[18px] py-[10px]"
          style={{ backgroundColor: tokens.colors.brand.red }}
        >
          <AppText variant="meta" weight="bold" align="center" className="text-white">
            {actionLabel}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

export default ErrorState;
export type { ErrorStateProps };
