import { View } from "react-native";

import ArchiveFeed from "@/components/Archive/ArchiveFeed";
import ArchiveHeader from "@/components/Archive/ArchiveHeader";
import ArchiveHeaderSkeleton from "@/components/Archive/ArchiveHeaderSkeleton";
import SecondaryArticleSkeleton from "@/components/Skeletons/Article/SecondaryArticleSkeleton";
import InfinityLoadSkeleton from "@/components/Skeletons/InfinityLoad/InfinityLoadSkeleton";
import { AppFlatList, AppText, ErrorState } from "@/components/ui";
import {
  useArchive,
  useArchiveArticles,
  useArchiveChildren,
} from "@/hooks/useArchive";
import type { ArticleType } from "@/types/article";

type ArchiveScreenProps = {
  archiveId?: number;
};

function chunkArticles(articles: ArticleType[], size = 5) {
  const chunks: ArticleType[][] = [];
  for (let index = 0; index < articles.length; index += size) {
    chunks.push(articles.slice(index, index + size));
  }
  return chunks;
}

function ArchiveScreen({ archiveId }: ArchiveScreenProps) {
  const archiveQuery = useArchive(archiveId);
  const childrenQuery = useArchiveChildren(archiveId);
  const articlesQuery = useArchiveArticles(archiveId);
  const articles = articlesQuery.data?.pages.flat() ?? [];
  const groups = chunkArticles(articles);
  const isInitialLoading = archiveQuery.isLoading || articlesQuery.isLoading;

  const refreshArchive = async () => {
    await Promise.allSettled([
      archiveQuery.refetch(),
      childrenQuery.refetch(),
      articlesQuery.refetch(),
    ]);
  };

  if (!Number.isFinite(archiveId)) {
    return <ErrorState message="הארכיון לא נמצא" />;
  }

  return (
    <AppFlatList<ArticleType[]>
      data={groups}
      bottomNavPadding
      onRefresh={refreshArchive}
      keyExtractor={(group, index) =>
        `archive-group-${group[0]?.id ?? index}`
      }
      renderItem={({ item, index }) => (
        <ArchiveFeed group={item} index={index} />
      )}
      ListHeaderComponent={
        isInitialLoading ? (
          <ArchiveHeaderSkeleton />
        ) : (
          <ArchiveHeader
            archive={archiveQuery.data}
            childrenData={childrenQuery.data}
          />
        )
      }
      ListEmptyComponent={
        isInitialLoading ? (
          <View className="bg-white pt-[18px]">
            <SecondaryArticleSkeleton />
            <SecondaryArticleSkeleton />
          </View>
        ) : archiveQuery.isError || articlesQuery.isError ? (
          <ErrorState
            message="לא הצלחנו לטעון את הארכיון. בדקו חיבור ונסו שוב."
            actionLabel="נסה שוב"
            onActionPress={refreshArchive}
          />
        ) : (
          <View className="min-h-[220px] items-center justify-center px-[24px]">
            <AppText variant="error" align="center">
              לא נמצאו כתבות בקטגוריה הזאת
            </AppText>
          </View>
        )
      }
      ListFooterComponent={
        articlesQuery.isFetchingNextPage ? (
          <View className="bg-white pt-[8px]">
            <InfinityLoadSkeleton pages={1} />
          </View>
        ) : null
      }
      onEndReachedThreshold={0.55}
      onEndReached={() => {
        if (articlesQuery.hasNextPage && !articlesQuery.isFetchingNextPage) {
          articlesQuery.fetchNextPage();
        }
      }}
    />
  );
}

export default ArchiveScreen;
