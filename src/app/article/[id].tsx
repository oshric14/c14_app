import { useLocalSearchParams } from "expo-router";

import ArticlePage from "@/components/Article/ArticlePage/ArticlePage";
import ArticlePageSkeleton from "@/components/Article/ArticlePage/ArticlePageSkeleton";
import BottomNav from "@/components/Layout/BottomNav";
import Header from "@/components/Layout/Header";
import MobileNavShell from "@/components/Layout/MobileNavShell";
import { AppScrollView, ErrorState, Screen } from "@/components/ui";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { useArticle } from "@/hooks/useArticle";
import { useRelatedArticles } from "@/hooks/useRelatedArticles";

function parseArticleId(value: string | string[] | undefined) {
  const selected = Array.isArray(value) ? value[0] : value;
  const id = Number(selected);
  return Number.isFinite(id) ? id : undefined;
}

export default function ArticleScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const articleId = parseArticleId(params.id);
  const articleQuery = useArticle(articleId);
  const relatedQuery = useRelatedArticles(articleId);
  const refreshArticle = async () => {
    await Promise.allSettled([articleQuery.refetch(), relatedQuery.refetch()]);
  };

  return (
    <MobileNavShell>
      <Screen>
        <Header />

        <AppScrollView bottomNavPadding onRefresh={refreshArticle}>
          {articleQuery.isLoading ? (
            <ArticlePageSkeleton />
          ) : articleQuery.isError || !articleQuery.data ? (
            <ErrorState message="לא הצלחנו לטעון את הכתבה" />
          ) : (
            <ArticleProvider article={articleQuery.data}>
              <ArticlePage relatedArticles={relatedQuery.data} />
            </ArticleProvider>
          )}
        </AppScrollView>

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
