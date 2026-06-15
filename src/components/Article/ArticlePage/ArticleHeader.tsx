import { View } from "react-native";

import Breadcrumbs from "@/components/Article/shared/Breadcrumbs";
import { AppImage, AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { stripHtml } from "@/utils/html";

function ArticleHeader() {
  const { article, subTitle, title } = useArticleContext();
  const roofTitle = stripHtml(article.roofTitle);
  const authorName = article.publishMeta?.author || article.author?.name;
  const publishDate = [article.publishMeta?.date, article.publishMeta?.time]
    .filter(Boolean)
    .join(" | ");

  return (
    <View className="px-[18px] pb-[18px] pt-[14px]">
      {article.breadcrumbs?.length ? (
        <View className="mb-[10px]">
          <Breadcrumbs items={article.breadcrumbs} />
        </View>
      ) : null}

      {roofTitle ? (
        <AppText variant="roofTitle" weight="bold" className="mb-[8px]">
          {roofTitle}
        </AppText>
      ) : null}

      <AppText variant="headline" className="text-[31px] leading-[36px] text-[#111827]">
        {title}
      </AppText>

      {subTitle ? (
        <AppText variant="subtitle" className="mt-[12px] text-[18px] leading-[26px] text-[#374151]">
          {subTitle}
        </AppText>
      ) : null}

      <View
        className="mt-[16px] flex-row-reverse items-center justify-between border-b border-[#E5E7EB] pb-[14px]"
      >
        <View className="flex-row-reverse items-center gap-x-[8px]">
          {article.author?.img ? (
            <AppImage
              source={article.author.img}
              style={{ width: 34, height: 34, borderRadius: 17 }}
              contentFit="cover"
            />
          ) : null}

          <View>
            {authorName ? (
              <AppText variant="meta" weight="bold" className="text-[14px] text-[#111827]">
                {authorName}
              </AppText>
            ) : null}
            {publishDate ? (
              <AppText variant="meta" className="mt-[2px] text-[12px] text-[#6B7280]">
                {publishDate}
              </AppText>
            ) : null}
          </View>
        </View>

        {article.commentsNumber ? (
          <AppText variant="meta" className="text-[13px] text-[#6B7280]">
            {article.commentsNumber} תגובות
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

export default ArticleHeader;
