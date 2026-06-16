import { useCallback, useMemo } from "react";
import type { ListRenderItem } from "react-native";

import HomeRenderer from "@/components/Home/HomeRenderer";
import BottomNav from "@/components/Layout/BottomNav";
import Header from "@/components/Layout/Header";
import MobileNavShell from "@/components/Layout/MobileNavShell";
import { AppFlatList, ErrorState, LoadingState, Screen } from "@/components/ui";
import { useHome } from "@/hooks/useHome";
import type { HomeType } from "@/types/home";

const EMPTY_HOME_DATA: HomeType[] = [];

export default function HomeScreen() {
  const homeQuery = useHome();
  const { data: homeData, isError, isLoading, refetch } = homeQuery;
  const data = homeData ?? EMPTY_HOME_DATA;

  const refreshHome = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const retryHome = useCallback(() => {
    refetch();
  }, [refetch]);

  const keyExtractor = useCallback(
    (item: HomeType, index: number) =>
      `home-block-${item.type}-${item.id ?? index}`,
    [],
  );

  const renderItem = useCallback<ListRenderItem<HomeType>>(
    ({ item, index }) => <HomeRenderer item={item} index={index} />,
    [],
  );

  const emptyComponent = useMemo(() => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (isError) {
      return (
        <ErrorState
          message="לא הצלחנו לטעון את דף הבית. בדקו חיבור ונסו שוב."
          actionLabel="נסה שוב"
          onActionPress={retryHome}
        />
      );
    }

    return null;
  }, [isError, isLoading, retryHome]);

  return (
    <MobileNavShell>
      <Screen>
        <Header />

        <AppFlatList<HomeType>
          data={data}
          bottomNavPadding
          onRefresh={refreshHome}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={emptyComponent}
          initialNumToRender={4}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={80}
          windowSize={7}
          removeClippedSubviews
        />

        <BottomNav />
      </Screen>
    </MobileNavShell>
  );
}
