# ShForm

A lightweight form wrapper component that emits submit events and shares form metadata with child components.

---

## Usage, Options, and Requirements:

### Basic Form

```vue
<ShForm name="profile" @submit="handleSubmit">
  <ShLabel for="email">Email</ShLabel>
  <ShInput id="email" v-model="email" required />
  <ShButton type="submit">Save</ShButton>
</ShForm>
```

#### Acts as:

A polymorphic root element that defaults to a native `<form>` and re-emits submit events.

#### Optional Attributes:

##### As

`string`

- Controls which root element is rendered.
- Defaults to `form` if not specified.
- When left as `form`, native submit events are prevented and re-emitted.

Usage:

```vue
<ShForm as="section" name="account-settings">
  <slot />
</ShForm>
```

##### Name

`string`

- Shared with descendant components via provide/inject.
- Useful for form-level metadata.

Usage:

```vue
<ShForm name="billing-details">
  <slot />
</ShForm>
```

#### Requirements:

- Use a submit button when rendering as a real form with required fields.
- Listen for `@submit` in the parent if form submission needs custom handling.

---

### Polymorphic Root Example

```vue
<ShForm as="div" name="filters">
  <ShCheckbox v-model="onlyActive" label="Only active items" />
</ShForm>
```

- Useful when you want form-like grouping without native form semantics.
- `@submit` only applies when the rendered root actually emits submit events.

---

### Rule of Thumb:

- Use the default `<form>` root for actual form submission flows.
- Use `as` only when you explicitly need a different root element.
- Pair required inputs with a submit button.

---

## Events

| **Event** | **Payload** | **Description**                    |
| --------- | ----------- | ---------------------------------- |
| `submit`  | `Event`     | Emitted when the form is submitted |

Usage:

```vue
<ShForm @submit="handleSubmit">
  <ShButton type="submit">Submit</ShButton>
</ShForm>
```

---

## Styling Hooks

### Classes

- `.sh-form` — Applied to the root element always.

Example:

```scss
.sh-form {
  display: grid;
  gap: 1rem;
}
```

---

## Dev-time Warnings

ShForm warns during development if:

- The rendered root is a native form.
- The form contains required fields.
- No submit button is present.

Example:

```
[ShForm] Form has required fields but no submit button. Add a button with type="submit" for proper form submission.
```
