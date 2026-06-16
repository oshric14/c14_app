import { View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { parseArticleContent } from "@/utils/html";

function ArticleContent() {
  const { article } = useArticleContext();
  const blocks = parseArticleContent(String(article.content ?? ""));

  if (!blocks.length) {
    return null;
  }

  return (
    <View className="px-[18px]">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <AppImage
              key={`article-content-image-${block.src}-${index}`}
              source={block.src}
              accessibilityLabel={block.alt}
              style={{
                width: "100%",
                aspectRatio: 16 / 9,
                borderRadius: 10,
                marginBottom: 18,
              }}
              contentFit="cover"
            />
          );
        }

        if (block.type === "heading") {
          return (
            <AppText
              key={`article-content-heading-${index}`}
              variant="title"
              className="mb-[10px] mt-[6px] text-[22px] leading-[29px] text-[#111827]"
            >
              {block.text}
            </AppText>
          );
        }

        if (block.type === "quote") {
          return (
            <View
              key={`article-content-quote-${index}`}
              className="mb-[18px] border-r-[4px] border-[#E01F26] bg-[#F8F8FA] px-[14px] py-[12px]"
            >
              <AppText variant="subtitle" className="text-[18px] leading-[27px] text-[#111827]">
                {block.text}
              </AppText>
            </View>
          );
        }

        if (block.type === "listItem") {
          return (
            <View
              key={`article-content-list-item-${index}`}
              className="mb-[10px] flex-row-reverse gap-x-[10px]"
            >
              <AppText variant="body" className="text-[18px] leading-[30px] text-brand-red">
                {block.ordered ? `${index + 1}.` : "•"}
              </AppText>
              <AppText
                variant="body"
                className="min-w-0 flex-1 text-[18px] leading-[30px] text-[#111827]"
              >
                {block.text}
              </AppText>
            </View>
          );
        }

        return (
          <AppText
            key={`article-content-paragraph-${index}`}
            variant="body"
            className="mb-[16px] text-[18px] leading-[30px] text-[#111827]"
          >
            {block.text}
          </AppText>
        );
      })}
    </View>
  );
}

export default ArticleContent;
