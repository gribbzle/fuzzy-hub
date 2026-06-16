# Divider Component Specification

## Overview

The **Divider** component renders a horizontal rule with consistent styling across the application.

## API

| Prop        | Type     | Default | Description                                   |
| ----------- | -------- | ------- | --------------------------------------------- |
| `className` | `string` | —       | Additional Tailwind classes merged with base. |

## Behavior

- Renders `<hr>` with `className="border-border-light -mb-px"`.

## Visual Design

- Light border (`border-border-light`).
- Negative bottom margin (`-mb-px`) eliminates double-border artifacts when stacked with other elements.

## Accessibility

- Semantic `<hr>` element.
- Screen readers announce as thematically related content separator.

## Testing Guidelines

- **Base classes**: verify `border-border-light` and `-mb-px` are present.
- **ClassName merge**: custom classes combine correctly.

## Usage Example

```tsx
import { Divider } from "@portal/ui/atoms/data-display/Divider";

<article>
  <p>Section one content</p>
  <Divider />
  <p>Section two content</p>
</article>;
```
