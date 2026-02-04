# ShCheckbox

An accessible checkbox component with indeterminate state support.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const agreed = ref(false);
</script>

<template>
  <ShCheckbox v-model="agreed" label="I agree to the terms" />
</template>
```

---

## Indeterminate State

```vue
<script setup lang="ts">
import { ref } from "vue";

const selectAll = ref(false);
const indeterminate = ref(true);
</script>

<template>
  <ShCheckbox
    v-model="selectAll"
    :indeterminate="indeterminate"
    label="Select all"
  />
</template>
```

---

## Props

| **Prop**        | **Type** | **Default**    | **Description**           |
| --------------- | -------- | -------------- | ------------------------- |
| `modelValue`    | boolean  | false          | Checked state             |
| `indeterminate` | boolean  | false          | Indeterminate/mixed state |
| `disabled`      | boolean  | false          | Disables interaction      |
| `required`      | boolean  | false          | Makes checkbox required   |
| `name`          | string   | undefined      | Form field name           |
| `value`         | string   | undefined      | Form field value          |
| `id`            | string   | auto-generated | Input element ID          |
| `label`         | string   | undefined      | Associated label text     |

---

## Events

| **Event**              | **Payload** | **Description**                       |
| ---------------------- | ----------- | ------------------------------------- |
| `update:modelValue`    | boolean     | Emitted when checked state changes    |
| `update:indeterminate` | boolean     | Emitted when indeterminate is cleared |
| `change`               | Event       | Native change event                   |

---

## Accessibility

ShCheckbox enforces strong accessibility guarantees:

- **Labeling**
  - Automatically associates `<label>` with checkbox
  - Warns in development if no accessible label is present
  - Supports `aria-label` and `aria-labelledby`
- **ARIA States**
  - Sets `aria-checked="mixed"` for indeterminate state
  - Proper checked/unchecked states
- **Keyboard Support**
  - Space key toggles checkbox
  - Full keyboard navigation support
- **Required Fields**
  - Warns when required without visual indicator in label

---

## Exposed Methods

```typescript
focus(): void   // Programmatically focus the checkbox
blur(): void    // Programmatically blur the checkbox
```

---

## Styling Hooks

#### Classes

- `.sh-checkbox` - Container
- `.sh-checkbox__input` - Checkbox input
- `.sh-checkbox__label` - Label element

#### Data Attributes

```html
data-state="unchecked | checked | indeterminate | disabled"
```

Example:

```scss
.sh-checkbox__input[data-state="indeterminate"] {
  /* Custom indeterminate styles */
}
```

---

## When to Use ShCheckbox

- Multi-select options
- Toggle settings on/off
- Agree to terms/conditions
- Select all functionality (with indeterminate)

**Don't use for:**

- Single choice from multiple options → use ShRadio
- On/off states that apply immediately → consider ShSwitch
