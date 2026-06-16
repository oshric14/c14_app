import { Pressable, View } from "react-native";
import { router } from "expo-router";

import Breadcrumbs from "@/components/Article/shared/Breadcrumbs";
import { AppText } from "@/components/ui";
import { tokens } from "@/theme/tokens";
import type { ArchiveChild, ArchiveData } from "@/types/archive";
import { stripHtml } from "@/utils/html";

type ArchiveHeaderProps = {
  archive?: ArchiveData;
  childrenData?: ArchiveChild[];
};

function getArchiveTitle(archive?: ArchiveData) {
  return stripHtml(archive?.name ?? archive?.title ?? archive?.category_name);
}

function ArchiveHeader({ archive, childrenData }: ArchiveHeaderProps) {
  const title = getArchiveTitle(archive);
  const description = stripHtml(archive?.description);
  const subCategories = childrenData?.length
    ? childrenData
    : archive?.subCategories;

  return (
    <View style={{ backgroundColor: "#F3F7F9" }} className="pb-[18px]">
      <Breadcrumbs data={archive?.breadcrumbs} />

      <View className="px-[18px] pt-[10px]">
        <AppText
          variant="headline"
          className="text-[35px] leading-[40px] text-brand-blue"
        >
          {title || "ארכיון"}
        </AppText>

        {description ? (
          <AppText
            variant="body"
            className="mt-[8px] text-[16px] leading-[24px] text-[#60646C]"
          >
            {description}
          </AppText>
        ) : null}

        {subCategories?.length ? (
          <View className="mt-[16px] flex-row-reverse flex-wrap gap-[8px]">
            {subCategories.map((child) => {
              const childTitle = stripHtml(child.title ?? child.name);
              if (!childTitle) return null;

              return (
                <Pressable
                  key={child.id}
                  onPress={() =>
                    router.push({
                      pathname: "/archive/[id]",
                      params: { id: String(child.id) },
                    })
                  }
                  className="rounded-full bg-white px-[13px] py-[8px]"
                  style={{
                    borderWidth: 1,
                    borderColor: tokens.colors.brand.gray,
                  }}
                >
                  <AppText variant="meta" className="text-[13px] text-brand-blue">
                    {childTitle}
                  </AppText>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default ArchiveHeader;
