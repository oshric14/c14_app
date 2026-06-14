import { useQuery } from "@tanstack/react-query";

import { getArticles } from "@/services";

export function useRelatedArticles(id?: number) {
  return useQuery({
    queryKey: ["related-articles", id],
    queryFn: () => getArticles({ number: 5, relatedToId: id }),
    enabled: Number.isFinite(id),
    staleTime: 60_000,
  });
}
