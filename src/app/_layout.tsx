import "@/global.css";
import { getHome } from "@/services";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { I18nManager, useColorScheme } from "react-native";

// Force the app to always render right-to-left (Hebrew).
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   getHome().then((res) => {
  //     console.log(res);
  //   });
  // }, []);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
