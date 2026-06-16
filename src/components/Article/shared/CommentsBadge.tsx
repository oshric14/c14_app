import { Pressable, View, type GestureResponderEvent } from "react-native";

import { AppText } from "@/components/ui";
import { tokens } from "@/theme/tokens";

type CommentsBadgeProps = {
  number?: number | string;
  bold?: boolean;
  minNumber?: number;
  onPress?: (event: GestureResponderEvent) => void;
};

function CommentsBadge({
  bold = false,
  minNumber = 0,
  number,
  onPress,
}: CommentsBadgeProps) {
  const numericValue = Number(number ?? 0);

  if (!Number.isFinite(numericValue) || numericValue <= minNumber) {
    return null;
  }

  const Container = onPress ? Pressable : View;

  return (
    <Container
      onPress={onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={`${numericValue} תגובות`}
      className="h-[27px] w-[27px] items-center justify-center rounded-full bg-[#E6EBEF]"
    >
      <View
        className="min-w-[17px] items-center justify-center rounded-[5px] bg-white px-[4px]"
        style={{ height: 15 }}
      >
        <AppText
          variant="meta"
          weight={bold ? "bold" : "medium"}
          align="center"
          className="text-[10px] leading-[12px]"
          style={{ color: bold ? tokens.colors.brand.blue : "#B8B8B8" }}
        >
          {numericValue}
        </AppText>
      </View>
    </Container>
  );
}

export default CommentsBadge;
