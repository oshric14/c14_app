import { BreadcrumbsType } from "./breadcrumbs";

export type Author = {
  id: number;
  name: string;
  img: string;
  description?: string;
};


export type TTSAlignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};

export type TTSNarrator = {
  heb_name: string;
  eng_name: string;
  img: string | null;
  img_modal?: string;
  tts_audio: string;
  tts_alignment?: string;
  audio_base64?: string;
  alignment?: TTSAlignment;
  normalized_alignment?: TTSAlignment;
  generatedAt: string;
};

export type TTSData = Record<string, TTSNarrator>;

export type TTSAlignmentResponse = {
  alignment: TTSAlignment;
  normalized_alignment: TTSAlignment;
};

export type WordTiming = {
  word: string;
  startTime: number;
  endTime: number;
  charStartIndex: number;
  charEndIndex: number;
};

export type ArticleType = {
  id: number;
  title: string;
  img: string;
  imgCaption?: string;
  author: Author;
  variant?: "Rashi" | "Small" | "Big" | "Mekudam";
  timeInWords?: string;
  subTitle?: string;
  roofTitle?: string;
  content?: string | TrustedHTML;
  date?: string;
  tags?: ArticleTagsType;
  breadcrumbs?: BreadcrumbsType;
  category?: string;
  timelineItems?: { id: number; title: string; timeInWords: string }[];
  videoDuration?: string;
  video?: boolean;
  topVideo?: TopVideo;
  isLive?: boolean;
  commentsNumber: number;
  likes: string;
  dislikes: string;
  canonical_url?: string;
  publishMeta: {
    author: string;
    date: string;
    time: string;
    title: string;
  };
  template?: "unusualEvent" | "nurmal";
  wordsCount: number;
  image_credit?: string;
  redirect_url?: string;
  shivuki_text?: string;
  top_banner?: {
    image: string;
    link: string;
  };
  seo?: {
    title: string;
    description: string;
    ogImg: string | URL;
    publishTime: string;
    dateModified: string;
  };
  hideComments?: boolean;
  type?: "opinion" | "podcast";
  tts_data?: TTSData;
  tag?: { name: string; img: string };
};

export type TimeLineType = {
  id: number;
  title: string;
  timeInWords: string;
  img?: string;
};

export type mibzakType = {
  id: number;
  title: string;
  time: string;
  text?: string;
  date: string;
};
export type ArticleTagsType = {
  name: string;
  url: string;
}[];

export type TopVideo = {
  videoId: string;
  credit: string;
};
