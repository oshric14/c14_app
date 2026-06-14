import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useColorScheme, type ColorSchemeName } from "react-native";

import { layout } from "@/theme/tokens";

type LayoutContextValue = {
  colorScheme: ColorSchemeName;
  isDarkMode: boolean;
  direction: typeof layout.direction;
  headerHeight: number;
  bottomNavHeight: number;
  setHeaderHeight: (height: number) => void;
  setBottomNavHeight: (height: number) => void;
};

const LayoutContext = createContext<LayoutContextValue | null>(null);

function LayoutProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const [headerHeight, setHeaderHeight] = useState(40);
  const [bottomNavHeight, setBottomNavHeight] = useState(58);

  const value = useMemo<LayoutContextValue>(
    () => ({
      colorScheme,
      isDarkMode: colorScheme === "dark",
      direction: layout.direction,
      headerHeight,
      bottomNavHeight,
      setHeaderHeight,
      setBottomNavHeight,
    }),
    [bottomNavHeight, colorScheme, headerHeight],
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within LayoutProvider");
  }
  return context;
}

export { LayoutProvider, useLayout };
