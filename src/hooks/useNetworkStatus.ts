import { useNetworkState } from "expo-network";

export type NetworkStatus = {
  /** True only when we positively know the device is offline. */
  isOffline: boolean;
  /** True while a connection exists (defaults to true until known). */
  isConnected: boolean;
};

/**
 * Thin wrapper over expo-network's `useNetworkState()`.
 *
 * We treat the network as offline only when connectivity is *explicitly*
 * `false`, so the UI never flashes an "offline" state during the brief moment
 * before the first reading arrives.
 */
export function useNetworkStatus(): NetworkStatus {
  const state = useNetworkState();

  const isOffline =
    state.isConnected === false || state.isInternetReachable === false;

  return {
    isOffline,
    isConnected: state.isConnected ?? true,
  };
}
