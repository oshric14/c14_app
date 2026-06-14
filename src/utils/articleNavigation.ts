import { router } from "expo-router";

import type { ArticleType } from "@/types/article";

export function openArticle(article: ArticleType) {
  // if (article.redirect_url) {
  //   Linking.openURL(article.redirect_url);
  //   return;
  // }

  router.push(`/article/${article.id}` as Parameters<typeof router.push>[0]);
}
