import { View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import type { ArticleType } from "@/types/article";

const playIcon = require("@/assets/static/icons/play.svg");

type MekudamItemImageProps = {
  img: ArticleType["img"];
  video?: ArticleType["video"];
  videoDuration?: ArticleType["videoDuration"];
  alt?: string;
};

function MekudamItemImage({
  img,
  video,
  videoDuration,
}: MekudamItemImageProps) {
  return (
    <View
      className="w-[40%] shrink-0 overflow-hidden rounded-[5px]"
      style={{ aspectRatio: 16 / 10 }}
    >
      <AppImage
        source={img}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        transition={150}
      />

      {video ? (
        <AppImage
          source={playIcon}
          style={{
            position: "absolute",
            right: 8,
            bottom: 8,
            width: 28,
            height: 28,
          }}
          contentFit="contain"
          withPlaceholder={false}
        />
      ) : null}

      {video && videoDuration ? (
        <View className="absolute right-[8px] top-[8px] rounded-full bg-[#DAE2E8]/70 px-[8px] pb-[2px]">
          <AppText
            variant="meta"
            className="leading-[17px] text-white"
            align="center"
          >
            {videoDuration}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

export default MekudamItemImage;
