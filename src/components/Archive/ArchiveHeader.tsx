import { Pressable, ScrollView, View } from "react-native";

import Breadcrumbs from "@/components/Article/shared/Breadcrumbs";
import { AppText } from "@/components/ui";
import type { ArchiveData } from "@/types/archive";
import { openArchive } from "@/utils/articleNavigation";

type ArchiveHeaderProps = {
  data: ArchiveData;
};

/** Category header: breadcrumbs, title, and a scrollable row of sub-category pills. */
function ArchiveHeader({ data }: ArchiveHeaderProps) {
  return (
    <View className="bg-[#F3F7F9] px-[15px] pb-[20px] pt-[14px]">
      {data.breadcrumbs?.length ? <Breadcrumbs items={data.breadcrumbs} /> : null}

      <AppText
        variant="headline"
        className="mt-[8px] text-[34px] leading-[40px] text-[#111827]"
      >
        {data.name}
      </AppText>

      {data.subCategories?.length ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-[14px]"
          contentContainerStyle={{ flexDirection: "row-reverse", gap: 6 }}
        >
          {data.subCategories.map((sub) => (
            <Pressable
              key={sub.id}
              onPress={() => openArchive(sub.id)}
              className="rounded-[6px] bg-white px-[20px] pb-[5px] pt-[3px]"
            >
              <AppText variant="body" className="text-[16px] text-brand-blue">
                {sub.name}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

export default ArchiveHeader;
