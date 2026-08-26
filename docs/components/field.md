# ShField

`ShField` centralizes the visible label, description, error, and shared form-control state. Compatible ShoeHorn controls consume its context automatically.

```vue
<ShField
  id="email"
  label="Email address"
  description="Used for account recovery"
  :error="emailError"
  required
>
  <ShInput v-model="email" name="email" type="email" autocomplete="email" />
</ShField>
```

The generated relationships are instance-safe: the label targets `email`, descriptions use `email-description`, and errors use `email-error`. Child controls merge these with consumer-provided `aria-describedby` IDs.

## Props

| Prop          | Type      | Default   | Purpose                               |
| ------------- | --------- | --------- | ------------------------------------- |
| `id`          | `string`  | generated | Native child control ID               |
| `label`       | `string`  | —         | Visible field label                   |
| `description` | `string`  | —         | Persistent guidance                   |
| `error`       | `string`  | —         | Validation feedback and invalid state |
| `required`    | `boolean` | `false`   | Shared required state                 |
| `optional`    | `boolean` | `false`   | Visible optional indicator            |
| `disabled`    | `boolean` | `false`   | Shared disabled state                 |

## Slots

- `default`: The control. Scoped values expose the generated attributes for custom controls.
- `label`, `description`, `error`: Custom content for each field region.

```vue
<ShField id="custom" label="Custom value" v-slot="control">
  <input v-bind="control" />
</ShField>
```

Do not set `required` and `optional` together. Keep error text specific and corrective. For a form-wide failure, applications should additionally provide an error summary and focus it intentionally.
