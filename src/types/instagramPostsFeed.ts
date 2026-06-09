export type InstagramPostsApiMediaType =
  | "IMAGE"
  | "VIDEO"
  | "CAROUSEL_ALBUM";

export type InstagramPostsApiChildMedia = {
  id: string;
  media_type: InstagramPostsApiMediaType;
  media_url?: string;
  thumbnail_url?: string;
};

export type InstagramPostsApiMedia = {
  id: string;
  caption?: string;
  media_type: InstagramPostsApiMediaType;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  children?: {
    data?: InstagramPostsApiChildMedia[];
  };
};

export type InstagramPost = {
  id: string;
  caption: string;
  permalink: string;
  timestamp: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  previewUrl: string;
  posterUrl: string;
};

export type InstagramPostsFeedItem = {
  type: "instagram";
  id: string;
  post: InstagramPost;
};
