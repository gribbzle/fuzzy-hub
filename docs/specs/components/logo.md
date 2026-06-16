# Logo Component Specification

## Overview

The **Logo** component renders the application logo in either horizontal or vertical orientation using Next.js `Image`.

## API

| Prop          | Type                         | Default        | Description                      |
| ------------- | ---------------------------- | -------------- | -------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Logo layout.                     |
| `alt`         | `string`                     | `"logo"`       | Alt text for accessibility.      |
| `className`   | `string`                     | —              | Additional image classes merged. |

## Behavior

- Image sources defined in `LOGO_SRC`:
  - `horizontal` → `/images/logo/logo-horizontal.png` (462×160)
  - `vertical` → `/images/logo/logo-vertical.png` (242×104)
- `unoptimized={isPlaywrightCt()}` disables optimization in test context.
- `priority` preloads the logo.

## Visual Design

- Horizontal logo: 462×160 pixels.
- Vertical logo: 242×104 pixels.
- Unselectable via `pointer-events-none`.

## Accessibility

- `alt` provides alternative description.
- Logo is decorative; ensure `alt` conveys brand identity.

## Testing Guidelines

- **Orientation**: verify correct source and dimensions rendered.
- **Alt text**: confirm default or custom alt attribute.

## Usage Example

```tsx
import { Logo } from "@portal/ui/atoms/data-display/Logo";

<header>
  <Logo orientation="horizontal" alt="Fuzzy Hub - Pet Marketplace" />
</header>;
```
