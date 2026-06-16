import { useEffect, useState } from "react";
import { Animated, View } from "react-native";

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: object;
}) {
  return (
    <View
      className={`rounded-[8px] bg-[#E1E8ED] ${className ?? ""}`}
      style={style}
    />
  );
}

function ArchiveHeaderSkeleton() {
  const [opacity] = useState(() => new Animated.Value(0.55));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.55,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      className="pb-[18px] pt-[18px]"
      style={{ backgroundColor: "#F3F7F9", opacity }}
    >
      <View className="px-[18px]">
        <SkeletonBlock className="h-[16px] w-[160px] self-end" />
        <SkeletonBlock className="mt-[18px] h-[42px] w-[210px] self-end" />
        <SkeletonBlock className="mt-[10px] h-[16px] w-[86%] self-end" />
        <SkeletonBlock className="mt-[8px] h-[16px] w-[68%] self-end" />

        <View className="mt-[16px] flex-row-reverse flex-wrap gap-[8px]">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-[34px] w-[82px] rounded-full" />
          ))}
        </View>
      </View>
    </Animated.View>
  );
}

export default ArchiveHeaderSkeleton;
