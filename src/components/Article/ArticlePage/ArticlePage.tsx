import { View } from "react-native";

import Breadcrumbs from "@/components/Article/shared/Breadcrumbs";
import { useArticleContext } from "@/contexts/ArticleContext";
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
  const { article } = useArticleContext();

  return (
    <View className="bg-white">
      <ArticleHeroImage />
      <View
        className="mx-[8px] -mt-[16px] rounded-t-[12px] bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        <Breadcrumbs data={article.breadcrumbs} />
        <ArticleHeader />
        <ArticleActions />
        <ArticleContent />
        <ArticleTags />
      </View>
      <RelatedArticles data={relatedArticles} />
    </View>
  );
}

export default ArticlePage;
