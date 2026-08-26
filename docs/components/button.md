# ShButton

`ShButton` renders either a native action button or a native navigation link. It never assigns button semantics to a link.

```vue
<ShButton type="submit" variant="primary">Save</ShButton>
<ShButton as="a" href="/settings">Settings</ShButton>
<ShButton
  icon-only
  label="Delete item"
><TrashIcon aria-hidden="true" /></ShButton>
```

## Contracts

The TypeScript API uses discriminated unions:

- `as="button"` is the default and does not accept `href`.
- `as="a"` requires `href` and supports `target` and `rel`.
- `iconOnly=true` requires `label` at compile time.

## Props

| Prop                    | Type                          | Default   | Purpose                            |
| ----------------------- | ----------------------------- | --------- | ---------------------------------- |
| `as`                    | `button \| a`                 | `button`  | Native element                     |
| `type`                  | `button \| submit \| reset`   | `button`  | Native button behavior             |
| `href`, `target`, `rel` | `string`                      | —         | Native link behavior               |
| `disabled`              | `boolean`                     | `false`   | Disables activation                |
| `variant`               | `default \| primary \| ghost` | `default` | Styling hook                       |
| `size`                  | `sm \| md \| lg`              | `md`      | Styling hook                       |
| `iconOnly`              | `boolean`                     | `false`   | Enforces icon-only naming contract |
| `label`, `labelledBy`   | `string`                      | —         | Accessible-name fallback           |

Buttons preserve native Enter and Space behavior. Links preserve native Enter behavior and do not respond to Space as buttons. A disabled link has no `href`, is removed from the Tab order, exposes `aria-disabled`, and suppresses click emission.

Prefer visible text. Use `label` for a genuinely icon-only control, and mark the icon `aria-hidden="true"`. The component emits `click(MouseEvent)` only when enabled and forwards native attributes to its root interactive element.
