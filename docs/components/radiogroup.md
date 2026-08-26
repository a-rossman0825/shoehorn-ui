# ShRadioGroup

`ShRadioGroup` renders a native `<fieldset>`, `<legend>`, and same-name radio inputs. Native browser arrow-key, Tab, validation, and form behavior are preserved.

```vue
<ShRadioGroup
  v-model="plan"
  name="plan"
  label="Subscription plan"
  :options="[
    { value: 'free', label: 'Free' },
    { value: 'pro', label: 'Pro' },
  ]"
  required
/>
```

## Props

| Prop          | Type                     | Default    | Purpose                            |
| ------------- | ------------------------ | ---------- | ---------------------------------- |
| `modelValue`  | `string`                 | —          | Selected value                     |
| `name`        | `string`                 | generated  | Shared native radio name           |
| `options`     | `RadioOption[]`          | `[]`       | Values, labels, and disabled state |
| `label`       | `string`                 | —          | Fieldset legend                    |
| `orientation` | `horizontal \| vertical` | `vertical` | Visual layout hook                 |
| `disabled`    | `boolean`                | `false`    | Disables the fieldset              |
| `required`    | `boolean`                | `false`    | Requires one selection             |

The component emits `update:modelValue` and `change`. Do not force a default selection when “no answer” is a meaningful initial state. Each option label must clearly distinguish its choice.
