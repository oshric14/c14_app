import { View } from "react-native";

import type { ArticleType } from "@/types/article";

import BigArticle from "./BigArticle/BigArticle";
import SmallArticles from "./SmallArticles/SmallArticles";

type SecondaryArticleProps = {
  data: ArticleType[];
  categoryName?: string;
  categoryId?: number;
  oppositeSide?: boolean;
};

function SecondaryArticle({
  data,
  categoryId,
  categoryName,
}: SecondaryArticleProps) {
  const bigArticle = data[0];
  const smallArticles = data.slice(1, 5);

  if (!bigArticle) {
    return null;
  }

  return (
    <View className="mb-[20px] w-full">
      <BigArticle
        data={bigArticle}
        categoryName={categoryName}
        categoryId={categoryId}
      />
      <SmallArticles data={smallArticles} />
    </View>
  );
}

export default SecondaryArticle;
