# ShRadioGroup

An accessible radio button group component with full keyboard navigation.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const size = ref("medium");

const sizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
];
</script>

<template>
  <ShRadioGroup v-model="size" :options="sizeOptions" label="Choose size" />
</template>
```

---

## Horizontal Orientation

```vue
<ShRadioGroup
  v-model="size"
  :options="sizeOptions"
  label="Choose size"
  orientation="horizontal"
/>
```

---

## Disabled Options

```vue
<script setup lang="ts">
const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2", disabled: true },
  { value: "option3", label: "Option 3" },
];
</script>

<template>
  <ShRadioGroup v-model="selected" :options="options" label="Choose option" />
</template>
```

---

## Props

| **Prop**      | **Type**                       | **Default**    | **Description**          |
| ------------- | ------------------------------ | -------------- | ------------------------ |
| `modelValue`  | string                         | undefined      | Selected value           |
| `options`     | RadioOption[]                  | []             | Array of radio options   |
| `name`        | string                         | auto-generated | Form field name          |
| `disabled`    | boolean                        | false          | Disables entire group    |
| `required`    | boolean                        | false          | Makes selection required |
| `orientation` | 'horizontal' &#124; 'vertical' | 'vertical'     | Layout direction         |
| `label`       | string                         | undefined      | Group label              |

### RadioOption Interface

```typescript
interface RadioOption {
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

---

## Accessibility

ShRadioGroup implements the ARIA radio group pattern:

- **Role & Semantics**
  - Uses `role="radiogroup"` for proper screen reader announcement
  - Each option is a native radio input
  - Proper label association
- **Keyboard Navigation**
  - Arrow Up/Down or Left/Right to navigate options
  - Automatically wraps around at ends
  - Skips disabled options
  - First radio is focusable, others are `tabindex="-1"`
- **ARIA Attributes**
  - `aria-required` when required
  - `aria-disabled` when disabled
  - `aria-labelledby` or `aria-label` for group label
- **Developer Warnings**
  - Warns when no accessible label provided
  - Warns when no options provided
  - Warns when required without visual indicator
  - Warns when no default value selected

---

## Styling Hooks

#### Classes

- `.sh-radio-group` - Container
- `.sh-radio-group__label` - Group label (legend)
- `.sh-radio-group__options` - Options container
- `.sh-radio-group__option` - Individual option wrapper
- `.sh-radio-group__input` - Radio input
- `.sh-radio-group__option-label` - Option label

#### Data Attributes

```html
data-orientation="vertical | horizontal"
```

Example:

```scss
.sh-radio-group__options[data-orientation="horizontal"] {
  flex-direction: row;
  gap: 2rem;
}
```

---

## When to Use ShRadioGroup

- Single choice from multiple options
- Mutually exclusive selections
- All options should be visible at once (< 7 options typically)
- User must make a choice

**Don't use for:**

- Multiple selections → use ShCheckbox
- Many options (> 7) → consider ShSelect
- Binary on/off → consider ShSwitch or ShCheckbox
