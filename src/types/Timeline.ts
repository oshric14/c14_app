import { ArticleType } from "./article";

export type TimelineItemType = ArticleType & TimelineEventType;

export type TimelineEventType = {
  id: string;
  title: string;
  time: string;
};

export type TimelineType = {
  id: number;
  title: string;
  date: string;
  events: TimelineItemType[];
};
