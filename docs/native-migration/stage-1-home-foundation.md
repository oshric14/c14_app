# Stage 1: Home Foundation

## What Changed
- `src/app/index.tsx` now uses `useHome()` with React Query instead of local `useEffect` / `useState`.
- The home screen now renders homepage blocks through `AppFlatList` so the screen can virtualize large homepage payloads.
- `AppFlatList` now supports pull-to-refresh, React Query invalidation fallback, brand refresh color, and bottom nav padding.
- `HomeRenderer` renders a single homepage block. This matches FlatList's rendering model and keeps the web-like block switch explicit.

## Why
- React Query gives the homepage a shared cache, clear refetch behavior, and consistent loading/error semantics with the article page.
- FlatList avoids mounting the entire homepage tree at once, which is important as more native blocks are added.
- The implementation keeps existing component names (`MainArticle`, `Mekudamim`, `SecondaryArticle`, `HomeFeed`) so web developers can still recognize the structure.

## Deferred
- Heavy blocks (`widget`, `html`, `programs_carousel`, `Mibzakim`) remain intentionally unmapped.
- Home feed still keeps its explicit "עוד כתבות" button until the full feed/archive scrolling behavior is validated on device.
- The project currently declares Expo SDK 54 in `package.json`; SDK 56 docs were checked because the workspace standard requires it, but no Expo version upgrade was made.
