# Stage 3: Article Parity

## What Changed
- Added native `Breadcrumbs` under `src/components/Article/shared/Breadcrumbs.tsx`, matching the web naming.
- `ArticlePage` now renders the article body inside a raised card that lightly overlaps the hero image, closer to the web mobile article shape.
- `parseArticleContent()` now recognizes `ul` / `ol` list items in addition to headings, paragraphs, blockquotes, and images.
- Header, BottomNav, and LoadingState now use `src/theme/tokens.ts` for core brand colors.

## Why
- The article page needed more of the web visual hierarchy without adding heavy features.
- Breadcrumbs are part of the article contract and help preserve user context.
- List support improves article readability for common editorial HTML without introducing a full HTML renderer dependency.

## Deferred
- TTS, comments, advanced video, Weather, embeds, and full HTML rendering remain separate phases.
- Breadcrumb links are displayed as context only for now; routing from every breadcrumb URL needs a URL-to-native-route mapper.
