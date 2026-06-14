import { Pressable, View } from "react-native";

import type { ArticleType } from "@/types/article";
import { openArticle } from "@/utils/articleNavigation";

import SmallArticleItemContent from "./SmallArticleItemContent";
import SmallArticleItemImage from "./SmallArticleItemImage";

type SmallArticleItemProps = {
  data: ArticleType;
  isLastItem?: boolean;
};

function SmallArticleItem({ data, isLastItem }: SmallArticleItemProps) {
  return (
    <View
      className="w-full"
      style={{ backgroundColor: data.shivuki_text ? "#EDF3F5" : "#FFFFFF" }}
    >
      <Pressable
        onPress={() => openArticle(data)}
        className="items-center gap-x-[10px]"
        style={{ flexDirection: "row-reverse" }}
      >
        <SmallArticleItemImage
          img={data.img}
          video={data.video}
          videoDuration={data.videoDuration}
          alt={data.seo?.title}
        />
        <SmallArticleItemContent data={data} />
      </Pressable>

      {!isLastItem ? (
        <View className="my-[10px] h-[1px] w-full bg-[#9D9D9D]/25" />
      ) : null}
    </View>
  );
}

export default SmallArticleItem;
