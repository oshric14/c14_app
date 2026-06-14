import { useQuery } from "@tanstack/react-query";

import { getArticleById } from "@/services";
import type { ArticleType } from "@/types/article";

function normalizeArticleResponse(response: ArticleType | ArticleType[]) {
  return Array.isArray(response) ? response[0] : response;
}

export function useArticle(id?: number) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => normalizeArticleResponse(await getArticleById(id!)),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}
