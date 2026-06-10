import MainArticle from "@/components/Article/MainArticle/MainArticle";
import Mekudamim from "@/components/Article/Mekudamim/Mekudamim";
import type { HomeType } from "@/types/home";

type HomeRendererProps = {
  data: HomeType[];
};

function renderHomeBlock(item: HomeType, index: number) {
  const key = `home-block-${item.type}-${item.id ?? index}`;

  switch (item.type) {
    case "rashi":
      return item.posts?.length ? (
        <MainArticle
          key={key}
          data={item.posts}
          timeline={item.timeline}
        />
      ) : null;

    case "mekudamim":
      return item.posts?.length ? (
        <Mekudamim
          key={key}
          data={item.posts}
          remove_subtitle={item.remove_subtitle}
        />
      ) : null;

    // These blocks exist on the web homepage, but do not yet have native
    // implementations. Keep the switch explicit so adding each block later is
    // a small, predictable change.
    case "opinions":
    case "stories":
    case "category":
    case "mekudam_categories":
    case "14plus":
    case "feed":
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
