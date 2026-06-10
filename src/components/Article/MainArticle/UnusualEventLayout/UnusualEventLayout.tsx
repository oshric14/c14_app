import { View } from "react-native";

import type { ArticleType } from "@/types/article";
import type { TimelineType } from "@/types/Timeline";

import BigArticle from "./BigArticle/BigArticle";

type UnusualEventLayoutProps = {
  data: ArticleType[];
  timeline?: TimelineType;
};

function UnusualEventLayout({ data, timeline }: UnusualEventLayoutProps) {
  const bigArticle = data[0];

  if (!bigArticle) {
    return null;
  }

  return (
    <View className="w-full bg-[#000917]">
      <BigArticle data={bigArticle} timeline={timeline} />
    </View>
  );
}

export default UnusualEventLayout;
