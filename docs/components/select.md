# ShSelect

An accessible select/dropdown component using native HTML select.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const color = ref("");

const colorOptions = [
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "green", label: "Green" },
];
</script>

<template>
  <ShSelect
    v-model="color"
    :options="colorOptions"
    label="Choose color"
    placeholder="Select a color"
  />
</template>
```

---

## With Description and Error

```vue
<ShSelect
  v-model="size"
  :options="sizeOptions"
  label="Size"
  description="Choose your preferred size"
  :error="sizeError"
/>
```

---

## Props

| **Prop**      | **Type**       | **Default**    | **Description**                             |
| ------------- | -------------- | -------------- | ------------------------------------------- |
| `modelValue`  | string         | undefined      | Selected value                              |
| `options`     | SelectOption[] | []             | Array of select options                     |
| `placeholder` | string         | undefined      | Placeholder text (shown as disabled option) |
| `disabled`    | boolean        | false          | Disables the select                         |
| `required`    | boolean        | false          | Makes selection required                    |
| `name`        | string         | undefined      | Form field name                             |
| `id`          | string         | auto-generated | Select element ID                           |
| `label`       | string         | undefined      | Label text                                  |
| `error`       | string         | undefined      | Error message                               |
| `description` | string         | undefined      | Help text                                   |

### SelectOption Interface

```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

---

## Events

| **Event**           | **Payload**   | **Description**                        |
| ------------------- | ------------- | -------------------------------------- |
| `update:modelValue` | string        | Emitted when selection changes         |
| `change`            | string, Event | Emitted on change with value and event |
| `focus`             | FocusEvent    | Emitted when select receives focus     |
| `blur`              | FocusEvent    | Emitted when select loses focus        |

---

## Accessibility

ShSelect uses native HTML select for maximum accessibility:

- **Native Semantics**
  - Uses `<select>` element with full browser support
  - Native keyboard navigation (arrow keys, type-to-search)
  - Works with all assistive technologies
- **Labeling**
  - Automatically associates label with select
  - Warns if no accessible label provided
  - Supports `aria-label` and `aria-labelledby`
- **Error Handling**
  - Sets `aria-invalid` when error present
  - Associates error text via `aria-describedby`
  - Uses `role="alert"` for error announcements
- **Developer Warnings**
  - Warns when no label provided
  - Warns when no options provided
  - Warns when required without visual indicator

---

## Exposed Methods

```typescript
focus(): void   // Programmatically focus the select
blur(): void    // Programmatically blur the select
```

---

## Styling Hooks

#### Classes

- `.sh-select` - Container
- `.sh-select__label` - Label element
- `.sh-select__control` - Select element
- `.sh-select__description` - Description text
- `.sh-select__error` - Error message

#### Data Attributes

```html
data-state="idle | invalid | disabled"
```

Example:

```scss
.sh-select__control[data-state="invalid"] {
  border-color: red;
}
```

---

## When to Use ShSelect

- Single choice from many options (> 7)
- Limited space (options collapse when closed)
- Standard form fields
- Familiar pattern for users

**Don't use for:**

- Few options (< 7) → use ShRadioGroup
- Multiple selections → use checkboxes or multi-select
- Complex filtering/search → consider ShCombobox
- Actions/navigation → use ShButton or links
