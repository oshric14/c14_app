import { Pressable, View } from "react-native";

import type { ArticleType } from "@/types/article";
import { openArticle } from "@/utils/articleNavigation";

import MekudamItemContent from "./MekudamItemContent";
import MekudamItemImage from "./MekudamItemImage";

type MekudamItemProps = {
  data: ArticleType;
  isLastItem?: boolean;
  remove_subtitle?: boolean;
};

function MekudamItem({
  data,
  isLastItem,
  remove_subtitle = false,
}: MekudamItemProps) {
  return (
    <View>
      <Pressable
        onPress={() => openArticle(data)}
        className="flex-row-reverse items-center gap-x-[10px] px-[10px]"
      >
        <MekudamItemImage
          img={data.img}
          video={data.video}
          videoDuration={data.videoDuration}
          alt={data.seo?.title}
        />
        <MekudamItemContent data={data} remove_subtitle={remove_subtitle} />
      </Pressable>

      {!isLastItem ? (
        <View className="my-[10px] h-[1px] w-full bg-[#9D9D9D]/25" />
      ) : null}
    </View>
  );
}

export default MekudamItem;
