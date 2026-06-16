import { View } from "react-native";

import CommentsBadge from "@/components/Article/shared/CommentsBadge";
import { AppImage, AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { tokens } from "@/theme/tokens";
import { stripHtml } from "@/utils/html";

function ArticleHeader() {
  const { article, subTitle, title } = useArticleContext();
  const roofTitle = stripHtml(article.roofTitle);
  const authorName = article.author?.name || article.publishMeta?.author;
  const fallbackPublishDate = [article.publishMeta?.date, article.publishMeta?.time]
    .filter(Boolean)
    .join(" | ");
  const publishDate = article.timeInWords || fallbackPublishDate;

  return (
    <View className="px-[18px] pb-[18px] pt-[10px]">
      {roofTitle ? (
        <AppText variant="roofTitle" weight="bold" className="mb-[8px]">
          {roofTitle}
        </AppText>
      ) : null}

      <AppText variant="headline" className="text-[33px] leading-[38px] text-brand-blue">
        {title}
      </AppText>

      <View
        className="mt-[14px] min-h-[55px] flex-row-reverse items-center justify-between border-y border-[#E5E7EB] py-[9px]"
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
              <AppText variant="meta" weight="bold" className="text-[14px] text-brand-blue">
                {authorName}
              </AppText>
            ) : null}
            {publishDate ? (
              <AppText variant="meta" className="mt-[2px] text-[12px] text-[#60646C]">
                {publishDate}
              </AppText>
            ) : null}
          </View>
        </View>

        <CommentsBadge number={article.commentsNumber} bold />
      </View>

      {subTitle ? (
        <AppText
          variant="subtitle"
          className="mt-[13px] text-[22px] leading-[29px]"
          style={{ color: tokens.colors.text.secondary }}
        >
          {subTitle}
        </AppText>
      ) : null}
    </View>
  );
}

export default ArticleHeader;
