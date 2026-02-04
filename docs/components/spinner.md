# ShSpinner

An accessible loading spinner component for indeterminate progress.

---

## Basic Usage

```vue
<template>
  <ShSpinner label="Loading data..." />
</template>
```

---

## Sizes

```vue
<template>
  <ShSpinner size="sm" aria-label="Loading" />
  <ShSpinner size="md" aria-label="Loading" />
  <ShSpinner size="lg" aria-label="Loading" />
</template>
```

---

## Without Visible Label

```vue
<template>
  <!-- Screen reader only label -->
  <ShSpinner aria-label="Processing your request" />
</template>
```

---

## Props

| **Prop** | **Type**                     | **Default** | **Description**       |
| -------- | ---------------------------- | ----------- | --------------------- |
| `size`   | 'sm' &#124; 'md' &#124; 'lg' | 'md'        | Spinner size          |
| `label`  | string                       | undefined   | Visible loading label |

---

## Accessibility

ShSpinner implements accessible loading indicators:

- **Live Region**
  - Uses `role="status"` for screen reader announcements
  - Sets `aria-live="polite"` by default
  - Can override with `aria-live="assertive"` for urgent loading
- **Labeling**
  - Warns when no accessible label provided
  - Visible label or `aria-label` required
  - Provides "Loading..." fallback for screen readers
- **Animation**
  - Uses `prefers-reduced-motion` safe animations
  - SVG-based for scalability and performance

---

## Styling Hooks

#### Classes

- `.sh-spinner` - Container
- `.sh-spinner__svg` - SVG element
- `.sh-spinner__circle` - Animated circle
- `.sh-spinner__label` - Visible label
- `.sh-spinner__sr-only` - Screen reader only text

#### Data Attributes

```html
data-size="sm | md | lg"
```

Example:

```scss
.sh-spinner__circle {
  stroke: blue;
}

.sh-spinner[data-size="lg"] .sh-spinner__svg {
  width: 4rem;
  height: 4rem;
}
```

---

## When to Use ShSpinner

- Indeterminate loading states
- Data fetching
- Async operations without progress tracking
- Page/section loading

**Don't use for:**

- Determinate progress → use ShProgress
- Very quick operations (< 1 second)
- Multiple concurrent loads → show single spinner for page
