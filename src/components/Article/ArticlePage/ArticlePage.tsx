import { View } from "react-native";

import { useArticleContext } from "@/contexts/ArticleContext";
import type { ArticleType } from "@/types/article";

import ArticleActions from "./ArticleActions";
import ArticleComments from "./ArticleComments";
import ArticleContent from "./ArticleContent";
import ArticleHeader from "./ArticleHeader";
import ArticleHeroImage from "./ArticleHeroImage";
import ArticleTags from "./ArticleTags";
import ArticleTopVideo from "./ArticleTopVideo";
import RelatedArticles from "./RelatedArticles";

type ArticlePageProps = {
  relatedArticles?: ArticleType[];
};

function ArticlePage({ relatedArticles }: ArticlePageProps) {
  const { article } = useArticleContext();

  return (
    <View className="bg-white">
      {article.topVideo?.videoId ? (
        <ArticleTopVideo video={article.topVideo} category={article.category} />
      ) : (
        <ArticleHeroImage />
      )}

      <ArticleHeader />
      <ArticleActions />
      <ArticleContent />
      <ArticleTags />
      <RelatedArticles data={relatedArticles} />
      <ArticleComments />
    </View>
  );
}

export default ArticlePage;
