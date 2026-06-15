import { useCallback, useMemo, useState, type ReactElement } from "react";
import { View } from "react-native";

import SecondaryArticle from "@/components/Article/SecondaryArticle/SecondaryArticle";
import InfinityLoadSkeleton from "@/components/Skeletons/InfinityLoad/InfinityLoadSkeleton";
import { AppFlatList, AppText } from "@/components/ui";
import { useArchiveFeed } from "@/hooks/useArchive";
import type { ArticleType } from "@/types/article";

type ArchiveFeedProps = {
  id: number;
  /** Category header, rendered above the list. */
  header: ReactElement;
};

type FeedGroup = {
  key: string;
  data: ArticleType[];
};

/** Virtualized, paginated list of a category's articles. */
function ArchiveFeed({ id, header }: ArchiveFeedProps) {
  const feed = useArchiveFeed(id);
  const [refreshing, setRefreshing] = useState(false);

  const groups = useMemo<FeedGroup[]>(
    () =>
      feed.data?.pages
        .filter((page) => page.data.length)
        .map((page, index) => ({
          key: `archive-${id}-${page.currentPage}-${index}`,
          data: page.data,
        })) ?? [],
    [feed.data, id],
  );

  const loadMore = useCallback(() => {
    if (feed.hasNextPage && !feed.isFetchingNextPage) {
      feed.fetchNextPage();
    }
  }, [feed]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await feed.refetch();
    } finally {
      setRefreshing(false);
    }
  }, [feed]);

  const renderItem = useCallback(
    ({ item, index }: { item: FeedGroup; index: number }) => (
      <SecondaryArticle data={item.data} oppositeSide={index % 2 === 1} />
    ),
    [],
  );

  return (
    <AppFlatList
      data={groups}
      keyExtractor={(group) => group.key}
      renderItem={renderItem}
      separatorHeight={0}
      ListHeaderComponent={header}
      ListEmptyComponent={
        feed.isPending ? (
          <View className="mt-[20px] px-[8px]">
            <InfinityLoadSkeleton pages={2} />
          </View>
        ) : (
          <AppText
            variant="title"
            align="center"
            className="m-[24px] text-[20px] text-brand-blue"
          >
            לא נמצאו כתבות בקטגוריה זאת
          </AppText>
        )
      }
      ListFooterComponent={
        feed.isFetchingNextPage ? (
          <View className="mt-[20px]">
            <InfinityLoadSkeleton pages={1} />
          </View>
        ) : null
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={{ paddingBottom: 110 }}
    />
  );
}

export default ArchiveFeed;
