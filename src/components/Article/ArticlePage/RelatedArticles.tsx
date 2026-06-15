import { Pressable, View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";
import { openArticle } from "@/utils/articleNavigation";

type RelatedArticlesProps = {
  data?: ArticleType[];
};

function RelatedArticleItem({ item }: { item: ArticleType }) {
  return (
    <Pressable
      onPress={() => openArticle(item)}
      className="border-b border-[#E5E7EB] py-[12px]"
    >
      <View className="flex-row-reverse items-center gap-x-[10px]">
        <AppImage
          source={item.img}
          style={{ width: 112, height: 76, borderRadius: 8 }}
          contentFit="cover"
        />

        <View className="min-w-0 flex-1">
          {item.roofTitle ? (
            <AppText variant="meta" weight="bold" className="mb-[4px] text-[#E01F26]">
              {stripHtml(item.roofTitle)}
            </AppText>
          ) : null}
          <AppText variant="title" className="text-[17px] leading-[22px] text-[#111827]">
            {stripHtml(item.title)}
          </AppText>
          {item.timeInWords ? (
            <AppText variant="meta" className="mt-[6px] text-[12px] text-[#6B7280]">
              {item.timeInWords}
            </AppText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

function RelatedArticles({ data }: RelatedArticlesProps) {
  const articles = data?.filter(Boolean) ?? [];

  if (!articles.length) {
    return null;
  }

  return (
    <View className="px-[18px] pb-[28px]">
      <AppText variant="headline" className="mb-[8px] text-[24px] leading-[29px] text-[#111827]">
        כתבות נוספות
      </AppText>

      {articles.map((item) => (
        <RelatedArticleItem key={item.id} item={item} />
      ))}
    </View>
  );
}

export default RelatedArticles;
