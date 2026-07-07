# ShTabs

An accessible tabs component for switching between related panels of content.

---

## Usage, Options, and Requirements:

### Basic Tabs

```vue
<ShTabs
  v-model="activeTab"
  :tabs="[
    { id: 'account', label: 'Account' },
    { id: 'security', label: 'Security' },
  ]"
>
  <template #account>
    <p>Account settings content.</p>
  </template>

  <template #security>
    <p>Security settings content.</p>
  </template>
</ShTabs>
```

#### Acts as:

A tablist with one tab button per item and one tabpanel per tab.

#### Optional Attributes:

##### ModelValue

`string`

- Controlled active tab ID.
- Use with `v-model`.
- If omitted, the first tab becomes active by default.

Usage:

```vue
<ShTabs v-model="currentTab" :tabs="tabs" />
```

##### Tabs

`{ id: string; label: string; disabled?: boolean }[]`

- Defines the tabs to render.
- `id` is used for selection state, slot names, and panel IDs.
- `disabled` prevents a tab from being selected.

Usage:

```vue
<ShTabs
  v-model="tab"
  :tabs="[
    { id: 'overview', label: 'Overview' },
    { id: 'billing', label: 'Billing', disabled: true },
  ]"
/>
```

##### Orientation

`horizontal` | `vertical`

- Sets the visual and keyboard orientation.
- Defaults to `horizontal` if not specified.

Usage:

```vue
<ShTabs v-model="section" :tabs="tabs" orientation="vertical" />
```

#### Requirements:

- Each tab must have a unique `id`.
- Each tab should have matching named slot content using the tab `id`.
- Provide a meaningful label for every tab.

---

### Vertical Tabs

```vue
<ShTabs
  v-model="activePanel"
  orientation="vertical"
  :tabs="[
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
  ]"
>
  <template #profile>
    <p>Profile settings.</p>
  </template>

  <template #notifications>
    <p>Notification preferences.</p>
  </template>
</ShTabs>
```

- Arrow keys follow the current orientation.
- `Home` and `End` jump to the first and last enabled tabs.

---

### Rule of Thumb:

- Use tabs for related sections where users switch context in place.
- Keep tab labels short.
- Use stable IDs that match named slot keys.

---

## Events

| **Event**           | **Payload** | **Description**                     |
| ------------------- | ----------- | ----------------------------------- |
| `update:modelValue` | `string`    | Emitted when the active tab changes |
| `change`            | `string`    | Emitted when a new tab is selected  |

Usage:

```vue
<ShTabs v-model="tab" :tabs="tabs" @change="handleTabChange" />
```

---

## Styling Hooks

### Classes

- `.sh-tabs` — Applied to the root element always.
- `.sh-tabs__list` — Applied to the tablist element.
- `.sh-tabs__tab` — Applied to each tab button.
- `.sh-tabs__panel` — Applied to each tabpanel.

### Data Attributes

| **Attribute**      | **Values**                 | **Description**                 |
| ------------------ | -------------------------- | ------------------------------- |
| `data-orientation` | `horizontal` \| `vertical` | Applied to the root and tablist |
| `data-state`       | `active` \| `inactive`     | Applied to each tab button      |

Example:

```scss
.sh-tabs__tab[data-state="active"] {
  font-weight: 600;
  border-bottom: 2px solid currentColor;
}

.sh-tabs[data-orientation="vertical"] {
  display: grid;
  grid-template-columns: 12rem 1fr;
}
```

---

## Dev-time Warnings

ShTabs does not currently emit dev-time warnings.
