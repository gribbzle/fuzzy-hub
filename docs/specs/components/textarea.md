# TextArea Component Specification

## Overview

The `TextArea` component is a styled `<textarea>` element that provides consistent visual appearance, error states, and disabled states within the Fuzzy Hub design system. It uses Tailwind utility classes merged via `twMerge` and extends all standard textarea props.

## File Location

`src/components/atoms/portal/inputs/TextArea/TextArea.tsx`

## Props

`TextAreaProps` extends React's `DetailedHTMLProps` for `<textarea>` (via `TextareaHTMLAttributes<HTMLTextAreaElement>`) and adds:

| Prop        | Type                                                                                                                                                                                                                                                                                                      | Default     | Description                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `className` | `string`                                                                                                                                                                                                                                                                                                  | `''`        | Additional Tailwind or custom CSS classes to be merged with the base classes.                                          |
| `error`     | `boolean`                                                                                                                                                                                                                                                                                                 | `false`     | When `true`, applies error styling (red ring). When `false`, applies default hover/focus rings (aqua-green).           |
| `disabled`  | `boolean`                                                                                                                                                                                                                                                                                                 | `undefined` | When `true`, applies disabled styling (light background, light text, no pointer events) and adds `disabled` attribute. |
| `...rest`   | All standard `<textarea>` attributes (e.g., `rows`, `cols`, `placeholder`, `value`, `defaultValue`, `onChange`, `onSelect`, `onInput`, `minLength`, `maxLength`, `readOnly`, `required`, `aria-label`, `aria-labelledby`, `spellCheck`, `wrap`, `autocomplete`, `autofocus`, `form`, `name`, `dir`, etc.) | –           | Spread onto the native `<textarea>` element.                                                                           |

### Notable Native Props

- `value` / `defaultValue`: Controlled or uncontrolled value.
- `onChange(event: React.ChangeEvent<HTMLTextAreaElement>)`: Fires when the value changes.
- `placeholder`: Hint text shown when empty.
- `rows` / `cols`: Visible size (note: component sets `resize-none` and custom height via padding; you may still set rows for screenreader assistance).
- `minLength`, `maxLength`: Validation constraints.
- `readOnly`: Boolean; makes the textarea read‑only.
- `required`: Boolean; requires a value for form submission.
- `aria-label` / `aria-labelledby`: Provides accessible name.
- `spellCheck`: Boolean; enables spell checking.

## Rendered Structure

```html
<textarea
  class="font-16 text-text-default ring-border-gray placeholder-text-secondary [error/disabled modifications] [className] w-full resize-none rounded-xl bg-white px-3 py-3 font-semibold ring outline-none"
  disabled="{disabled}"
  {...rest}
/>
```

- Base classes:
  - `font-16 text-text-default` – font size and default text color.
  - `ring-border-gray` – default ring color (border-gray).
  - `placeholder-text-secondary` – placeholder color.
  - `w-full resize-none` – full width, no manual resize.
  - `rounded-xl bg-white` – rounded background.
  - `px-3 py-3` – horizontal and vertical padding.
  - `font-semibold` – font weight.
  - `ring outline-none` – default ring width, remove browser outline.
- Conditional classes:
  - `!error && "hover:ring-aqua-green focus:ring-aqua-green"` – when not error, hover/focus rings are aqua-green.
  - `disabled && "ring-border-light text-text-light bg-bg-light pointer-events-none"` – disabled styling.
  - `error && "ring-red"` – error ring color.
- All other props are passed through.

## Styling Details

- All styling is done via Tailwind utility classes (CSS‑first) defined in `src/app/globals.css`.
- The component uses `twMerge` to safely combine classes, preventing duplicates.
- The `ring-*` utilities rely on Tailwind’s ring plugin (equivalent to `box-shadow` for focus/hover states).
- No height is set explicitly; the vertical padding (`py-3`) determines the min height. You can control height via `rows` attribute or custom CSS if needed.

## Accessibility Guidelines

- The component renders a native `<textarea>`, ensuring keyboard operability and screen‑reader role.
- Provide an accessible name:
  - If a visible `<label>` is used, associate it via `htmlFor`/`id` (you need to generate an `id` and pass it via `...rest`, then reference it in a `<label>`).
  - Alternatively, use `aria-label` or `aria-labelledby` directly on the textarea.
- Ensure sufficient contrast:
  - Default text color (`text-text-default`) on white background meets WCAG AA.
  - Placeholder color (`placeholder-text-secondary`) should have sufficient contrast; verify or adjust if needed.
  - Error ring (`ring-red`) should be distinguishable.
- When `disabled` is true, the textarea is not focusable and is announced as disabled; use only when the field is truly unavailable.
- Avoid removing `outline` unless you provide a clear visible focus indicator (the component keeps `outline-none` but adds ring styles for focus/hover; ensure ring color contrast is sufficient).
- For long text, ensure the container can scroll vertically (the native textarea does this automatically).

## Usage Examples

### Basic Uncontrolled TextArea

```tsx
<TextArea
  placeholder="Enter your bio..."
  defaultValue="Hello world!"
  onChange={(e) => console.log(e.target.value)}
/>
```

### Controlled TextArea

```tsx
const [value, setValue] = React.useState("");
<TextArea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="What's on your mind?"
  rows={4}
/>;
```

### With Error State

```tsx
<TextArea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  placeholder="Bio (max 200 chars)"
  maxLength={200}
  error={bio.length > 200}
/>
```

### Disabled TextArea

```tsx
<TextArea
  value="Read-only info"
  disabled
  placeholder="This field is disabled"
/>
```

### With Label and htmlFor

```tsx
{
  /* Generate a unique id, e.g., using useId or a counter */
}
const textareaId = "bio-input";
return (
  <>
    <label htmlFor={textareaId} className="block mb-2 font-medium">
      Biography
    </label>
    <TextArea id={textareaId} placeholder="Tell us about yourself" rows={5} />
  </>
);
```

### Required Field

```tsx
<TextArea
  id="address"
  placeholder="Delivery address"
  required
  aria-label="Address"
/>
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that base classes are present (`font-16`, `text-text-default`, `w-full`, `rounded-xl`, etc.).
  - Ensure that `error` prop toggles the ring color between aqua-green (hover/focus) and red.
  - Confirm that `disabled` prop adds disabled styling and attribute.
  - Test that `className` prop is merged correctly.
  - Ensure all passed‑through props (e.g., `placeholder`, `rows`, `maxLength`) are present on the underlying `<textarea>`.
- **Interaction Tests**:
  - Simulate typing and ensure `onChange` fires with correct value.
  - Test that placeholder appears when empty.
  - Verify that `maxLength` prevents further input (if supported by browser).
  - Test disabled state: no change on input, not focusable.
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Check that the textarea is reachable via tab when not disabled.
  - When providing `aria-label` or `aria-labelledby`, ensure the accessible name is correct.
  - Verify that error state is announced appropriately (may require live region or relying on native validation UI).
- **Visual Tests** (optional): Validate that ring colors change on hover/focus/error/disabled as expected.

## Related Components

- `src/components/atoms/portal/inputs/TextArea/index.ts` – re‑exports the component.
- Often used with `FormGroup`, `FormControlLabel`, etc. from `src/components/atoms/portal/data-display/Form` for consistent layout.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Built with TailwindCSS v4 (CSS‑first); all styling via utility classes defined in `src/app/globals.css` and merged via `twMerge`.
