# Deferred / Out-of-scope Features

These exist on the web app but are intentionally **not** ported in the current
effort. They are listed so nothing is silently lost. Each home block that has no
native implementation renders nothing (the `HomeRenderer` switch is explicit).

## Deferred by request

| Feature            | Web source                         | Reason            |
| ------------------ | ---------------------------------- | ----------------- |
| Weather widget     | `widget` block + `/weather`        | Complex; skip now |
| Sports widgets     | `widget` block + sports archives   | Complex; skip now |

## Deferred (heavy / platform-specific)

| Feature                         | Web source                          | Notes |
| ------------------------------- | ----------------------------------- | ----- |
| TTS audio playback              | `tts_data` + AudioTTS               | Needs audio + word-highlight engine |
| Google / Outbrain ads, GTM      | `banner` blocks, `Kubia`, dataLayer | Ad SDKs not wired in native |
| Live HLS/DASH streaming         | `LiveVideoPlayer`                   | Separate streaming effort |
| VOD / Shows                     | `vod`, `programs_carousel`          | Separate effort |
| Stories bar                     | `stories`                           | Separate effort |
| Search                          | `/search`                           | Separate effort |
| Auth / login                    | user context                        | Required before writing comments/likes as a user |
| 14+ subscription content        | `14plus`                            | Separate product surface |

## Partial / fallback implementations

| Feature                  | Native behavior |
| ------------------------ | --------------- |
| In-article social embeds (Twitter/TikTok/Instagram) | Rendered as a tappable "open in browser" card rather than inline embeds. |
| In-article iframe video  | Played via WebView fallback when not a direct stream URL. |
| Comment posting          | Read + paginate first. Writing a comment depends on auth, which is deferred. |

This file is updated at the end of each phase.
