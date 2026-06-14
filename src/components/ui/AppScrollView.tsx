import { useState } from "react";
import { RefreshControl, ScrollView, type ScrollViewProps } from "react-native";
import { useQueryClient } from "@tanstack/react-query";

type AppScrollViewProps = ScrollViewProps & {
  bottomNavPadding?: boolean;
  onRefresh?: () => Promise<void> | void;
  refreshTintColor?: string;
};

function AppScrollView({
  bottomNavPadding = false,
  contentContainerStyle,
  onRefresh,
  refreshControl,
  refreshTintColor = "#E01F26",
  showsVerticalScrollIndicator = false,
  ...props
}: AppScrollViewProps) {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
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
  };

  return (
    <ScrollView
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
      contentContainerStyle={[
        { flexGrow: 1 },
        bottomNavPadding ? { paddingBottom: 110 } : null,
        contentContainerStyle,
      ]}
      {...props}
    />
  );
}

export default AppScrollView;
export type { AppScrollViewProps };
