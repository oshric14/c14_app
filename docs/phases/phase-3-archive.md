# Phase 3 — Category (Archive) page + in-app navigation

Goal: bring the category page to parity with the web `/archive/[id]`, and make the
app's navigation (bottom bar + side menu) move **inside the app** instead of
opening the website.

## What was added

### Data layer

- `src/types/archive.ts` — `ArchiveData` (name, breadcrumbs, sub-categories) and
  `ArchiveSubCategory`.
- `src/services/archive.service.ts` — `getArchivePage()` fetches one page of a
  category's articles (`articles?archive={id}&offset=&number=`). Paging stops
  automatically when the API returns a partial page.
- `src/hooks/useArchive.ts`
  - `useArchive(id)` — category metadata (React Query).
  - `useArchiveFeed(id)` — infinite, paginated article feed.

### UI

- `src/components/Article/shared/Breadcrumbs.tsx` — breadcrumb trail extracted
  from the article header so the article page and category page share one
  implementation. Crumbs that point at a category navigate in-app.
- `src/components/Archive/ArchiveHeader.tsx` — light header with breadcrumbs,
  the category title, and a horizontally scrollable row of sub-category pills.
- `src/components/Archive/ArchiveFeed.tsx` — virtualized `AppFlatList` of
  `SecondaryArticle` groups with pull-to-refresh, infinite scroll, skeleton
  loading, and an empty state.
- `src/components/Archive/ArchiveScreen.tsx` — composes header + feed inside the
  standard app shell (`Header`, `BottomNav`, side menu).
- `src/app/archive/[id].tsx` — Expo Router route; validates the `id` param and
  renders the screen (or a friendly "category not found" state).

### In-app navigation

- `src/components/Layout/BottomNav.tsx`
  - **בית** → navigates to `/` (home), highlighted when active.
  - **מדורים** → opens the side menu (drawer).
  - **LIVE / שידורים / VOD** → open the relevant page on the website for now
    (these surfaces are deferred — see `deferred-features.md`).
- `src/components/Layout/MobileNav.tsx` — top-level nav items and category pills
  that map to a category now navigate **in-app** (`/archive/{id}`) via
  `openArchive()`. Radio / search / external links still open the browser.

## Native notes / limitations

- LIVE, shows (שידורים) and VOD are not yet native screens; tapping them opens
  the website. They're documented as deferred.
- The category id is resolved from the nav item's `/archive/{id}` link, falling
  back to its WordPress `object_id` for `category`/`archive` item types.

## Verification

- `npx tsc --noEmit` passes with no errors.
- No linter errors in the new/changed files.
