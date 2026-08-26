# ShSelect

An accessible select component with label, description, error, and focus support.

`ShSelect` can also consume label, description, error, required, disabled, and invalid state from `ShField`. Consumer attributes are forwarded to the native `<select>`, and all generated and consumer `aria-describedby` IDs are merged.

---

## Usage, Options, and Requirements:

### Basic Select

```vue
<ShSelect
  v-model="country"
  label="Country"
  :options="[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
  ]"
  placeholder="Choose a country"
/>
```

#### Acts as:

A native `<select>` element wrapped in a `<div>` with optional label, description, and error content.

#### Optional Attributes:

##### ModelValue

`string`

- Controlled selected value.
- Use with `v-model`.

Usage:

```vue
<ShSelect v-model="status" :options="statusOptions" />
```

##### Options

`{ value: string; label: string; disabled?: boolean }[]`

- Defines the selectable options.
- `disabled` prevents an individual option from being chosen.

Usage:

```vue
<ShSelect
  v-model="tier"
  :options="[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]"
/>
```

##### Placeholder

`string`

- Renders a disabled empty option at the top of the list.
- Useful when the user must choose from a list.

Usage:

```vue
<ShSelect v-model="assignee" :options="users" placeholder="Assign a user" />
```

##### Disabled

`true` | `false`

- Disables the select element.
- Defaults to `false` if not specified.

##### Required

`true` | `false`

- Marks the select as required.
- Defaults to `false` if not specified.

##### Name

`string`

- Native form field name for submission.

##### Id

`string`

- Custom ID for the select element.
- If omitted, a fallback ID is generated automatically.

##### Label

`string`

- Visible label text shown above the select.
- Recommended unless `aria-label` or `aria-labelledby` is provided.

##### Error

`string`

- Error message shown below the select.
- Sets `aria-invalid="true"` automatically.

##### Description

`string`

- Helper text shown below the select.
- Linked with `aria-describedby`.

#### Requirements:

- Must have an accessible name via `label`, `aria-label`, or `aria-labelledby`.
- Provide at least one option.
- Required selects should visually indicate the required state.

---

### Select with Error State

```vue
<ShSelect
  v-model="country"
  label="Country"
  :options="countryOptions"
  error="Please choose a country"
/>
```

- Error text is linked with `aria-describedby`.
- `data-state="invalid"` is applied for styling.

---

### Rule of Thumb:

- Use `placeholder` when selection should start empty.
- Use `description` for guidance and `error` for validation.
- Always provide a visible label in forms when possible.

---

## Events

| **Event**           | **Payload**       | **Description**                          |
| ------------------- | ----------------- | ---------------------------------------- |
| `update:modelValue` | `string`          | Emitted when the selected option changes |
| `change`            | `string`, `Event` | Emitted on native select change          |
| `focus`             | `FocusEvent`      | Emitted when the select receives focus   |
| `blur`              | `FocusEvent`      | Emitted when the select loses focus      |

Usage:

```vue
<ShSelect
  v-model="language"
  :options="languages"
  @change="handleLanguageChange"
/>
```

---

## Styling Hooks

### Classes

- `.sh-select` — Applied to the wrapper `<div>` always.
- `.sh-select__label` — Applied to the visible label.
- `.sh-select__control` — Applied to the `<select>` element.
- `.sh-select__description` — Applied to the helper text.
- `.sh-select__error` — Applied to the error message.

### Data Attributes

| **Attribute** | **Values**                        | **Description**               |
| ------------- | --------------------------------- | ----------------------------- |
| `data-state`  | `idle` \| `invalid` \| `disabled` | Applied to the select element |

Example:

```scss
.sh-select__control[data-state="invalid"] {
  border-color: #dc2626;
}

.sh-select__control[data-state="disabled"] {
  opacity: 0.6;
}
```

---

## Dev-time Warnings

ShSelect warns during development if:

- No `label`, `aria-label`, or `aria-labelledby` is provided.
- `options` is missing or empty.
- `required` is true but the visible `label` does not indicate that visually.

Example:

```
[ShSelect] Select has no options. Provide the `options` prop with at least one option.
```
