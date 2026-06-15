import type { CommentType } from "@/types/comments";
import { appendClientOrigin } from "@/utils/requestOrigin";

import { httpRequestService } from "./httpRequest.service";

export type CommentsPage = {
  data: CommentType[];
  currentPage: number;
  nextPage: number | null;
};

type GetCommentsPageParams = {
  articleId: number;
  pageParam: number;
  perPage?: number;
};

/** One page of an article's comments (3 per page, matching the web). */
export function getCommentsPage({
  articleId,
  pageParam,
  perPage = 3,
}: GetCommentsPageParams): Promise<CommentsPage> {
  const search = new URLSearchParams({
    article_id: String(articleId),
    offset: String(pageParam * perPage),
    per_page: String(perPage),
  });
  appendClientOrigin(search);

  return httpRequestService
    .get<CommentType[]>(`comments/?${search.toString()}`)
    .then((data) => ({
      data: Array.isArray(data) ? data : [],
      currentPage: pageParam,
      nextPage: data?.length ? pageParam + 1 : null,
    }));
}
