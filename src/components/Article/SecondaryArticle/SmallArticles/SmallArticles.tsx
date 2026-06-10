import { View } from "react-native";

import type { ArticleType } from "@/types/article";

import SmallArticleItem from "./SmallArticleItem";

type SmallArticlesProps = {
  data: ArticleType[];
};

function SmallArticles({ data }: SmallArticlesProps) {
  if (!data.length) {
    return null;
  }

  return (
    <View className="mx-auto w-[96%] bg-white px-[10px] pt-[8px]">
      {data.map((article, index) => (
        <SmallArticleItem
          key={article.id ?? index}
          data={article}
          isLastItem={index === data.length - 1}
        />
      ))}
    </View>
  );
}

export default SmallArticles;
