# Stage 4: Native Archive

## What Changed
- Added `src/app/archive/[id].tsx` as a native archive route.
- Added archive hooks in `src/hooks/useArchive.ts`:
  - `useArchive`
  - `useArchiveChildren`
  - `useArchiveArticles`
- Added archive UI components:
  - `ArchiveScreen`
  - `ArchiveHeader`
  - `ArchiveFeed`
- Archive articles use `AppFlatList` with `onEndReached` pagination and `SecondaryArticle` groups.

## Why
- The web archive is article-list driven, so reusing `SecondaryArticle` keeps visual parity without creating a new card system.
- The route is intentionally simple: metadata, children/subcategories, and article groups.
- Sports, Weather, and special archive variants are kept out of this phase as requested.

## Deferred
- Special sports archive behavior.
- `tochniot14` dedicated layouts.
- URL mapping from external archive URLs into native routes beyond direct `/archive/:id`.
- Offline-aware empty/error copy will be handled in the polish phase.
