# ShTabs

An accessible tabs component with keyboard navigation.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("profile");

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "settings", label: "Settings" },
  { id: "notifications", label: "Notifications" },
];
</script>

<template>
  <ShTabs v-model="activeTab" :tabs="tabs">
    <template #profile>
      <p>Profile content</p>
    </template>
    <template #settings>
      <p>Settings content</p>
    </template>
    <template #notifications>
      <p>Notifications content</p>
    </template>
  </ShTabs>
</template>
```

---

## Props

| **Prop**      | **Type**                       | **Default**  | **Description**          |
| ------------- | ------------------------------ | ------------ | ------------------------ |
| `modelValue`  | string                         | first tab id | Active tab ID            |
| `tabs`        | Tab[]                          | []           | Array of tab definitions |
| `orientation` | 'horizontal' &#124; 'vertical' | 'horizontal' | Tab list orientation     |

### Tab Interface

```typescript
interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}
```

---

## Events

| **Event**           | **Payload** | **Description**                 |
| ------------------- | ----------- | ------------------------------- |
| `update:modelValue` | string      | Emitted when active tab changes |
| `change`            | string      | Emitted on tab change           |

---

## Accessibility

ShTabs implements the ARIA tabs pattern:

- **Keyboard Navigation**
  - Arrow Left/Right (horizontal) or Up/Down (vertical)
  - Home/End keys
  - Tab to enter, arrows to navigate
- **ARIA Attributes**
  - Proper roles: tablist, tab, tabpanel
  - aria-selected, aria-controls
  - Only active tab in tab order (tabindex management)

---

## Styling Hooks

#### Classes

- `.sh-tabs` - Container
- `.sh-tabs__list` - Tab list
- `.sh-tabs__tab` - Individual tab
- `.sh-tabs__panel` - Content panel

#### Data Attributes

```html
data-orientation="horizontal | vertical" data-state="active | inactive"
```

---

## When to Use ShTabs

- Organize related content into sections
- Switch between different views
- Settings pages with categories
