# Tag Component Specification

## Overview

The **Tag** component displays compact, pill-shaped labels with size variants.

## API

| Prop        | Type                             | Default      | Description                         |
| ----------- | -------------------------------- | ------------ | ----------------------------------- |
| `children`  | `ReactNode`                      | **required** | Tag label text.                     |
| `size`      | `"small" \| "medium" \| "large"` | `"medium"`   | Height & font size variant.         |
| `className` | `string`                         | —            | Additional Tailwind classes merged. |

## Behavior

- Renders a `<div>` with base classes:
  - `border-border-light bg-bg-default box-border flex w-fit items-center justify-center gap-2 rounded-lg border px-2`
- Size variants:
  - `small` → `h-7` + `text-14`
  - `medium` → `h-7.5` + `text-16`
  - `large` → `h-10` + `text-16`

## Visual Design

- Light border & default background.
- Pill shape via `rounded-lg`.
- Horizontal padding `px-2`.

## Accessibility

- Semantic `<div>`.
- Ensure text color provides sufficient contrast (`text-text-default`).

## Testing Guidelines

- **Size variants**: verify correct height and text size classes.
- **Base classes**: `border-border-light`, `rounded-lg`, `gap-2` present.
- **ClassName merge**: custom classes combine.

## Usage Example

```tsx
import { Tag } from "@portal/ui/atoms/data-display/Tag";

<Tag size="large" className="ml-2">
  Premium
</Tag>;
```
