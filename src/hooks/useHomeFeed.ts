import { useInfiniteQuery } from "@tanstack/react-query";

import { getHomeFeedPage } from "@/services/feed.service";

/**
 * Paginated "more articles" feed shown at the bottom of the home page.
 * Each page is a group of up to `itemsPerPage` articles.
 */
export function useHomeFeed(itemsPerPage = 5) {
  return useInfiniteQuery({
    queryKey: ["home-feed", itemsPerPage],
    queryFn: ({ pageParam }) =>
      getHomeFeedPage({ pageParam: Number(pageParam), itemsPerPage }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
