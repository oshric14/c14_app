import type { ArticleType } from "@/types/article";
import type { TimelineType } from "@/types/Timeline";

import NormalLayout from "./NormalLayout/NormalLayout";
import UnusualEventLayout from "./UnusualEventLayout/UnusualEventLayout";

type MainArticleProps = {
  data: ArticleType[];
  timeline?: TimelineType;
};

function MainArticle({ data, timeline }: MainArticleProps) {
  const template = data[0]?.template;

  if (!data.length) {
    return null;
  }

  if (template === "unusualEvent") {
    return <UnusualEventLayout data={data} timeline={timeline} />;
  }

  return <NormalLayout data={data} timeline={timeline} />;
}

export default MainArticle;
