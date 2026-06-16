# MetaInfo Component Specification

## Overview

The **MetaInfo** component renders an icon with inline text, used for metadata like location, date, or stats.

## API

| Prop   | Type        | Default      | Description                                       |
| ------ | ----------- | ------------ | ------------------------------------------------- |
| `icon` | `ReactNode` | **required** | Icon element (typically from `@portal/ui/icons`). |
| `text` | `string`    | **required** | Metadata text.                                    |

## Behavior

- Renders a `<div>` with `flex items-center gap-2`.
- Icon wrapper: `flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden`.
- Text: `text-16 text-text-default font-semibold`.

## Visual Design

- Icon constrained to `h-6 w-6`.
- Horizontal layout with `gap-2` spacing.
- Text is semi-bold.

## Accessibility

- Semantic `<div>`.
- Both icon and text are visible; no special ARIA needed.

## Testing Guidelines

- **Layout**: verify `flex items-center gap-2` present.
- **Icon wrapper**: confirm `h-6 w-6` container.
- **Text styling**: `text-16 font-semibold` applied.

## Usage Example

```tsx
import { MetaInfo } from "@portal/ui/atoms/data-display/MetaInfo";
import { IconLocation } from "@portal/ui/icons";

<MetaInfo icon={<IconLocation />} text="New York, NY" />;
```
