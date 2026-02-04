# ShAccordion

An accessible accordion component for collapsible content sections.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const openItems = ref(["faq1"]);

const items = [
  { id: "faq1", title: "What is this?" },
  { id: "faq2", title: "How does it work?" },
  { id: "faq3", title: "Is it free?" },
];
</script>

<template>
  <ShAccordion v-model="openItems" :items="items">
    <template #faq1>
      <p>This is an accordion component.</p>
    </template>
    <template #faq2>
      <p>Click to expand/collapse sections.</p>
    </template>
    <template #faq3>
      <p>Yes, it's open source!</p>
    </template>
  </ShAccordion>
</template>
```

---

## Multiple Open Items

```vue
<ShAccordion v-model="openItems" :items="items" :multiple="true" />
```

---

## Props

| **Prop**     | **Type**        | **Default** | **Description**           |
| ------------ | --------------- | ----------- | ------------------------- |
| `modelValue` | string[]        | []          | Array of open item IDs    |
| `items`      | AccordionItem[] | []          | Array of accordion items  |
| `multiple`   | boolean         | false       | Allow multiple items open |

### AccordionItem Interface

```typescript
interface AccordionItem {
  id: string;
  title: string;
  disabled?: boolean;
}
```

---

## Events

| **Event**           | **Payload** | **Description**                |
| ------------------- | ----------- | ------------------------------ |
| `update:modelValue` | string[]    | Emitted when open items change |

---

## Accessibility

ShAccordion implements accessible disclosure pattern:

- **ARIA Attributes**
  - `aria-expanded` indicates open/closed state
  - `aria-controls` links trigger to content
  - `role="region"` for content areas
- **Keyboard Support**
  - Click or Enter/Space to toggle
  - Focus management
- **Semantic HTML**
  - Uses `<h3>` for item headers
  - Proper button elements for triggers

---

## Styling Hooks

#### Classes

- `.sh-accordion` - Container
- `.sh-accordion__item` - Individual item
- `.sh-accordion__header` - Item header
- `.sh-accordion__trigger` - Trigger button
- `.sh-accordion__icon` - Expand/collapse icon
- `.sh-accordion__content` - Content region
- `.sh-accordion__body` - Content wrapper

#### Data Attributes

```html
data-state="open | closed"
```

---

## When to Use ShAccordion

- FAQs
- Progressive disclosure
- Collapsible sections
- Space-constrained layouts
