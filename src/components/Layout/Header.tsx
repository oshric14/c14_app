import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppImage, AppText } from "@/components/ui";
import { useMobileNav } from "@/contexts/MobileNavContext";
import { tokens } from "@/theme/tokens";

const logo = require("@/assets/static/icons/logo-c14.svg");

type HeaderProps = {
  onMenuPress?: () => void;
};

/**
 * Mobile top bar — mirrors the web `Header.tsx` (lg:hidden): a red 40px bar with
 * a hamburger on the start side, a centered logo, and a plus indicator on the
 * end. Visual only — no weather / geolocation logic.
 */
export default function Header({ onMenuPress }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { openNav } = useMobileNav();

  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: tokens.colors.brand.red,
      }}
      className="z-50 shadow-md"
    >
      <View
        className="h-[40px] w-full flex-row-reverse items-center justify-between px-[15px]"
      >
        {/* Hamburger — start side (right in RTL) */}
        <Pressable
          hitSlop={12}
          className="w-[20px] gap-[4px]"
          onPress={onMenuPress ?? openNav}
        >
          <View className="h-[2px] w-full rounded-full bg-white" />
          <View className="h-[2px] w-full rounded-full bg-white" />
          <View className="h-[2px] w-full rounded-full bg-white" />
        </Pressable>

        {/* Centered logo */}
        <View
          pointerEvents="box-none"
          className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
        >
          <Pressable
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="מעבר לדף הבית"
            onPress={() => router.push("/")}
          >
            <AppImage
              source={logo}
              style={{ width: 50, height: 35 }}
              contentFit="contain"
              withPlaceholder={false}
            />
          </Pressable>
        </View>

        {/* Plus indicator — end side (left in RTL) */}
        <AppText
          variant="meta"
          weight="bold"
          className="text-[15px] text-white"
        >
          +14
        </AppText>
      </View>
    </View>
  );
}
