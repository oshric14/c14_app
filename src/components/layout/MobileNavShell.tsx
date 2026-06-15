import { Animated, Dimensions, Platform, StyleSheet, View } from "react-native";
import type { PropsWithChildren } from "react";

import { useMobileNav } from "@/contexts/MobileNavContext";

import MobileNav from "./MobileNav";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const PREVIEW_TRANSLATE_X = -WINDOW_WIDTH * 0.3;
const absoluteFill = {
  position: "absolute" as const,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

const webPreviewBlur =
  Platform.OS === "web"
    ? ({ filter: "blur(1.5px)" } as unknown as Record<string, string>)
    : null;

function MobileNavShell({ children }: PropsWithChildren) {
  const {
    isMounted,
    progress,
    items,
    loading,
    error,
    closeNav,
  } = useMobileNav();

  const scale = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.62],
  });

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, PREVIEW_TRANSLATE_X],
  });

  const borderRadius = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 18],
  });

  const pageOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.92],
  });

  const backdropOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.2],
  });

  return (
    <View style={styles.root}>
      <Animated.View
        pointerEvents="none"
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      />

      <Animated.View
        style={[
          styles.pagePreview,
          {
            opacity: pageOpacity,
            borderRadius,
            transform: [{ translateX }, { scale }],
          },
          isMounted ? webPreviewBlur : null,
        ]}
      >
        {children}
      </Animated.View>

      {isMounted ? (
        <MobileNav
          onClose={closeNav}
          progress={progress}
          items={items}
          loading={loading}
          error={error}
        />
      ) : null}
    </View>
  );
}

export default MobileNavShell;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  backdrop: {
    ...absoluteFill,
    backgroundColor: "#000000",
  },
  pagePreview: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
});
