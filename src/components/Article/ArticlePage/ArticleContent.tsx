import * as WebBrowser from "expo-web-browser";
import { Pressable, View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { parseArticleContent, type ArticleContentBlock } from "@/utils/html";

function openLink(url: string) {
  WebBrowser.openBrowserAsync(url).catch(() => {});
}

function Paragraph({
  segments,
}: {
  segments: Extract<ArticleContentBlock, { type: "paragraph" }>["segments"];
}) {
  return (
    <AppText variant="body" className="mb-[16px] text-[18px] leading-[30px] text-[#111827]">
      {segments.map((segment, index) =>
        segment.href ? (
          <AppText
            key={index}
            onPress={() => openLink(segment.href as string)}
            className="text-[18px] leading-[30px] text-brand-red underline"
          >
            {segment.text}
          </AppText>
        ) : (
          segment.text
        ),
      )}
    </AppText>
  );
}

function ContentBlock({ block, index }: { block: ArticleContentBlock; index: number }) {
  switch (block.type) {
    case "image":
      return (
        <AppImage
          source={block.src}
          accessibilityLabel={block.alt}
          style={{ width: "100%", aspectRatio: 16 / 9, borderRadius: 10, marginBottom: 18 }}
          contentFit="cover"
        />
      );

    case "heading":
      return (
        <AppText
          variant="title"
          className="mb-[10px] mt-[6px] text-[22px] leading-[29px] text-[#111827]"
        >
          {block.text}
        </AppText>
      );

    case "quote":
      return (
        <View className="mb-[18px] border-r-[4px] border-brand-red bg-[#F8F8FA] px-[14px] py-[12px]">
          <AppText variant="subtitle" className="text-[18px] leading-[27px] text-[#111827]">
            {block.text}
          </AppText>
        </View>
      );

    case "list":
      return (
        <View className="mb-[16px] gap-y-[8px] pr-[6px]">
          {block.items.map((item, itemIndex) => (
            <View key={itemIndex} className="flex-row-reverse gap-x-[8px]">
              <AppText variant="body" className="text-[18px] leading-[28px] text-[#111827]">
                {block.ordered ? `${itemIndex + 1}.` : "\u2022"}
              </AppText>
              <AppText
                variant="body"
                className="flex-1 text-[18px] leading-[28px] text-[#111827]"
              >
                {item}
              </AppText>
            </View>
          ))}
        </View>
      );

    case "embed":
      return (
        <Pressable
          onPress={() => openLink(block.url)}
          className="mb-[18px] flex-row-reverse items-center justify-between rounded-[10px] border border-[#E5E7EB] bg-[#F8F8FA] px-[16px] py-[14px]"
        >
          <AppText variant="body" weight="medium" className="text-[16px] text-brand-blue">
            {block.label}
          </AppText>
          <AppText className="text-[18px] text-brand-red">{"\u2039"}</AppText>
        </Pressable>
      );

    case "paragraph":
      return <Paragraph segments={block.segments} />;

    default:
      return null;
  }
}

function ArticleContent() {
  const { article } = useArticleContext();
  const blocks = parseArticleContent(String(article.content ?? ""));

  if (!blocks.length) {
    return null;
  }

  return (
    <View className="px-[18px]">
      {blocks.map((block, index) => (
        <ContentBlock key={index} block={block} index={index} />
      ))}
    </View>
  );
}

export default ArticleContent;
