import { ArticleType } from "./article";

export type MekudamCategoryType = {
  title: string;
  id: number;
  posts: ArticleType[];
};
