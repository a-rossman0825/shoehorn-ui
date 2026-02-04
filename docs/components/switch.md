# ShSwitch

An accessible toggle switch component for on/off states.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const enabled = ref(false);
</script>

<template>
  <ShSwitch v-model="enabled" label="Enable notifications" />
</template>
```

---

## Props

| **Prop**     | **Type** | **Default**    | **Description**                           |
| ------------ | -------- | -------------- | ----------------------------------------- |
| `modelValue` | boolean  | false          | On/off state                              |
| `disabled`   | boolean  | false          | Disables interaction                      |
| `required`   | boolean  | false          | Makes switch required                     |
| `name`       | string   | undefined      | Form field name (creates hidden checkbox) |
| `value`      | string   | undefined      | Form field value                          |
| `id`         | string   | auto-generated | Switch button ID                          |
| `label`      | string   | undefined      | Associated label text                     |

---

## Events

| **Event**           | **Payload**    | **Description**                            |
| ------------------- | -------------- | ------------------------------------------ |
| `update:modelValue` | boolean        | Emitted when state changes                 |
| `change`            | boolean, Event | Emitted on change with new state and event |

---

## Accessibility

ShSwitch implements the ARIA switch pattern:

- **Role & Semantics**
  - Uses `role="switch"` on button element
  - Sets `aria-checked` to reflect current state
  - Proper label association
- **Keyboard Support**
  - Space key toggles switch
  - Enter key toggles switch
  - Full keyboard navigation
- **Form Integration**
  - Creates hidden checkbox when `name` provided
  - Syncs hidden input with switch state for form submission
- **Developer Warnings**
  - Warns when no accessible label provided
  - Warns when required without visual indicator

---

## Exposed Methods

```typescript
focus(): void   // Programmatically focus the switch
blur(): void    // Programmatically blur the switch
```

---

## Styling Hooks

#### Classes

- `.sh-switch` - Container
- `.sh-switch__control` - Switch button
- `.sh-switch__thumb` - Sliding thumb element
- `.sh-switch__label` - Label element

#### Data Attributes

```html
data-state="unchecked | checked | disabled"
```

Example:

```scss
.sh-switch__control[data-state="checked"] {
  background-color: green;
}

.sh-switch__thumb[data-state="checked"] {
  transform: translateX(100%);
}
```

---

## When to Use ShSwitch

- On/off settings that apply immediately
- Enable/disable features
- Toggle between two mutually exclusive states
- Preference settings

**Don't use for:**

- Forms requiring explicit submission → use ShCheckbox
- Multiple independent options → use ShCheckbox
- Single choice from many options → use ShRadioGroup
- Actions that require confirmation → use ShButton
