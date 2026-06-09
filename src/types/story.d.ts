import { ArticleType, Author } from "./article";

export type StoryType = ArticleType;

export type StoryCategories = {
  id: number;
  story: string;
  img: string;
  stories: StoryType[];
};

export type StoryVariantProps = {
  storyData: StoryType;
  storyIndex: number;
};
