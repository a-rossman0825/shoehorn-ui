# ShSwitch

`ShSwitch` is a native checkbox exposed with switch semantics. It submits, validates, resets, and responds to Space like a native form control.

```vue
<ShSwitch
  v-model="notifications"
  name="notifications"
  label="Email notifications"
/>
```

## Props

| Prop         | Type      | Default   | Purpose                 |
| ------------ | --------- | --------- | ----------------------- |
| `modelValue` | `boolean` | `false`   | Checked state           |
| `id`         | `string`  | generated | Control ID              |
| `label`      | `string`  | —         | Visible accessible name |
| `name`       | `string`  | —         | Form field name         |
| `value`      | `string`  | `on`      | Submitted checked value |
| `disabled`   | `boolean` | `false`   | Native disabled state   |
| `required`   | `boolean` | `false`   | Native required state   |

It emits `update:modelValue`, `change`, `focus`, and `blur`, and exposes `focus()` and `blur()`. The actual checkbox receives consumer attributes. The visual track is `.sh-switch__control`; state is exposed through `data-state`.

Use a checkbox when the choice belongs to a multi-select group or represents agreement. Use a switch for an immediately applied on/off setting.
