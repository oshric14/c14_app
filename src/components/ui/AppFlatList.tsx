import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  type FlatListProps,
} from "react-native";
import { useQueryClient } from "@tanstack/react-query";

import { tokens } from "@/theme/tokens";

type AppFlatListProps<ItemT> = Omit<FlatListProps<ItemT>, "onRefresh"> & {
  bottomNavPadding?: boolean;
  onRefresh?: () => Promise<void> | void;
  refreshTintColor?: string;
  separatorHeight?: number;
};

function AppFlatList<ItemT>({
  bottomNavPadding = false,
  contentContainerStyle,
  separatorHeight = 10,
  showsVerticalScrollIndicator = false,
  ItemSeparatorComponent,
  onRefresh,
  refreshControl,
  refreshTintColor = tokens.colors.brand.red,
  ...props
}: AppFlatListProps<ItemT>) {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (onRefresh) {
        await onRefresh();
      } else {
        await queryClient.invalidateQueries();
      }
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh, queryClient]);

  const SeparatorComponent = useMemo(
    () =>
      ItemSeparatorComponent ??
      (() => <View style={{ height: separatorHeight }} />),
    [ItemSeparatorComponent, separatorHeight],
  );

  const resolvedContentContainerStyle = useMemo(
    () => [
      { flexGrow: 1 },
      bottomNavPadding ? { paddingBottom: 110 } : null,
      contentContainerStyle,
    ],
    [bottomNavPadding, contentContainerStyle],
  );

  return (
    <FlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      refreshControl={
        refreshControl ?? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={refreshTintColor}
            colors={[refreshTintColor]}
          />
        )
      }
      contentContainerStyle={resolvedContentContainerStyle}
      ItemSeparatorComponent={SeparatorComponent}
      {...props}
    />
  );
}

export default AppFlatList;
export type { AppFlatListProps };
