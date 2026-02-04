# ShPagination

An accessible pagination component with smart ellipsis handling.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const currentPage = ref(1);
</script>

<template>
  <ShPagination v-model="currentPage" :total="500" :per-page="10" />
</template>
```

---

## Without First/Last Buttons

```vue
<ShPagination v-model="currentPage" :total="500" :show-first-last="false" />
```

---

## Custom Max Visible

```vue
<ShPagination v-model="currentPage" :total="500" :max-visible="5" />
```

---

## Props

| **Prop**        | **Type** | **Default** | **Description**              |
| --------------- | -------- | ----------- | ---------------------------- |
| `modelValue`    | number   | (required)  | Current page (1-indexed)     |
| `total`         | number   | (required)  | Total number of items        |
| `perPage`       | number   | 10          | Items per page               |
| `showFirstLast` | boolean  | true        | Show first/last page buttons |
| `maxVisible`    | number   | 7           | Maximum visible page buttons |

---

## Events

| **Event**           | **Payload** | **Description**           |
| ------------------- | ----------- | ------------------------- |
| `update:modelValue` | number      | Emitted when page changes |

---

## Accessibility

ShPagination follows accessibility best practices:

- **Landmark Navigation**
  - Uses `<nav>` with `aria-label="Pagination"`
- **Current Page**
  - Sets `aria-current="page"` on current page button
- **Button Labels**
  - Each button has descriptive `aria-label`
  - Example: "Go to page 5"
- **Disabled States**
  - Previous/First disabled on page 1
  - Next/Last disabled on last page
- **Keyboard Navigation**
  - Full keyboard support via native buttons
  - Tab navigation works as expected

---

## Styling Hooks

#### Classes

- `.sh-pagination` - Nav container
- `.sh-pagination__list` - Button list
- `.sh-pagination__item` - List item
- `.sh-pagination__button` - Page button
- `.sh-pagination__button--current` - Current page button
- `.sh-pagination__ellipsis` - Ellipsis indicator

---

## When to Use ShPagination

- Long lists of items
- Table data with many rows
- Search results
- Product listings

**Don't use for:**

- Infinite scroll → use virtual scroll
- Small datasets (< 20 items) → show all
- Sequential processes → use stepper
