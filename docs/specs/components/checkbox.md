# Checkbox Component Specification

## Overview

The `Checkbox` component is a custom, accessible checkbox input built on top of a native `<input type="checkbox">`. It features a custom styled checkmark (using the `Check` icon) and supports two sizes (`small` and `large`). The component is wrapped in a `<label>` for improved usability (clicking the label toggles the checkbox).

## File Location

`src/components/atoms/portal/inputs/Checkbox/index.tsx`

## Props

`CheckboxProps` extends React's `DetailedHTMLProps` for an `<input>` element, omitting `size` and `type` (since they are controlled internally), and adds:

| Prop        | Type                                                                                                                                                                            | Default   | Description                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `size`      | `"small" \| "large"`                                                                                                                                                            | `"small"` | Controls the dimensions of the checkbox box: <br>• `small`: `h-5 w-5 border my-px` <br>• `large`: `h-6 w-6 border-2`                     |
| `className` | `string`                                                                                                                                                                        | `''`      | Additional Tailwind or custom CSS classes applied to the outer `<label>` (note: inner input also receives merged classes via `twMerge`). |
| `...rest`   | All standard `<input>` attributes except `size` and `type` (e.g., `checked`, `defaultChecked`, `disabled`, `onChange`, `name`, `value`, `aria-label`, `required`, `form`, etc.) | –         | Passed through to the native `<input>` element.                                                                                          |

### Notable Native Props

- `checked` / `defaultChecked`: Boolean state.
- `onChange(event: React.ChangeEvent<HTMLInputElement>)`: Called when the checked state changes.
- `disabled`: Boolean; when true, applies disabled styling (`disabled:bg-bg-light disabled:border-border-light disabled:opacity-50`).
- `name`, `value`: For form submission.
- `aria-label` / `aria-labelledby`: For accessible name when no visible label is present.
- `required`: HTML validation.

## Rendered Structure

```html
<label class="relative flex cursor-pointer items-center justify-center ...">
  <input
    type="checkbox"
    class="peer border-text-light box-border shrink-0 cursor-pointer appearance-none rounded transition-colors ..."
  />
  <Check
    class="absolute h-full w-full text-white opacity-0 peer-checked:opacity-100"
  />
</label>
```

- The outer `<label>` provides the click target and layout (`flex items-center justify-center`).
- The inner `<input>` is visually hidden (`appearance-none`) but retains focus and accessibility.
- The `<Check>` icon (from `@portal/ui/icons`) is absolutely positioned and shown only when the input is checked (`peer-checked:opacity-100`).

## Styling Details

- Base classes on the `<label>`: `relative flex cursor-pointer items-center justify-center` plus size‑specific vertical padding (`py-0.5` for small).
- Input classes (merged via `twMerge`):
  - Shared: `peer border-text-light box-border shrink-0 cursor-pointer appearance-none rounded transition-colors`
  - Hover: `hover:border-aqua-green`
  - Disabled: `disabled:bg-bg-light disabled:border-border-light disabled:opacity-50`
  - Checked: `checked:bg-aqua-green checked:border-aqua-green`
  - Size‑specific:
    - `small`: `h-5 w-5 border my-px`
    - `large`: `h-6 w-6 border-2`
- The `<Check>` icon: `absolute h-full w-full text-white opacity-0 peer-checked:opacity-100`.
- Class merging performed via `twMerge` utility to avoid Tailwind conflicts.

## Accessibility Guidelines

- The component uses a native `<input type="checkbox">` inside a `<label>`, ensuring:
  - Keyboard focus works natively.
  - Clicking the label toggles the checkbox.
  - Screen readers announce the checkbox role and state automatically when associated with a label.
- If no visible label text is provided (i.e., the checkbox stands alone), you must supply an accessible name via:
  - `aria-label` on the `<input>` (passed through `...rest`).
  - `aria-labelledby` pointing to another element.
  - Using `<label>` with wrapped text (the component currently does not accept a `label` prop; to add visible text, wrap the `Checkbox` in a `<label>` or place text beside it and use `htmlFor`/`id` via an `id` prop—note: the component does not expose an `id` prop; you can pass `id` via `...rest` and manage labeling externally).
- Ensure sufficient contrast: the default border and background colors meet WCAG AA; verify custom overrides.
- Avoid removing `outline` or focus indicators; the native input retains focus styles.

## Usage Examples

### Basic Uncontrolled Checkbox

```tsx
<Checkbox defaultChecked onChange={(e) => console.log(e.target.checked)} />
```

### Controlled Checkbox

```tsx
const [isChecked, setIsChecked] = React.useState(false);
<Checkbox
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>;
```

### Disabled Checkbox

```tsx
<Checkbox disabled defaultChecked />
```

### Large Size

```tsx
<Checkbox size="large" onChange={(e) => console.log(e.target.checked)} />
```

### With Custom Classes

```tsx
<Checkbox className="ml-4" />
```

### With Aria Label (icon‑only)

```tsx
<Checkbox aria-label="Subscribe to newsletter" />
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Checkbox name="agree" value="yes" required />
  <button type="submit">Submit</button>
</form>
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that correct size classes are applied based on `size` prop.
  - Ensure `checked` prop reflects in the input's checked state.
  - Confirm that `disabled` adds appropriate classes and prevents interaction.
  - Test that `className` is merged correctly.
- **Interaction Tests**:
  - Simulate click on the label or input and ensure `onChange` fires with correct value.
  - Test keyboard interaction (Space toggles state).
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Verify that the component is reachable via tab and that pressing Space/Enter toggles it.
  - When providing `aria-label`, ensure the accessible name is correct.
- **Visual Tests** (optional): Ensure checkmark appears/disappears correctly.

## Related Components

- `src/components/atoms/portal/inputs/Checkbox/index.tsx` – the component file.
- Icon used: `@portal/ui/icons/Check`.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Built with TailwindCSS v4 (CSS‑first); all styling via utility classes defined in `src/app/globals.css` and inline via `twMerge`.
