import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";

import type { ArticleType } from "@/types/article";
import { stripHtml } from "@/utils/html";

type ArticleContextValue = {
  article: ArticleType;
  articleId: number;
  title: string;
  subTitle: string;
  articleUrl: string;
  images: string[];
};

type ArticleProviderProps = PropsWithChildren<{
  article: ArticleType;
}>;

const ArticleContext = createContext<ArticleContextValue | null>(null);

function normalizeImages(img: ArticleType["img"]): string[] {
  if (!img) return [];
  return Array.isArray(img) ? img.filter(Boolean) : [img];
}

function ArticleProvider({ article, children }: ArticleProviderProps) {
  const value = useMemo<ArticleContextValue>(
    () => ({
      article,
      articleId: article.id,
      title: stripHtml(article.title),
      subTitle: stripHtml(article.subTitle),
      articleUrl: `https://www.c14.co.il/article/${article.id}`,
      images: normalizeImages(article.img),
    }),
    [article],
  );

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
}

function useArticleContext() {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticleContext must be used within ArticleProvider");
  }
  return context;
}

export { ArticleProvider, useArticleContext };
