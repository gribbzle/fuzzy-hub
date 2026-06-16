# TextInput Component Specification

## Overview

The `TextInput` component is a styled `<input type="text">` wrapper that includes optional trailing icon support, error and disabled states, and consistent typography and spacing. It uses Tailwind utility classes merged via `twMerge` and extends all standard input props.

## File Location

`src/components/atoms/portal/inputs/TextInput/TextInput.tsx`

## Props

`TextInputProps` extends React's `DetailedHTMLProps` for `<input>` (via `InputHTMLAttributes<HTMLInputElement>`) and adds:

| Prop             | Type                                                                                                                                                                                                                                                                                                                                 | Default     | Description                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `className`      | `string`                                                                                                                                                                                                                                                                                                                             | `''`        | Additional Tailwind or custom CSS classes to be merged with the base classes.                                                  |
| `error`          | `boolean`                                                                                                                                                                                                                                                                                                                            | `false`     | When `true`, applies error styling (red border). When `false`, applies default hover/focus borders (aqua-green).               |
| `disabled`       | `boolean`                                                                                                                                                                                                                                                                                                                            | `undefined` | When `true`, applies disabled styling (light border, light text, background, no pointer events) and adds `disabled` attribute. |
| `EndIcon`        | `(props: SVGProps<SVGSVGElement>) => JSX.Element`                                                                                                                                                                                                                                                                                    | `undefined` | Optional icon component to render on the right side of the input. If provided, a button wrapper is rendered to the right.      |
| `onEndIconClick` | `() => void`                                                                                                                                                                                                                                                                                                                         | `undefined` | Click handler for the trailing icon button. Only relevant if `EndIcon` is provided.                                            |
| `...rest`        | All standard `<input>` attributes (e.g., `type`, `value`, `defaultValue`, `placeholder`, `onChange`, `onFocus`, `onBlur`, `minLength`, `maxLength`, `readOnly`, `required`, `aria-label`, `aria-labelledby`, `autoComplete`, `autoFocus`, `form`, `name`, `list`, `pattern`, `step`, `inputMode`, `spellCheck`, `lang`, `dir`, etc.) | –           | Spread onto the native `<input>` element.                                                                                      |

### Notable Native Props

- `value` / `defaultValue`: Controlled or uncontrolled value.
- `onChange(event: React.ChangeEvent<HTMLInputElement>)`: Fires when the value changes.
- `placeholder`: Hint text shown when empty.
- `minLength`, `maxLength`: Validation constraints.
- `readOnly`: Boolean; makes the input read‑only.
- `required`: Boolean; requires a value for form submission.
- `aria-label` / `aria-labelledby`: Provides accessible name.
- `autoComplete`: Suggests autocomplete behavior.
- `autoFocus`: Boolean; focuses the input on mount.
- `form`: Associates the input with a form element.
- `name`: Submitted field name.
- `type`: Although the component hardcodes `type="text"` internally, you can still pass a `type` prop; however, it will be overridden. For other input types (e.g., `email`, `password`, `number`), consider creating a separate component or extending this one.

## Rendered Structure

```html
<div class="relative flex items-center">
  <input
    type="text"
    class="text-16 text-text-default border-border-gray placeholder-text-secondary [error/disabled/modifier] [className] box-border h-12 w-full rounded-xl border bg-white px-2.75 pb-px font-semibold outline-none"
    disabled="{disabled}"
    {...rest}
  />
  {hasEndIcon && (
  <button
    type="button"
    className="absolute right-3 flex items-center justify-center"
    onClick="{onEndIconClick}"
    onMouseDown="{(e)"
    =""
  >
    e.preventDefault()} aria-label="End icon button" >
    <EndIcon width="{20}" height="{20}" className="text-text-default" />
  </button>
  )}
</div>
```

- The wrapper `<div>` provides `relative flex items-center` layout to position the icon absolutely.
- The `<input>` receives base classes and conditional modifiers:
  - Base: `text-16 text-text-default border-border-gray placeholder-text-secondary box-border h-12 w-full rounded-xl border bg-white px-2.75 font-semibold outline-none pb-px`
  - Not error: `hover:border-aqua-green focus:border-aqua-green`
  - Has end icon: `pr-11` (padding-right to make space for the icon button)
  - Disabled: `border-border-light text-text-light bg-bg-light pointer-events-none`
  - Error: `border-red`
- The icon button is absolutely positioned at `right-3`, flex centered, with `onClick` handler and `onMouseDown` preventing default to avoid interfering with input focus.
- The `EndIcon` component receives fixed `width={20} height={20}` and `className="text-text-default"`; you can adjust size via passing `width`/`height` props if you wrap the icon, but the current implementation fixes it.

## Styling Details

- All styling is done via Tailwind utility classes (CSS‑first) defined in `src/app/globals.css`.
- The component uses `twMerge` to safely combine classes, preventing duplicates.
- The `border-*` and `bg-*` utilities manage colors; `rounded-xl` provides large radius.
- Height is fixed at `h-12` (3rem) with internal padding `px-2.75` and `pb-px` to align text vertically.
- The wrapper does not add extra padding/margin; you can add spacing via `className` or parent layout.

