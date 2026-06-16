# InputLabel Component Specification

## Overview

The **InputLabel** component is a styled `<label>` for form inputs, using consistent typography and spacing.

## API

| Prop        | Type        | Default      | Description                         |
| ----------- | ----------- | ------------ | ----------------------------------- |
| `children`  | `ReactNode` | **required** | Label text.                         |
| `className` | `string`    | —            | Additional Tailwind classes merged. |

## Behavior

- Renders `<label>` with:
  - `text-12 text-text-secondary font-semibold`
- Used alongside form input components to provide context.

## Visual Design

- Small text (`text-12` / 12px).
- Secondary text color (`text-text-secondary`).
- Semi-bold weight.

## Accessibility

- Semantic `<label>` element.
- Should be associated with input via `htmlFor` or wrapping pattern.

## Testing Guidelines

- **Base classes**: verify `text-12 text-text-secondary font-semibold` present.
- **Children**: text renders correctly.

## Usage Example

```tsx
import { InputLabel } from "@portal/ui/atoms/data-display/InputLabel";
import { TextInput } from "@portal/ui/atoms/inputs/TextInput";

<InputLabel htmlFor="email">Email Address</InputLabel>
<TextInput id="email" />
```
