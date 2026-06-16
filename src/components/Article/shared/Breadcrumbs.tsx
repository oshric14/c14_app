import { Pressable, View } from "react-native";

import { AppText } from "@/components/ui";
import type { BreadcrumbsType } from "@/types/breadcrumbs";
import { openNativeUrl } from "@/utils/articleNavigation";
import { stripHtml } from "@/utils/html";

type BreadcrumbsProps = {
  data?: BreadcrumbsType;
};

function Breadcrumbs({ data }: BreadcrumbsProps) {
  const items = data?.filter((item) => stripHtml(item.label)) ?? [];

  if (!items.length) {
    return null;
  }

  return (
    <View className="px-[18px] pb-[6px] pt-[14px]">
      <View className="flex-row-reverse flex-wrap items-center gap-x-[6px] gap-y-[4px]">
        {items.map((item, index) => (
          <Pressable
            key={`${item.label}-${item.url}-${index}`}
            className="flex-row-reverse items-center gap-x-[6px]"
            onPress={() => openNativeUrl(item.url)}
          >
            <AppText variant="meta" className="text-[12px] text-[#60646C]">
              {stripHtml(item.label)}
            </AppText>
            {index < items.length - 1 ? (
              <AppText variant="meta" className="text-[12px] text-[#A1A1AA]">
                /
              </AppText>
            ) : null}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default Breadcrumbs;
