import type { ArticleType } from "@/types/article";

import { httpRequestService } from "./httpRequest.service";

export type FeedPage = {
  data: ArticleType[];
  currentPage: number;
  nextPage: number | null;
};

type GetHomeFeedPageParams = {
  pageParam: number;
  itemsPerPage?: number;
};

export function getHomeFeedPage({
  pageParam,
  itemsPerPage = 5,
}: GetHomeFeedPageParams): Promise<FeedPage> {
  const offset = Math.max(0, pageParam * itemsPerPage);

  return httpRequestService
    .get<ArticleType[]>(
      `articles?excludeHomeIds=1&offset=${offset}&number=${itemsPerPage}`,
    )
    .then((data) => ({
      data,
      currentPage: pageParam,
      nextPage: data.length ? pageParam + 1 : null,
    }));
}
