import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { openArticle } from "@/utils/articleNavigation";
import { stripHtml } from "@/utils/html";

type GridItemProps = {
  article: ArticleType;
};

/**
 * A single image-tile in a category grid: full-bleed image with a dark gradient
 * at the bottom and the headline + byline overlaid in white.
 */
function GridItem({ article }: GridItemProps) {
  const title = stripHtml(article.title);
  const authorName = article.author?.name ?? "";
  const time = article.timeInWords ?? "";

  return (
    <Pressable
      onPress={() => openArticle(article)}
      className="h-[270px] overflow-hidden rounded-[12px]"
    >
      <AppImage source={article.img} style={{ flex: 1 }} contentFit="cover" />

      <LinearGradient
        colors={["transparent", "#141533"]}
        locations={[0.2, 1]}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
      />

      <View className="absolute inset-x-0 bottom-0 gap-y-[6px] p-[16px]">
        <AppText weight="bold" className="text-[18px] text-white" numberOfLines={3}>
          {title}
        </AppText>

        <View className="flex-row-reverse items-center gap-x-[6px]">
          {authorName ? (
            <AppText weight="regular" className="text-[14px] text-white">
              {authorName}
            </AppText>
          ) : null}
          {authorName && time ? (
            <View className="h-[10px] w-[1px] bg-white" />
          ) : null}
          {time ? (
            <AppText weight="regular" className="text-[12px] text-white">
              {time}
            </AppText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export default GridItem;
