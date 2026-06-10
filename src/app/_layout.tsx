import "@/global.css";

import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { I18nManager, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { MobileNavProvider } from "@/contexts/MobileNavContext";
import QueryProvider from "@/providers/QueryProvider";

// Force the app to always render right-to-left (Hebrew).
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // SimonaPro is the brand font (mirrors the web). Each weight is registered
  // under its own family so headings can pick the correct cut on Android.
  const [fontsLoaded, fontError] = useFonts({
    SimonaPro: require("@/assets/static/fonts/SimonaPro-Regular.ttf"),
    "SimonaPro-Medium": require("@/assets/static/fonts/SimonaPro-Medium.ttf"),
    "SimonaPro-Bold": require("@/assets/static/fonts/SimonaPro-Bold.ttf"),
    "SimonaPro-Black": require("@/assets/static/fonts/SimonaPro-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <QueryProvider>
          <MobileNavProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <StatusBar style="light" />
          </MobileNavProvider>
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
