import { useMemo } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppScrollView, AppText } from "@/components/ui";
import type { navItem } from "@/types/nav";
import { openArchive } from "@/utils/articleNavigation";

type MobileNavProps = {
  onClose: () => void;
  progress: Animated.Value;
  items: navItem[];
  loading?: boolean;
  error?: boolean;
};

const DRAWER_WIDTH = Math.min(
  Math.round(Dimensions.get("window").width * 0.78),
  340,
);
const absoluteFill = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

function resolveNavUrl(link?: string) {
  if (!link) return "";
  if (link.startsWith("http")) return link;
  return `https://www.c14.co.il${link.startsWith("/") ? link : `/${link}`}`;
}

function openNavLink(link: string, onClose: () => void) {
  const url = resolveNavUrl(link);
  onClose();
  if (url) {
    Linking.openURL(url).catch(() => {});
  }
}

/** Resolve the in-app archive id for a nav item, if it maps to a category. */
function archiveIdForItem(item: navItem): number | undefined {
  const fromLink = Number(item.link?.match(/\/archive\/(\d+)/)?.[1]);
  if (Number.isFinite(fromLink)) return fromLink;

  if (item.type === "category" || item.type === "archive") {
    return Number.isFinite(item.object_id) ? item.object_id : undefined;
  }

  return undefined;
}

/**
 * Category/archive items navigate inside the app; everything else (radio,
 * search, external sites) still opens in the browser.
 */
function handleNavItem(item: navItem, onClose: () => void) {
  const archiveId = archiveIdForItem(item);
  onClose();

  if (archiveId !== undefined) {
    openArchive(archiveId);
    return;
  }

  const url = resolveNavUrl(item.link);
  if (url) {
    Linking.openURL(url).catch(() => {});
  }
}

function getVisibleItems(items: navItem[]) {
  return items.filter(
    (item) =>
      item.title !== "mega menu" &&
      !item.subItems &&
      !item.link?.includes("www.p14.co.il"),
  );
}

function getQuickItems(items: navItem[]) {
  const megaMenu = items.find((item) => item.title === "mega menu");
  const lastGroup = megaMenu?.subItems?.[megaMenu.subItems.length - 1];
  return lastGroup?.subItems?.slice(0, 4) ?? [];
}

function AnimatedNavItem({
  item,
  index,
  progress,
  onClose,
}: {
  item: navItem;
  index: number;
  progress: Animated.Value;
  onClose: () => void;
}) {
  const start = Math.min(index * 0.045, 0.65);
  const mid = Math.min(start + 0.18, 0.85);
  const end = Math.min(start + 0.42, 1);

  const translateY = progress.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [18, 18, 0, 0],
  });

  const opacity = progress.interpolate({
    inputRange: [0, start, mid, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Pressable
        hitSlop={8}
        onPress={() => handleNavItem(item, onClose)}
        className="py-[5px]"
      >
        <AppText
          variant="title"
          weight={item.link?.includes("podcast.c14.co.il") ? "medium" : "regular"}
          className="text-[21px] leading-[26px] text-[#707070]"
        >
          {item.title}
        </AppText>
      </Pressable>
    </Animated.View>
  );
}

export default function MobileNav({
  onClose,
  progress,
  items,
  loading = false,
  error = false,
}: MobileNavProps) {
  const insets = useSafeAreaInsets();

  const visibleItems = useMemo(() => getVisibleItems(items), [items]);
  const quickItems = useMemo(() => getQuickItems(items), [items]);

  const drawerTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [DRAWER_WIDTH, 0],
  });

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.View
        style={{
          ...styles.drawer,
          width: DRAWER_WIDTH,
          paddingTop: insets.top + 18,
          transform: [{ translateX: drawerTranslateX }],
        }}
      >
        <View className="flex-row items-center justify-between px-[22px]">
          <Pressable
            onPress={onClose}
            hitSlop={12}
            className="h-[34px] w-[34px] items-center justify-center rounded-full bg-white"
          >
            <AppText
              variant="title"
              weight="medium"
              align="center"
              className="text-[#E01F26]"
            >
              ×
            </AppText>
          </Pressable>

          <View className="items-end">
            <AppText variant="title" weight="bold" className="text-[#141533]">
              תפריט
            </AppText>
            <AppText variant="meta" className="text-[#7D7D7D]">
              עכשיו 14
            </AppText>
          </View>
        </View>

        <AppScrollView
          className="mt-[24px]"
          contentContainerStyle={{ paddingHorizontal: 28, paddingBottom: 48 }}
        >
          {loading ? (
            <AppText variant="meta" className="text-[#7D7D7D]">
              טוען תפריט...
            </AppText>
          ) : error ? (
            <AppText variant="meta" className="text-[#E01F26]">
              לא הצלחנו לטעון את התפריט
            </AppText>
          ) : (
            <>
              <View className="gap-y-[8px]">
                {visibleItems.map((item, index) => (
                  <AnimatedNavItem
                    key={`${item.object_id}-${item.title}`}
                    item={item}
                    index={index}
                    progress={progress}
                    onClose={onClose}
                  />
                ))}

                <AnimatedNavItem
                  item={{
                    itemId: -1,
                    object_id: -1,
                    title: "חיפוש",
                    link: "/search",
                    type: "custom",
                    subItems: null,
                  }}
                  index={visibleItems.length}
                  progress={progress}
                  onClose={onClose}
                />
              </View>

              {quickItems.length ? (
                <View className="mt-[28px] gap-y-[10px]">
                  {quickItems.map((item) => (
                    <Pressable
                      key={`${item.object_id}-${item.title}`}
                      onPress={() => handleNavItem(item, onClose)}
                      className="h-[36px] items-center justify-center rounded-[18px] bg-white"
                    >
                      <AppText
                        variant="meta"
                        weight="medium"
                        align="center"
                        className="text-[#141533]"
                      >
                        {item.title}
                      </AppText>
                    </Pressable>
                  ))}

                  <Pressable
                    onPress={() => openNavLink("/radio", onClose)}
                    className="h-[36px] items-center justify-center rounded-[18px] bg-white"
                  >
                    <AppText
                      variant="meta"
                      weight="medium"
                      align="center"
                      className="text-[#E01F26]"
                    >
                      רדיו
                    </AppText>
                  </Pressable>
                </View>
              ) : null}

              <View className="mt-[28px] flex-row justify-end gap-x-[12px]">
                <Pressable onPress={() => openNavLink("https://c14news.com/", onClose)}>
                  <AppText variant="meta" className="text-[#E01F26]">
                    EN
                  </AppText>
                </Pressable>
                <AppText variant="meta" className="text-[#7D7D7D]">
                  |
                </AppText>
                <Pressable onPress={() => openNavLink("https://mignews.com/", onClose)}>
                  <AppText variant="meta" className="text-[#E01F26]">
                    RU
                  </AppText>
                </Pressable>
              </View>
            </>
          )}
        </AppScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...absoluteFill,
    zIndex: 100,
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: -8, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 18,
  },
});
