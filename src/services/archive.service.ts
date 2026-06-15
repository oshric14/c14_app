import type { ArticleType } from "@/types/article";
import { appendClientOrigin } from "@/utils/requestOrigin";

import { httpRequestService } from "./httpRequest.service";

export type ArchivePage = {
  data: ArticleType[];
  currentPage: number;
  nextPage: number | null;
};

type GetArchivePageParams = {
  archiveId: number;
  pageParam: number;
  itemsPerPage?: number;
};

/** One page of a category's articles (`articles?archive={id}&offset=&number=`). */
export function getArchivePage({
  archiveId,
  pageParam,
  itemsPerPage = 5,
}: GetArchivePageParams): Promise<ArchivePage> {
  const search = new URLSearchParams({
    archive: String(archiveId),
    offset: String(pageParam * itemsPerPage),
    number: String(itemsPerPage),
  });
  appendClientOrigin(search);

  return httpRequestService
    .get<ArticleType[]>(`articles?${search.toString()}`)
    .then((data) => {
      const items = Array.isArray(data) ? data : [];
      return {
        data: items,
        currentPage: pageParam,
        // Only keep paging while the API returns a full page.
        nextPage: items.length === itemsPerPage ? pageParam + 1 : null,
      };
    });
}
