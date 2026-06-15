/**
 * React Query cache persistence.
 *
 * Persists the query cache through the `kvStorage` abstraction so
 * previously-fetched content (home feed, articles, archives) is available
 * immediately on launch and while offline.
 */
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { kvStorage } from "./storage";

/** How long a persisted cache entry stays valid before it is discarded. */
export const PERSIST_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours

export const queryPersister = createAsyncStoragePersister({
  storage: kvStorage,
  key: "now14-react-query-cache",
  throttleTime: 1000,
});
