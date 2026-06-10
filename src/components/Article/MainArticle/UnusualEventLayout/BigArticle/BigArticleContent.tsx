import { View } from "react-native";

import { AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";

type BigArticleContentProps = {
  data: ArticleType;
};

function BigArticleContent({ data }: BigArticleContentProps) {
  const title = stripHtml(data.title);
  const subTitle = stripHtml(data.subTitle);
  const commentsNumber = data.commentsNumber ?? 0;
  const authorName = data.author?.name ?? "";

  return (
    <View
      className="bg-[#000917] px-[20px] pb-[40px] pt-[20px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 8,
      }}
    >
      <View className="gap-y-[15px]">
        <AppText variant="headline" className="text-[33px] text-white">
          {title}
        </AppText>

        {subTitle ? (
          <AppText variant="subtitle" className="w-[95%] self-end text-white">
            {subTitle}
          </AppText>
        ) : null}

        <View className="flex-row-reverse items-center gap-x-[9px]">
          {commentsNumber > 1 ? (
            <View className="relative min-w-[22px] rounded-[5px] bg-[#E01F26] px-[6px] pb-[2px] pt-[1px]">
              <AppText variant="meta" weight="medium" align="center" className="text-white">
                {commentsNumber}
              </AppText>
            </View>
          ) : null}

          {authorName ? (
            <AppText variant="meta" className="text-white">
              {authorName}
            </AppText>
          ) : null}
        </View>

        <View className="mt-[10px] h-[0.7px] w-full bg-white/20" />
      </View>
    </View>
  );
}

export default BigArticleContent;
