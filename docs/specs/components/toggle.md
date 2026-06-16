# Toggle Component Specification

## Overview

The **Toggle** component is a simple binary switch built on top of an HTML `<input type="checkbox">`. It visually mimics a modern iOS‑style toggle using Tailwind CSS utilities and supports custom styling, disabled state, and controlled/uncontrolled usage.

## API

| Prop        | Type                         | Default | Description                                                                                         |
| ----------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `id`        | `string`                     | —       | Optional ID forwarded to the underlying input element.                                              |
| `checked`   | `boolean`                    | `false` | When provided, the component acts as a **controlled** toggle. The internal state follows this prop. |
| `disabled`  | `boolean`                    | `false` | Disables interaction and applies a reduced‑opacity style.                                           |
| `onChange`  | `(checked: boolean) => void` | —       | Callback invoked with the new checked value whenever the user toggles.                              |
| `className` | `string`                     | —       | Additional Tailwind classes applied to the root `<label>`.                                          |

## Behavior

- **Uncontrolled mode** – if `checked` is omitted, the component manages its own internal state via `useState`.
- **Controlled mode** – when `checked` is supplied, the component reflects that value and only notifies via `onChange`.
- Interaction is blocked when `disabled` is `true`.

## Visual Design

- **Track** – a rounded rectangle (`h-5.5 w-10`) with a background color of `bg-aqua-green` when on, otherwise `bg-bg-default`.
- **Thumb** – a circular white element (`h-4.5 w-4.5`) that slides left/right (`left-0.5` / `left-5`).
- **Disabled** – the whole toggle gets `opacity-50`.
- All transitions use `duration-200` for smooth visual feedback.

## Accessibility

- The underlying `<input type="checkbox">` remains in the DOM (hidden visually) to retain keyboard focus and screen‑reader support.
- Prop `id` can be used to associate a `<label>` if needed.
- Ensure an accessible label is provided by wrapping the toggle with descriptive text or using `aria-label` on the input when no visible label exists.

## Testing Guidelines

- **Render** the component with default props and verify the unchecked visual state.
- **Controlled**: render with `checked={true}` and ensure the track has the `bg-aqua-green` class.
- **Interaction**: fire a change event and assert that `onChange` receives the correct boolean.
- **Disabled**: ensure clicking does not invoke `onChange` and that `opacity-50` is applied.

## Usage Example

```tsx
import { Toggle } from "@portal/ui/atoms/inputs/Toggle";

function Example() {
  const [enabled, setEnabled] = useState(false);
  return (
    <label className="flex items-center gap-2">
      <Toggle checked={enabled} onChange={setEnabled} className="my-toggle" />
      <span>{enabled ? "Enabled" : "Disabled"}</span>
    </label>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
