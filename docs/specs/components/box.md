# Box Component Specification

## Overview

The **Box** component is a minimal layout primitive — a simple `<div>` with `flex flex-col gap-6` applied. It serves as a vertical stack container with consistent spacing between children.

## API

| Prop        | Type        | Default      | Description                                                             |
| ----------- | ----------- | ------------ | ----------------------------------------------------------------------- |
| `children`  | `ReactNode` | **required** | Content to render inside the box.                                       |
| `className` | `string`    | —            | Additional Tailwind classes merged with the base `flex flex-col gap-6`. |

## Behavior

- Renders a `<div>` with vertical flexbox layout.
- Children are spaced evenly with `gap-6` (1.5rem / 24px).
- Any extra `className` is merged via `twMerge`, allowing overrides (e.g., `gap-4`, `flex-row`, etc.).

## Visual Design

- No intrinsic styling beyond flex column and gap.
- Intended as a building block for higher-level layout components.

## Accessibility

- Semantic `<div>` — no special ARIA roles needed.
- Ensure children provide proper heading structure and landmarks.

## Testing Guidelines

- **Render** with multiple children and verify `gap-6` spacing via computed styles.
- **Custom className**: pass `className="gap-4"` and confirm override works.
- **Children**: ensure arbitrary React nodes (text, components, fragments) render correctly.

## Usage Example

```tsx
import { Box } from "@portal/ui/atoms/layout/Box";

function Example() {
  return (
    <Box className="p-4">
      <h2 className="text-xl font-semibold">Section Title</h2>
      <p>First paragraph of content.</p>
      <p>Second paragraph with automatic spacing.</p>
    </Box>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
