import { View } from "react-native";

import type { MekudamCategoryType } from "@/types/mekudam_category";

import MekudamCategoryItem from "./MekudamCategoryItem";

type MekudamCategoryProps = {
  data: MekudamCategoryType[];
};

/** Stack of category cards (home "mekudam_categories" block). */
function MekudamCategory({ data }: MekudamCategoryProps) {
  const categories = data?.filter((item) => item.posts?.length) ?? [];

  if (!categories.length) {
    return null;
  }

  return (
    <View className="mb-[20px] gap-y-[2px]">
      {categories.map((item) => (
        <MekudamCategoryItem key={item.id} data={item} />
      ))}
    </View>
  );
}

export default MekudamCategory;
