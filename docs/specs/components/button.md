# Button Component Specification

## Overview

The `Button` component is a reusable, accessible button primitive built on top of a native `<button>` element. It supports multiple visual variants, sizes, and can be used as a standard button or as a link via the `ButtonLink` variant.

## File Location

`src/components/atoms/portal/inputs/Button/index.tsx`

## Props

### Shared Props (ButtonBaseProps)

| Prop                         | Type                                       | Default     | Description                                                                                 |
|------------------------------|--------------------------------------------|-------------|---------------------------------------------------------------------------------------------|
| `variant`                    | `"primary" \| "secondary" \| "tertiary"`   | `"primary"` | Determines the visual style via CSS classes `btn-primary`, `btn-secondary`, `btn-tertiary`. |
| `size`                       | `"mini" \| "small" \| "medium" \| "large"` | `"large"`   | Controls padding and font size via `btn-mini`, `btn-small`, `btn-medium`, `btn-large`.      |
| `fullWidth`                  | `boolean`                                  | `false`     | When `true`, adds `w-full` class to make the button stretch to the width of its container.  |
| `className`                  | `string`                                   | `''`        | Additional Tailwind or custom CSS classes.                                                  |
| `slotProps?.text?.className` | `string`                                   | `''`        | Custom classes applied to the inner `<span>` that wraps `children`.                         |

### ButtonProps (extends ButtonBaseProps + DetailedHTMLProps)

All standard `<button>` attributes are supported (e.g., `onClick`, `disabled`, `type`, `aria-label`, etc.) via React's `DetailedHTMLProps`.

### ButtonLinkProps (extends ButtonBaseProps + Omit<NextLinkProps, "href">)

| Prop                                                                                                          | Type             | Default     | Description                                                                                                 |
|---------------------------------------------------------------------------------------------------------------|------------------|-------------|-------------------------------------------------------------------------------------------------------------|
| `href`                                                                                                        | `string \| null` | `null`      | Target URL for the link. If falsy, defaults to `"#"` (in‑page placeholder).                                 |
| `children`                                                                                                    | `ReactNode`      | `undefined` | Content rendered inside the link.                                                                           |
| All other `NextLinkProps` except `href` (e.g., `replace`, `scroll`, `shallow`, `locale`, etc.) are supported. |
| ------------------------------------------------------------------------------------------------------------- | ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |

## Usage Examples

### Basic Button

```tsx
<Button onClick={handleClick}>Submit</Button>
```

### Variant & Size

```tsx
<Button variant="secondary" size="small">
  Cancel
</Button>
```

### Full Width

```tsx
<Button variant="primary" fullWidth>
  Buy Now
</Button>
```

### With Custom Classes

```tsx
<Button className="mt-4 hover:scale-105">Hover me</Button>
```

### Button as Link

```tsx
<ButtonLink href="/products" variant="tertiary" size="medium">
  View Catalog
</ButtonLink>
```

### Disabled State

```tsx
<Button variant="primary" disabled>
  Processing…
</Button>
```

### Loading State (custom implementation)

```tsx
<Button variant="primary" isLoading={isLoading} onClick={handleSubmit}>
  {isLoading ? "Saving…" : "Save"}
</Button>
```

_Note: The component itself does not have a built‑in loading state; consumers should manage it via `children` or additional props._

## Styling Details

- Base class: `btn` (defined in globals.css / Tailwind).
- Variant classes: `btn-primary`, `btn-secondary`, `btn-tertiary`.
- Size classes: `btn-mini`, `btn-small`, `btn-medium`, `btn-large`.
- Layout utilities: `w-full` when `fullWidth` is true.
- Class merging performed via `twMerge` utility to avoid Tailwind class conflicts.

## Accessibility Guidelines

- The component renders a native `<button>` (or `<a>` via `NextLink` for `ButtonLink`), ensuring inherent keyboard focus and screen‑reader support.
- Always provide an accessible name:
  - For buttons with visible text, the text itself serves as the label.
  - For icon‑only buttons, pass an `aria-label` or `aria-labelledby` prop.
- Ensure sufficient contrast: variant colors are defined in Tailwind config; verify they meet WCAG AA contrast ratios.
- Avoid using `color` or `background-color` overrides that could break contrast unless tested.

## Testing Considerations

- **Unit / Render Tests**: Verify that correct classes are applied based on `variant`, `size`, and `fullWidth` props.
- **Interaction Tests**: Simulate click and ensure `onClick` callback fires.
- **Link Tests** (`ButtonLink`): Ensure `href` is rendered correctly and navigation works with Next.js router.
- **Accessibility Tests**: Use axe or Jest‑axe to confirm no violations.

## Related Components

- `src/components/atoms/portal/inputs/Button/index.tsx` – re‑exports `Button` and `ButtonLink`.
- Utility `twMerge` used for class merging.

## Version History

- Introduced as part of the Atomic Design `atoms/portal` layer.
- Supports TailwindCSS v4 (CSS-first) – all styling via utility classes defined in `src/app/globals.css`.
