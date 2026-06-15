import { View } from "react-native";

import { AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";

type MekudamItemContentProps = {
  data: ArticleType;
  remove_subtitle?: boolean;
};

function MekudamItemContent({
  data,
  remove_subtitle = false,
}: MekudamItemContentProps) {
  const title = stripHtml(data.title);
  const roofTitle = stripHtml(data.roofTitle);
  const subTitle = stripHtml(data.subTitle);
  const visibleSubtitle = subTitle && !remove_subtitle ? subTitle : "";
  const authorName = data.author?.name ?? "";
  const time = data.timeInWords ?? "";
  const shivukiText = stripHtml(data.shivuki_text);

  return (
    <View className="flex-1 justify-center gap-y-[3px]">
      {roofTitle ? (
        <AppText variant="roofTitle">
          {roofTitle}
        </AppText>
      ) : null}

      <AppText
        variant="title"
        numberOfLines={visibleSubtitle ? 2 : 3}
      >
        {title}
      </AppText>

      {visibleSubtitle ? (
        <AppText
          variant="body"
          className="text-[15px] leading-[18px]"
          numberOfLines={2}
        >
          {visibleSubtitle}
        </AppText>
      ) : null}

      <View
        className="mt-[2px] flex-row-reverse items-center gap-x-[5px]"
      >
        {shivukiText ? (
          <AppText variant="meta" className="text-black/60">
            {shivukiText}
          </AppText>
        ) : (
          <>
            {time ? (
              <AppText variant="meta">
                {time}
              </AppText>
            ) : null}
            {time && authorName ? (
              <View className="h-[10px] w-[1px] bg-[#141533]" />
            ) : null}
            {authorName ? (
              <AppText variant="meta">
                {authorName}
              </AppText>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}

export default MekudamItemContent;
