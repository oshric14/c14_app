import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getArchive } from "@/services";
import { getArchivePage } from "@/services/archive.service";
import type { ArchiveData } from "@/types/archive";

/** Category metadata: name, breadcrumbs, sub-categories. */
export function useArchive(id?: number) {
  return useQuery<ArchiveData>({
    queryKey: ["archive", id],
    enabled: typeof id === "number",
    queryFn: () => getArchive<ArchiveData>(id as number),
  });
}

/** Paginated list of a category's articles. */
export function useArchiveFeed(id?: number, itemsPerPage = 5) {
  return useInfiniteQuery({
    queryKey: ["archive-feed", id, itemsPerPage],
    enabled: typeof id === "number",
    queryFn: ({ pageParam }) =>
      getArchivePage({ archiveId: id as number, pageParam: Number(pageParam), itemsPerPage }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
