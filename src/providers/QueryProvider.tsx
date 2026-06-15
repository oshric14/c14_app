import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState, type PropsWithChildren } from "react";

import { PERSIST_MAX_AGE, queryPersister } from "@/lib/queryPersister";

function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            // gcTime must be >= the persist maxAge, otherwise React Query
            // evicts entries before they can be restored from storage.
            gcTime: PERSIST_MAX_AGE,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: queryPersister, maxAge: PERSIST_MAX_AGE }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}

export default QueryProvider;
