# ShDialog

An accessible modal dialog component with focus trapping and overlay dismissal controls.

---

## Usage, Options, and Requirements:

### Basic Dialog

```vue
<ShDialog
  v-model:open="isOpen"
  title="Delete project"
  description="This action cannot be undone."
>
  <p>Are you sure you want to delete this project?</p>

  <template #footer>
    <ShButton variant="ghost" @click="isOpen = false">Cancel</ShButton>
    <ShButton variant="primary" @click="confirmDelete">Delete</ShButton>
  </template>
</ShDialog>
```

#### Acts as:

A teleported dialog overlay rendered into `body`, with focus moved inside on open and restored on close.

#### Optional Attributes:

##### Open

`true` | `false`

- Controls whether the dialog is visible.
- Defaults to `false` if not specified.
- Use with `v-model:open`.

Usage:

```vue
<ShDialog v-model:open="isOpen" title="Edit profile" />
```

##### Modal

`true` | `false`

- Controls the `aria-modal` value.
- Defaults to `true` if not specified.

Usage:

```vue
<ShDialog v-model:open="isOpen" :modal="false" title="Inspector" />
```

##### CloseOnEsc

`true` | `false`

- Closes the dialog when the Escape key is pressed.
- Defaults to `true` if not specified.

Usage:

```vue
<ShDialog v-model:open="isOpen" :closeOnEsc="false" title="Critical step" />
```

##### CloseOnOverlayClick

`true` | `false`

- Closes the dialog when the overlay background is clicked.
- Defaults to `true` if not specified.

Usage:

```vue
<ShDialog v-model:open="isOpen" :closeOnOverlayClick="false" title="Wizard" />
```

##### Title

`string`

- Visible dialog title.
- Strongly recommended for accessibility.

Usage:

```vue
<ShDialog v-model:open="isOpen" title="Invite team member" />
```

##### Description

`string`

- Optional supporting text linked with `aria-describedby`.

Usage:

```vue
<ShDialog
  v-model:open="isOpen"
  title="Delete file"
  description="Deleting this file removes it permanently."
/>
```

#### Requirements:

- Should include a `title` for accessible naming.
- Provide meaningful content in the default slot.
- Use the `footer` slot when actions belong at the bottom of the dialog.

---

### Non-dismissible Dialog

```vue
<ShDialog
  v-model:open="showSetup"
  title="Complete setup"
  :closeOnEsc="false"
  :closeOnOverlayClick="false"
>
  <p>Please complete the required steps before continuing.</p>
</ShDialog>
```

- Prevents accidental dismissal.
- Useful for multi-step flows or mandatory actions.

---

### Rule of Thumb:

- Always provide a clear `title`.
- Keep dialog content focused on a single task.
- Disable overlay/Escape dismissal only when truly necessary.

---

## Events

| **Event**     | **Payload** | **Description**                              |
| ------------- | ----------- | -------------------------------------------- |
| `update:open` | `boolean`   | Emitted when the dialog should open or close |
| `close`       | none        | Emitted when the dialog closes               |

Usage:

```vue
<ShDialog v-model:open="isOpen" title="Example" @close="handleClose" />
```

---

## Styling Hooks

### Classes

- `.sh-dialog-overlay` — Applied to the overlay element.
- `.sh-dialog` — Applied to the dialog container.
- `.sh-dialog__header` — Applied to the header row.
- `.sh-dialog__title` — Applied to the title element.
- `.sh-dialog__description` — Applied to the description element.
- `.sh-dialog__content` — Applied to the main content area.
- `.sh-dialog__footer` — Applied to the footer slot wrapper.

### Transition Hooks

- `sh-dialog` — Transition name used by the built-in `<Transition>` wrapper.

Example:

```scss
.sh-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}

.sh-dialog {
  max-width: 32rem;
  margin: 10vh auto;
  background: white;
}
```

---

## Dev-time Warnings

ShDialog warns during development if:

- No `title` prop is provided.

Example:

```
[ShDialog] Dialog has no title. Provide the `title` prop for proper labeling.
```
