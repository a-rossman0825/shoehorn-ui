# ShTabs

`ShTabs` presents one panel at a time with instance-safe tab/panel relationships and roving keyboard focus.

```vue
<ShTabs v-model="section" label="Account settings" :tabs="tabs">
  <template #profile>Profile settings</template>
  <template #security>Security settings</template>
</ShTabs>
```

```ts
const tabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
];
```

## Props

| Prop          | Type                     | Default           | Purpose                             |
| ------------- | ------------------------ | ----------------- | ----------------------------------- |
| `modelValue`  | `string`                 | first enabled tab | Active tab ID                       |
| `tabs`        | `TabItem[]`              | `[]`              | IDs, labels, and disabled state     |
| `label`       | `string`                 | `Tabs`            | Accessible tablist name             |
| `orientation` | `horizontal \| vertical` | `horizontal`      | Layout and arrow-key axis           |
| `activation`  | `automatic \| manual`    | `automatic`       | Whether moving focus also activates |

## Keyboard behavior

| Key                    | Behavior                                    |
| ---------------------- | ------------------------------------------- |
| ArrowRight / ArrowLeft | Move horizontal tab focus, wrapping at ends |
| ArrowDown / ArrowUp    | Move vertical tab focus, wrapping at ends   |
| Home / End             | Focus first or last enabled tab             |
| Enter / Space          | Activate the focused tab in manual mode     |
| Tab                    | Enter or leave the tab interface normally   |

Each tab ID also names its slot. Keep panel changes fast when using automatic activation; use manual activation when loading a panel has noticeable latency.
