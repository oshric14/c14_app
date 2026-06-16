import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getArchive, getArchiveChildren, getArticles } from "@/services";
import type { ArchiveChild, ArchiveData } from "@/types/archive";

const ARCHIVE_PAGE_SIZE = 10;

export function useArchive(id?: number) {
  return useQuery({
    queryKey: ["archive", id],
    queryFn: () => getArchive<ArchiveData>(id!),
    enabled: Number.isFinite(id),
    staleTime: 5 * 60_000,
  });
}

export function useArchiveChildren(id?: number) {
  return useQuery({
    queryKey: ["archive-children", id],
    queryFn: () => getArchiveChildren<ArchiveChild[]>(id!),
    enabled: Number.isFinite(id),
    staleTime: 10 * 60_000,
  });
}

export function useArchiveArticles(id?: number) {
  return useInfiniteQuery({
    queryKey: ["archive-articles", id, ARCHIVE_PAGE_SIZE],
    queryFn: ({ pageParam }) =>
      getArticles({
        archive: id,
        number: ARCHIVE_PAGE_SIZE,
        paged: Number(pageParam),
      }),
    enabled: Number.isFinite(id),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length >= ARCHIVE_PAGE_SIZE ? allPages.length + 1 : null,
    staleTime: 60_000,
  });
}
