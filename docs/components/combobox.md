# ShCombobox

An accessible combobox component for filtering and selecting from a list of options.

---

## Usage, Options, and Requirements:

### Basic Combobox

```vue
<ShCombobox
  v-model="selectedFramework"
  :options="[
    { value: 'vue', label: 'Vue' },
    { value: 'react', label: 'React' },
    { value: 'svelte', label: 'Svelte' },
  ]"
  placeholder="Choose a framework"
/>
```

#### Acts as:

A text input with `role="combobox"` that opens a listbox of selectable options.

#### Optional Attributes:

##### ModelValue

`string` | `number`

- The selected option value.
- Use with `v-model`.
- Must match an option's `value` to display a selected label.

Usage:

```vue
<ShCombobox v-model="selectedUserId" :options="userOptions" />
```

##### Options

`{ value: string | number; label: string; disabled?: boolean }[]`

- List of options shown in the combobox.
- `disabled` options render but cannot be selected.
- Defaults to `[]` if not specified.

Usage:

```vue
<ShCombobox
  :options="[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]"
/>
```

##### Placeholder

`string`

- Placeholder text for the input when nothing is selected.

Usage:

```vue
<ShCombobox
  v-model="country"
  :options="countries"
  placeholder="Select a country"
/>
```

##### Disabled

`true` | `false`

- Disables the input and prevents opening or selecting.
- Defaults to `false` if not specified.

Usage:

```vue
<ShCombobox v-model="plan" :options="plans" disabled />
```

##### Autocomplete

`list` | `both` | `none`

- Sets the `aria-autocomplete` value.
- Defaults to `list` if not specified.

Usage:

```vue
<ShCombobox v-model="framework" :options="frameworks" autocomplete="both" />
```

##### FilterFn

`(option, query) => boolean`

- Custom filter function for matching options against user input.
- If omitted, filtering uses a case-insensitive label match.

Usage:

```vue
<ShCombobox
  v-model="product"
  :options="products"
  :filterFn="(option, query) => option.value.toString().startsWith(query)"
/>
```

#### Requirements:

- Provide at least one option.
- `modelValue` should match a valid option value.
- Provide external labeling where needed, since the component does not render its own label.

---

### Disabled Option Example

```vue
<ShCombobox
  v-model="tier"
  :options="[
    { value: 'starter', label: 'Starter' },
    { value: 'business', label: 'Business', disabled: true },
  ]"
/>
```

- Disabled options remain visible in the list.
- Disabled options cannot be selected.

---

### Rule of Thumb:

- Use `v-model` for the selected value, not for freeform text.
- Use `filterFn` only when default label filtering is not enough.
- Pair with a visible label or `aria-label` in real forms.

---

## Events

| **Event**           | **Payload**                         | **Description**                       |
| ------------------- | ----------------------------------- | ------------------------------------- |
| `update:modelValue` | `string` \| `number` \| `undefined` | Emitted when an option is selected    |
| `focus`             | `FocusEvent`                        | Emitted when the input receives focus |
| `blur`              | `FocusEvent`                        | Emitted when the input loses focus    |

Usage:

```vue
<ShCombobox v-model="status" :options="statusOptions" @focus="handleFocus" />
```

---

## Styling Hooks

### Classes

- `.sh-combobox` — Applied to the root wrapper always.
- `.sh-combobox__wrapper` — Applied to the input/icon wrapper.
- `.sh-combobox__input` — Applied to the text input.
- `.sh-combobox__icon` — Applied to the chevron icon.
- `.sh-combobox__icon--open` — Applied when the listbox is open.
- `.sh-combobox__listbox` — Applied to the listbox element.
- `.sh-combobox__option` — Applied to each option.
- `.sh-combobox__option--empty` — Applied to the empty-state option.
- `.sh-combobox__option--active` — Applied to the keyboard-highlighted option.
- `.sh-combobox__option--selected` — Applied to the selected option.
- `.sh-combobox__option--disabled` — Applied to disabled options.

Example:

```scss
.sh-combobox__option--active {
  background-color: #eff6ff;
}

.sh-combobox__option--selected {
  font-weight: 600;
}

.sh-combobox__option--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## Dev-time Warnings

ShCombobox warns during development if:

- `options` is missing or empty.
- `modelValue` does not match any option value.

Example:

```
[ShCombobox] Combobox has no options. Provide the `options` prop with at least one option.
```
