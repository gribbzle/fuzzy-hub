# CircleButton Component Specification

## Overview

The `CircleButton` is a fully circular button component designed for icon‑only actions (e.g., toggle, add, close). It supports multiple sizes, visual variants, a disabled state, and an optional transparent background. The component renders a native `<button>` element and passes through all standard button props via the spread `...rest`.

## File Location

`src/components/atoms/portal/inputs/CircleButton/CircleButton.tsx`

## Props

| Prop          | Type                                                                                         | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------- | ------------ |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `children`    | `ReactNode`                                                                                  | **required** | Content rendered inside the button (typically an icon or SVG).                                                                                                                                                                                                                                                                                                                                                                                       |
| `disabled`    | `boolean`                                                                                    | `false`      | When `true`, adds `disabled` attribute and applies disabled styling (opacity and cursor changes via Tailwind utilities in `globals.css`).                                                                                                                                                                                                                                                                                                            |
| `onClick`     | `() => void`                                                                                 | `undefined`  | Click handler.                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `size`        | `"mini" \| "small" \| "medium" \| "large"`                                                   | `"medium"`   | Controls width and height: <br>• `mini`: `h-8 w-8` <br>• `small`: `h-10 w-10` <br>• `medium`: `h-11 w-11` <br>• `large`: `h-14 w-14`                                                                                                                                                                                                                                                                                                                 |
| `variant`     | `"default" \| "primary" \| "secondary"`                                                      | `"default"`  | Determines background, border, and hover/active styles: <br>• `default`: text color changes on hover/active (`hover:text-primary-hovered active:text-primary-pressed`). <br>• `primary`: white background with gray border; on hover/active: background changes to `#FFDEC2` / `#FFC99D`, border removed. <br>• `secondary`: white background with shadow; on hover/active: border appears/changes (`hover:border-secondary active:border-[1.5px]`). |
| `transparent` | `boolean`                                                                                    | `false`      | When `true`, adds `bg-transparent` class, removing any background color (useful for placing on colored backgrounds).                                                                                                                                                                                                                                                                                                                                 |
| `...rest`     | All standard `<button>` attributes (e.g., `type`, `aria-label`, `title`, `id`, `form`, etc.) | –            | Spread onto the underlying `<button>` element.                                                                                                                                                                                                                                                                                                                                                                                                       |

## Rendered Structure

```html
<button
  class="[size-modifiers] [variant-modifiers] [transparent?] box-border flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-full transition-all"
  disabled="{disabled}"
  {...rest}
>
  {children}
</button>
```

- Base classes: `box-border flex w-fit shrink-0 cursor-pointer items-center justify-center rounded-full transition-all`.
- Size classes added conditionally.
- Variant classes added conditionally.
- `transparent` adds `bg-transparent` if true.

## Styling Details

- All styling is done via Tailwind utility classes (CSS‑first, defined in `src/app/globals.css`).
- `twMerge` utility is used to combine classes safely, avoiding duplicates.
- Transition: `transition-all` for smooth hover/active changes.
- The component inherits default focus outlines from the browser; ensure custom styles retain visible focus if overriding.

## Accessibility Guidelines

- The component renders a native `<button>`, ensuring keyboard operability (Space/Enter) and screen‑reader button role.
- Provide an accessible name:
  - If `children` is an icon that conveys meaning, add `aria-label` (or `aria-labelledby`) via `...rest`.
  - For purely decorative icons, use `aria-hidden="true"` on the icon and provide `aria-label` on the button.
- Ensure sufficient contrast: variant colors are defined in Tailwind config; verify they meet WCAG AA ratios for normal and large text.
- Avoid removing `outline`; if custom focus styles are needed, add them via `...rest` or additional class names.
- When `disabled` is true, the button is inaccessible to assistive technologies and cannot be focused; use only when the action is truly unavailable.

## Usage Examples

### Default Icon Button

```tsx
<CircleButton onClick={handleClick} aria-label="Menu">
  <MenuIcon />
</CircleButton>
```

### Primary Variant (e.g., confirm action)

```tsx
<CircleButton
  variant="primary"
  size="large"
  onClick={handleConfirm}
  aria-label="Confirm"
>
  <CheckIcon />
</CircleButton>
```

### Secondary Variant (e.g., toggle)

```tsx
<CircleButton
  variant="secondary"
  size="small"
  onClick={toggle}
  aria-label="Toggle details"
>
  <MoreIcon />
</CircleButton>
```

### Transparent Background (e.g., over image)

```tsx
<CircleButton transparent size="mini" onClick={close} aria-label="Close">
  <CloseIcon />
</CircleButton>
```

### Disabled State

```tsx
<CircleButton
  disabled
  variant="primary"
  size="medium"
  aria-label="Submit (disabled)"
>
  <SendIcon />
</CircleButton>
```

### As a Submit Button in a Form

```tsx
<form onSubmit={handleSubmit}>
  <CircleButton type="submit" variant="primary" size="medium" aria-label="Save">
    <SaveIcon />
  </CircleButton>
</form>
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that correct size classes are applied based on `size` prop.
  - Ensure variant classes match the selected `variant`.
  - Confirm that `transparent` adds `bg-transparent`.
  - Test that `disabled` attribute is present when `disabled=true`.
  - Ensure `className` (if added via `...rest` or prop) merges correctly via `twMerge`.
- **Interaction Tests**:
  - Simulate click and ensure `onClick` fires.
  - Test keyboard interaction: pressing Space or Enter triggers `onClick`.
  - Verify that disabled button does not respond to clicks or key presses.
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Check that the button is reachable via tab.
  - When providing `aria-label`, ensure the accessible name is correct.
  - Ensure disabled button is not focusable or is announced as disabled.
- **Visual Tests** (optional): Validate hover/active styles and size dimensions.

## Related Components

- `src/components/atoms/portal/inputs/CircleButton/index.ts` – re‑exports the component.
- Often used with icons from `@portal/ui/icons`.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Built with TailwindCSS v4 (CSS‑first); all styling via utility classes defined in `src/app/globals.css` and merged via `twMerge`.
