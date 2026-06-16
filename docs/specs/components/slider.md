# Slider Component Specification

## Overview

The `Slider` component is a thin wrapper around the [`rc-slider`](https://github.com/react-component/slider) library, providing a range slider with customizable styling via the `styles` prop. It exposes all `rc-slider` props through the `SliderProps` type, allowing full control over behavior (min, max, step, values, onChange, etc.) while applying a default look that can be overridden or extended.

## File Location

`src/components/atoms/portal/inputs/Slider/Slider.tsx`

## Props

`SliderProps` is defined as `ComponentProps<typeof RCSlider>`, meaning it accepts all props supported by `rc-slider`. Additionally, the component accepts an optional `styles` prop to customize the internal parts of the slider.

| Prop      | Type                                                                                                                                                                                                                      | Default                      | Description                                                                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `styles`  | `object`                                                                                                                                                                                                                  | See **Default Styles** below | Object with keys `rail`, `track`, `handle` (and optionally `mark`, `dot`) that are merged with the default styles. Each style object corresponds to the respective part of the slider as defined by `rc-slider`. |
| `...rest` | All `rc-slider` props (e.g., `min`, `max`, `step`, `value`, `defaultValue`, `values`, `defaultValues`, `onChange`, `onAfterChange`, `disabled`, `marks`, `step`, `tipFormatter`, `vertical`, `reverse`, `pushable`, etc.) | –                            | Spread directly onto the `<RCSlider>` component. Refer to [rc-slider documentation](https://github.com/react-component/slider#props) for the full list.                                                          |

### Default Styles

The component applies the following internal styles unless overridden via the `styles` prop:

```
{
  rail: {
    backgroundColor: "#D9D9D9",
    height: 4,
  },
  track: {
    backgroundColor: "#6AD0C8",
    height: 4,
  },
  handle: {
    opacity: 1,
    width: 20,
    height: 20,
    border: "3px solid #6AD0C8",
    backgroundColor: "#FFFFFF",
    marginTop: -8,
  }
}
```

- `rail`: the background track.
- `track`: the filled portion indicating the selected range.
- `handle`: the draggable thumb(s).

Any values provided in `styles` are shallow‑merged with these defaults, allowing you to override specific properties (e.g., change `height` or `backgroundColor`) while keeping the rest.

## Rendered Structure

The component renders `<RCSlider />` directly, which creates a DOM structure similar to:

```html
<div class="rc-slider">
  <div class="rc-slider-rail" style="{" }></div>
  <div class="rc-slider-track" style="{" }></div>
  <span class="rc-slider-handle" style="{" } tabindex="0"></span>
  <!-- additional handles for range -->
  <!-- optional marks, dots, etc. -->
</div>
```

All styling is applied via inline `style` attributes (as per `rc-slider` design).

## Accessibility Guidelines

- `rc-slider` provides built‑in keyboard support:
  - **Single thumb**: Arrow left/right (or up/down for vertical) adjusts value by `step`. Home/End go to min/max. PageUp/PageDown adjust by `pageSize` (if defined).
  - **Range thumb**: Same controls affect the active thumb; you can switch between tabs with Tab/Shift+Tab.
- Ensure the slider is focusable (it is by default). Provide an accessible label via:
  - `aria-label`, `aria-labelledby`, or `aria-valuetext` (the latter can be supplied via `tipFormatter` or custom rendering if needed).
  - If the slider represents a specific quantity (e.g., "Price"), label it clearly.
- Verify that the customized colors meet WCAG contrast ratios between the handle, track, and background.
- Avoid removing focus outlines; `rc-slider` does not add any by default, so you may want to add a focus style via the `handle` style (e.g., `boxShadow` or `border` on focus) if needed for your design.

## Usage Examples

### Simple Single‑Value Slider

```tsx
<Slider
  min={0}
  max={100}
  step={1}
  defaultValue={25}
  onChange={(value) => console.log("value", value)}
  aria-label="Volume"
/>
```

### Range Slider (two values)

```tsx
<Slider
  min={0}
  max={500}
  step={5}
  defaultValue={[50, 200]}
  onChange={(values) => console.log("range", values)}
  aria-label="Price range"
/>
```

### Custom Styling (override handle size)

```tsx
<Slider
  min={0}
  max={10}
  step={0.5}
  value={3}
  onChange={(v) => console.log(v)}
  styles={{
    handle: {
      width: 24,
      height: 24,
      border: "2px solid #6AD0C8",
      backgroundColor: "#FFFFFF",
      marginTop: -10,
    },
  }}
  aria-label="Opacity"
/>
```

### With Marks (labels at specific points)

```tsx
<Slider
  min={0}
  max={100}
  step={10}
  marks={{ 0: "0°", 25: "25°", 50: "50°", 75: "75°", 100: "100°" }}
  value={50}
  onChange={(v) => console.log(v)}
  aria-label="Rotation"
/>
```

### Vertical Slider

```tsx
<Slider
  min={0}
  max={100}
  vertical
  defaultValue={30}
  onChange={(v) => console.log(v)}
  style={{ height: 200 }} /* container height */
  aria-label="Brightness"
/>
```

## Testing Considerations

- **Unit / Render Tests**:
  - Verify that the slider renders with the correct number of handles (1 for single value, 2 for range).
  - Confirm that default styles are applied (can inspect inline style via `getAttribute('style')` or using a testing library that can read computed styles).
  - Test that custom `styles` prop overrides the defaults (e.g., changing handle width).
  - Ensure all passed‑through `rc-slider` props are present on the underlying component (you can mock `RCSlider` and assert it receives the expected props).
- **Interaction Tests**:
  - Simulate drag (or arrow key presses) and ensure `onChange`/`onAfterChange` fire with expected values.
  - For range slider, verify that dragging each thumb updates the correct value.
  - Test disabled state: `disabled={true}` should prevent interaction.
- **Accessibility Tests**:
  - Use axe or Jest‑axe to confirm no violations.
  - Check that the slider is reachable via tab.
  - When providing `aria-label`, ensure the accessible name is correct.
  - Verify keyboard increments/decrements work as expected.
- **Visual Tests** (optional): Validate that the slider’s appearance matches the expected colors/dimensions.

## Related Components

- `src/components/atoms/portal/inputs/Slider/index.ts` – re‑exports the component.
- Often used with `FormGroup`, `FormControlLabel`, etc. from `src/components/atoms/portal/data-display/Form` for consistent layout.

## Version History

- Introduced as part of the Atomic Design `atoms/portal/inputs` layer.
- Built as a wrapper around `rc-slider`; styling via inline `styles` object, allowing Tailwind‑free customization while still benefiting from the library’s accessibility and feature set.
- Uses `use client` directive (Next.js) to ensure client‑side only rendering.
