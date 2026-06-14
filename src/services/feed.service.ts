import type { ArticleType } from "@/types/article";
import { appendClientOrigin } from "@/utils/requestOrigin";

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
  const search = new URLSearchParams({
    excludeHomeIds: "1",
    offset: String(offset),
    number: String(itemsPerPage),
  });

  appendClientOrigin(search);

  return httpRequestService
    .get<ArticleType[]>(`articles?${search.toString()}`)
    .then((data) => ({
      data,
      currentPage: pageParam,
      nextPage: data.length ? pageParam + 1 : null,
    }));
}
