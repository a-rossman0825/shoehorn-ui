# ShTooltip

An accessible tooltip component for providing additional context.

---

## Basic Usage

```vue
<template>
  <ShTooltip content="Click to save changes">
    <ShButton>Save</ShButton>
  </ShTooltip>
</template>
```

---

## Placement

```vue
<template>
  <ShTooltip content="Top tooltip" placement="top">
    <ShButton>Top</ShButton>
  </ShTooltip>

  <ShTooltip content="Bottom tooltip" placement="bottom">
    <ShButton>Bottom</ShButton>
  </ShTooltip>
</template>
```

---

## Props

| **Prop**    | **Type**                                           | **Default** | **Description**            |
| ----------- | -------------------------------------------------- | ----------- | -------------------------- |
| `content`   | string                                             | undefined   | Tooltip text content       |
| `placement` | 'top' &#124; 'bottom' &#124; 'left' &#124; 'right' | 'top'       | Tooltip position           |
| `delay`     | number                                             | 300         | Show delay in milliseconds |

---

## Accessibility

ShTooltip implements accessible tooltip patterns:

- **ARIA Attributes**
  - Uses `role="tooltip"`
  - Sets `aria-describedby` on trigger when visible
- **Keyboard Support**
  - Shows on focus
  - Hides on blur
- **Mouse Support**
  - Shows on mouseenter with delay
  - Hides on mouseleave
- **Developer Warnings**
  - Warns when no content provided

---

## Styling Hooks

#### Classes

- `.sh-tooltip-wrapper` - Wrapper element
- `.sh-tooltip-trigger` - Trigger element
- `.sh-tooltip` - Tooltip element

#### Data Attributes

```html
data-placement="top | bottom | left | right"
```

---

## When to Use ShTooltip

- Icon-only buttons
- Abbreviated text
- Additional context
- Keyboard shortcuts

**Don't use for:**

- Critical information → make it always visible
- Long content → use ShDialog or expand inline
- Mobile-first design → tooltips don't work well on touch
