# Container Component Specification

## Overview

The **Container** component is a responsive layout wrapper that centers content horizontally and applies fluid max-width constraints based on breakpoints. It supports polymorphic rendering via the `component` prop.

## API

| Prop        | Type          | Default      | Description                                                              |
| ----------- | ------------- | ------------ | ------------------------------------------------------------------------ |
| `children`  | `ReactNode`   | **required** | Content to render inside the container.                                  |
| `className` | `string`      | —            | Additional Tailwind classes merged with base styles.                     |
| `component` | `ElementType` | `"div"`      | HTML element or custom component to render as the wrapper (polymorphic). |

## Behavior

- Renders the specified `component` (default `<div>`) with:
  - `mx-auto` — horizontal centering
  - `flex flex-col` — vertical flex layout
  - Responsive max-widths:
    - `large-desktop:max-w-420` (≥1440px): max 1050px
    - `desktop:max-w-290` (≥1024px): max 725px
    - `tablet:max-w-180` (≥768px): max 450px
    - `max-tablet:px-4` (≤767px): full width with 16px horizontal padding
  - `w-full` — full width at all breakpoints
- Custom `className` is merged via `twMerge`, allowing overrides.

## Visual Design

- No background, border, or intrinsic spacing beyond the responsive constraints.
- Designed as a page-level or section-level content wrapper.

## Accessibility

- Semantic element determined by `component` prop (default `<div>`).
- Use `<main>`, `<section>`, or `<article>` via `component` for landmark roles when appropriate.

## Testing Guidelines

- **Default render**: verify `div` with `mx-auto flex flex-col w-full` classes.
- **Polymorphic**: pass `component="main"` and confirm `<main>` renders.
- **Responsive classes**: check that breakpoint-specific max-width utilities are present.
- **ClassName merge**: pass `className="px-8"` and ensure it combines with base styles.

## Usage Example

```tsx
import { Container } from "@portal/ui/atoms/layout/Container";

function PageLayout() {
  return (
    <Container component="main" className="py-12">
      <h1 className="text-3xl font-bold">Page Title</h1>
      <p>Page content centered with responsive max-width.</p>
    </Container>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
