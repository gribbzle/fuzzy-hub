# RadioGroup Component Specification

## Overview

The **RadioGroup** component provides context for a set of radio buttons. It wraps `RadioGroupProvider` and lays out children vertically.

## API

| Prop        | Type                      | Default      | Description                                                                           |
| ----------- | ------------------------- | ------------ | ------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`               | **required** | Radio inputs managed by this group.                                                   |
| `className` | `string`                  | —            | Additional classes for the container.                                                 |
| `...rest`   | `RadioGroupProviderProps` | —            | Props forwarded to `RadioGroupProvider`: `name`, `value`, `defaultValue`, `onChange`. |

## Behavior

- Renders `<div className="flex flex-col">` with provider context.
- Provider supports **controlled** (`value` + `onChange`) and **uncontrolled** (`defaultValue`) modes.
- `name` prop groups radios; auto-generated via `useId()` if omitted.

## Visual Design

- Vertical stack (`flex-col`).
- No intrinsic spacing; let consumer control via children.

## Accessibility

- Radio group semantics via `RadioGroupProvider`.
- Each radio must have a meaningful label.

## Testing Guidelines

- **Render**: verify `flex flex-col` container present.
- **Provider integration**: confirm context values flow correctly.

## Usage Example

```tsx
import { RadioGroup } from "@portal/ui/atoms/data-display/RadioGroup";
import { Radio } from "@portal/ui/atoms/inputs/Radio";

<RadioGroup name="size" defaultValue="m">
  <Radio value="s" label="Small" />
  <Radio value="m" label="Medium" />
  <Radio value="l" label="Large" />
</RadioGroup>;
```
