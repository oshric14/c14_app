import { View } from "react-native";

import type { ArticleType } from "@/types/article";

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
      <View
        className="items-center gap-x-[10px] px-[10px]"
        style={{ flexDirection: "row-reverse" }}
      >
        <MekudamItemImage
          img={data.img}
          video={data.video}
          videoDuration={data.videoDuration}
          alt={data.seo?.title}
        />
        <MekudamItemContent
          data={data}
          remove_subtitle={remove_subtitle}
        />
      </View>

      {!isLastItem ? (
        <View className="my-[10px] h-[1px] w-full bg-[#9D9D9D]/25" />
      ) : null}
    </View>
  );
}

export default MekudamItem;
