# RatingChip Component Specification

## Overview

The **RatingChip** component displays a small badge showing a rating value with a star icon, suitable for overlaying on images or near product titles.

## API

| Prop             | Type                     | Default      | Description                           |
| ---------------- | ------------------------ | ------------ | ------------------------------------- |
| `label`          | `string`                 | **required** | Rating value text (e.g., "4.8").      |
| `className`      | `string`                 | —            | Additional classes for the container. |
| `slotProps.icon` | `{ className?: string }` | —            | Override icon size & styling.         |
| `slotProps.text` | `<p>` props              | —            | Override text element styling.        |

## Behavior

- Renders a `<div>` with:
  - `flex h-7.5 items-center justify-center gap-1 overflow-hidden rounded-3xl bg-white/80 pr-2 pl-1.5`
- **Star icon**: `StarFill` at `20x20` pixels, gold color `#F6D96F`.
- **Label text**: `text-16 text-text-default font-medium`.
- Both icon and text accept slot customizations merged via `twMerge`.

## Visual Design

- Pill shape via `rounded-3xl`.
- Semi-transparent white background (`bg-white/80`).
- Fixed height `h-7.5`, width adapts to content.

## Accessibility

- Semantic `<div>` + `<p>`.
- Ensure star icon has implicit accessible name via surrounding context.

## Testing Guidelines

- **Container classes**: verify `rounded-3xl`, `bg-white/80`, `gap-1` present.
- **Icon**: confirm `StarFill` receives `width={20}` + `height={20}`.
- **ClassName merge**: test both container and slot customization.

## Usage Example

```tsx
import { RatingChip } from "@portal/ui/atoms/data-display/RatingChip";

<RatingChip
  label="4.9"
  slotProps={{
    text: { className: "font-bold" },
  }}
/>;
```
