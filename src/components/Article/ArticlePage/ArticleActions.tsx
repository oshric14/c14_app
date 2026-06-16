import { Pressable, Share, View } from "react-native";

import { AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";

type ActionButtonProps = {
  label: string;
  value?: string | number;
  onPress?: () => void;
};

function ActionButton({ label, onPress, value }: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="min-w-[86px] items-center rounded-full border border-[#E5E7EB] bg-white px-[14px] py-[9px]"
    >
      <AppText variant="meta" weight="bold" align="center" className="text-[13px] text-[#111827]">
        {value ? `${label} ${value}` : label}
      </AppText>
    </Pressable>
  );
}

function ArticleActions() {
  const { article, articleUrl, title } = useArticleContext();

  const shareArticle = () => {
    Share.share({
      title,
      message: `${title}\n${article.canonical_url ?? articleUrl}`,
      url: article.canonical_url ?? articleUrl,
    });
  };

  return (
    <View className="px-[18px] pb-[20px]">
      <View
        className="flex-row-reverse items-center gap-x-[8px]"
      >
        <ActionButton label="שיתוף" onPress={shareArticle} />
        <ActionButton label="אהבתי" value={article.likes} />
      </View>
    </View>
  );
}

export default ArticleActions;
