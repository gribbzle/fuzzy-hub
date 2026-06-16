# ArtDirectionImage Component Specification

## Overview

The **ArtDirectionImage** component serves responsive images with separate sources per breakpoint using `<picture>` + `next/image`'s `getImageProps`.

## API

| Prop        | Type                                        | Default      | Description                                 |
| ----------- | ------------------------------------------- | ------------ | ------------------------------------------- |
| `src`       | `{ mobile, tablet, desktop, largeDesktop }` | **required** | Object with image URLs for each breakpoint. |
| `className` | `string`                                    | —            | Classes merged onto the `<img>`.            |

## Behavior

- Wraps `<picture>` with four `<source>` elements:
  - `largeDesktop` ≥1919px
  - `desktop` ≥1280px
  - `tablet` ≥768px
  - `mobile` ≤767px
- All sources use `sizes="100vw"` and `fill` for responsive scaling.
- In Playwright test context, bypasses `getImageProps` and returns raw attachment URL.
- Renders `<img>` with `w-full h-auto object-cover`.

## Visual Design

- Full-width responsive (`w-full h-auto`).
- `object-cover` fills container while maintaining aspect ratio.

## Accessibility

- `alt` is omitted (empty string) — decorative or managed by parent context.

## Testing Guidelines

- **Sources**: verify four `<source>` elements with correct media queries.
- **Test mode**: assert `isPlaywrightCt()` bypasses Next.js image optimization.

## Usage Example

```tsx
import { ArtDirectionImage } from "@portal/ui/atoms/data-display/ArtDirectionImage";

<ArtDirectionImage
  src={{
    mobile: "img-sm.jpg",
    tablet: "img-md.jpg",
    desktop: "img-lg.jpg",
    largeDesktop: "img-xl.jpg",
  }}
  className="rounded-md"
/>;
```
