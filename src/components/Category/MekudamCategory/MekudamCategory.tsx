import { memo } from "react";
import { View } from "react-native";

import type { MekudamCategoryType } from "@/types/mekudam_category";

import MekudamCategoryItem from "./MekudamCategoryItem";

type MekudamCategoryProps = {
  data: MekudamCategoryType[];
};

function MekudamCategory({ data }: MekudamCategoryProps) {
  const items = data ?? [];

  if (!items.length) {
    return null;
  }

  return (
    <View className="gap-y-[3px] py-[14px]">
      {items.map((item) => (
        <MekudamCategoryItem key={item.id} data={item} />
      ))}
    </View>
  );
}

export default memo(MekudamCategory);
