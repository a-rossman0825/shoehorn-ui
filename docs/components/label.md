# ShLabel

An accessible label component for form controls.

---

## Usage, Options, and Requirements:

### Basic Label

```vue
<ShLabel for="email">Email Address</ShLabel>
<ShInput id="email" />
```

#### Acts as:

A native `<label>` element that associates with a form control via the `for` attribute.

#### Optional Attributes:

##### Required

`true` | `false`

- Adds visual indicator (styling hook via `data-required`).
- Defaults to `false` if not specified.

Usage:

```vue
<ShLabel for="password" :required="true">Password</ShLabel>
<ShInput id="password" required />
```

##### SrOnly

`true` | `false`

- Hides label visually but keeps it in the accessibility tree.
- Useful when placeholder or other visual cues convey the input's purpose.
- Defaults to `false` if not specified.

Usage:

```vue
<!-- Label hidden visually, still accessible to screen readers -->
<ShLabel for="search" srOnly>Search users</ShLabel>
<ShInput id="search" placeholder="Search users..." />
```

##### HtmlFor

`string`

- Alternative to `for` prop (backward compatibility).
- Same as `for` — associates label with form control ID.
- `for` takes priority if both are provided.

Usage:

```vue
<ShLabel htmlFor="name">Name</ShLabel>
<ShInput id="name" />
```

#### Requirements:

- Slot content (visible text) required unless `srOnly` is true.
- Must reference a valid form control ID via `for` or `htmlFor`.

---

### Label with External Association

```vue
<ShLabel aria-label="Email Address">
  <ShInput aria-labelledby="external-label" />
</ShLabel>
```

- Use when label text is managed elsewhere in the DOM.
- Reference via `aria-labelledby` on the associated control.

---

### Rule of Thumb:

- Always pair with a form control (input, textarea, select, etc.).
- Use `for` to associate with the control's `id`.
- Use `srOnly` for screen-reader-only labels (e.g., with placeholder).
- Use `required` to visually mark required fields.

---

## Styling Hooks

### Classes

- `.sh-label` — Applied to the root element always.

### Data Attributes

| **Attribute**   | **Values** | **Description**                |
| --------------- | ---------- | ------------------------------ |
| `data-required` | `true`     | Present when `required` is set |

Example:

```scss
.sh-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.sh-label[data-required="true"]::after {
  content: " *";
  color: red;
}
```

---

## Dev-time Warnings

ShLabel warns during development if:

- No `for` attribute and no `aria-label` provided (label not associated with control).
- No visible text content and `srOnly` is false (inaccessible label).

Example:

```
[ShLabel] should have a `for` attribute to associate it with a form control.
Provide the `for` attribute with the ID of the associated form control.
```
