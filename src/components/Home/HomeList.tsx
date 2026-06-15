import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

import SecondaryArticle from "@/components/Article/SecondaryArticle/SecondaryArticle";
import HomeRenderer from "@/components/Home/HomeRenderer";
import InfinityLoadSkeleton from "@/components/Skeletons/InfinityLoad/InfinityLoadSkeleton";
import { AppFlatList, AppText } from "@/components/ui";
import { useHomeFeed } from "@/hooks/useHomeFeed";
import type { ArticleType } from "@/types/article";
import type { HomeType } from "@/types/home";

type HomeListProps = {
  blocks: HomeType[];
  /** Refetches the home blocks; the feed is refreshed alongside it. */
  onRefreshHome: () => Promise<unknown>;
};

type FeedGroup = {
  key: string;
  data: ArticleType[];
};

const ITEMS_PER_PAGE = 5;

/**
 * The home page as a single virtualized list.
 *
 * All non-feed blocks render in the list header (they are short and finite),
 * while the long "more articles" feed becomes the list's data so it virtualizes
 * and paginates without nesting one scrollable list inside another.
 */
function HomeList({ blocks, onRefreshHome }: HomeListProps) {
  const feed = useHomeFeed(ITEMS_PER_PAGE);
  const [refreshing, setRefreshing] = useState(false);

  const groups = useMemo<FeedGroup[]>(() => {
    const result: FeedGroup[] = [];

    const feedBlock = blocks.find((block) => block.type === "feed");
    const initial = feedBlock?.posts?.slice(0, ITEMS_PER_PAGE) ?? [];
    if (initial.length) {
      result.push({ key: "feed-initial", data: initial });
    }

    feed.data?.pages.forEach((page, index) => {
      if (page.data.length) {
        result.push({ key: `feed-page-${page.currentPage}-${index}`, data: page.data });
      }
    });

    return result;
  }, [blocks, feed.data]);

  const loadMore = useCallback(() => {
    if (feed.hasNextPage && !feed.isFetchingNextPage) {
      feed.fetchNextPage();
    }
  }, [feed]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([onRefreshHome(), feed.refetch()]);
    } finally {
      setRefreshing(false);
    }
  }, [feed, onRefreshHome]);

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
      ListHeaderComponent={<HomeRenderer data={blocks} />}
      ListFooterComponent={<HomeListFooter feed={feed} />}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      contentContainerStyle={{ paddingBottom: 110 }}
    />
  );
}

function HomeListFooter({ feed }: { feed: ReturnType<typeof useHomeFeed> }) {
  if (feed.isError) {
    return (
      <AppText variant="meta" align="center" className="py-[12px] text-brand-red">
        לא הצלחנו לטעון כתבות נוספות
      </AppText>
    );
  }

  if (feed.isPending || feed.isFetchingNextPage) {
    return (
      <View className="mt-[20px]">
        <InfinityLoadSkeleton pages={1} />
      </View>
    );
  }

  return null;
}

export default HomeList;
