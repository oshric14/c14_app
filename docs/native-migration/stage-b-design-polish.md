# Stage B: Design and Navigation Polish

## Article Page
- Article title now uses brand blue instead of dark gray.
- Article subtitle now uses the stable web subtitle color (`#626262`) through `tokens.colors.text.secondary`.
- The article header order is closer to web: roof title, title, author/time/comments meta row, then subtitle.
- Added a shared `CommentsBadge` for article header and promoted articles.
- Removed the dead comments action pill from `ArticleActions`; comments still remain a later feature.

## Home Page
- `Mekudamim` items now show the comments badge when the count is above the web threshold.
- `mekudam_categories` no longer renders through `SecondaryArticle`.
- Added `src/components/Category/MekudamCategory/` with a web-like hero card: image, navy overlay, red category pill, title, and meta.
- Home section titles are pressable when an archive id exists.

## Archive
- Added `ArchiveHeaderSkeleton` for initial metadata loading.
- Archive initial loading now uses structural article skeletons instead of a generic spinner.
- Archive pagination loading now uses `InfinityLoadSkeleton`.

## Navigation
- `openArticle()` now respects `redirect_url` and maps internal article/archive URLs to native routes first.
- Added `openArchive()` and `openNativeUrl()` to centralize article/archive/link routing.
- Category badges, home section titles, article tags, breadcrumbs, mobile nav, and bottom nav now route through the native-first mapper.

## Deferred
- Full comments modal/section.
- Dedicated native routes for VOD/program/live pages.
- Special Sports, Weather, and advanced archive variants.
- Full tag/search/native URL coverage beyond article/archive/home.
