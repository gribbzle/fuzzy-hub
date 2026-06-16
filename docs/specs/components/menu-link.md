# MenuLink Component Specification

## Overview

The **MenuLink** component is a navigation link designed for menus and sidebars. It wraps `next/link` with a flex layout supporting leading/trailing icons, responsive typography, and interactive color states.

## API

| Prop        | Type        | Default | Description                                          |
| ----------- | ----------- | ------- | ---------------------------------------------------- |
| `children`  | `ReactNode` | —       | Link label/text content.                             |
| `IconStart` | `ReactNode` | —       | Optional icon rendered before the label.             |
| `IconEnd`   | `ReactNode` | —       | Optional icon rendered after the label.              |
| `className` | `string`    | —       | Additional Tailwind classes merged with base styles. |
| `href`      | `string`    | `"#"`   | Navigation target URL.                               |
| `prefetch`  | `boolean`   | `true`  | Whether Next.js should prefetch the route.           |

## Behavior

- Renders `NextLink` with flex layout (`flex items-center`).
- **Typography**:
  - Base: `text-16` (1rem / 16px)
  - Large desktop (≥1440px): `large-desktop:text-20` (1.25rem / 20px)
  - `font-semibold` weight
- **Color states**:
  - Default: `text-text-default`
  - Hover: `hover:text-primary-hover`
  - Active: `active:text-primary-active`
- **Spacing**:
  - Base gap: `gap-1.5` (6px)
  - Large desktop: `large-desktop:gap-2.5` (10px)
- `w-fit shrink-0` prevents stretching in flex containers.
- Label wrapped in `span` with `shrink-0 max-large-desktop:-translate-y-px` for vertical alignment.
- Custom `className` merged via `twMerge`.

## Visual Design

- Inline-flex row with optional icons on both sides.
- Responsive font size increase on large screens.
- Color transitions on hover/active (via Tailwind utilities).
- No underline by default.

## Accessibility

- Uses `NextLink` → renders semantic `<a>` with `href`.
- Ensure `children` or `aria-label` provides accessible name when icons only.
- Color contrast for `text-text-default`, `text-primary-hover`, `text-primary-active` meets WCAG AA.

## Testing Guidelines

- **Render**: verify `NextLink` with `href`, base classes, and children.
- **Icons**: pass `IconStart`/`IconEnd` and confirm placement.
- **Responsive classes**: check `text-16`, `large-desktop:text-20`, gap utilities present.
- **Color states**: verify hover/active classes applied.
- **Prefetch**: test `prefetch={false}` disables prefetching.
- **ClassName merge**: pass custom classes and ensure they combine.

## Usage Example

```tsx
import { MenuLink } from "@portal/ui/atoms/navigation/MenuLink";
import { IconChevronRight, IconHome } from "@portal/ui/icons";

function SidebarNav() {
  return (
    <nav className="flex flex-col gap-2 p-4">
      <MenuLink
        href="/dashboard"
        IconStart={<IconHome />}
        className="px-2 py-1.5 rounded-md hover:bg-bg-hover"
      >
        Dashboard
      </MenuLink>
      <MenuLink href="/settings" IconEnd={<IconChevronRight />}>
        Settings
      </MenuLink>
    </nav>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
