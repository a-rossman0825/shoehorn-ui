# ShProgress

An accessible progress bar component for showing task completion.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const uploadProgress = ref(45);
</script>

<template>
  <ShProgress :value="uploadProgress" label="Upload progress" />
</template>
```

---

## Show Percentage

```vue
<ShProgress :value="75" label="Processing" :show-value="true" />
```

---

## Custom Max Value

```vue
<ShProgress :value="250" :max="500" label="Downloaded 250 of 500 MB" />
```

---

## Props

| **Prop**    | **Type** | **Default** | **Description**                    |
| ----------- | -------- | ----------- | ---------------------------------- |
| `value`     | number   | 0           | Current progress value             |
| `max`       | number   | 100         | Maximum value                      |
| `label`     | string   | undefined   | Descriptive label for the progress |
| `showValue` | boolean  | false       | Display percentage value           |

---

## Accessibility

ShProgress implements the ARIA progressbar pattern:

- **Role & ARIA Attributes**
  - Uses `role="progressbar"`
  - Sets `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
  - Provides `aria-valuetext` with percentage
- **Labeling**
  - Warns when no accessible label provided
  - Supports `label`, `aria-label`, and `aria-labelledby`
- **Value Validation**
  - Warns when value is out of 0-max range
  - Automatically clamps display to 0-100%

---

## Styling Hooks

#### Classes

- `.sh-progress` - Container
- `.sh-progress__header` - Header with label and value
- `.sh-progress__label` - Label text
- `.sh-progress__value` - Percentage display
- `.sh-progress__track` - Progress bar track
- `.sh-progress__indicator` - Filled portion of bar

Example:

```scss
.sh-progress__indicator {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
}
```

---

## When to Use ShProgress

- File uploads/downloads
- Multi-step processes
- Long-running operations
- Determinate loading states

**Don't use for:**

- Indeterminate loading → use ShSpinner
- Instant operations
- Multiple concurrent tasks → show multiple progress bars
