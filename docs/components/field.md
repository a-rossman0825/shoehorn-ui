# ShField

A field wrapper component intended for form labeling, description, and error wiring.

---

## Usage, Options, and Requirements:

### Current Status

```vue
<ShField
  label="Email"
  for="email"
  description="We will never share your email."
  error="Email is required"
/>
```

#### Acts as:

A placeholder setup component that currently does not render any markup.

#### Optional Attributes:

##### Label

`string`

- Intended to provide the field label text.
- Recommended for accessibility.

##### For

`string`

- Intended to associate the field with a form control ID.
- Also used internally to derive description and error IDs.

##### Error

`string`

- Intended to describe validation problems for the field.

##### Description

`string`

- Intended to provide helper text for the field.

##### Required

`true` | `false`

- Intended to mark the field as required.

##### Optional

`true` | `false`

- Intended to mark the field as optional.

#### Requirements:

- Provide either a `label` prop or label slot for accessibility.
- Do not set both `required` and `optional` at the same time.

---

### Rule of Thumb:

- Treat ShField as work-in-progress until it renders actual markup.
- Prefer `ShLabel`, `ShInput`, `ShSelect`, and `ShTextarea` directly for now.

---

## Styling Hooks

ShField does not currently render DOM output, so there are no styling hooks yet.

---

## Dev-time Warnings

ShField warns during development if:

- No `label` prop and no `label` slot are provided.
- Both `required` and `optional` are set at the same time.

Example:

```
[ShField] Field has both `required` and `optional` props set. Only one should be used.
```
