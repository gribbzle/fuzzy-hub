# Paper Component Specification

## Overview

The **Paper** component is a simple elevated surface — a white card with a light border and rounded corners. It serves as a base container for content that needs visual separation from the background.

## API

| Prop        | Type        | Default      | Description                                          |
| ----------- | ----------- | ------------ | ---------------------------------------------------- |
| `children`  | `ReactNode` | **required** | Content to render inside the paper.                  |
| `className` | `string`    | —            | Additional Tailwind classes merged with base styles. |

## Behavior

- Renders a `<div>` with:
  - `bg-white` — white background
  - `border border-border-light` — 1px light border
  - `rounded-4xl` — large border radius (2rem / 32px)
- Custom `className` merged via `twMerge`, allowing overrides (e.g., `p-6`, `shadow-lg`, `hover:shadow-xl`).

## Visual Design

- **Background**: white (`bg-white`)
- **Border**: 1px `border-border-light` (light gray)
- **Radius**: `rounded-4xl` (32px)
- No shadow by default — add via `className` if elevation needed.

## Accessibility

- Semantic `<div>` — no special ARIA roles.
- Ensure sufficient contrast between `bg-white` and `border-border-light`.
- Children should provide proper heading structure.

## Testing Guidelines

- **Render**: verify `div` with `bg-white border border-border-light rounded-4xl`.
- **ClassName merge**: pass `className="p-6 shadow-md"` and confirm both apply.
- **Children**: ensure arbitrary React nodes render correctly.

## Usage Example

```tsx
import { Paper } from "@portal/ui/atoms/surfaces/Paper";

function CardExample() {
  return (
    <Paper className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">Card Title</h3>
      <p className="text-text-secondary">Card content goes here.</p>
    </Paper>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
