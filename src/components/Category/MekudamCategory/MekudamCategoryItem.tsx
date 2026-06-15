import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { MekudamCategoryType } from "@/types/mekudam_category";
import { openArticle } from "@/utils/articleNavigation";
import { stripHtml } from "@/utils/html";

type MekudamCategoryItemProps = {
  data: MekudamCategoryType;
};

/**
 * Full-width navy category card: the lead article's image sits behind a navy
 * gradient, with the category name in a red pill plus the article headline and
 * byline. Tapping opens the lead article.
 */
function MekudamCategoryItem({ data }: MekudamCategoryItemProps) {
  const article = data.posts[0];

  if (!article) {
    return null;
  }

  const headline = stripHtml(article.title);
  const authorName = article.author?.name ?? "";
  const time = article.timeInWords ?? "";

  return (
    <Pressable
      onPress={() => openArticle(article)}
      className="relative h-[120px] w-full overflow-hidden bg-brand-blue"
    >
      <AppImage
        source={article.img}
        style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: "65%" }}
        contentFit="cover"
      />

      <LinearGradient
        colors={["#000917", "#000917", "transparent"]}
        locations={[0, 0.45, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
      />

      <View className="h-full justify-center gap-y-[8px] px-[16px]">
        <View className="self-end rounded-[4px] bg-brand-red px-[12px] pb-[2px]">
          <AppText weight="medium" className="text-[14px] text-white">
            {data.title}
          </AppText>
        </View>

        <AppText className="text-[17px] leading-[20px] text-white" numberOfLines={2}>
          {headline}
        </AppText>

        {time || authorName ? (
          <AppText weight="regular" className="text-[13px] text-white">
            {[time, authorName].filter(Boolean).join(" | ")}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}

export default MekudamCategoryItem;
