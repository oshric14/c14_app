import { Pressable } from "react-native";

import { AppImage } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import type { TimelineType } from "@/types/Timeline";
import { openArticle } from "@/utils/articleNavigation";

import BigArticleContent from "./BigArticleContent";

type BigArticleProps = {
  data: ArticleType;
  timeline?: TimelineType;
};

function BigArticle({ data }: BigArticleProps) {
  const img = Array.isArray(data.img) ? data.img[0] : data.img;

  return (
    <Pressable className="w-full" onPress={() => openArticle(data)}>
      <AppImage
        source={img}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        contentFit="cover"
        transition={200}
      />

      <BigArticleContent data={data} />
    </Pressable>
  );
}

export default BigArticle;
