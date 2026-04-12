# ShButton

An accessible, polymorphic button component.

---

## Usage, Options, and Requirements:

### Standard Text Button

```vue
<ShButton>Click Me</ShButton>
```

#### Optional attributes:

##### Type

`button` | `submit` | `reset`

- `button` acts as default button tag.
- `submit` Submits the form the button lives in via native HTML behavior.
- `reset` acts as form reset button (clears fields).
- defaults to `button` if not specified.

Usage:

```vue
<ShButton type="submit">Submit</ShButton>
```

##### Disabled

`true` | `false`

- activates "disabled" style/attrs
- defaults to `false` if not specified.

Usage:

```vue
<ShButton disabled>Click Me</ShButton>
```

##### Variant

`default` | `primary` | `ghost`

- acts as data-variant target for custom css.
- no base css implemented.
- defaults to `default` if not specified.

Usage:

```vue
<ShButton variant="primary">Call to Action</ShButton>
```

##### Size

`sm` | `md` | `lg`

- acts as data-size target for custom css.
- no base css implemented.
- defaults to `md` if not specified.

Usage:

```vue
<ShButton size="lg">Big Button</ShButton>
```

#### Requirements:

- Only requirement is text label within tag (or else aria-attrs are invalid).

---

### Anchor-Style Button (with text)

```vue
<ShButton as="a" href="/settings">Settings</ShButton>
```

#### Acts as:

```vue
<a href="/settings">Settings</a>
```

#### Optional Attributes:

##### Disabled

`true` | `false`

- activates `disabled` style/attrs
- defaults to `false` if not specified.

Usage:

```vue
<ShButton as="a" href="/settings" disabled>Settings</ShButton>
```

##### Variants

`default` | `primary` | `ghost`

- acts as data-variant target for custom css.
- no base css implemented.
- defaults to `default` if not specified.

Usage:

```vue
<ShButton as="a" href="/settings" variant="primary">Settings</ShButton>
```

##### Size

`sm` | `md` | `lg`

- acts as data-size target for custom css.
- no base css implemented.
- defaults to `md` if not specified.

Usage:

```vue
<ShButton as="a" href="/settings" size="lg">Settings</ShButton>
```

#### Requirements:

- No `label` needed if visible text exists

---

### Icon-Only Button

Usage:

```vue
<ShButton iconOnly label="Delete Item">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

##### Must Pass:

- `iconOnly`
- `label` (or `aria-label` / `aria-labelledby`)

#### Optional Attributes:

##### Type

`button` | `submit` | `reset`

- `button` acts as default button tag.
- `submit` Submits the form the button lives in via native HTML behavior.
- `reset` acts as form reset button (clears fields).
- defaults to `button` if not specified.

Usage:

```vue
<ShButton iconOnly type="submit" label="Delete Item">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

##### Disabled

`true` | `false`

- activates "disabled" style/attrs
- defaults to `false` if not specified.

Usage:

```vue
<ShButton iconOnly disabled label="Delete Item">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

##### Variant

`default` | `primary` | `ghost`

- acts as data-variant target for custom css.
- no base css implemented.
- defaults to `default` if not specified.

Usage:

```vue
<ShButton iconOnly variant="primary" label="Delete Item">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

##### Size

`sm` | `md` | `lg`

- acts as data-size target for custom css.
- no base css implemented.
- defaults to `md` if not specified.

Usage:

```vue
<ShButton iconOnly size="lg" label="Delete Item">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

---

### Icon-Only Anchor

Usage:

```vue
<ShButton as="a" href="/delete" iconOnly label="Delete Item">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

#### Requirements:

Must pass:

- `as="a"`
- `href`
- `iconOnly`
- `label` (or `aria-label` / `aria-labelledby`)

#### Optional Attributes:

##### Disabled

`true` | `false`

- activates "disabled" style/attrs
- defaults to `false` if not specified.

Usage:

```vue
<ShButton as="a" href="/settings" iconOnly disabled label="Settings">
  <i class="mdi mdi-gear"></i>
</ShButton>
```

##### Variant

`default` | `primary` | `ghost`

- acts as data-variant target for custom css.
- no base css implemented.
- defaults to `default` if not specified.

Usage:

```vue
<ShButton as="a" href="/settings" iconOnly variant="primary" label="Settings">
  <i class="mdi mdi-gear"></i>
</ShButton>
```

##### Size

`sm` | `md` | `lg`

- acts as data-size target for custom css.
- no base css implemented.
- defaults to `md` if not specified.

Usage:

```vue
<ShButton as="a" href="/settings" iconOnly size="lg" label="Settings">
  <i class="mdi mdi-gear"></i>
</ShButton>
```

---

### Using External Label Text (`labelledBy`):

Usage:

```vue
<span id="delete-label">Delete Item</span>

<ShButton iconOnly labelledBy="delete-label">
  <i class="mdi mdi-trash"></i>
</ShButton>
```

_Use when label text already exists elsewhere in the DOM._

---

### Rule of Thumb:

- No `label` if Text is visible.
- set `iconOnly` + `label` if using only an icon (no text).
- always include `href` if using `as="a"`.

---

## Events

| **Event** | **Payload**  | **Description**                      |
| --------- | ------------ | ------------------------------------ |
| `click`   | `MouseEvent` | Emitted when the button is activated |

NOTE: Disabled buttons do not emit `click`.

Usage:

```vue
<ShButton @click="handleClick">Save</ShButton>
```

---

## Styling Hooks

### Classes

- `.sh-button` — applied to the root element always

### Data attributes

| **Attribute**   | **Values**                        | **Description**                |
| --------------- | --------------------------------- | ------------------------------ |
| `data-variant`  | `default` \| `primary` \| `ghost` | Set via `variant` prop         |
| `data-size`     | `sm` \| `md` \| `lg`              | Set via `size` prop            |
| `data-disabled` | `true`                            | Present when `disabled` is set |

Example:

```scss

.sh-button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
}

.sh-button[data-variant="primary"] {
  background: blue;
  color: white;
}

.sh-button[data-variant="ghost"] {
  background: transparent;
  border: 1px solid currentColor;
}

.sh-button[data-size="sm"] {
  font-size: 0.75rem;
}
.sh-button[data-size="lg"] {
  font-size: 1.25rem;
}

.sh-button[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```
