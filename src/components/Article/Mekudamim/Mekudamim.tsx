import { View } from "react-native";

import type { ArticleType } from "@/types/article";

import MekudamItem from "./MekudamItem/MekudamItem";

type MekudamimProps = {
  data: ArticleType[];
  remove_subtitle?: boolean;
};

function Mekudamim({ data, remove_subtitle = false }: MekudamimProps) {
  if (!data?.length) {
    return null;
  }

  return (
    <View className="mt-[15px] w-full">
      {data.map((article, index) => (
        <MekudamItem
          key={article.id ?? index}
          data={article}
          isLastItem={index === data.length - 1}
          remove_subtitle={remove_subtitle}
        />
      ))}
    </View>
  );
}

export default Mekudamim;
