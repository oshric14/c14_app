import { View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import type { TimelineType } from "@/types/Timeline";
import { stripHtml } from "@/utils/html";

import BigArticleContent from "./BigArticleContent";

type BigArticleProps = {
  data: ArticleType;
  timeline?: TimelineType;
};

function BigArticle({ data }: BigArticleProps) {
  const img = Array.isArray(data.img) ? data.img[0] : data.img;
  const roofTitle = stripHtml(data.roofTitle);

  return (
    <View className="w-full bg-[#000917]">
      <View className="relative w-full">
        <AppImage
          source={img}
          style={{ width: "100%", aspectRatio: 16 / 9 }}
          contentFit="cover"
          transition={200}
        />

        {roofTitle ? (
          <View className="absolute bottom-0 right-0 flex-row-reverse items-center">
            <View className="h-[26px] w-[34px] bg-[#E01F26] opacity-80" />
            <View className="bg-[#E01F26] px-[8px] py-[5px]">
              <AppText
                variant="roofTitle"
                className="leading-[16px] text-white"
              >
                {roofTitle}
              </AppText>
            </View>
          </View>
        ) : null}
      </View>

      <BigArticleContent data={data} />
    </View>
  );
}

export default BigArticle;
