import { View } from "react-native";

import { SectionHeader } from "@/components/ui";
import type { ArticleType } from "@/types/article";
import { openArchive } from "@/utils/articleNavigation";

import GridItem from "./GridItem";

type GridProps = {
  articles: ArticleType[];
  categoryName: string;
  categoryId: number;
};

/**
 * Category preview block: a section header that links to the full archive, then
 * a 2-column grid of article tiles (mirrors the web `Grid` mobile layout, which
 * shows four tiles).
 */
function Grid({ articles, categoryName, categoryId }: GridProps) {
  const tiles = articles.slice(0, 4);

  if (!tiles.length) {
    return null;
  }

  return (
    <View className="mb-[20px]">
      <SectionHeader
        title={categoryName}
        onPress={() => openArchive(categoryId)}
      />

      <View className="flex-row-reverse flex-wrap gap-[8px] px-[8px]">
        {tiles.map((article) => (
          <View key={article.id} className="flex-1 basis-[45%]">
            <GridItem article={article} />
          </View>
        ))}
      </View>
    </View>
  );
}

export default Grid;
