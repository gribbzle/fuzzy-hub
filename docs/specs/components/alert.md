# Alert Component Specification

## Overview

The **Alert** component displays contextual feedback messages with semantic severity levels (`error`, `attention`, `success`, `info`). It supports an optional title, action slot, custom icon override, and three size variants.

## API

| Prop        | Type                                            | Default      | Description                                   |
| ----------- | ----------------------------------------------- | ------------ | --------------------------------------------- |
| `children`  | `ReactNode`                                     | **required** | Alert message body (text content).            |
| `size`      | `"small" \| "medium" \| "large"`                | `"medium"`   | Alert sizing variant.                         |
| `severity`  | `"error" \| "attention" \| "success" \| "info"` | `"info"`     | Color scheme and default icon.                |
| `icon`      | `(props) => JSX.Element`                        | —            | Custom icon component (receives `className`). |
| `title`     | `string`                                        | —            | Optional heading displayed above the message. |
| `action`    | `ReactNode`                                     | —            | Optional action area rendered below content.  |
| `className` | `string`                                        | —            | Additional Tailwind classes merged with base. |

## Behavior

- Renders a `<div>` with `sizeClasses[size]` + `severityClasses[severity]`.
- **Default icons** (overridable via `icon` prop):
  - `error` → Close icon
  - `attention` → Danger icon
  - `success` → Check icon
  - `info` → InfoCircle icon
- Icon rendered in header when `title` is present; otherwise prepended to body text.
- Action area rendered in a separate column at bottom.
- Size variants use `alert-small`, `alert-medium`, `alert-large` CSS classes.

## Visual Design

- Size variants (`alert-small`, `alert-medium`, `alert-large`) define padding/spacing.
- Severity variants (`alert-error`, `alert-attention`, `alert-success`, `alert-info`) define background, border, and icon colors.
- Icon is fixed at `h-5 w-5`.
- Text uses `text-text-default` (title) and `text-text-secondary` (body).

## Accessibility

- Semantic `<div>` for alert container.
- Icon presence provides visual context; ensure color contrast for severity variants meets WCAG AA.
- Action area should contain focusable elements (buttons, links).

## Testing Guidelines

- **Severity variants**: render with each severity, assert corresponding CSS class present.
- **Size variants**: verify `alert-small`/etc classes applied.
- **Title**: confirm icon renders in header, text appears above message.
- **Custom icon**: pass custom icon, verify it replaces default.
- **Action**: pass action node, verify it appears in separate column below.
- **ClassName merge**: custom classes combine correctly.