## Accessibility Guidelines

- The component renders a native `<input type="text">`, ensuring keyboard operability and screen‑reader role.
- Provide an accessible name:
  - If a visible `<label>` is used, associate it via `htmlFor`/`id` (you need to generate an `id` and pass it via `...rest`, then reference it in a `<label>`).
  - Alternatively, use `aria-label` or `aria-labelledby` directly on the input.
- If using `EndIcon` that conveys an action (e.g., clear, show password), ensure the icon button has an accessible label via `aria-label="End icon button"` (already provided). Consider making the icon button's label descriptive of its action (e.g., "Show password", "Clear") by changing the `aria-label` dynamically if needed.
- Ensure sufficient contrast:
  - Default text color (`text-text-default`) on white background meets WCAG AA.
  - Placeholder color (`placeholder-text-secondary`) should have sufficient contrast; verify or adjust if needed.
  - Error border (`border-red`) should be distinguishable.
- When `disabled` is true, the input is not focusable and is announced as disabled; use only when the field is truly unavailable.
- Avoid removing `outline` unless you provide a clear visible focus indicator (the component keeps `outline-none` but relies on border changes for focus/hover; ensure border color contrast is sufficient).
- For inputs that require a specific format (e.g., email, password), consider using appropriate `type` or creating a specialized component to leverage native validation and keyboard layouts.

## Usage Examples

### Basic Uncontrolled TextInput

```tsx
<TextInput
  placeholder="Enter your name"
  defaultValue="John Doe"
  onChange={(e) => console.log(e.target.value)}
/>
```

### Controlled TextInput

```tsx
const [email, setEmail] = React.useState("");
<TextInput
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
  type="email"
/>;
```

### With Error State

```tsx
<TextInput
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  maxLength={20}
  error={password.length < 8}
/>
```

### Disabled TextInput

```tsx
<TextInput
  value="readonly@example.com"
  disabled
  placeholder="This field is disabled"
/>
```

### With Trailing Icon (e.g., show/hide password)

```tsx
const [showPassword, setShowPassword] = React.useState(false);
<TextInput
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter password"
  EndIcon={showPassword ? EyeSlashIcon : EyeIcon}
  onEndIconClick={() => setShowPassword(!showPassword)}
  aria-label={showPassword ? "Hide password" : "Show password"}
/>;
```

_Note: In this example, we also update the `aria-label` on the input to describe the icon's action. The icon button itself already has a generic aria-label; you could instead add `aria-label` to the button by modifying the component, but for simplicity we manage it via the input's label._

### Required Field

```tsx
<TextInput
  id="username"
  placeholder="Username"
  required
  aria-label="Username"
/>
```

### With Label and htmlFor

```tsx
const inputId = "email-input";
return (
  <>
    <label htmlFor={inputId} className="block mb-2 font-medium">
      Email Address
    </label>
    <TextInput id={inputId} placeholder="you@example.com" />
  </>
);
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that base classes are present (`text-16`, `w-full`, `rounded-xl`, `border-border-gray`, etc.).
  - Ensure that `error` prop toggles border color between aqua-green (hover/focus) and red.
  - Confirm that `disabled` prop adds disabled styling and attribute.
  - Test that `EndIcon` renders the button with the icon when provided, and does not render when absent.
  - Ensure `onEndIconClick` is called when the icon button is clicked.
  - Test that `className` prop is merged correctly.
  - Ensure all passed‑through props (e.g., `placeholder`, `type`, `maxLength`, `readOnly`) are present on the underlying `<input>`.
- **Interaction Tests**:
  - Simulate typing and ensure `onChange` fires with correct value.
  - Test that placeholder appears when empty.
  - Verify that `maxLength` prevents further input (if supported by browser).
  - Test disabled state: no change on input, not focusable.
  - Test that clicking the trailing icon triggers `onEndIconClick` and does not trigger input `onChange` or blur (due to `onMouseDown.preventDefault()`).
  - For password toggle example, verify that `type` changes between `"text"` and `"password"`.
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Check that the input is reachable via tab when not disabled.
  - When providing `aria-label` or `aria-labelledby`, ensure the accessible name is correct.
  - Verify that error state is announced appropriately (may rely on native validation UI or requiring a live region; at minimum ensure the input is in the accessibility tree).
  - For the trailing icon button, ensure it is focusable (it is a `<button>`) and has an accessible label (`aria-label="End icon button"`). If you customize the label per action, test that it updates correctly.
- **Visual Tests** (optional): Validate that border colors change on hover/focus/error/disabled as expected, and that the icon button is positioned correctly.

## Related Components

- `src/components/atoms/portal/inputs/TextInput/index.ts` – re‑exports the component.
- Often used with `FormGroup`, `FormControlLabel`, etc. from `src/components/atoms/portal/data-display/Form` for consistent layout.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Built with TailwindCSS v4 (CSS‑first); all styling via utility classes defined in `src/app/globals.css` and merged via `twMerge`.
