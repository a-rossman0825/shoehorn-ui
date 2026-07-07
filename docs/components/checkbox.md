# ShCheckbox

An accessible checkbox component with checked, indeterminate, and focus states.

---

## Usage, Options, and Requirements:

### Basic Checkbox

```vue
<ShCheckbox v-model="acceptedTerms" label="Accept terms and conditions" />
```

#### Acts as:

A native `<input type="checkbox">` paired with an optional label.

#### Optional Attributes:

##### ModelValue

`true` | `false`

- Controlled checked state.
- Defaults to `false` if not specified.
- Use with `v-model`.

Usage:

```vue
<ShCheckbox v-model="newsletter" label="Subscribe to newsletter" />
```

##### Indeterminate

`true` | `false`

- Sets the checkbox into the mixed state.
- Defaults to `false` if not specified.
- When the user changes the checkbox, `indeterminate` is cleared automatically.

Usage:

```vue
<ShCheckbox
  v-model="selectedAll"
  :indeterminate="partiallySelected"
  label="Select all"
/>
```

##### Disabled

`true` | `false`

- Disables the checkbox and prevents interaction.
- Defaults to `false` if not specified.

Usage:

```vue
<ShCheckbox v-model="enabled" disabled label="Feature unavailable" />
```

##### Required

`true` | `false`

- Marks the checkbox as required.
- Defaults to `false` if not specified.

Usage:

```vue
<ShCheckbox v-model="acceptedTerms" required label="Accept terms *" />
```

##### Name

`string`

- Form field name for submission.
- Useful when the checkbox is part of a native form.

Usage:

```vue
<ShCheckbox v-model="acceptedTerms" name="terms" label="Accept terms" />
```

##### Value

`string`

- Native checkbox `value` attribute.
- Used during form submission.

Usage:

```vue
<ShCheckbox
  v-model="selected"
  name="preferences"
  value="email"
  label="Email alerts"
/>
```

##### Id

`string`

- Custom ID for the checkbox input.
- If omitted, a fallback ID is generated automatically.

Usage:

```vue
<ShCheckbox
  id="marketing-consent"
  v-model="consent"
  label="Marketing consent"
/>
```

##### Label

`string`

- Visible text label for the checkbox.
- Recommended for accessibility unless `aria-label` or `aria-labelledby` is provided.

Usage:

```vue
<ShCheckbox v-model="updates" label="Email me product updates" />
```

#### Requirements:

- Must have an accessible name via `label`, `aria-label`, or `aria-labelledby`.
- Required checkboxes should also have a visible required indicator in the label text.

---

### Indeterminate Checkbox

```vue
<ShCheckbox
  v-model="allSelected"
  :indeterminate="someSelected && !allSelected"
  label="Select all items"
/>
```

- Uses `aria-checked="mixed"` when indeterminate.
- Clears the indeterminate state after user interaction.

---

### Rule of Thumb:

- Use `v-model` for checked state.
- Use `indeterminate` for partial-selection patterns like “Select all”.
- Always provide a visible label unless naming comes from elsewhere.

---

## Events

| **Event**              | **Payload**  | **Description**                                     |
| ---------------------- | ------------ | --------------------------------------------------- |
| `update:modelValue`    | `boolean`    | Emitted when the checked state changes              |
| `update:indeterminate` | `boolean`    | Emitted when the mixed state is cleared             |
| `change`               | `Event`      | Emitted when the native checkbox change event fires |
| `focus`                | `FocusEvent` | Emitted when the checkbox receives focus            |
| `blur`                 | `FocusEvent` | Emitted when the checkbox loses focus               |

Usage:

```vue
<ShCheckbox
  v-model="checked"
  :indeterminate="indeterminate"
  @update:indeterminate="indeterminate = $event"
  @change="handleChange"
/>
```

---

## Styling Hooks

### Classes

- `.sh-checkbox` — Applied to the wrapper `<div>` always.
- `.sh-checkbox__input` — Applied to the checkbox input.
- `.sh-checkbox__label` — Applied to the visible label.

### Data Attributes

| **Attribute** | **Values**                                                | **Description**               |
| ------------- | --------------------------------------------------------- | ----------------------------- |
| `data-state`  | `unchecked` \| `checked` \| `indeterminate` \| `disabled` | Applied to the checkbox input |

Example:

```scss
.sh-checkbox__input[data-state="checked"] {
  accent-color: #2563eb;
}

.sh-checkbox__input[data-state="indeterminate"] {
  accent-color: #d97706;
}

.sh-checkbox__input[data-state="disabled"] + .sh-checkbox__label {
  opacity: 0.6;
}
```

---

## Dev-time Warnings

ShCheckbox warns during development if:

- No `label`, `aria-label`, or `aria-labelledby` is provided.
- `required` is true but the visible `label` does not indicate that visually.

Example:

```
[ShCheckbox] Checkbox has no accessible label. Provide `label`, `aria-label`, or `aria-labelledby`.
```
