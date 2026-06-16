import { LinearGradient } from "expo-linear-gradient";
import { memo } from "react";
import { Pressable, View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import { tokens } from "@/theme/tokens";
import type { MekudamCategoryType } from "@/types/mekudam_category";
import { openArticle } from "@/utils/articleNavigation";
import { stripHtml } from "@/utils/html";

type MekudamCategoryItemProps = {
  data: MekudamCategoryType;
};

function MekudamCategoryItem({ data }: MekudamCategoryItemProps) {
  const article = data.posts[0];

  if (!article) {
    return (
      <View
        className="h-[120px] w-full overflow-hidden rounded-[3px]"
        style={{ backgroundColor: tokens.colors.brand.blue }}
      />
    );
  }

  const title = stripHtml(data.title);
  const articleTitle = stripHtml(article.title);
  const meta = [article.timeInWords, article.author?.name]
    .filter(Boolean)
    .join(" | ");

  return (
    <Pressable
      onPress={() => openArticle(article)}
      className="h-[120px] w-full overflow-hidden rounded-[3px] bg-brand-blue"
    >
      <View className="absolute bottom-0 left-0 top-0 w-[66%]">
        <AppImage
          source={article.img}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          contentPosition="left center"
          transition={180}
        />
      </View>

      <LinearGradient
        colors={[
          "rgba(20, 21, 51, 0.08)",
          "rgba(20, 21, 51, 0.38)",
          "rgba(20, 21, 51, 0.94)",
          tokens.colors.brand.blue,
        ]}
        locations={[0, 0.28, 0.56, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      />

      <View className="z-10 h-full justify-center gap-y-[8px] px-[16px] py-[16px]">
        <View className="self-end rounded-full bg-brand-red px-[12px] pb-[3px] pt-[2px]">
          <AppText
            variant="meta"
            weight="medium"
            className="text-[13px] leading-[16px] text-white"
          >
            {title}
          </AppText>
        </View>

        <View className="max-w-[72%] self-end">
          <AppText
            variant="title"
            numberOfLines={2}
            className="text-[18px] leading-[22px] text-white"
          >
            {articleTitle}
          </AppText>

          {meta ? (
            <AppText
              variant="meta"
              numberOfLines={1}
              className="mt-[5px] text-[13px] text-white/85"
            >
              {meta}
            </AppText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export default memo(MekudamCategoryItem);
