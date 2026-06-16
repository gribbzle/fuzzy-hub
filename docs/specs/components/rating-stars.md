# RatingStars Component Specification

## Overview

The **RatingStars** component displays a row of five stars, filling a configurable number (0-5) as active. It supports custom star sizing and styling.

## API

| Prop             | Type                     | Default      | Description                           |
| ---------------- | ------------------------ | ------------ | ------------------------------------- |
| `rating`         | `number`                 | **required** | Number of filled stars (0-5).         |
| `size`           | `number`                 | —            | Width/height in pixels for each star. |
| `className`      | `string`                 | —            | Classes for the container `<div>`.    |
| `slotProps.icon` | `{ className?: string }` | —            | Override classes for star icons.      |

## Behavior

- Renders exactly **five** `<StarFill>` icons in a flex row.
- Filled stars (`i <= rating`) receive `text-[#F6D96F]` (gold).
- Inactive stars receive `text-border-gray`.
- `size` prop affects all stars uniformly (`w-{size} h-{size}`).
- Container uses `flex items-center`.

## Visual Design

- Default star size: `w-8 h-8`.
- Filled: gold (#F6D96F).
- Inactive: `border-gray`.

## Accessibility

- Semantic `<div>`.
- Consider adding `aria-label="5 star rating, 3 filled"` in consuming code.

## Testing Guidelines

- **Rating accuracy**: `rating=3` fills first 3 stars, leaves 2 inactive.
- **Size prop**: verify `w-{size} h-{size}` applied.
- **Out-of-range**: `rating=7` still renders 5 stars (only first 5 filled).
- **ClassName merge**: custom classes combine.

## Usage Example

```tsx
import { RatingStars } from "@portal/ui/atoms/data-display/RatingStars";

<RatingStars rating={4.5} size={24} />;
```
