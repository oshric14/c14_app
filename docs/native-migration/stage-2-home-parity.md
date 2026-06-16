# Stage 2: Home Parity

## What Changed
- `HomeRenderer` now maps additional web homepage block types:
  - `category`
  - `opinions`
  - `stories`
  - `mekudam_categories`
  - `14plus`
  - `vod`
- These blocks reuse existing native article components (`SecondaryArticle`, `Mekudamim`) instead of introducing unrelated component names.
- Section titles are rendered locally inside `HomeRenderer` as a small helper, not as a new public reusable API.

## Why
- The web homepage is driven by `HomeType.type`, so keeping the explicit switch makes future parity work predictable.
- Reusing `SecondaryArticle` keeps visual behavior close to the current native implementation and avoids creating a second card system too early.
- The implementation favors recognizable structure over premature abstraction.

## Deferred
- `programs_carousel`, `Mibzakim`, `html`, `widget`, and `banner` remain disabled for now because they depend on heavier product/API behavior.
- Dedicated native layouts for `stories`/`opinions` can be added later if design review shows that the shared `SecondaryArticle` layout is not close enough.
