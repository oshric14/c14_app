import { View } from "react-native";

import { AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";

type BigArticleContentProps = {
  data: ArticleType;
};

function CommentsBadge({ number }: { number: number }) {
  if (!number) return null;

  return (
    <View className="min-w-[22px] rounded-[5px] bg-[#E01F26] px-[6px] pb-[2px] pt-[1px]">
      <AppText
        variant="meta"
        weight="medium"
        align="center"
        className="text-white"
      >
        {number}
      </AppText>
    </View>
  );
}

function BigArticleContent({ data }: BigArticleContentProps) {
  const title = stripHtml(data.title);
  const roofTitle = stripHtml(data.roofTitle);
  const subTitle = stripHtml(data.subTitle);
  const authorName = data.author?.name ?? "";
  const time = data.timeInWords ?? "";
  const shivukiText = stripHtml(data.shivuki_text);

  return (
    <View
      className="-mt-[25px] mx-[8px] rounded-t-[10px] bg-white px-[15px] pb-[8px] pt-[20px]"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: data.shivuki_text ? "#EDF3F5" : "#FFFFFF",
      }}
    >
      {roofTitle ? (
        <View className="absolute -top-[12px] right-[15px] rounded-full bg-[#E01F26] px-[15px] pb-[6px] pt-[4px]">
          <AppText
            variant="roofTitle"
            className="text-[18px] leading-[18px] text-white"
          >
            {roofTitle}
          </AppText>
        </View>
      ) : null}

      <AppText
        variant="headline"
        className={`text-[28px] leading-[30px] ${roofTitle ? "mt-[5px]" : ""}`}
      >
        {title}
      </AppText>

      {subTitle ? (
        <AppText
          variant="subtitle"
          className="mt-[8px] text-[18px] leading-[23px]"
          numberOfLines={3}
        >
          {subTitle}
        </AppText>
      ) : null}

      <View
        className="mt-[10px] flex-row-reverse items-center gap-x-[7px]"
      >
        <CommentsBadge number={data.commentsNumber ?? 0} />
        {shivukiText ? (
          <AppText variant="meta">{shivukiText}</AppText>
        ) : (
          <>
            {time ? <AppText variant="meta">{time}</AppText> : null}
            {time && authorName ? (
              <View className="h-[12px] w-[1px] bg-[#141533]" />
            ) : null}
            {authorName ? <AppText variant="meta">{authorName}</AppText> : null}
          </>
        )}
      </View>

      <View className="mt-[10px] h-[1px] w-full bg-[#9D9D9D]/25" />
    </View>
  );
}

export default BigArticleContent;
