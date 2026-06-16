# IconButton Component Specification

## Overview

The `IconButton` is a minimalistic button that renders an SVG icon inside a native `<button>` element. It provides basic hover and active text color changes, and passes through all SVG props (such as `width`, `height`, `fill`, `stroke`, `onClick`, etc.) to the icon component. The button itself has no background or border; styling is purely via text color.

## File Location

`src/components/atoms/portal/inputs/IconButton/IconButton.tsx`

## Props

`IconButtonProps` extends `SVGProps<SVGSVGElement>` (which includes all standard SVG attributes like `width`, `height`, `fill`, `stroke`, etc.) and adds:

| Prop      | Type                                                                                                                                       | Description                                                                                                                                                                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Icon`    | `(props: SVGProps<SVGSVGElement>) => JSX.Element`                                                                                          | **required** – A React component that accepts SVG props and returns an SVG element (e.g., `<CheckIcon />`, `<MenuIcon />`). The icon receives all `...rest` props.                                                                                                                                                 |
| `...rest` | All SVG props (e.g., `width`, `height`, `fill`, `stroke`, `onClick`, `onMouseEnter`, `className`, `aria-label`, `role`, `focusable`, etc.) | Spread onto both the `<button>` and the `<Icon>` component. Note: some props like `onClick` will be applied to the button (since the button is the outer element) and also passed to the icon; this is typical for icons that need click handlers, but you can control behavior by stopping propagation if needed. |

### Notable Props

- `onClick`: Handler for button click; also passed to the icon (if the icon uses it).
- `aria-label` / `aria-labelledby`: Provides accessible name for the button.
- `disabled`: Not defined in the type but can be passed via `...rest`; however, the button does not have any disabled styling; if you need a disabled state, you should wrap or extend the component.
- `className`: Additional Tailwind or CSS classes applied to the button (note: the button already has fixed classes for text color; you can add more).

## Rendered Structure

```html
<button
  class="text-text-default hover:text-primary cursor-pointer active:text-[#FF8D2F]"
>
  <Icon width="{...}" height="{...}" fill="{...}" ... />
</button>
```

- The button inherits text color utilities: `text-text-default` (default), `hover:text-primary`, `active:text-[#FF8D2F]`.
- No background, border, padding, or margin is applied by default; the icon's size determines the hit area (you can set `width` and `height` props to increase the clickable area).
- The icon receives all rest props, allowing you to control its appearance.

## Styling Details

- All styling is done via Tailwind utility classes (CSS‑first) on the button element:
  - Base: `cursor-pointer`
  - Text color: `text-text-default`
  - Hover: `hover:text-primary`
  - Active: `active:text-[#FF8D2F]`
- The component uses no `twMerge`; classes are static. If you need to add or override classes, pass `className` via `...rest`.
- Since there is no background or border, ensure the icon itself has sufficient size and contrast to be tappable/clickable.

## Accessibility Guidelines

- The component renders a native `<button>`, ensuring keyboard operability (Space/Enter) and screen‑reader button role.
- Provide an accessible name:
  - If the icon conveys meaning, add `aria-label` (or `aria-labelledby`) via `...rest`.
  - For purely decorative icons, consider using `aria-hidden="true"` on the icon and still label the button.
- Ensure sufficient touch/click size: the hit area is determined by the button's dimensions, which default to the icon's natural size. To increase the hit area, pass `width` and `height` props (or use `className` to add `h-* w-*` or `p-*`).
- Avoid relying solely on color changes for hover/active states; consider adding a background or border variant if needed for WCAG compliance (the current spec relies on text color contrast; verify contrast ratios against the background).
- The component does not disable interaction; if you need a disabled state, you must handle it externally (e.g., by conditionally rendering a `button[disabled]` or wrapping with custom logic).

## Usage Examples

### Basic Icon Button

```tsx
<IconButton
  Icon={CheckIcon}
  width={20}
  height={20}
  onClick={handleClick}
  aria-label="Confirm"
/>
```

### Icon with Custom Fill and Stroke

```tsx
<IconButton
  Icon={MenuIcon}
  width={24}
  height={24}
  fill="#3B82F6"
  stroke="#1D4ED8"
/>
```

### Larger Hit Area (using width/height)

```tsx
<IconButton
  Icon={SearchIcon}
  width={36}
  height={36}
  onClick={openSearch}
  aria-label="Search"
/>
```

### Adding Extra Classes (e.g., margin)

```tsx
<IconButton
  Icon={CloseIcon}
  className="ml-4"
  width={20}
  height={20}
  onClick={close}
  aria-label="Close"
/>
```

### As a Form Button (submit)

```tsx
<form onSubmit={handleSubmit}>
  <IconButton
    Icon={SendIcon}
    width={20}
    height={20}
    type="submit"
    aria-label="Send"
  />
</form>
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that the button renders with the base classes (`cursor-pointer text-text-default`).
  - Ensure hover and active classes are not present in the default state (can be checked via interaction or using CSS module mocking).
  - Confirm that the `Icon` component receives the spread props (e.g., `width`, `height`, `fill`).
  - Test that `className` prop is added to the button.
- **Interaction Tests**:
  - Simulate click and ensure `onClick` fires.
  - Simulate mouse enter/leave and verify that text color changes (can be checked via querying computed style or using a testing library that fires events).
  - Test keyboard interaction: pressing Space or Enter triggers `onClick`.
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Check that the button is reachable via tab.
  - When providing `aria-label`, ensure the accessible name is correct.
  - Verify that the button has the role `button`.
- **Visual Tests** (optional): Validate that hover/active text color changes as expected.

## Related Components

- `src/components/atoms/portal/inputs/IconButton/index.ts` – re‑exports the component.
- Often used with icons from `@portal/ui/icons`.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Built with TailwindCSS v4 (CSS‑first); styling via utility classes (no additional configuration needed).
