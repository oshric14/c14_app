import { Pressable, View } from "react-native";

import { AppText } from "@/components/ui";
import type { BreadcrumbsType } from "@/types/breadcrumbs";
import { openArchive } from "@/utils/articleNavigation";

type BreadcrumbsProps = {
  items: BreadcrumbsType;
};

function archiveIdFromUrl(url?: string): number | undefined {
  const id = Number(url?.match(/\/archive\/(\d+)/)?.[1]);
  return Number.isFinite(id) ? id : undefined;
}

/** RTL breadcrumb trail; crumbs that point at an archive navigate in-app. */
function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <View className="flex-row-reverse flex-wrap items-center">
      {items.map((item, index) => {
        const archiveId = archiveIdFromUrl(item.url);
        const isLast = index === items.length - 1;

        return (
          <View key={`${item.label}-${index}`} className="flex-row-reverse items-center">
            <Pressable
              onPress={archiveId ? () => openArchive(archiveId) : undefined}
              disabled={!archiveId}
            >
              <AppText variant="meta" weight="medium" className="text-[13px] text-brand-red">
                {item.label}
              </AppText>
            </Pressable>
            {!isLast ? (
              <AppText variant="meta" className="mx-[5px] text-[13px] text-[#9CA3AF]">
                {"\u203A"}
              </AppText>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

export default Breadcrumbs;
