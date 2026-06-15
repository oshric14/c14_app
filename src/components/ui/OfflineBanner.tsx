import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNetworkStatus } from "@/hooks/useNetworkStatus";

import AppText from "./AppText";

/**
 * App-wide indicator shown when the device loses connectivity. Rendered once at
 * the root so it overlays every screen. Cached content stays usable; this just
 * tells the user why fresh data is not loading.
 */
function OfflineBanner() {
  const { isOffline } = useNetworkStatus();
  const insets = useSafeAreaInsets();

  if (!isOffline) {
    return null;
  }

  return (
    <View
      style={{ paddingTop: insets.top, elevation: 8 }}
      className="absolute left-0 right-0 top-0 z-50 bg-brand-blue"
    >
      <AppText
        align="center"
        weight="medium"
        className="py-[6px] text-[13px] text-white"
      >
        אין חיבור לאינטרנט — מוצג תוכן שמור
      </AppText>
    </View>
  );
}

export default OfflineBanner;
