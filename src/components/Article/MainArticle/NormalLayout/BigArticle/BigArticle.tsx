import { View } from "react-native";

import { AppImage } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import type { TimelineType } from "@/types/Timeline";

import BigArticleContent from "./BigArticleContent";

type BigArticleProps = {
  data: ArticleType;
  timeline?: TimelineType;
};

function BigArticle({ data }: BigArticleProps) {
  const img = Array.isArray(data.img) ? data.img[0] : data.img;

  return (
    <View className="w-full">
      <AppImage
        source={img}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        contentFit="cover"
        transition={200}
      />

      <BigArticleContent data={data} />
    </View>
  );
}

export default BigArticle;
