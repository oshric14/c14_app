import { memo } from "react";
import { Pressable, View } from "react-native";

import MainArticle from "@/components/Article/MainArticle/MainArticle";
import Mekudamim from "@/components/Article/Mekudamim/Mekudamim";
import SecondaryArticle from "@/components/Article/SecondaryArticle/SecondaryArticle";
import MekudamCategory from "@/components/Category/MekudamCategory/MekudamCategory";
import { AppText } from "@/components/ui";
import HomeFeed from "@/components/Home/Feed/HomeFeed";
import type { HomeType } from "@/types/home";
import { openArchive } from "@/utils/articleNavigation";

type HomeRendererProps = {
  item: HomeType;
  index: number;
};

const HomeBlockTitle = memo(function HomeBlockTitle({
  archiveId,
  title,
}: {
  archiveId?: number;
  title?: string;
}) {
  if (!title) return null;

  const content = (
    <>
      <AppText variant="title" className="text-[22px] leading-[26px] text-brand-blue">
        {title}
      </AppText>
      <View className="mt-[7px] h-[3px] w-[42px] self-end rounded-full bg-brand-red" />
    </>
  );

  if (Number.isFinite(archiveId)) {
    return (
      <Pressable
        className="mb-[10px] mt-[18px] px-[14px]"
        onPress={() => openArchive(archiveId)}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View className="mb-[10px] mt-[18px] px-[14px]">{content}</View>
  );
});

function renderHomeBlock(item: HomeType, index: number) {
  const key = `home-block-${item.type}-${item.id ?? index}`;
  const title = item.category_name;

  switch (item.type) {
    case "rashi":
      return item.posts?.length ? (
        <MainArticle data={item.posts} timeline={item.timeline} />
      ) : null;

    case "mekudamim":
      return item.posts?.length ? (
        <Mekudamim
          data={item.posts}
          remove_subtitle={item.remove_subtitle}
        />
      ) : null;

    case "feed":
      return <HomeFeed initialData={item.posts} itemsPerPage={5} />;

    case "category":
    case "opinions":
    case "stories":
    case "14plus":
    case "vod":
      return item.posts?.length ? (
        <View key={key}>
          <HomeBlockTitle archiveId={item.id} title={title} />
          <SecondaryArticle
            data={item.posts}
            categoryId={item.id}
            categoryName={title}
          />
        </View>
      ) : null;

    case "mekudam_categories":
      return item.cats?.length ? (
        <MekudamCategory key={key} data={item.cats} />
      ) : null;

    // These blocks exist on the web homepage, but do not yet have native
    // implementations. Keep the switch explicit so adding each block later is
    // a small, predictable change.
    case "programs_carousel":
    case "Mibzakim":
    case "html":
    case "widget":
    case "banner":
      return null;

    default:
      return null;
  }
}

function HomeRenderer({ index, item }: HomeRendererProps) {
  return renderHomeBlock(item, index);
}

export default memo(HomeRenderer);
