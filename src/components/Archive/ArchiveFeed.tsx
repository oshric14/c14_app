import SecondaryArticle from "@/components/Article/SecondaryArticle/SecondaryArticle";
import type { ArticleType } from "@/types/article";

type ArchiveFeedProps = {
  group: ArticleType[];
  index: number;
};

function ArchiveFeed({ group, index }: ArchiveFeedProps) {
  return <SecondaryArticle data={group} oppositeSide={index % 2 === 1} />;
}

export default ArchiveFeed;
