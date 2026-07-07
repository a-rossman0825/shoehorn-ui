# ShAccordion

An accessible accordion component for expandable content sections.

---

## Usage, Options, and Requirements:

### Basic Accordion

```vue
<ShAccordion
  v-model="openItems"
  :items="[
    { id: 'account', title: 'Account Settings' },
    { id: 'billing', title: 'Billing' },
  ]"
>
  <template #account>
    <p>Manage your account settings here.</p>
  </template>

  <template #billing>
    <p>Update payment methods and invoices here.</p>
  </template>
</ShAccordion>
```

#### Acts as:

A wrapper `<div>` that renders a button-triggered accordion item for each entry in `items`.

#### Optional Attributes:

##### ModelValue

`string[]`

- Controlled list of currently open accordion item IDs.
- Defaults to `[]` if not specified.
- Use with `v-model`.

Usage:

```vue
<ShAccordion v-model="openItems" :items="items" />
```

##### Items

`{ id: string; title: string; disabled?: boolean }[]`

- Defines the accordion sections to render.
- `id` is used for state, slot names, and accessibility wiring.
- `title` is the visible trigger text.
- `disabled` prevents the item from toggling.

Usage:

```vue
<ShAccordion
  :items="[
    { id: 'faq-1', title: 'What is Shoehorn UI?' },
    { id: 'faq-2', title: 'Can I disable a section?', disabled: true },
  ]"
/>
```

##### Multiple

`true` | `false`

- Allows multiple sections to stay open at the same time.
- Defaults to `false` if not specified.
- When `false`, opening one section closes the others.

Usage:

```vue
<ShAccordion v-model="openItems" :items="items" multiple />
```

#### Requirements:

- Each item must have a unique `id`.
- Each item should have matching named slot content using the item `id`.
- Use `v-model` if parent state needs to control which sections are open.

---

### Disabled Accordion Item

```vue
<ShAccordion
  :items="[
    { id: 'profile', title: 'Profile' },
    { id: 'security', title: 'Security', disabled: true },
  ]"
>
  <template #profile>
    <p>Editable content.</p>
  </template>

  <template #security>
    <p>This section is currently unavailable.</p>
  </template>
</ShAccordion>
```

- Disabled items render with the native `disabled` attribute on the trigger button.
- Disabled items do not toggle open or closed.

---

### Rule of Thumb:

- Use stable item IDs so slot names and open state stay predictable.
- Use `multiple` only when users benefit from seeing more than one section at a time.
- Keep trigger titles short and content descriptive.

---

## Events

| **Event**           | **Payload** | **Description**                                      |
| ------------------- | ----------- | ---------------------------------------------------- |
| `update:modelValue` | `string[]`  | Emitted when the set of open accordion items changes |

Usage:

```vue
<ShAccordion v-model="openItems" :items="items" />
```

---

## Styling Hooks

### Classes

- `.sh-accordion` — Applied to the root element always.
- `.sh-accordion__item` — Applied to each accordion item wrapper.
- `.sh-accordion__header` — Applied to each item heading wrapper.
- `.sh-accordion__trigger` — Applied to each toggle button.
- `.sh-accordion__icon` — Applied to the open/close indicator.
- `.sh-accordion__content` — Applied to the collapsible content region.
- `.sh-accordion__body` — Applied to the inner content wrapper.

### Data Attributes

| **Attribute** | **Values**         | **Description**                |
| ------------- | ------------------ | ------------------------------ |
| `data-state`  | `open` \| `closed` | Applied to each accordion item |

Example:

```scss
.sh-accordion__item[data-state="open"] .sh-accordion__trigger {
  font-weight: 600;
}

.sh-accordion__item[data-state="open"] .sh-accordion__content {
  display: block;
}

.sh-accordion__item[data-state="closed"] .sh-accordion__content {
  display: none;
}
```

---

## Dev-time Warnings

ShAccordion does not currently emit dev-time warnings.
