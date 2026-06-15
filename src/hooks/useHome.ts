import { useQuery } from "@tanstack/react-query";

import { getHome } from "@/services";
import type { HomeType } from "@/types/home";

/** Home page blocks for the mobile viewport (cached + persisted via React Query). */
export function useHome() {
  return useQuery<HomeType[]>({
    queryKey: ["home", "mobile"],
    queryFn: () => getHome("mobile"),
  });
}
