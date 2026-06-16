# Stage 5: Polish and Performance

## What Changed
- React Query defaults now keep inactive data for 10 minutes and retry failed queries up to two attempts.
- Home, article, and archive failures now show a clear retry action.
- Existing cache choices:
  - Home: `staleTime` 60 seconds, `gcTime` 10 minutes.
  - Article: `staleTime` 30 seconds.
  - Related articles: `staleTime` 60 seconds.
  - Archive metadata: `staleTime` 5 minutes.
  - Archive children: `staleTime` 10 minutes.
  - Archive articles: `staleTime` 60 seconds.

## Why
- This gives a simple cache layer without adding persistence or a new dependency before device testing.
- Retry actions improve the no-internet / flaky-network experience even before adding explicit offline detection.
- Query cache keeps back/forward navigation warmer and reduces unnecessary API calls.

## Recommended Next Improvements
- Add network detection with an Expo-compatible package such as `@react-native-community/netinfo` if product wants a dedicated offline screen.
- Add React Query persistence after deciding storage (`AsyncStorage` or SQLite) and freshness rules.
- Evaluate FlashList only after profiling real homepage/archive payloads; current `FlatList` usage is enough for the first native pass.
- Add route mapping for archive/category URLs so `MobileNav` can navigate natively instead of opening web URLs.
- Later product phases: TTS, comments, advanced video, Weather, Sports, analytics, push notifications, deep links.
