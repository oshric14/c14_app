import "@/global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { OfflineBanner } from "@/components/ui";
import { LayoutProvider } from "@/contexts/LayoutContext";
import { MobileNavProvider } from "@/contexts/MobileNavContext";
import QueryProvider from "@/providers/QueryProvider";

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
          <LayoutProvider>
            <MobileNavProvider>
              <Stack screenOptions={{ headerShown: false }} />
              <OfflineBanner />
              <StatusBar style="light" />
            </MobileNavProvider>
          </LayoutProvider>
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
