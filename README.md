# PropFind — React Native App

A dark-themed real estate discovery app converted from the PropFind UI mockup.

## Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | **ListingScreen** | Search + filter chips + property cards + skeleton loader |
| 2 | **DetailScreen** | Full-screen property detail with hero image area |
| 3 | **CompareScreen** | Side-by-side comparison table with best-value badges |
| — | **BottomSheet** | "Add to Collection" slide-up sheet with radio selection |
| — | **CreateCollectionModal** | Focus-trapped modal with name/description/private toggle |
| — | **SkeletonCard** | Shimmer-animated placeholder card |

## Component Map

```
src/
├── theme/
│   └── index.ts          ← Colors, Spacing, Radius, Typography tokens
├── components/
│   ├── PropertyCard.tsx   ← Reusable card with featured/saved variants
│   ├── SkeletonCard.tsx   ← Animated shimmer skeleton
│   ├── TabBar.tsx         ← Bottom navigation bar
│   ├── BottomSheet.tsx    ← Slide-up sheet with overlay
│   └── CreateCollectionModal.tsx  ← Animated modal
└── screens/
    ├── ListingScreen.tsx  ← Main listing with search & filters
    ├── DetailScreen.tsx   ← Full property detail view
    └── CompareScreen.tsx  ← Horizontal compare table
```

## Quick Start (Expo)

```bash
# 1. Install dependencies
npm install

# 2. Start Expo
npx expo start

# 3. Scan QR with Expo Go app (iOS/Android)
```

## Quick Start (React Native CLI)

```bash
npm install

# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## Design Tokens

All colors, spacing, and radii are in `src/theme/index.ts`. The dark palette:

| Token | Value | Usage |
|-------|-------|-------|
| `bg` | `#0F0F13` | Page background |
| `surface` | `#18181F` | Card/header surfaces |
| `surface2` | `#22222C` | Input backgrounds |
| `accent` | `#7C6EF5` | Violet — CTAs, active states |
| `green` | `#4ADE80` | Match scores, positive values |
| `amber` | `#FBBF24` | Moderate match scores |

## Notes

- Navigation is handled in `App.tsx` with simple state — swap with React Navigation for production.
- The `BottomSheet` and `CreateCollectionModal` use native `Animated` (no extra dependencies).
- Skeleton shimmer uses opacity animation; swap with `react-native-reanimated` for smoother 60fps on all devices.
- Property images use gradient placeholder areas — replace with `<Image>` + real URLs when connecting a backend.
