import { ActivityIndicator, Pressable, View } from "react-native";

import { AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { useArticleComments } from "@/hooks/useArticleComments";
import type { CommentType } from "@/types/comments";
import { stripHtml } from "@/utils/html";

function CommentCard({ comment, isReply }: { comment: CommentType; isReply?: boolean }) {
  const body = stripHtml(comment.content);

  return (
    <View className={isReply ? "mr-[18px] border-r border-[#E5E7EB] pr-[12px]" : ""}>
      <View className="rounded-[10px] bg-[#F8F8FA] px-[14px] py-[12px]">
        <View className="flex-row-reverse items-center justify-between">
          <AppText weight="bold" className="text-[14px] text-[#111827]">
            {comment.author || "אנונימי"}
          </AppText>
          {comment.time ? (
            <AppText variant="meta" className="text-[12px] text-[#6B7280]">
              {comment.time}
            </AppText>
          ) : null}
        </View>

        {comment.replayTo ? (
          <AppText variant="meta" className="mt-[2px] text-[12px] text-brand-red">
            בתגובה ל{comment.replayTo}
          </AppText>
        ) : null}

        {body ? (
          <AppText variant="body" className="mt-[8px] text-[16px] leading-[24px] text-[#1F2937]">
            {body}
          </AppText>
        ) : null}

        <View className="mt-[10px] flex-row-reverse items-center gap-x-[14px]">
          <AppText variant="meta" className="text-[12px] text-[#6B7280]">
            {`אהבתי ${comment.likes ?? 0}`}
          </AppText>
          <AppText variant="meta" className="text-[12px] text-[#6B7280]">
            {`לא אהבתי ${comment.dislikes ?? 0}`}
          </AppText>
        </View>
      </View>

      {comment.subComments?.length ? (
        <View className="mt-[10px] gap-y-[10px]">
          {comment.subComments.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </View>
      ) : null}
    </View>
  );
}

/**
 * Read-only comments list for the article. Comments paginate 3 at a time.
 * Posting a comment requires user authentication, which is deferred
 * (see docs/deferred-features.md).
 */
function ArticleComments() {
  const { article, articleId } = useArticleContext();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useArticleComments(articleId);

  if (article.hideComments) {
    return null;
  }

  const comments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <View className="mt-[10px] px-[18px] pb-[28px]">
      <AppText variant="title" className="mb-[14px] text-[20px] text-[#111827]">
        {`תגובות${article.commentsNumber ? ` (${article.commentsNumber})` : ""}`}
      </AppText>

      {isPending ? (
        <ActivityIndicator color="#E01F26" />
      ) : isError ? (
        <AppText variant="meta" className="text-brand-red">
          לא הצלחנו לטעון את התגובות
        </AppText>
      ) : comments.length === 0 ? (
        <AppText variant="meta" className="text-[#6B7280]">
          אין עדיין תגובות. היו הראשונים להגיב.
        </AppText>
      ) : (
        <View className="gap-y-[12px]">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </View>
      )}

      {hasNextPage ? (
        <Pressable
          onPress={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-[16px] h-[42px] items-center justify-center self-center rounded-full bg-[#EFEFF2] px-[26px]"
        >
          <AppText variant="meta" weight="medium" className="text-[#111827]">
            {isFetchingNextPage ? "טוען..." : "עוד תגובות"}
          </AppText>
        </Pressable>
      ) : null}
    </View>
  );
}

export default ArticleComments;
