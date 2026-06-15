/**
 * Key/value storage abstraction.
 *
 * Consumers only ever see a small async interface. Under the hood we prefer
 * MMKV (fast, synchronous, native) when its module is available — i.e. in a
 * custom dev client or a production build — and transparently fall back to
 * AsyncStorage when it is not (e.g. Expo Go). Swapping the backend therefore
 * never touches calling code.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface AsyncKVStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const MMKV_INSTANCE_ID = "now14-storage";

/**
 * Build an MMKV-backed store, or return null when the native module is not
 * present (Expo Go). The require + instantiation are guarded so a missing
 * native module degrades gracefully instead of crashing the app.
 */
function createMmkvStorage(): AsyncKVStorage | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createMMKV } = require("react-native-mmkv") as typeof import("react-native-mmkv");
    const mmkv = createMMKV({ id: MMKV_INSTANCE_ID });

    return {
      getItem: (key) => Promise.resolve(mmkv.getString(key) ?? null),
      setItem: (key, value) => {
        mmkv.set(key, value);
        return Promise.resolve();
      },
      removeItem: (key) => {
        mmkv.remove(key);
        return Promise.resolve();
      },
    };
  } catch {
    return null;
  }
}

function createAsyncStorage(): AsyncKVStorage {
  return {
    getItem: (key) => AsyncStorage.getItem(key),
    setItem: (key, value) => AsyncStorage.setItem(key, value),
    removeItem: (key) => AsyncStorage.removeItem(key),
  };
}

const mmkvStorage = createMmkvStorage();

/** True when the fast native MMKV backend is in use (dev client / production). */
export const isUsingMmkv = mmkvStorage !== null;

/** App-wide persistent key/value store. */
export const kvStorage: AsyncKVStorage = mmkvStorage ?? createAsyncStorage();
