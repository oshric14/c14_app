import { useCallback, useEffect, useState } from "react";

import { kvStorage } from "@/lib/storage";
import { postLike, type LikeAction } from "@/services/likes.service";

type Vote = "like" | "dislike" | null;

function voteKey(articleId: number) {
  return `article-vote-${articleId}`;
}

function toCount(value?: string | number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Like/dislike state for a single article.
 *
 * The user's own vote is persisted locally (the web uses localStorage; native
 * has no such API, so we use the shared `kvStorage`). Counts are seeded from the
 * article payload and then replaced by the authoritative values the API returns.
 */
export function useArticleLikes(
  articleId: number,
  initialLikes?: string | number,
  initialDislikes?: string | number,
) {
  const [vote, setVote] = useState<Vote>(null);
  const [likes, setLikes] = useState(() => toCount(initialLikes));
  const [dislikes, setDislikes] = useState(() => toCount(initialDislikes));
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    kvStorage.getItem(voteKey(articleId)).then((stored) => {
      if (active && (stored === "like" || stored === "dislike")) {
        setVote(stored);
      }
    });
    return () => {
      active = false;
    };
  }, [articleId]);

  const persistVote = useCallback(
    (next: Vote) => {
      setVote(next);
      if (next) {
        kvStorage.setItem(voteKey(articleId), next);
      } else {
        kvStorage.removeItem(voteKey(articleId));
      }
    },
    [articleId],
  );

  const submit = useCallback(
    async (target: "like" | "dislike") => {
      if (submitting) return;

      const isLiked = vote === "like";
      const isDisliked = vote === "dislike";

      let action: LikeAction;
      let nextVote: Vote;

      if (target === "like") {
        action = isLiked
          ? { like: -1 }
          : isDisliked
            ? { like: 1, dislike: -1 }
            : { like: 1 };
        nextVote = isLiked ? null : "like";
      } else {
        action = isDisliked
          ? { dislike: -1 }
          : isLiked
            ? { like: -1, dislike: 1 }
            : { dislike: 1 };
        nextVote = isDisliked ? null : "dislike";
      }

      setSubmitting(true);
      try {
        const result = await postLike(articleId, "article", action);
        setLikes(result.likes);
        setDislikes(result.dislikes);
        persistVote(nextVote);
      } catch {
        // Leave counts/vote unchanged on failure.
      } finally {
        setSubmitting(false);
      }
    },
    [articleId, persistVote, submitting, vote],
  );

  return {
    vote,
    likes,
    dislikes,
    submitting,
    like: () => submit("like"),
    dislike: () => submit("dislike"),
  };
}
