import { useInfiniteQuery } from "@tanstack/react-query";

import { getCommentsPage } from "@/services/comments.service";

/** Paginated comments for an article (3 per page). */
export function useArticleComments(articleId?: number) {
  return useInfiniteQuery({
    queryKey: ["comments", articleId],
    enabled: typeof articleId === "number",
    queryFn: ({ pageParam }) =>
      getCommentsPage({ articleId: articleId as number, pageParam: Number(pageParam) }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
