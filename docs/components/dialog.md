# ShDialog

`ShDialog` uses the native `<dialog>` element for modal focus containment, background inertness, and Escape behavior.

```vue
<ShButton @click="open = true">Delete account</ShButton>
<ShDialog
  v-model:open="open"
  title="Delete account"
  description="This action cannot be undone."
>
  <p>Confirm permanent deletion.</p>
  <template #footer>
    <ShButton @click="open = false">Cancel</ShButton>
    <ShButton variant="primary" @click="deleteAccount">Delete</ShButton>
  </template>
</ShDialog>
```

## Props

| Prop                  | Type      | Default                 | Purpose                                           |
| --------------------- | --------- | ----------------------- | ------------------------------------------------- |
| `open`                | `boolean` | `false`                 | Controlled visibility                             |
| `modal`               | `boolean` | `true`                  | Uses `showModal()` rather than non-modal `show()` |
| `closeOnEsc`          | `boolean` | `true`                  | Allows native Escape cancellation                 |
| `closeOnOverlayClick` | `boolean` | `true`                  | Dismisses pointer interaction on the backdrop     |
| `title`               | `string`  | —                       | Visible accessible name                           |
| `description`         | `string`  | —                       | Supporting description                            |
| `initialFocus`        | `string`  | first focusable control | CSS selector within the dialog                    |

The component emits `update:open(false)` and `close`; the parent remains responsible for applying controlled state. A visible close button is always included. `focus()` and `close()` are exposed.

Do not disable Escape or the close button without a critical workflow reason. Initial focus should usually target the least destructive action or static introductory content for long dialogs. Nested modal behavior must be tested in the consuming application.
