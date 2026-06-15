import { Pressable, Share, View } from "react-native";

import { AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { useArticleLikes } from "@/hooks/useArticleLikes";

type ActionButtonProps = {
  label: string;
  value?: string | number;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

function ActionButton({ label, onPress, value, active, disabled }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`min-w-[86px] items-center rounded-full border px-[14px] py-[9px] ${
        active ? "border-brand-red bg-brand-red" : "border-[#E5E7EB] bg-white"
      }`}
    >
      <AppText
        variant="meta"
        weight="bold"
        align="center"
        className={`text-[13px] ${active ? "text-white" : "text-[#111827]"}`}
      >
        {value !== undefined && value !== "" ? `${label} ${value}` : label}
      </AppText>
    </Pressable>
  );
}

function ArticleActions() {
  const { article, articleId, articleUrl, title } = useArticleContext();
  const { vote, likes, dislikes, submitting, like, dislike } = useArticleLikes(
    articleId,
    article.likes,
    article.dislikes,
  );

  const shareArticle = () => {
    Share.share({
      title,
      message: `${title}\n${article.canonical_url ?? articleUrl}`,
      url: article.canonical_url ?? articleUrl,
    });
  };

  return (
    <View className="px-[18px] pb-[20px]">
      <View className="flex-row-reverse items-center gap-x-[8px]">
        <ActionButton label="שיתוף" onPress={shareArticle} />
        <ActionButton label="תגובות" value={article.commentsNumber || undefined} />
        <ActionButton
          label="אהבתי"
          value={likes || undefined}
          active={vote === "like"}
          disabled={submitting}
          onPress={like}
        />
        <ActionButton
          label="לא אהבתי"
          value={dislikes || undefined}
          active={vote === "dislike"}
          disabled={submitting}
          onPress={dislike}
        />
      </View>
    </View>
  );
}

export default ArticleActions;
