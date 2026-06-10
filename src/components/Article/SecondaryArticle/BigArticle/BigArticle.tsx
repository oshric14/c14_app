import { View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";

import BigArticleContent from "./BigArticleContent";

type BigArticleProps = {
  data: ArticleType;
  categoryName?: string;
  categoryId?: number;
};

function BigArticle({ data, categoryName }: BigArticleProps) {
  return (
    <View
      className="w-full"
      style={{ backgroundColor: data.shivuki_text ? "#EDF3F5" : "#FFFFFF" }}
    >
      <View className="relative w-full">
        <AppImage
          source={data.img}
          style={{ width: "100%", aspectRatio: 16 / 9 }}
          contentFit="cover"
          transition={200}
        />

        {categoryName ? (
          <View className="absolute right-[20px] top-[20px] rounded-[4px] bg-[#E01F26] px-[8px] py-[4px]">
            <AppText
              variant="meta"
              weight="bold"
              className="text-[15px] text-white"
            >
              {categoryName}
            </AppText>
          </View>
        ) : null}
      </View>

      <BigArticleContent data={data} />
    </View>
  );
}

export default BigArticle;
