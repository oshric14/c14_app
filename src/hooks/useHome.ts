import { useQuery } from "@tanstack/react-query";

import { getHome } from "@/services";

export const homeQueryKey = ["home", "mobile"] as const;

export function useHome() {
  return useQuery({
    queryKey: homeQueryKey,
    queryFn: () => getHome("mobile"),
    staleTime: 60_000,
    gcTime: 10 * 60_000,
  });
}
