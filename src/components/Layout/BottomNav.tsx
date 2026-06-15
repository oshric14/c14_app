import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppImage, AppText } from "@/components/ui";

const icons = {
  home: require("@/assets/static/navicons/home.svg"),
  madorim: require("@/assets/static/navicons/madorim.svg"),
  shows: require("@/assets/static/navicons/shows.svg"),
  vod: require("@/assets/static/navicons/vod.svg"),
};

type TabProps = {
  icon: number;
  label: string;
};

function Tab({ icon, label }: TabProps) {
  return (
    <Pressable className="flex-1 items-center justify-center gap-[2px]">
      <AppImage
        source={icon}
        style={{ width: 24, height: 22 }}
        contentFit="contain"
        withPlaceholder={false}
      />
      <AppText variant="meta" align="center" className="text-[12px] text-[#141533]">
        {label}
      </AppText>
    </Pressable>
  );
}

/**
 * Bottom tab bar — mirrors the web `BottomNav` (md:hidden): static tabs with a
 * raised central LIVE button. Visual only.
 */
export default function BottomNav() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 12,
      }}
      className="absolute bottom-0 left-0 right-0 rounded-t-[12px] bg-white"
    >
      <View className="h-[58px] w-full flex-row-reverse items-center">
        <Tab icon={icons.home} label="בית" />
        <Tab icon={icons.madorim} label="מדורים" />

        {/* Raised central LIVE button */}
        <View className="flex-1 items-center justify-center">
          <Pressable
            className="absolute -top-[24px] h-[52px] w-[52px] items-center justify-center rounded-full bg-[#E01F26]"
            style={{
              shadowColor: "#E01F26",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.45,
              shadowRadius: 8,
              elevation: 10,
            }}
          >
            <AppText
              variant="meta"
              weight="bold"
              align="center"
              className="text-[16px] leading-none text-white"
            >
              LIVE
            </AppText>
          </Pressable>
        </View>

        <Tab icon={icons.shows} label="שידורים" />
        <Tab icon={icons.vod} label="VOD" />
      </View>
    </View>
  );
}
