# Phase 0 — Foundation, docs, infra

Status: complete

## Goals

Lay the groundwork the feature phases depend on: documentation, folder hygiene,
offline detection, and a persistent cache.

## What changed

### Documentation

- Added `docs/00-overview.md`, `docs/architecture.md`,
  `docs/deferred-features.md`, and this `docs/phases/` log.

### Folder hygiene

- Normalized git-tracked folder casing: `src/components/home` -> `Home` and
  `src/components/layout` -> `Layout` to match the existing PascalCase imports
  (`@/components/Home/*`, `@/components/Layout/*`) and the rest of the repo
  (`Article/`, `Skeletons/`). This prevents broken imports on case-sensitive
  build machines (EAS / CI), even though Windows resolves them either way.

### Offline indicator

- `src/hooks/useNetworkStatus.ts` — wraps `expo-network`'s `useNetworkState()`.
  expo-network is the Expo-native equivalent of `@react-native-community/netinfo`
  and, importantly, is bundled in Expo Go (no dev build required).
- `src/components/ui/OfflineBanner.tsx` — a root-level banner shown only when the
  device is positively offline. Cached content stays usable underneath.
- Wired `OfflineBanner` into `src/app/_layout.tsx`.

### Persistent cache

- `src/lib/storage.ts` — `kvStorage`, an async key/value abstraction that prefers
  MMKV (`react-native-mmkv`) when its native module is present and falls back to
  AsyncStorage otherwise. `isUsingMmkv` reports which backend is active.
- `src/lib/queryPersister.ts` — a React Query persister backed by `kvStorage`
  (24h max age).
- `src/providers/QueryProvider.tsx` — switched to `PersistQueryClientProvider`;
  `gcTime` raised to the persist max age so entries survive long enough to be
  restored.

## Decisions / deviations

- **Redis -> MMKV/AsyncStorage + React Query persistence.** Redis is server-side
  and cannot run in the app; this is the native equivalent of a fast,
  restart-surviving cache.
- **NetInfo -> expo-network.** Same capability, Expo-native, and works in Expo
  Go. The app currently runs in Expo Go (`Using Expo Go` in the dev server), so
  this keeps it runnable without a custom build.
- **MMKV is opt-in by environment.** It needs a custom dev client (Nitro / new
  architecture native module). Until then the app transparently uses
  AsyncStorage; building a dev client switches it to MMKV with no code change.

## Dependencies added

`expo-network`, `@react-native-async-storage/async-storage`,
`react-native-mmkv`, `@tanstack/react-query-persist-client`,
`@tanstack/query-async-storage-persister`.

## Follow-ups

- Tune persisted-cache `buster` to the app version once releases begin, so a new
  build invalidates stale cached payloads.
