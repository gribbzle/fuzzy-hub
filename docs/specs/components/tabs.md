# Tabs Component Specification

## Overview

The **Tabs** component system provides an accessible, ARIA-compliant tab interface with three parts:

- **Tabs** — root wrapper & context provider (extends `TabsProvider`)
- **Tab** — individual tab button (radio-based, keyboard navigable)
- **TabPanel** — content panel shown when its tab is active

Supports both **controlled** (`value` + `onChange`) and **uncontrolled** (`defaultValue`) modes, and two size scales (`medium` | `large`).

## API

### Tabs (Root)

| Prop           | Type                      | Default        | Description                                                                     |
| -------------- | ------------------------- | -------------- | ------------------------------------------------------------------------------- |
| `children`     | `ReactNode`               | **required**   | Must contain `Tab` and `TabPanel` components.                                   |
| `className`    | `string`                  | —              | Additional classes for the wrapper `<div>` (default `flex items-center gap-3`). |
| `value`        | `string`                  | —              | **Controlled** active tab value.                                                |
| `defaultValue` | `string`                  | —              | **Uncontrolled** initial active tab.                                            |
| `onChange`     | `(value: string) => void` | —              | Callback when active tab changes.                                               |
| `size`         | `"medium" \| "large"`     | `"medium"`     | Default size for child `Tab` components.                                        |
| `name`         | `string`                  | auto-generated | Unique group name for radio inputs & ARIA.                                      |

### Tab

| Prop        | Type                             | Default      | Description                                    |
| ----------- | -------------------------------- | ------------ | ---------------------------------------------- |
| `value`     | `string`                         | **required** | Unique identifier matching a `TabPanel` value. |
| `label`     | `string`                         | **required** | Visible tab text.                              |
| `size`      | `"small" \| "medium" \| "large"` | inherited    | Overrides parent `size`.                       |
| `className` | `string`                         | —            | Extra classes merged onto the tab `<span>`.    |

### TabPanel

| Prop       | Type               | Default      | Description                                 |
| ---------- | ------------------ | ------------ | ------------------------------------------- |
| `value`    | `string \| number` | **required** | Must match a `Tab` value.                   |
| `children` | `ReactNode`        | **required** | Content rendered when this panel is active. |

## Behavior

- **Controlled mode**: provide `value` + `onChange`; parent owns state.
- **Uncontrolled mode**: provide `defaultValue`; internal state managed by `TabsProvider`.
- **Keyboard navigation**: `Tab` uses native radio inputs → Arrow keys switch tabs, `Enter`/`Space` activates.
- **Auto-generated name**: if `name` omitted, a unique ID is created via `useId()`.
- **Tab size**: parent `size` (`medium`/`large`) flows via context; `Tab.size` (`small`/`medium`/`large`) can override per-tab.
- **TabPanel** renders `null` when inactive (unmounts content).

## Visual Design

- **Wrapper**: `flex items-center gap-3` horizontal layout.
- **Tab base**: `tab` class (defined in global CSS).
- **Size variants** (via `sizeClasses`):
  - `small` → `tab-small`
  - `medium` → `tab-medium`
  - `large` → `tab-large`
- **States** (peer-based on hidden radio):
  - Default: inherits `tab-*` styling
  - Hover (inactive): `border-aqua-green` + `text-aqua-green`
  - Active: `bg-aqua-green` + `border-aqua-green` + `text-white`
- **TabPanel**: no wrapper — renders children directly when active.

## Accessibility

- Uses native `<input type="radio">` → automatic radio group semantics.
- `name` prop groups radios; unique per `Tabs` instance.
- `TabPanel` conditionally renders → only active panel in DOM (screen readers see one panel).
- Ensure `label` provides clear accessible name for each tab.
- Color contrast for active/hover states meets WCAG AA.

## Testing Guidelines

- **Controlled**: set `value`, click different `Tab`, assert `onChange` called with new value.
- **Uncontrolled**: provide `defaultValue`, verify correct tab active initially, click to switch.
- **Size inheritance**: parent `size="large"`, child `Tab` without `size` → `tab-large`; child with `size="small"` → `tab-small`.
- **Keyboard**: focus first tab, ArrowRight/Left moves focus, Enter activates.
- **TabPanel**: only active panel's children in DOM.
- **Name generation**: two `Tabs` without `name` get different radio group names.

## Usage Example

```tsx
import { Tab, TabPanel, Tabs } from "@portal/ui/atoms/navigation/Tabs";

function Example() {
  return (
    <Tabs defaultValue="pets" size="large" className="mb-6">
      <Tab value="pets" label="Pets" />
      <Tab value="supplies" label="Supplies" />
      <Tab value="services" label="Services" size="medium" />
      <TabPanel value="pets">
        <p>Browse available pets for adoption.</p>
      </TabPanel>
      <TabPanel value="supplies">
        <p>Food, toys, and accessories.</p>
      </TabPanel>
      <TabPanel value="services">
        <p>Grooming, training, and veterinary care.</p>
      </TabPanel>
    </Tabs>
  );
}
```

---

_Specification auto‑included via `opencode.json` (`"docs/specs/_.md"`).\*
