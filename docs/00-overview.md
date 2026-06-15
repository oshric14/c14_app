# Now14 Native — Project Overview

This is the native (Expo / React Native) port of the Now14 / C14 Hebrew RTL news
product. The reference implementation is the web app in `now14_frontend`
(Next.js). This app reuses the **same WordPress API** and mirrors the web
component hierarchy where it makes sense, while adapting everything to native
patterns (FlatList virtualization, Reanimated, offline-first caching).

## Scope (current effort)

Three pages are being brought to parity with the web app:

| Page     | Web route            | Native route               |
| -------- | -------------------- | -------------------------- |
| Home     | `/`                  | `src/app/index.tsx`        |
| Article  | `/article/[id]`      | `src/app/article/[id].tsx` |
| Category | `/archive/[id]`      | `src/app/archive/[id].tsx` |

> "Category" in the product is the **archive** screen (`/archive/{id}`): a
> category title, its sub-category pills, and an infinite list of articles.
> "מדורים" (madorim) is the navigation surface that links into these archives,
> not a page of its own.

## Source of truth

- **Data**: `https://www.c14.co.il/wp-json/now14-api/v1` (override with
  `EXPO_PUBLIC_API_BASE_URL`). Endpoints used: `homepage_new`, `articles`,
  `archive/{id}`, `archive/{id}/children`, `comments`, `likes`,
  `navigators/{name}`.
- **Design**: the live web **mobile viewport** (`?viewport=mobile`).

## How the work is organized

Work is delivered in numbered phases. Each phase has a dedicated log under
`docs/phases/`. Features that are intentionally not ported (yet) are tracked in
`docs/deferred-features.md`.

| Phase | Theme                                            | Log |
| ----- | ------------------------------------------------ | --- |
| 0     | Foundation: docs, folder hygiene, offline + cache | `phases/phase-0-foundation.md` |
| 1     | Home page parity                                 | `phases/phase-1-home.md` |
| 2     | Article page completeness                        | `phases/phase-2-article.md` |
| 3     | Category (archive) page                          | `phases/phase-3-category.md` |
| 4     | Native optimizations & polish                    | `phases/phase-4-polish.md` |

## Key documents

- `architecture.md` — how the app is wired (data flow, caching, navigation).
- `deferred-features.md` — what is intentionally out of scope and why.
