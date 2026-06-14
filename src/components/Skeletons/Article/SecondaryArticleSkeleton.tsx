import { useEffect, useState } from "react";
import { Animated, View } from "react-native";

type SkeletonBlockProps = {
  className?: string;
  style?: object;
};

function SkeletonBlock({ className, style }: SkeletonBlockProps) {
  return (
    <View
      className={`rounded-[8px] bg-[#E9EEF2] ${className ?? ""}`}
      style={style}
    />
  );
}

function SmallArticleSkeleton({ isLast }: { isLast?: boolean }) {
  return (
    <View className="w-full">
      <View
        className="items-center gap-x-[10px]"
        style={{ flexDirection: "row-reverse" }}
      >
        <SkeletonBlock
          className="w-[40%] shrink-0"
          style={{ aspectRatio: 16 / 10 }}
        />
        <View className="flex-1 gap-y-[7px]">
          <SkeletonBlock className="h-[18px] w-[92%] self-end" />
          <SkeletonBlock className="h-[16px] w-[78%] self-end" />
          <SkeletonBlock className="h-[14px] w-[68%] self-end" />
        </View>
      </View>
      {!isLast ? <View className="my-[10px] h-[1px] bg-[#9D9D9D]/20" /> : null}
    </View>
  );
}

function SecondaryArticleSkeleton() {
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
    <Animated.View className="mb-[20px] w-full" style={{ opacity }}>
      <SkeletonBlock className="w-full" style={{ aspectRatio: 16 / 9 }} />

      <View
        className="-mt-[25px] mx-[8px] rounded-t-[10px] bg-white px-[15px] pb-[10px] pt-[20px]"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <SkeletonBlock className="h-[20px] w-[140px] self-end" />
        <SkeletonBlock className="mt-[10px] h-[28px] w-[95%] self-end" />
        <SkeletonBlock className="mt-[8px] h-[16px] w-[85%] self-end" />
        <SkeletonBlock className="mt-[6px] h-[16px] w-[75%] self-end" />
      </View>

      <View className="mx-auto w-[96%] bg-white px-[10px] pt-[8px]">
        {Array.from({ length: 4 }).map((_, index) => (
          <SmallArticleSkeleton key={index} isLast={index === 3} />
        ))}
      </View>
    </Animated.View>
  );
}

export default SecondaryArticleSkeleton;
