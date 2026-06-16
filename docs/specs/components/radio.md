# Radio Component Specification

## Overview

The `Radio` component is a custom radio input built on top of a native `<input type="radio">`. It uses Tailwind utility classes for styling and relies on the `twMerge` utility to combine classes. The component does not include any visual markup beyond the input itself; it is intended to be used with a `<label>` or custom wrapper to provide accessible labeling and visual indication.

## File Location

`src/components/atoms/portal/inputs/Radio/Radio.tsx`

## Props

`RadioProps` extends React's `DetailedHTMLProps` for an `<input>` element, omitting `size` and `type` (since they are controlled internally), and adds:

| Prop        | Type                                                                                                                                                                            | Default   | Description                                                                                                                                                                                                                                                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `size`      | `"small" \| "large"`                                                                                                                                                            | `"small"` | Determines the base class applied via template literal: the value is appended directly to the string `"radio transition-all "`, resulting in classes like `radio transition-all small` or `radio transition-all large`. The actual styling for these classes must be defined in your CSS/Tailwind (e.g., via `@layer utilities` or in `globals.css`). |
| `className` | `string`                                                                                                                                                                        | `''`      | Additional Tailwind or custom CSS classes to be merged with the base classes via `twMerge`.                                                                                                                                                                                                                                                           |
| `...rest`   | All standard `<input>` attributes except `size` and `type` (e.g., `checked`, `defaultChecked`, `disabled`, `onChange`, `name`, `value`, `aria-label`, `required`, `form`, etc.) | –         | Spread onto the native `<input>` element.                                                                                                                                                                                                                                                                                                             |

### Notable Native Props

- `checked` / `defaultChecked`: Boolean state.
- `onChange(event: React.ChangeEvent<HTMLInputElement>)`: Fires when the selected radio changes.
- `disabled`: Boolean; disables the input.
- `name`: Used to group radio buttons (only one with the same name can be selected).
- `value`: The value submitted when the radio is selected.
- `aria-label` / `aria-labelledby`: Provides an accessible name when no visible label is present.
- `required`: Indicates that a selection is required for form validation.

## Rendered Structure

```html
<input type="radio" class="radio [size] [className] transition-all" {...rest} />
```

- The base classes are `radio transition-all` concatenated with the `size` prop (either `"small"` or `"large"`).
- Additional `className` is merged via `twMerge`.
- All other props are passed directly to the input.

## Styling Details

- The component relies entirely on CSS classes for appearance. The classes `radio`, `radio small`, and `radio large` must be defined in your stylesheet (e.g., in `src/app/globals.css` or a Tailwind plugin).
- Example Tailwind CSS (to be added to `globals.css` or via `@layer utilities`):
  ```css
  .radio {
    @apply text-primary focus:ring-primary h-4 w-4 rounded border transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none;
  }
  .radio.small {
    @apply h-4 w-4;
  }
  .radio.large {
    @apply h-5 w-5;
  }
  ```
- The `transition-all` class ensures smooth state changes.
- Since the component does not render any extra elements, visual customization (like showing a checkmark) must be done via CSS using the `:checked` state (e.g., `.radio:checked { ... }`).

## Accessibility Guidelines

- The component renders a native `<input type="radio">`, ensuring keyboard operability (arrow keys to change selection within a group) and screen‑reader role.
- To make the radio accessible, you must associate it with a `<label>`:
  - **Option 1**: Wrap the `<Radio>` in a `<label>` and place text after it.
    ```tsx
    <label>
      <Radio name="color" value="red" />
      Red
    </label>
    ```
  - **Option 2**: Use `id` and `htmlFor` (you need to generate an `id` and pass it via `...rest`, then reference it in a separate `<label>`).
    ```tsx
    <Radio id="color-red" name="color" value="red" />
    <label htmlFor="color-red">Red</label>
    ```
- If no visible label is desired (e.g., in a custom-designed radio group), you must still provide an accessible name via `aria-label` or `aria-labelledby` on the input (passed through `...rest`).
- Ensure sufficient contrast for the custom radio styling (focus ring, checkmark, etc.) to meet WCAG AA.
- When `disabled` is true, the radio is not focusable and is announced as disabled.

## Usage Examples

### Basic Uncontrolled Radio Group

```tsx
<fieldset>
  <legend>Choose a color</legend>
  <label>
    <Radio name="color" value="red" defaultChecked />
    Red
  </label>
  <label>
    <Radio name="color" value="green" />
    Green
  </label>
  <label>
    <Radio name="color" value="blue" />
    Blue
  </label>
</fieldset>
```

### Controlled Radio Group (with useState)

```tsx
const [color, setColor] = React.useState("red");
return (
  <>
    <label>
      <Radio
        name="color"
        value="red"
        checked={color === "red"}
        onChange={(e) => setColor(e.target.value)}
      />
      Red
    </label>
    <label>
      <Radio
        name="color"
        value="green"
        checked={color === "green"}
        onChange={(e) => setColor(e.target.value)}
      />
      Green
    </label>
    <label>
      <Radio
        name="color"
        value="blue"
        checked={color === "blue"}
        onChange={(e) => setColor(e.target.value)}
      />
      Blue
    </label>
  </>
);
```

### Disabled Radio

```tsx
<label>
  <Radio name="color" value="yellow" disabled />
  Yellow (disabled)
</label>
```

### Large Size Radio

```tsx
<label>
  <Radio name="size" value="large" size="large" />
  Large
</label>
```

### With Custom Classes

```tsx
<label>
  <Radio name="tier" value="premium" className="ml-2" />
  Premium
</label>
```

### Using aria-label (no visible text)

```tsx
<Radio name="option" value="aria1" aria-label="Option 1" />
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that the base classes include `radio transition-all` and the correct size class (`small` or `large`).
  - Ensure that `className` prop is merged correctly.
  - Confirm that `checked` prop reflects in the input's checked state.
  - Test that `disabled` attribute is present when `disabled=true`.
- **Interaction Tests**:
  - Simulate click on the radio (or its associated label) and ensure `onChange` fires with the correct value.
  - Test keyboard interaction: using arrow keys to change selection within a group (requires rendering a group with same `name`).
  - Verify that disabled radio does not respond to clicks or key presses.
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Check that the radio is reachable via tab when not disabled.
  - When providing `aria-label`, ensure the accessible name is correct.
  - Verify that the radio has the role `radio`.
  - When wrapped in a `<label>`, ensure clicking the label toggles the radio.
- **Visual Tests** (optional): Validate that custom CSS for `:checked` state renders correctly (if you have defined such styles).

## Related Components

- `src/components/atoms/portal/inputs/Radio/index.ts` – re‑exports the component.
- Often used with `FormGroup`, `FormControlLabel`, etc. from the same `atoms/portal/data-display/Form` directory for consistent layout.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Relies on TailwindCSS v4 (CSS‑first); all styling via utility classes defined in `src/app/globals.css` (or via custom CSS for the `radio*` classes).
