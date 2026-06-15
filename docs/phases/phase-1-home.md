# Phase 1 — Home page parity

Status: complete

## Goals

Move the home page onto React Query (so it benefits from offline persistence),
render the in-scope category blocks, and virtualize the page for performance.

## What changed

### Data on React Query

- `src/hooks/useHome.ts` — `useHome()` fetches the mobile home blocks
  (`queryKey: ["home","mobile"]`), replacing the ad-hoc `useState`/`useEffect`
  in the screen. Now the home payload is cached + persisted + available offline.
- `src/hooks/useHomeFeed.ts` — `useHomeFeed()` wraps the infinite "more
  articles" query (extracted from the old `HomeFeed` component).
- `src/app/index.tsx` — now a thin screen: `useHome()` + `HomeList`.

### Virtualized home

- `src/components/Home/HomeList.tsx` — renders the whole page as **one**
  `FlatList`:
  - non-feed blocks render in `ListHeaderComponent` via `HomeRenderer`,
  - the infinite feed is the list's `data` (groups of 5 -> one
    `SecondaryArticle` each), paginating through `onEndReached`.
  - This avoids nested `VirtualizedList`s while giving the long feed real
    virtualization. Pull-to-refresh refetches home + feed together.
- Removed the now-unused `src/components/Home/Feed/HomeFeed.tsx`.

### New home blocks

- `category` block: renders `Grid` (when `layout === "grid"`) or
  `SecondaryArticle`, both linking to the archive.
  - `src/components/Article/Grid/Grid.tsx` + `GridItem.tsx` — 2-column image
    tiles with a navy bottom gradient (`expo-linear-gradient`).
  - `src/components/ui/SectionHeader.tsx` — native equivalent of the web
    `HeaderBar`; the red section bar that links to the category archive.
- `mekudam_categories` block:
  - `src/components/Category/MekudamCategory/MekudamCategory.tsx` +
    `MekudamCategoryItem.tsx` — full-width navy cards (image behind a navy
    gradient, red category pill, headline, byline).

### Navigation

- `src/utils/articleNavigation.ts` — added `openArchive(id)` used by the
  category blocks. (The `/archive/{id}` route is delivered in Phase 3.)

## Notes / deviations

- Added `expo-linear-gradient` (Expo Go compatible) for the category gradients.
- `opinions` / `stories` remain deferred (see `docs/deferred-features.md`); the
  `HomeRenderer` switch keeps every block type explicit.

## Verification

- `npx tsc --noEmit` passes with no errors.
