# Table Component Specification

## Overview

The **Table** component is a thin wrapper around the native HTML `<table>` element, forwarding all standard table attributes.

## API

| Prop       | Type                  | Default      | Description                                              |
| ---------- | --------------------- | ------------ | -------------------------------------------------------- |
| `children` | `ReactNode`           | **required** | Table content (`<thead>`, `<tbody>`, rows, cells).       |
| `...rest`  | `TableHTMLAttributes` | —            | All standard `<table>` props (className, onClick, etc.). |

## Behavior

- Renders `<table>` with no base styling.
- All props spread, allowing full customization.

## Visual Design

- No intrinsic styling; consumers control borders, spacing, etc. via `className`.

## Accessibility

- Inherits native table semantics.
- Ensure proper `<thead>`/`<tbody>` structure and header associations (`scope="col"`).

## Testing Guidelines

- **Render**: verify `<table>` element present.
- **Props spread**: pass `className="my-table"` and verify it applies.

## Usage Example

```tsx
import { Table } from "@portal/ui/atoms/data-display/Table";

<Table className="min-w-full border-collapse">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Premium Pet Food</td>
      <td>$49.99</td>
    </tr>
  </tbody>
</Table>;
```
