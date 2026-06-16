# Progress Component Specification

## Overview

The **Progress** component visualizes a numeric percentage (0-100) as a horizontal bar with optional label. It normalizes values to the valid range and includes smooth transition animations.

## API

| Prop        | Type     | Default      | Description                                 |
| ----------- | -------- | ------------ | ------------------------------------------- |
| `value`     | `number` | **required** | Progress percentage (0-100).                |
| `className` | `string` | —            | Additional classes for the outer container. |

## Behavior

- **Normalization**: values clamped to 0-100 via `Math.min(Math.max(value, 0), 100)`.
- Container layout: `flex flex-row items-center` with responsive gaps.
- **Track**: light gray background (`bg-border-light`) with rounded ends (`rounded-4xl`).
- **Fill**: aqua-green bar (`bg-aqua-green`) with `transition-all duration-300`.
- Width of fill bar set via inline `style={{ width: \`${normalizedValue}%\` }}`.
- Percentage label displayed as sibling text (e.g., `75%`).

## Visual Design

- Heights are breakpoint-specific:
  - Tablet (≥768px): `h-2` (8px)
  - Max-tablet (<768px): `h-1.5` (6px)
- Label uses `font-bold` with responsive font size:
  - Tablet: `text-20` (20px)
  - Max-tablet: `text-16` (16px) plus minor vertical adjustment.
- Track and fill both use `rounded-4xl` (32px radius).

## Accessibility

- Semantic `<div>` not native `<progress>` — consider adding `role="progressbar"` and `aria-valuenow` if needed for assistive tech.
- Text label (`{value}%`) provides accessible value indication.
- Ensure sufficient color contrast between track and fill.

## Testing Guidelines

- **Normalization**: pass `value={-10}` → renders 0%; pass `value={150}` → renders 100%.
- **Visual**: verify fill width reflects percentage (e.g., value=50 → width `50%`).
- **Transition**: confirm `transition-all duration-300` class present on fill.
- **ClassName merge**: custom classes combine with base flex container.

## Usage Example

```tsx
import { Progress } from "@portal/ui/atoms/feedback/Progress";

function UploadProgress() {
  const [progress, setProgress] = useState(0);
  return <Progress value={progress} className="w-full max-w-md mt-4" />;
}
```
