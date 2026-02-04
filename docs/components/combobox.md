# ShCombobox

An accessible autocomplete/combobox component with filtering.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";
import type { ComboboxOption } from "@shoehorn-ui/components";

const selected = ref();
const fruits: ComboboxOption[] = [
  { value: "1", label: "Apple" },
  { value: "2", label: "Banana" },
  { value: "3", label: "Cherry" },
  { value: "4", label: "Date" },
];
</script>

<template>
  <ShCombobox
    v-model="selected"
    :options="fruits"
    placeholder="Search fruits..."
  />
</template>
```

---

## With Disabled Options

```vue
<script setup lang="ts">
const options: ComboboxOption[] = [
  { value: "1", label: "Available" },
  { value: "2", label: "Out of Stock", disabled: true },
];
</script>

<template>
  <ShCombobox v-model="selected" :options="options" />
</template>
```

---

## Custom Filter Function

```vue
<script setup lang="ts">
const customFilter = (option: ComboboxOption, query: string) => {
  // Only match from start of label
  return option.label.toLowerCase().startsWith(query.toLowerCase());
};
</script>

<template>
  <ShCombobox v-model="selected" :options="options" :filter-fn="customFilter" />
</template>
```

---

## Props

| **Prop**       | **Type**                   | **Default** | **Description**        |
| -------------- | -------------------------- | ----------- | ---------------------- |
| `modelValue`   | string \| number           | undefined   | Selected value         |
| `options`      | ComboboxOption[]           | []          | Array of options       |
| `placeholder`  | string                     | undefined   | Placeholder text       |
| `disabled`     | boolean                    | false       | Disable the combobox   |
| `autocomplete` | 'list' \| 'both' \| 'none' | 'list'      | ARIA autocomplete type |
| `filterFn`     | Function                   | (default)   | Custom filter function |

### ComboboxOption Interface

```typescript
interface ComboboxOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
```

---

## Events

| **Event**           | **Payload**                   | **Description**                |
| ------------------- | ----------------------------- | ------------------------------ |
| `update:modelValue` | string \| number \| undefined | Emitted when selection changes |

---

## Exposed Methods

| **Method** | **Description** |
| ---------- | --------------- |
| `focus()`  | Focus the input |
| `blur()`   | Blur the input  |

---

## Accessibility

ShCombobox follows ARIA combobox pattern:

- **Combobox Role**
  - Input has `role="combobox"`
  - Listbox has `role="listbox"`
- **ARIA States**
  - `aria-expanded` indicates open state
  - `aria-autocomplete` describes behavior
  - `aria-activedescendant` tracks active option
- **Keyboard Navigation**
  - `Arrow Down/Up` - Navigate options
  - `Enter` - Select active option
  - `Escape` - Close listbox
  - `Home/End` - Jump to first/last option
- **Screen Reader Support**
  - Selected option announced
  - Filter results announced
  - "No results" message when empty

---

## Styling Hooks

#### Classes

- `.sh-combobox` - Container
- `.sh-combobox__wrapper` - Input wrapper
- `.sh-combobox__input` - Text input
- `.sh-combobox__icon` - Dropdown icon
- `.sh-combobox__icon--open` - Open state icon
- `.sh-combobox__listbox` - Options list
- `.sh-combobox__option` - Option item
- `.sh-combobox__option--active` - Keyboard-focused option
- `.sh-combobox__option--selected` - Selected option
- `.sh-combobox__option--disabled` - Disabled option
- `.sh-combobox__option--empty` - No results message

---

## When to Use ShCombobox

- Searchable dropdowns
- Autocomplete fields
- Large option lists
- Type-ahead functionality

**Don't use for:**

- Small lists (< 10 items) → use ShSelect
- Multi-select → build custom with ShCheckbox
- Free text input → use ShInput
