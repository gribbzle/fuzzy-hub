# Avatar Component Specification

## Overview

The **Avatar** component renders a user image with a fallback icon when no source is provided. It supports circle or square variants.

## API

| Prop        | Type                               | Default    | Description                                          |
| ----------- | ---------------------------------- | ---------- | ---------------------------------------------------- |
| `src`       | `string \| null`                   | —          | Image URL; if `null`/undefined, shows fallback icon. |
| `alt`       | `string`                           | `""`       | Alt text for accessibility.                          |
| `variant`   | `"circle" \| "square"`             | `"circle"` | Shape of the avatar container.                       |
| `className` | `string`                           | —          | Additional Tailwind classes (width/height excluded). |
| `...rest`   | `ImageProps` (omitted `src`/`alt`) | —          | Remaining Next.js `Image` props.                     |

## Behavior

- Renders a `<div>` wrapper (`w-12 h-12`) containing either a fallback icon or `Image`.
- **Fallback** (`src` missing): shows `BreederFill` icon centered, inherits text color.
- **With `src`**: displays `Image` using `fill` prop (covers wrapper), shape determined by variant.
- `unoptimized` is set to `true` in Playwright test context via `isPlaywrightCt()`.

## Visual Design

- Container: `relative flex justify-center items-center bg-bg-default w-12 h-12 overflow-hidden`.
- Circle variant: `rounded-full`.
- Square variant: no additional radius (square corners).
- Fallback icon: `absolute w-1/2 h-1/2`.
- Image: `object-contain pointer-events-none shrink-0`.

## Accessibility

- Container `<div>` since image is background.
- `alt` prop provides alternate description when image renders.
- Ensure `src` or surrounding context provides identity for screen readers.

## Testing Guidelines

- **No source**: verify fallback icon visible.
- **With source**: assert `Image` component receives correct `src` and `fill`.
- **Variant**: `variant="square"` removes `rounded-full`.
- **ClassName merge**: custom classes combine with wrapper styles.

## Usage Example

```tsx
import { Avatar } from "@portal/ui/atoms/data-display/Avatar";

<Avatar
  src="/images/user-avatar.jpg"
  alt="Jane Smith"
  variant="square"
  className="border-2 border-aqua-green"
/>;
```
