import { View } from "react-native";

import { AppImage, AppText } from "@/components/ui";
import { useArticleContext } from "@/contexts/ArticleContext";
import { stripHtml } from "@/utils/html";

function ArticleHeroImage() {
  const { article, images } = useArticleContext();
  const caption = stripHtml(article.imgCaption);
  const credit = stripHtml(article.image_credit);

  return (
    <View className="w-full bg-white">
      <AppImage
        source={images[0]}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        contentFit="cover"
        transition={200}
      />

      {caption || credit ? (
        <View className="px-[18px] pt-[8px]">
          <AppText variant="meta" className="text-[12px] leading-[17px] text-[#6B7280]">
            {[caption, credit].filter(Boolean).join(" | ")}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

export default ArticleHeroImage;
