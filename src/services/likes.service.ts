import { httpRequestService } from "./httpRequest.service";

export type LikeTarget = "article" | "comment";

/** Delta applied to like/dislike counts, mirroring the web `useLikes` contract. */
export type LikeAction = {
  like?: number;
  dislike?: number;
};

type LikeResponse = {
  data: {
    currentLikes: number;
    currentDislikes: number;
  };
};

export type LikeResult = {
  likes: number;
  dislikes: number;
};

/**
 * Sends a like/dislike vote and returns the authoritative counts from the API.
 * `action` encodes the delta (e.g. `{ like: 1 }`, `{ like: -1, dislike: 1 }`).
 */
export async function postLike(
  id: number,
  type: LikeTarget,
  action: LikeAction,
): Promise<LikeResult> {
  const response = await httpRequestService.post<LikeResponse>("likes", {
    id,
    type,
    action,
  });

  return {
    likes: response.data.currentLikes,
    dislikes: response.data.currentDislikes,
  };
}
