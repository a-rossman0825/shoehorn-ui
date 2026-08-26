# ShInput

`ShInput` wraps a native text-like input with controlled Vue state, accessible descriptions and errors, field context, and imperative focus methods.

```vue
<ShField
  id="email"
  label="Email address"
  description="Used for account recovery"
  :error="error"
  required
>
  <ShInput v-model="email" name="email" type="email" autocomplete="email" />
</ShField>
```

Standalone controls can use an external label:

```vue
<ShLabel for="search">Search</ShLabel>
<ShInput id="search" v-model="query" type="search" />
```

## Props

| Prop                                      | Type                                                | Default | Purpose                            |
| ----------------------------------------- | --------------------------------------------------- | ------- | ---------------------------------- |
| `type`                                    | `text \| email \| password \| search \| url \| tel` | `text`  | Native input type                  |
| `id`, `name`, `modelValue`, `placeholder` | `string`                                            | —       | Native/control state               |
| `disabled`, `readonly`, `required`        | `boolean`                                           | `false` | Native state                       |
| `error`, `description`                    | `string`                                            | —       | Associated validation and guidance |
| `minlength`, `maxlength`                  | `number`                                            | —       | Native length constraints          |
| `pattern`, `autocomplete`                 | `string`                                            | —       | Native input metadata              |

The component emits `update:modelValue`, `focus`, and `blur`; it exposes `focus()`, `blur()`, and `select()`.

Consumer attributes such as `aria-label`, `aria-labelledby`, `aria-describedby`, `inputmode`, and `data-*` are forwarded to the input. Consumer, field, description, and error IDs are merged in `aria-describedby`, so guidance remains available when an error appears. `aria-invalid` is emitted only for an invalid state.

Placeholder text is not an accessible name. Prefer `ShField` or `ShLabel`; reserve `aria-label` for cases where a visible label is not practical.
