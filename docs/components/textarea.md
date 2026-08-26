# ShTextarea

An accessible textarea component with label, description, error, resize, and focus support.

`ShTextarea` can also consume label, description, error, required, disabled, and invalid state from `ShField`. Consumer attributes are forwarded to the native `<textarea>`, and all generated and consumer `aria-describedby` IDs are merged.

---

## Usage, Options, and Requirements:

### Basic Textarea

```vue
<ShTextarea v-model="bio" label="Bio" placeholder="Tell us about yourself" />
```

#### Acts as:

A native `<textarea>` wrapped in a `<div>` with optional label, description, and error content.

#### Optional Attributes:

##### ModelValue

`string`

- Controlled textarea value.
- Use with `v-model`.

##### Id

`string`

- Custom ID for the textarea element.
- If omitted, a fallback ID is generated automatically.

##### Name

`string`

- Native form field name.

##### Disabled

`true` | `false`

- Disables the textarea.
- Defaults to `false` if not specified.

##### Readonly

`true` | `false`

- Allows focus and selection but prevents editing.
- Defaults to `false` if not specified.

##### Required

`true` | `false`

- Marks the textarea as required.
- Defaults to `false` if not specified.

##### Placeholder

`string`

- Placeholder text shown when the textarea is empty.

##### Minlength

`number`

- Native `minlength` attribute.

##### Maxlength

`number`

- Native `maxlength` attribute.

##### Rows

`number`

- Sets the visible row count.
- Defaults to `4` if not specified.

##### Cols

`number`

- Sets the native column count.

##### Resize

`none` | `both` | `horizontal` | `vertical`

- Styling hook that indicates intended resize behavior.
- Defaults to `vertical` if not specified.

##### Label

`string`

- Visible label text shown above the textarea.
- Recommended unless `aria-label` or `aria-labelledby` is provided.

##### Error

`string`

- Error message shown below the textarea.
- Sets `aria-invalid="true"` automatically.

##### Description

`string`

- Helper text shown below the textarea.
- Linked with `aria-describedby`.

Usage:

```vue
<ShTextarea
  v-model="notes"
  label="Notes"
  description="Maximum 500 characters"
  :maxlength="500"
/>
```

#### Requirements:

- Must have an accessible name via `label`, `aria-label`, or `aria-labelledby`.
- Required textareas should visually indicate the required state.

---

### Textarea with Error State

```vue
<ShTextarea v-model="message" label="Message" error="Message is required" />
```

- Error text is linked with `aria-describedby`.
- `data-state="invalid"` is applied for styling.

---

### Rule of Thumb:

- Use `description` for guidance and `error` for validation.
- Use `resize` as a styling hook in CSS.
- Always provide a visible label in forms when possible.

---

## Events

| **Event**           | **Payload**  | **Description**                          |
| ------------------- | ------------ | ---------------------------------------- |
| `update:modelValue` | `string`     | Emitted when the textarea value changes  |
| `focus`             | `FocusEvent` | Emitted when the textarea receives focus |
| `blur`              | `FocusEvent` | Emitted when the textarea loses focus    |

Usage:

```vue
<ShTextarea v-model="comments" label="Comments" @blur="validateComments" />
```

---

## Styling Hooks

### Classes

- `.sh-textarea` — Applied to the wrapper `<div>` always.
- `.sh-textarea__label` — Applied to the visible label.
- `.sh-textarea__control` — Applied to the `<textarea>` element.
- `.sh-textarea__description` — Applied to the helper text.
- `.sh-textarea__error` — Applied to the error message.

### Data Attributes

| **Attribute** | **Values**                                     | **Description**                 |
| ------------- | ---------------------------------------------- | ------------------------------- |
| `data-state`  | `idle` \| `focused` \| `invalid` \| `disabled` | Applied to the textarea element |
| `data-resize` | `none` \| `both` \| `horizontal` \| `vertical` | Applied to the textarea element |

Example:

```scss
.sh-textarea__control[data-state="focused"] {
  outline: 2px solid #3b82f6;
}

.sh-textarea__control[data-state="invalid"] {
  border-color: #dc2626;
}

.sh-textarea__control[data-resize="none"] {
  resize: none;
}
```

---

## Dev-time Warnings

ShTextarea warns during development if:

- No `label`, `aria-label`, or `aria-labelledby` is provided.
- `required` is true but the visible `label` does not indicate that visually.

Example:

```
[ShTextarea] Textarea has no accessible label. Provide `label`, `aria-label`, or `aria-labelledby`.
```
