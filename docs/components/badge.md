# ShBadge

An accessible badge component for status indicators and notification counts.

---

## Usage, Options, and Requirements:

### Text Badge

```vue
<ShBadge>New</ShBadge>
```

#### Optional Attributes:

##### Variant

`default` | `success` | `warning` | `error` | `info`

- Acts as data-variant target for custom css.
- No base css implemented.
- Defaults to `default` if not specified.

Usage:

```vue
<ShBadge variant="success">Active</ShBadge>
<ShBadge variant="error">Error</ShBadge>
```

#### Requirements:

- Slot content (visible text) serves as the accessible label.

---

### Count Badge (Notification)

```vue
<ShBadge :count="5" label="Unread messages" />
```

#### Acts as:

A `<span>` displaying the count (or "99+" if count exceeds default cap).

#### Optional Attributes:

##### Count

`number`

- The numeric value to display.
- Defaults to `undefined` (no count shown).
- If `countCap` is not set to `-1`, values over 99 display as "99+".

Usage:

```vue
<ShBadge :count="5" />
<ShBadge :count="150" />
<!-- displays "99+" -->
```

##### CountCap

`number`

- Maximum value before showing "+".
- Set to `-1` for no cap (displays full number).
- Defaults to `99` if not specified.

Usage:

```vue
<!-- Shows "99+" for counts > 99 -->
<ShBadge :count="150" />

<!-- Shows "50+" for counts > 50 -->
<ShBadge :count="150" :countCap="50" />

<!-- Shows full number, no cap -->
<ShBadge :count="150" :countCap="-1" />
```

##### Label

`string`

- Visible text label for the badge.
- Required for count badges if no slot content.
- Overridable by direct `aria-label` attribute.

Usage:

```vue
<ShBadge :count="5" label="Messages" />
```

##### LabelledBy

`string`

- ID of an external element that labels the badge.
- Use when label text already exists elsewhere in the DOM.
- Takes priority over `label` prop.

Usage:

```vue
<span id="notification-label">Unread Messages</span>
<ShBadge :count="5" labelledBy="notification-label" />
```

##### Variant

`default` | `success` | `warning` | `error` | `info`

- Acts as data-variant target for custom css.
- No base css implemented.
- Defaults to `default` if not specified.

Usage:

```vue
<ShBadge :count="3" variant="success" label="Tasks done" />
```

#### Requirements:

- Must have an accessible name via `label`, `labelledBy`, slot content, `aria-label`, or `aria-labelledby`.

---

### Rule of Thumb:

- Text badge: Use slot content (no label prop needed).
- Count badge: Use `label` prop or `aria-label` attribute.
- Count badge with external label: Use `labelledBy` to reference it.

---

## Styling Hooks

### Classes

- `.sh-badge` — Applied to the root element always.

### Data Attributes

| **Attribute**  | **Values**                                               | **Description**        |
| -------------- | -------------------------------------------------------- | ---------------------- |
| `data-variant` | `default` \| `success` \| `warning` \| `error` \| `info` | Set via `variant` prop |

Example:

```scss
.sh-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.sh-badge[data-variant="success"] {
  background-color: #10b981;
  color: white;
}

.sh-badge[data-variant="error"] {
  background-color: #ef4444;
  color: white;
}

.sh-badge[data-variant="warning"] {
  background-color: #f59e0b;
  color: white;
}
```
