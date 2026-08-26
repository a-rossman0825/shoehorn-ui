# ShForm

`ShForm` is a minimal native form wrapper. Native submission is preserved by default.

```vue
<ShForm @submit="save">
  <ShField id="name" label="Name" required>
    <ShInput name="name" />
  </ShField>
  <ShButton type="submit">Save</ShButton>
</ShForm>
```

## Props

| Prop             | Type          | Default | Purpose                                   |
| ---------------- | ------------- | ------- | ----------------------------------------- |
| `as`             | `form \| div` | `form`  | Rendered wrapper                          |
| `preventDefault` | `boolean`     | `false` | Prevent native submission before emitting |

## Events and exposed values

- `submit(SubmitEvent)` is emitted for native form submissions.
- `element` exposes the underlying element ref.

Use `preventDefault` for client-managed submission. Leave it false for normal navigation or when another form handler controls cancellation. When `as="div"`, the wrapper has no native form semantics or submission behavior.
