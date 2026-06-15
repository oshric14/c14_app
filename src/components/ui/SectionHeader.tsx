import { Pressable, View } from "react-native";

import AppText from "./AppText";

type SectionHeaderProps = {
  title: string;
  /** Light = soft red on pale red (default); dark = white on solid red. */
  variant?: "light" | "dark";
  /** When provided, the whole bar is tappable (e.g. "see all" -> archive). */
  onPress?: () => void;
};

/**
 * Section title bar used above home category grids. Native equivalent of the
 * web `HeaderBar`: a full-width red bar with the category name and a chevron
 * that links through to the category's archive.
 */
function SectionHeader({ title, variant = "light", onPress }: SectionHeaderProps) {
  const isLight = variant === "light";

  const bar = (
    <View
      className={`mb-[12px] h-[35px] w-full flex-row-reverse items-center justify-between px-[20px] ${
        isLight ? "bg-[#FEE2E2]" : "bg-brand-red"
      }`}
    >
      <AppText
        weight="bold"
        className={`text-[22px] ${isLight ? "text-brand-red" : "text-white"}`}
      >
        {title}
      </AppText>

      {onPress ? (
        <AppText
          weight="bold"
          className={`text-[20px] ${isLight ? "text-brand-red" : "text-white"}`}
        >
          {"\u2039"}
        </AppText>
      ) : null}
    </View>
  );

  return onPress ? <Pressable onPress={onPress}>{bar}</Pressable> : bar;
}

export default SectionHeader;
export type { SectionHeaderProps };
