import { Linking, Pressable, View } from "react-native";

import { AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";

function ArticleTags() {
  const { article } = useArticleContext();
  const tags = article.tags ?? [];

  if (!tags.length) {
    return null;
  }

  return (
    <View className="px-[18px] pb-[24px] pt-[4px]">
      <AppText variant="title" className="mb-[10px] text-[19px] text-[#111827]">
        תגיות
      </AppText>

      <View className="flex-wrap gap-[8px]" style={{ flexDirection: "row-reverse" }}>
        {tags.map((tag) => (
          <Pressable
            key={`${tag.name}-${tag.url}`}
            onPress={() => {
              if (tag.url) Linking.openURL(tag.url);
            }}
            className="rounded-full bg-[#F1F2F4] px-[12px] py-[7px]"
          >
            <AppText variant="meta" className="text-[13px] text-[#374151]">
              {tag.name}
            </AppText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default ArticleTags;
