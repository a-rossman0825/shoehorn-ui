# ShRadioGroup

An accessible radio group component for choosing one option from a list.

---

## Usage, Options, and Requirements:

### Basic Radio Group

```vue
<ShRadioGroup
  v-model="selectedPlan"
  label="Choose a plan"
  :options="[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ]"
/>
```

#### Acts as:

A wrapper `<div role="radiogroup">` that renders a radio input and label for each option.

#### Optional Attributes:

##### ModelValue

`string`

- Controlled selected value.
- Use with `v-model`.

Usage:

```vue
<ShRadioGroup v-model="shippingSpeed" :options="shippingOptions" />
```

##### Name

`string`

- Native radio group name.
- If omitted, a generated fallback name is used.

Usage:

```vue
<ShRadioGroup v-model="theme" name="theme" :options="themeOptions" />
```

##### Options

`{ value: string; label: string; disabled?: boolean }[]`

- Defines the radios to render.
- `disabled` prevents the individual option from being selected.

Usage:

```vue
<ShRadioGroup
  v-model="size"
  :options="[
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large', disabled: true },
  ]"
/>
```

##### Disabled

`true` | `false`

- Disables the entire radio group.
- Defaults to `false` if not specified.

Usage:

```vue
<ShRadioGroup v-model="status" :options="statusOptions" disabled />
```

##### Required

`true` | `false`

- Marks the radio group as required.
- Defaults to `false` if not specified.

Usage:

```vue
<ShRadioGroup
  v-model="consent"
  label="Choose one *"
  :options="consentOptions"
  required
/>
```

##### Orientation

`horizontal` | `vertical`

- Controls layout intent through data attributes.
- Defaults to `vertical` if not specified.

Usage:

```vue
<ShRadioGroup v-model="view" :options="viewOptions" orientation="horizontal" />
```

##### Label

`string`

- Visible group label.
- Recommended for accessibility unless `aria-label` or `aria-labelledby` is provided.

Usage:

```vue
<ShRadioGroup
  v-model="contactMethod"
  label="Preferred contact method"
  :options="contactOptions"
/>
```

#### Requirements:

- Must have an accessible name via `label`, `aria-label`, or `aria-labelledby`.
- Provide at least one option.
- Required groups should visually indicate that they are required.

---

### Horizontal Radio Group

```vue
<ShRadioGroup
  v-model="alignment"
  label="Text alignment"
  orientation="horizontal"
  :options="[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ]"
/>
```

- Arrow keys move between enabled options.
- Layout can be styled via `data-orientation`.

---

### Rule of Thumb:

- Use radio groups when exactly one choice must be selected.
- Set a sensible default `modelValue` when possible.
- Provide a clear group-level label.

---

## Events

| **Event**           | **Payload**       | **Description**                         |
| ------------------- | ----------------- | --------------------------------------- |
| `update:modelValue` | `string`          | Emitted when the selected value changes |
| `change`            | `string`, `Event` | Emitted when a radio option changes     |

Usage:

```vue
<ShRadioGroup v-model="plan" :options="plans" @change="handlePlanChange" />
```

---

## Styling Hooks

### Classes

- `.sh-radio-group` — Applied to the root element always.
- `.sh-radio-group__label` — Applied to the group label.
- `.sh-radio-group__options` — Applied to the options wrapper.
- `.sh-radio-group__option` — Applied to each option wrapper.
- `.sh-radio-group__input` — Applied to each radio input.
- `.sh-radio-group__option-label` — Applied to each radio label.

### Data Attributes

| **Attribute**      | **Values**                 | **Description**                         |
| ------------------ | -------------------------- | --------------------------------------- |
| `data-orientation` | `horizontal` \| `vertical` | Applied to the root and options wrapper |

Example:

```scss
.sh-radio-group[data-orientation="horizontal"] .sh-radio-group__options {
  display: flex;
  gap: 1rem;
}
```

---

## Dev-time Warnings

ShRadioGroup warns during development if:

- No `label`, `aria-label`, or `aria-labelledby` is provided.
- `options` is missing or empty.
- `required` is true but the visible `label` does not indicate that visually.
- Options exist but no default `modelValue` is selected.

Example:

```
[ShRadioGroup] Radio group has no options. Provide the `options` prop with at least one radio option.
```
