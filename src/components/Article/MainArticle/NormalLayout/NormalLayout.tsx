import { View } from "react-native";

import type { ArticleType } from "@/types/article";
import type { TimelineType } from "@/types/Timeline";

import BigArticle from "./BigArticle/BigArticle";

type NormalLayoutProps = {
  data: ArticleType[];
  timeline?: TimelineType;
};

function NormalLayout({ data, timeline }: NormalLayoutProps) {
  const bigArticle = data[0];

  if (!bigArticle) {
    return null;
  }

  return (
    <View className="w-full">
      <BigArticle data={bigArticle} timeline={timeline} />
    </View>
  );
}

export default NormalLayout;
