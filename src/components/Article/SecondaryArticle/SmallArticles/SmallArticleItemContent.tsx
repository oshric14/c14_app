import { View } from "react-native";

import { AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";

type SmallArticleItemContentProps = {
  data: ArticleType;
};

function CommentsBadge({ number }: { number: number }) {
  if (number <= 3) return null;

  return (
    <View className="min-w-[20px] rounded-[5px] bg-[#E01F26] px-[5px] pb-[2px] pt-[1px]">
      <AppText
        variant="meta"
        weight="medium"
        align="center"
        className="text-[12px] text-white"
      >
        {number}
      </AppText>
    </View>
  );
}

function SmallArticleItemContent({ data }: SmallArticleItemContentProps) {
  const title = stripHtml(data.title);
  const roofTitle = stripHtml(data.roofTitle);
  const authorName = data.author?.name ?? "";
  const time = data.timeInWords ?? "";
  const shivukiText = stripHtml(data.shivuki_text);

  return (
    <View className="flex-1 justify-center gap-y-[3px]">
      {roofTitle ? (
        <AppText variant="roofTitle" className="mb-[3px]">
          {roofTitle}
        </AppText>
      ) : null}

      <AppText variant="title" numberOfLines={3}>
        {title}
      </AppText>

      <View
        className="mt-[2px] min-h-[24px] flex-row-reverse items-center gap-x-[5px]"
      >
        <CommentsBadge number={data.commentsNumber ?? 0} />
        {shivukiText ? (
          <AppText variant="meta" className="text-black/60">
            {shivukiText}
          </AppText>
        ) : (
          <>
            {time ? <AppText variant="meta">{time}</AppText> : null}
            {time && authorName ? (
              <View className="h-[10px] w-[1px] bg-[#141533]" />
            ) : null}
            {authorName ? <AppText variant="meta">{authorName}</AppText> : null}
          </>
        )}
      </View>
    </View>
  );
}

export default SmallArticleItemContent;
