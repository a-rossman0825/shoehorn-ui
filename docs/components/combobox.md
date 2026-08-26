# ShCombobox

`ShCombobox` is an editable single-select combobox with a listbox popup. DOM focus remains on the input while `aria-activedescendant` identifies the active enabled option.

```vue
<ShCombobox
  v-model="city"
  name="city"
  label="City"
  description="Begin typing to filter"
  :options="cities"
/>
```

## Props

| Prop                   | Type                         | Default                   | Purpose                            |
| ---------------------- | ---------------------------- | ------------------------- | ---------------------------------- |
| `modelValue`           | `string \| number`           | —                         | Selected option value              |
| `options`              | `ComboboxOption[]`           | `[]`                      | Values, labels, and disabled state |
| `id`, `name`, `label`  | `string`                     | —                         | Control, form, and naming metadata |
| `description`, `error` | `string`                     | —                         | Guidance and validation feedback   |
| `placeholder`          | `string`                     | —                         | Input hint, never a label          |
| `disabled`, `required` | `boolean`                    | `false`                   | Control state                      |
| `autocomplete`         | `list \| both \| none`       | `list`                    | ARIA autocomplete behavior         |
| `filterFn`             | `(option, query) => boolean` | case-insensitive contains | Custom filtering                   |
| `noResultsText`        | `string`                     | `No results found`        | Localizable empty message          |

## Keyboard behavior

| Key                 | Behavior                                                          |
| ------------------- | ----------------------------------------------------------------- |
| ArrowDown / ArrowUp | Open and move through enabled filtered options                    |
| Home / End          | Move to the first or last enabled option while open               |
| Enter               | Select the active option                                          |
| Escape              | Close and restore the selected display value without moving focus |
| Tab                 | Close and continue normal focus navigation                        |

The component emits `update:modelValue`, `change`, `focus`, and `blur`, and exposes `focus()`, `blur()`, `open()`, and `close()`. When `name` is provided, a hidden input submits the selected value. Applications with remote results should manage loading and announcement text outside this synchronous option API.
