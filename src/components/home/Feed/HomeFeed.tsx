import { memo, useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Pressable, View } from "react-native";

import SecondaryArticle from "@/components/Article/SecondaryArticle/SecondaryArticle";
import InfinityLoadSkeleton from "@/components/Skeletons/InfinityLoad/InfinityLoadSkeleton";
import { AppText } from "@/components/ui";
import { getHomeFeedPage } from "@/services/feed.service";
import type { ArticleType } from "@/types/article";

type HomeFeedProps = {
  initialData?: ArticleType[];
  itemsPerPage?: number;
};

function HomeFeed({ initialData = [], itemsPerPage = 5 }: HomeFeedProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["home-feed", itemsPerPage],
    queryFn: ({ pageParam }) =>
      getHomeFeedPage({
        pageParam: Number(pageParam),
        itemsPerPage,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  const feedPages = useMemo(() => data?.pages ?? [], [data?.pages]);
  const loadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  return (
    <View className="mt-[20px] gap-y-[20px]">
      {initialData.length ? <SecondaryArticle data={initialData} /> : null}

      {feedPages.map((page, index) =>
        page.data.length ? (
          <SecondaryArticle
            key={`home-feed-page-${page.currentPage}-${index}`}
            data={page.data}
            oppositeSide={index % 2 === 0}
          />
        ) : null,
      )}

      {(isPending || isFetchingNextPage) && <InfinityLoadSkeleton pages={1} />}

      {error ? (
        <AppText variant="meta" align="center" className="text-[#E01F26]">
          לא הצלחנו לטעון כתבות נוספות
        </AppText>
      ) : null}

      {hasNextPage && !isFetching ? (
        <View className="items-center py-[10px]">
          <Pressable
            onPress={loadMore}
            className="h-[42px] w-[190px] items-center justify-center rounded-full bg-[#E01F26]"
          >
            <AppText
              variant="meta"
              weight="medium"
              align="center"
              className="text-white"
            >
              עוד כתבות
            </AppText>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default memo(HomeFeed);
