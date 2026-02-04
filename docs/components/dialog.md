# ShDialog

An accessible modal dialog component with focus management.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);
</script>

<template>
  <ShButton @click="isOpen = true">Open Dialog</ShButton>

  <ShDialog
    v-model:open="isOpen"
    title="Confirm Action"
    description="Are you sure you want to proceed?"
  >
    <p>This action cannot be undone.</p>

    <template #footer>
      <ShButton variant="ghost" @click="isOpen = false">Cancel</ShButton>
      <ShButton variant="primary" @click="confirm">Confirm</ShButton>
    </template>
  </ShDialog>
</template>
```

---

## Props

| **Prop**              | **Type** | **Default** | **Description**                           |
| --------------------- | -------- | ----------- | ----------------------------------------- |
| `open`                | boolean  | false       | Controls dialog visibility                |
| `modal`               | boolean  | true        | Sets aria-modal attribute                 |
| `closeOnEsc`          | boolean  | true        | Allow closing with Escape key             |
| `closeOnOverlayClick` | boolean  | true        | Close when clicking overlay               |
| `title`               | string   | undefined   | Dialog title (required for accessibility) |
| `description`         | string   | undefined   | Dialog description                        |

---

## Events

| **Event**     | **Payload** | **Description**                 |
| ------------- | ----------- | ------------------------------- |
| `update:open` | boolean     | Emitted when open state changes |
| `close`       | -           | Emitted when dialog is closed   |

---

## Slots

- `default` - Main dialog content
- `footer` - Footer content (typically buttons)

---

## Accessibility

ShDialog implements the ARIA dialog pattern with full accessibility:

- **Focus Management**
  - Traps focus within dialog when open
  - Focuses first focusable element on open
  - Restores focus to trigger element on close
  - Tab cycles through focusable elements
- **Keyboard Support**
  - Escape key closes dialog (configurable)
  - Tab/Shift+Tab for navigation within dialog
- **ARIA Attributes**
  - `role="dialog"` and `aria-modal="true"`
  - `aria-labelledby` references title
  - `aria-describedby` references description
- **Scroll Lock**
  - Locks body scroll when dialog is open
  - Restores scroll on close
- **Developer Warnings**
  - Warns when no title provided

---

## Styling Hooks

#### Classes

- `.sh-dialog-overlay` - Overlay background
- `.sh-dialog` - Dialog container
- `.sh-dialog__header` - Header section
- `.sh-dialog__title` - Title heading
- `.sh-dialog__description` - Description text
- `.sh-dialog__content` - Main content area
- `.sh-dialog__footer` - Footer section

---

## When to Use ShDialog

- Confirmation dialogs
- Forms requiring full attention
- Important information/warnings
- Multi-step wizards

**Don't use for:**

- Non-critical tooltips → use ShTooltip
- Notifications → use toast/alert
- Large amounts of content → consider full page
