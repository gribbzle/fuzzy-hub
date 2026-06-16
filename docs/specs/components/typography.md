# Typography Component Specification

## Overview

The **Typography** component provides consistent text styling across the application via predefined variants. It supports polymorphic rendering with customizable HTML elements.

## API

| Prop        | Type                                                                                 | Default      | Description                                        |
| ----------- | ------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------- |
| `variant`   | `"body1" \| "h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6" \| "caption" \| "subtitle"` | `"body1"`    | Text style preset.                                 |
| `children`  | `ReactNode`                                                                          | **required** | Text content.                                      |
| `className` | `string`                                                                             | —            | Additional classes merged with variant classes.    |
| `component` | `ElementType`                                                                        | —            | Override HTML element (defaults to variant's tag). |

## Variants

| Variant    | Tag  | Classes                                                                                                              |
| ---------- | ---- | -------------------------------------------------------------------------------------------------------------------- |
| `body1`    | `p`  | `text-16 font-normal text-text-default`                                                                              |
| `h1`       | `h1` | `font-fredoka text-32 font-medium text-text-default max-desktop:text-28 max-tablet:text-20 max-tablet:leading-6`     |
| `h2`       | `h2` | `font-fredoka font-medium text-text-default large-desktop:text-44 tablet:text-32 max-tablet:text-24 max-tablet:bold` |
| `h3`       | `h3` | `font-fredoka text-24 font-medium text-text-default`                                                                 |
| `h4`       | `h4` | `text-20 font-bold text-text-default translate-y-px`                                                                 |
| `h5`       | `h5` | `text-20 font-bold text-text-default`                                                                                |
| `h6`       | `h6` | `font-fredoka text-64 font-medium text-text-default`                                                                 |
| `caption`  | `p`  | `text-16 font-normal text-text-default`                                                                              |
| `subtitle` | `p`  | `text-18 text-text-secondary font-semibold`                                                                          |

## Behavior

- Renders configured tag (`h1`-`h6`, `p`) with preset styles.
- `component` prop overrides the HTML element when needed.
- Custom `className` merges via `twMerge`.

## Visual Design

- Fredoka font family for headings (h1-h6).
- Responsive font sizing for `h1` and `h2` variants.
- `h4` has `translate-y-px` minor vertical adjustment.

## Accessibility

- Heading semantics (`h1`-`h6`) are meaningful for document outline.
- Ensure proper heading hierarchy when using variants.

## Testing Guidelines

- **Variant classes**: render each variant, assert correct tag + classes.
- **Component override**: pass `component="span"` to `variant="body1"`, verify `<span>` renders.
- **Responsive**: verify `max-tablet` etc. utilities present on `h1`/`h2`.

## Usage Example

```tsx
import { Typography } from "@portal/ui/atoms/data-display/Typography";

<Typography variant="h1">Page Title</Typography>
<Typography variant="subtitle" className="mt-2">
  Supporting subtitle text.
</Typography>
```
