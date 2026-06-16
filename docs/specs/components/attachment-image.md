# AttachmentImage Component Specification

## Overview

The **AttachmentImage** component renders an image by ID, using Next.js `Image` with automatic URL resolution via `getAttachmentUrl`.

## API

| Prop        | Type                         | Default      | Description                      |
| ----------- | ---------------------------- | ------------ | -------------------------------- |
| `imageId`   | `string`                     | **required** | Attachment identifier.           |
| `...rest`   | `ImageProps` (without `src`) | —            | Next.js `Image` props.           |
| `className` | `string`                     | —            | Additional image classes merged. |

## Behavior

- Resolves URL via `getAttachmentUrl(imageId)`.
- Passes `unoptimized={isPlaywrightCt()}` for test compatibility.
- Renders `NextImage` with `pointer-events-none object-contain`.

## Visual Design

- Default styling prevents pointer interactions.
- `object-contain` scales image within bounds.

## Accessibility

- Uses native `alt` prop for screen readers.
- Ensure parent provides meaningful alt text.

## Testing Guidelines

- **URL resolution**: verify `getAttachmentUrl` called with `imageId`.
- **Props forward**: confirm all other `ImageProps` reach `NextImage`.

## Usage Example

```tsx
import { AttachmentImage } from "@portal/ui/atoms/data-display/AttachmentImage";

<AttachmentImage
  imageId="pet-123-avatar"
  alt="Fluffy cat"
  width={96}
  height={96}
  className="rounded-full"
/>;
```
