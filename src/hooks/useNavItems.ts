import { useEffect, useState } from "react";

import { getNavItems } from "@/services";
import type { navItem } from "@/types/nav";

type NavItemsState = {
  items: navItem[];
  loading: boolean;
  error: boolean;
};

export function useNavItems(name = "now14-header"): NavItemsState {
  const [state, setState] = useState<NavItemsState>({
    items: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    let active = true;

    getNavItems<navItem[]>(name)
      .then((items) => {
        if (!active) return;
        setState({ items, loading: false, error: false });
      })
      .catch(() => {
        if (!active) return;
        setState({ items: [], loading: false, error: true });
      });

    return () => {
      active = false;
    };
  }, [name]);

  return state;
}
