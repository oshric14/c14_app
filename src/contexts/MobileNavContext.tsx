import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { Animated, Platform } from "react-native";

import { useNavItems } from "@/hooks/useNavItems";
import type { navItem } from "@/types/nav";

type MobileNavContextValue = {
  isOpen: boolean;
  isMounted: boolean;
  progress: Animated.Value;
  items: navItem[];
  loading: boolean;
  error: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
};

const MobileNavContext = createContext<MobileNavContextValue | null>(null);

const USE_NATIVE_DRIVER = Platform.OS !== "web";

export function MobileNavProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [progress] = useState(() => new Animated.Value(0));
  const nav = useNavItems("now14-header");

  const openNav = useCallback(() => {
    setIsMounted(true);
    setIsOpen(true);
    Animated.timing(progress, {
      toValue: 1,
      duration: 340,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start();
  }, [progress]);

  const closeNav = useCallback(() => {
    setIsOpen(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 260,
      useNativeDriver: USE_NATIVE_DRIVER,
    }).start(({ finished }) => {
      if (finished) setIsMounted(false);
    });
  }, [progress]);

  const toggleNav = useCallback(() => {
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  }, [closeNav, isOpen, openNav]);

  const value = useMemo<MobileNavContextValue>(
    () => ({
      isOpen,
      isMounted,
      progress,
      items: nav.items,
      loading: nav.loading,
      error: nav.error,
      openNav,
      closeNav,
      toggleNav,
    }),
    [
      closeNav,
      isMounted,
      isOpen,
      nav.error,
      nav.items,
      nav.loading,
      openNav,
      progress,
      toggleNav,
    ],
  );

  return (
    <MobileNavContext.Provider value={value}>
      {children}
    </MobileNavContext.Provider>
  );
}

export function useMobileNav() {
  const context = useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNav must be used within MobileNavProvider");
  }
  return context;
}
