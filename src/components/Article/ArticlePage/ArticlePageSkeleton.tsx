import { View } from "react-native";

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: object;
}) {
  return <View className={`bg-[#E9ECEF] ${className ?? ""}`} style={style} />;
}

function ArticlePageSkeleton() {
  return (
    <View className="bg-white">
      <SkeletonBlock style={{ width: "100%", aspectRatio: 16 / 9 }} />

      <View className="px-[18px] py-[18px]">
        <SkeletonBlock className="mb-[10px] h-[18px] w-[90px] rounded-full" />
        <SkeletonBlock className="mb-[8px] h-[34px] w-full rounded-[8px]" />
        <SkeletonBlock className="mb-[14px] h-[34px] w-[82%] rounded-[8px]" />
        <SkeletonBlock className="mb-[22px] h-[22px] w-full rounded-[8px]" />

        <View className="mb-[24px] flex-row-reverse gap-x-[8px]">
          <SkeletonBlock className="h-[38px] w-[86px] rounded-full" />
          <SkeletonBlock className="h-[38px] w-[86px] rounded-full" />
          <SkeletonBlock className="h-[38px] w-[86px] rounded-full" />
        </View>

        <SkeletonBlock className="mb-[12px] h-[18px] w-full rounded-[6px]" />
        <SkeletonBlock className="mb-[12px] h-[18px] w-full rounded-[6px]" />
        <SkeletonBlock className="mb-[12px] h-[18px] w-[94%] rounded-[6px]" />
        <SkeletonBlock className="mb-[22px] h-[18px] w-[88%] rounded-[6px]" />
      </View>
    </View>
  );
}

export default ArticlePageSkeleton;
