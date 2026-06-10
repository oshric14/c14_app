import { View } from "react-native";

import SecondaryArticleSkeleton from "@/components/Skeletons/Article/SecondaryArticleSkeleton";

type InfinityLoadSkeletonProps = {
  pages?: number;
};

function InfinityLoadSkeleton({ pages = 1 }: InfinityLoadSkeletonProps) {
  return (
    <View className="gap-y-[20px]">
      {Array.from({ length: pages }).map((_, index) => (
        <SecondaryArticleSkeleton key={index} />
      ))}
    </View>
  );
}

export default InfinityLoadSkeleton;
