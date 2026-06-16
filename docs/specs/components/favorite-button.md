# FavoriteButton Component Specification

## Overview

The **FavoriteButton** is a toggleable heart icon button for marking items as favorites. It is externally controlled via the `selected` prop.

## API

| Prop        | Type          | Default | Description                                 |
| ----------- | ------------- | ------- | ------------------------------------------- |
| `selected`  | `boolean`     | `false` | Current favorite state.                     |
| `onClick`   | `(e) => void` | —       | Click handler.                              |
| `className` | `string`      | —       | Additional container classes.               |
| `shadow`    | `boolean`     | `false` | Adds drop shadow via `shadow-button` class. |

## Behavior

- Renders `<button>` with:
  - `flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/80`
- **Selected state**: `bg-red` background, white icon.
- **Unselected**: white background (`bg-white/80`), default text color icon.
- **Shadow**: `shadow-button` class added when `shadow=true`.
- Icon uses `Heart` at `24x24` pixels.
- ARIA: `aria-label="Add to favorites"` + `aria-pressed={selected}`.

## Visual Design

- Square circle (`h-11 w-11`).
- White/translucent background with red selected state.
- Optional button shadow.

## Accessibility

- Full keyboard operable (button element).
- `aria-pressed` reflects selection state.
- `aria-label` provides accessible name.

## Testing Guidelines

- **Selected state**: verify `bg-red` on button, white icon.
- **Unselected state**: verify `bg-white/80` background.
- **Shadow prop**: `shadow=true` adds `shadow-button`.
- **ARIA**: check `aria-pressed` toggles with `selected`.
- **Click**: handler fires on click.

## Usage Example

```tsx
import { FavoriteButton } from "@portal/ui/atoms/data-display/FavoriteButton";

<FavoriteButton selected={isFavorite} onClick={toggleFavorite} shadow />;
```
