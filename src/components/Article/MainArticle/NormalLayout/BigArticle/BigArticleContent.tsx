import { View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";

const commentsIcon = require("@/assets/static/icons/comments.svg");

type BigArticleContentProps = {
  data: ArticleType;
};

function BigArticleContent({ data }: BigArticleContentProps) {
  const title = stripHtml(data.title);
  const subTitle = stripHtml(data.subTitle);
  const roofTitle = stripHtml(data.roofTitle);
  const commentsNumber = data.commentsNumber ?? 0;
  const authorName = data.author?.name ?? "";

  return (
    <View
      className="-mt-[16px] rounded-t-[14px] bg-white px-[15px] pb-[10px] pt-[24px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      {roofTitle ? (
        <View className="absolute -top-[13px] right-[15px] rounded-full bg-[#E01F26] px-[15px] pb-[6px] pt-[4px]">
          <AppText
            variant="roofTitle"
            className="text-[18px] leading-[18px] text-white"
          >
            {roofTitle}
          </AppText>
        </View>
      ) : null}

      <AppText variant="headline">
        {title}
      </AppText>

      {subTitle ? (
        <AppText variant="subtitle" className="mt-[8px]">
          {subTitle}
        </AppText>
      ) : null}

      <View className="mt-[12px] flex-row-reverse items-center gap-x-[8px]">
        {commentsNumber > 0 ? (
          <View className="flex-row-reverse items-center gap-x-[4px]">
            <AppImage
              source={commentsIcon}
              style={{ width: 16, height: 16 }}
              contentFit="contain"
              withPlaceholder={false}
            />
            <AppText variant="meta" weight="medium">
              {commentsNumber}
            </AppText>
          </View>
        ) : null}
        {authorName ? (
          <AppText variant="meta">
            {authorName}
          </AppText>
        ) : null}
      </View>

      <View className="mt-[10px] h-[0.7px] w-full bg-[#9D9D9D]/25" />
    </View>
  );
}

export default BigArticleContent;
