import Grid from "@/components/Article/Grid/Grid";
import MainArticle from "@/components/Article/MainArticle/MainArticle";
import Mekudamim from "@/components/Article/Mekudamim/Mekudamim";
import SecondaryArticle from "@/components/Article/SecondaryArticle/SecondaryArticle";
import MekudamCategory from "@/components/Category/MekudamCategory/MekudamCategory";
import type { HomeType } from "@/types/home";

type HomeRendererProps = {
  data: HomeType[];
};

function renderHomeBlock(item: HomeType, index: number) {
  const key = `home-block-${item.type}-${item.id ?? index}`;

  switch (item.type) {
    case "rashi":
      return item.posts?.length ? (
        <MainArticle key={key} data={item.posts} timeline={item.timeline} />
      ) : null;

    case "mekudamim":
      return item.posts?.length ? (
        <Mekudamim
          key={key}
          data={item.posts}
          remove_subtitle={item.remove_subtitle}
        />
      ) : null;

    case "category":
      if (!item.posts?.length) return null;
      // "grid" categories show an image-tile grid; everything else uses the
      // big + small article layout. Both link through to the archive.
      return item.layout === "grid" ? (
        <Grid
          key={key}
          articles={item.posts}
          categoryName={item.category_name}
          categoryId={item.id}
        />
      ) : (
        <SecondaryArticle
          key={key}
          data={item.posts}
          categoryName={item.category_name}
          categoryId={item.id}
        />
      );

    case "mekudam_categories":
      return item.cats?.length ? (
        <MekudamCategory key={key} data={item.cats} />
      ) : null;

    // The "feed" block is rendered by the screen-level virtualized list
    // (HomeList), not here, so it can paginate without nested lists.
    case "feed":
      return null;

    // Blocks that exist on the web homepage but are intentionally out of scope
    // for now (see docs/deferred-features.md). Kept explicit so adding each one
    // later is a small, predictable change.
    case "opinions":
    case "stories":
    case "14plus":
    case "programs_carousel":
    case "vod":
    case "Mibzakim":
    case "html":
    case "widget":
    case "banner":
      return null;

    default:
      return null;
  }
}

function HomeRenderer({ data }: HomeRendererProps) {
  return <>{data.map(renderHomeBlock)}</>;
}

export default HomeRenderer;
