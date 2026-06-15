# Phase 2 — Article page completeness

Status: complete

## Goals

Bring the article reader from read-only to feature-complete: richer content,
the lead video, comments, working likes/dislikes, and breadcrumbs.

## What changed

### Richer HTML content (`src/utils/html.ts` + `ArticleContent.tsx`)

`parseArticleContent` now produces a wider set of blocks:

- `heading`, `quote`, `image` (as before)
- `paragraph` now carries inline **segments** so links are tappable
- `list` (ordered / unordered) with bullet or number markers
- `embed` for `<iframe>` and social blockquotes (Twitter/X, Instagram, TikTok,
  YouTube) — rendered as an "open in browser" card (inline third-party embeds
  are deferred; see `docs/deferred-features.md`)

`ArticleContent.tsx` renders each block type; links and embeds open via
`expo-web-browser`.

### Lead video

- `src/components/Article/ArticlePage/ArticleTopVideo.tsx` — loads the same
  Redge player page the web embeds
  (`/static/embeded/redge_player_3.6.0.html?videoID=...`) inside a
  `react-native-webview`, at a 16:9 ratio with the credit caption. When an
  article has a `topVideo`, it replaces the hero image.

### Comments (read + paginate)

- `src/services/comments.service.ts` — `getCommentsPage` (3 per page, matching
  the web `comments/?article_id=&offset=&per_page=3`).
- `src/hooks/useArticleComments.ts` — infinite query.
- `src/components/Article/ArticlePage/ArticleComments.tsx` — comment cards with
  author, time, body, like/dislike counts, nested replies, and "load more".
  Posting requires auth and is deferred.

### Likes / dislikes

- `src/services/likes.service.ts` — `postLike(id, type, action)` -> authoritative
  counts.
- `src/hooks/useArticleLikes.ts` — tracks the user's own vote (persisted via the
  shared `kvStorage`, the native stand-in for the web's localStorage), computes
  the like/dislike delta exactly like the web `useLikes`, and seeds counts from
  the article payload.
- `src/components/Article/ArticlePage/ArticleActions.tsx` — the previously
  display-only buttons now vote; the active vote is highlighted in brand red.

### Breadcrumbs

- `ArticleHeader.tsx` renders `article.breadcrumbs` above the roof title; a crumb
  that points at `/archive/{id}` navigates in-app.

### Composition

- `ArticlePage.tsx` now renders top video (or hero), header, actions, content,
  tags, related, and comments.

## Notes / deviations

- Added `react-native-webview` (Expo Go compatible) for the video player.
- TTS audio, ads, and inline social embeds remain deferred.

## Verification

- `npx tsc --noEmit` passes with no errors.
