import { View } from "react-native";

import type { ArticleType } from "@/types/article";

import ArticleActions from "./ArticleActions";
import ArticleContent from "./ArticleContent";
import ArticleHeader from "./ArticleHeader";
import ArticleHeroImage from "./ArticleHeroImage";
import ArticleTags from "./ArticleTags";
import RelatedArticles from "./RelatedArticles";

type ArticlePageProps = {
  relatedArticles?: ArticleType[];
};

function ArticlePage({ relatedArticles }: ArticlePageProps) {
  return (
    <View className="bg-white">
      <ArticleHeroImage />
      <ArticleHeader />
      <ArticleActions />
      <ArticleContent />
      <ArticleTags />
      <RelatedArticles data={relatedArticles} />
    </View>
  );
}

export default ArticlePage;
