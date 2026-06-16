import { Pressable, View } from "react-native";

import { AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { openNativeUrl } from "@/utils/articleNavigation";

function ArticleTags() {
  const { article } = useArticleContext();
  const tags = article.tags ?? [];

  if (!tags.length) {
    return null;
  }

  return (
    <View className="px-[18px] pb-[24px] pt-[4px]">
      <View className="flex-row-reverse flex-wrap gap-[8px]">
        {tags.map((tag) => (
          <Pressable
            key={`${tag.name}-${tag.url}`}
            onPress={() => {
              openNativeUrl(tag.url);
            }}
            className="rounded-full bg-[#F5F6FA] px-[12px] py-[7px]"
          >
            <AppText variant="meta" className="text-[13px] text-brand-blue">
              {tag.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default ArticleTags;
