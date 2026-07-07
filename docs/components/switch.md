# ShSwitch

An accessible switch component for toggling between on and off states.

---

## Usage, Options, and Requirements:

### Basic Switch

```vue
<ShSwitch v-model="notificationsEnabled" label="Enable notifications" />
```

#### Acts as:

A `<button role="switch">` paired with an optional hidden checkbox for form submission when `name` is provided.

#### Optional Attributes:

##### ModelValue

`true` | `false`

- Controlled switch state.
- Defaults to `false` if not specified.
- Use with `v-model`.

Usage:

```vue
<ShSwitch v-model="darkMode" label="Dark mode" />
```

##### Disabled

`true` | `false`

- Disables the switch and prevents toggling.
- Defaults to `false` if not specified.

##### Required

`true` | `false`

- Marks the switch as required.
- Defaults to `false` if not specified.

##### Name

`string`

- When provided, renders a hidden checkbox input for form submission.

Usage:

```vue
<ShSwitch
  v-model="marketingOptIn"
  name="marketingOptIn"
  label="Marketing emails"
/>
```

##### Value

`string`

- Native value used by the hidden checkbox input.

##### Id

`string`

- Custom ID for the switch control.
- If omitted, a fallback ID is generated automatically.

##### Label

`string`

- Visible label text.
- Recommended unless `aria-label` or `aria-labelledby` is provided.

#### Requirements:

- Must have an accessible name via `label`, `aria-label`, or `aria-labelledby`.
- Required switches should visually indicate the required state.

---

### Form-friendly Switch

```vue
<ShSwitch
  v-model="betaAccess"
  name="betaAccess"
  value="enabled"
  label="Join beta program"
/>
```

- Adds a hidden checkbox input so the value can participate in native form submission.
- Still uses the visible switch button for interaction.

---

### Rule of Thumb:

- Use switches for immediate on/off states.
- Use checkboxes instead when the meaning is better expressed as selected/not selected.
- Provide a visible label in most cases.

---

## Events

| **Event**           | **Payload**        | **Description**                        |
| ------------------- | ------------------ | -------------------------------------- |
| `update:modelValue` | `boolean`          | Emitted when the switch state changes  |
| `change`            | `boolean`, `Event` | Emitted when the switch toggles        |
| `focus`             | `FocusEvent`       | Emitted when the switch receives focus |
| `blur`              | `FocusEvent`       | Emitted when the switch loses focus    |

Usage:

```vue
<ShSwitch v-model="enabled" label="Enable feature" @change="handleToggle" />
```

---

## Styling Hooks

### Classes

- `.sh-switch` — Applied to the wrapper `<div>` always.
- `.sh-switch__control` — Applied to the switch button.
- `.sh-switch__thumb` — Applied to the thumb element.
- `.sh-switch__label` — Applied to the visible label.

### Data Attributes

| **Attribute** | **Values**                             | **Description**                           |
| ------------- | -------------------------------------- | ----------------------------------------- |
| `data-state`  | `checked` \| `unchecked` \| `disabled` | Applied to the control and thumb elements |

Example:

```scss
.sh-switch__control[data-state="checked"] {
  background-color: #2563eb;
}

.sh-switch__thumb[data-state="checked"] {
  transform: translateX(1rem);
}
```

---

## Dev-time Warnings

ShSwitch warns during development if:

- No `label`, `aria-label`, or `aria-labelledby` is provided.
- `required` is true but the visible `label` does not indicate that visually.

Example:

```
[ShSwitch] Switch has no accessible label. Provide `label`, `aria-label`, or `aria-labelledby`.
```
