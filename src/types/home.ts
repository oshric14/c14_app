import { ArticleType } from "./article";
import { TimelineType } from "./Timeline";

export type SpecialProject = {
  link: string;
  title: string;
  image: string;
};

export interface HomeType {
  type: string;
  image?: string;
  posts: ArticleType[];
  cats: Cat[];
  content: string;
  id: number;
  category_name: string;
  layout: string;
  remove_subtitle?: boolean;
  programs: Program[];
  timeline?: TimelineType;
  widget: {
    name: string;
    data: {
      poll_design?: string;
      storycard_id?: string;
      app_only?: boolean;
      mobile_banner?: string;
      desktop_banner?: string;
      url?: string;
      projects?: SpecialProject[];
    };
  };
}

export interface Cat {
  id: number;
  title: string;
  posts: ArticleType[];
}

export interface Program {
  id: number;
  title: string;
  image: string;
}

export type OpinionType = Pick<ArticleType, "id" | "title" | "author">;
