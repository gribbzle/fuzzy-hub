# Link Component Specification

## Overview

The **Link** component is a thin wrapper around Next.js `next/link` that applies consistent anchor styling (primary color, bold font, hover opacity) and forwards all native `<a>` props.

## API

| Prop        | Type            | Default      | Description                                                                                                            |
| ----------- | --------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `children`  | `ReactNode`     | **required** | Link content (text, icons, etc.).                                                                                      |
| `className` | `string`        | —            | Additional Tailwind classes merged with base styles.                                                                   |
| `...rest`   | `NextLinkProps` | —            | All other `next/link` props (`href`, `replace`, `scroll`, `prefetch`, etc.) are spread onto the underlying `NextLink`. |

## Behavior

- Renders `NextLink` with `className` merging base styles:
  - `text-primary` — primary text color
  - `hover:text-primary/80` — 80% opacity on hover
  - `font-bold` — bold weight
- Custom `className` is merged via `twMerge`, allowing overrides (e.g., `text-sm`, `underline`).
- All other props (`href`, `replace`, `scroll`, `prefetch`, etc.) pass through to `NextLink`.

## Visual Design

- **Default**: bold primary-colored text.
- **Hover**: 80% opacity of primary color.
- No underline by default (add via `className="underline"` if needed).
- Inherits font size from context unless overridden.

## Accessibility

- Uses Next.js `Link` which renders a semantic `<a>` element.
- Ensure `href` is always provided for valid navigation.
- Color contrast meets WCAG AA for primary color against background.

## Testing Guidelines

- **Render**: verify `NextLink` receives `href` and base classes.
- **ClassName merge**: pass `className="underline text-sm"` and confirm both apply.
- **Props forwarding**: check `replace`, `scroll`, `prefetch` reach underlying `NextLink`.
- **Children**: ensure arbitrary React nodes render correctly.

## Usage Example

```tsx
import { Link } from "@portal/ui/atoms/navigation/Link";

function Navigation() {
  return (
    <nav className="flex gap-6">
      <Link href="/catalog" className="text-lg">
        Catalog
      </Link>
      <Link href="/about" prefetch={false}>
        About
      </Link>
    </nav>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
