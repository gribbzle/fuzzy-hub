# Dropdown Component Specification

## Overview

The **Dropdown** component renders a floating panel for dropdown menus/content. It conditionally renders based on `open` prop.

## API

| Prop        | Type        | Default | Description                                     |
| ----------- | ----------- | ------- | ----------------------------------------------- |
| `open`      | `boolean`   | —       | Controls visibility (`false` → renders `null`). |
| `children`  | `ReactNode` | —       | Dropdown content.                               |
| `className` | `string`    | —       | Additional classes for the panel.               |

## Behavior

- **When `open=false`**: returns `null` (unmounts content).
- **When `open=true`**: renders `<div>` with:
  - `border-border-gray shadow-dropdown absolute z-10 mt-2 w-full overflow-auto rounded-2xl border bg-white`
- Height not fixed; scrollable via `overflow-auto` if content exceeds viewport.

## Visual Design

- Dropdown arrow positioning handled via parent.
- Panel has 24px border radius (`rounded-2xl`).
- Elevated via `shadow-dropdown`.
- Full width (`w-full`) by default.

## Accessibility

- Panel should have `role="menu"` or `role="dialog"` added by consumer if needed.
- Focus trap recommended for interactive dropdowns.

## Testing Guidelines

- **Hidden**: `open=false` → renders nothing.
- **Visible**: `open=true` → verifies base classes and children present.
- **ClassName merge**: custom classes combine with base.

## Usage Example

```tsx
import { Dropdown } from "@portal/ui/atoms/data-display/Dropdown";

<Dropdown open={isOpen} className="max-h-96">
  <button className="w-full p-4 text-left">Option 1</button>
  <button className="w-full p-4 text-left">Option 2</button>
</Dropdown>;
```
