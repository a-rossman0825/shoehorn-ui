# ShBadge

An accessible badge component for status indicators and counts.

---

## Basic Usage

```vue
<template>
  <ShBadge>New</ShBadge>
  <ShBadge variant="success">Active</ShBadge>
  <ShBadge variant="error">Error</ShBadge>
</template>
```

---

## Count Badge

```vue
<template>
  <ShButton>
    Notifications
    <ShBadge :count="5" aria-label="5 unread notifications" />
  </ShButton>
</template>
```

---

## Props

| **Prop**  | **Type**                                                                 | **Default** | **Description**                                |
| --------- | ------------------------------------------------------------------------ | ----------- | ---------------------------------------------- |
| `variant` | 'default' &#124; 'success' &#124; 'warning' &#124; 'error' &#124; 'info' | 'default'   | Visual style variant                           |
| `count`   | number                                                                   | undefined   | Numeric count (displays "99+" for values > 99) |

---

## Accessibility

ShBadge provides semantic status information:

- **Labels for Counts**
  - Warns when count is used without `aria-label`
  - Count should have descriptive label (e.g., "3 notifications")
  - Supports `aria-label` and `aria-labelledby`
- **Decorative vs Meaningful**
  - Text badges are inherently labeled by their content
  - Numeric badges require explicit labeling

---

## Styling Hooks

#### Classes

- `.sh-badge` - Badge element

#### Data Attributes

```html
data-variant="default | success | warning | error | info"
```

Example:

```scss
.sh-badge[data-variant="success"] {
  background-color: green;
}
```

---

## When to Use ShBadge

- Status indicators (New, Beta, Pro)
- Notification counts
- Labels and tags
- Small metadata displays

**Don't use for:**

- Large blocks of text → use other components
- Interactive elements → wrap in ShButton if clickable
- Critical information that must be read → ensure proper labeling
