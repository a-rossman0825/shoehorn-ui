# ShBadge

`ShBadge` displays short status text or a capped count. It does not assume every badge is a notification or live update.

```vue
<ShBadge variant="success">Active</ShBadge>
<ShBadge :count="125" :count-cap="99" label="Unread messages" />
<ShBadge decorative><span aria-hidden="true">New</span></ShBadge>
```

## Props

| Prop                  | Type                                             | Default   | Purpose                                        |
| --------------------- | ------------------------------------------------ | --------- | ---------------------------------------------- |
| `variant`             | `default \| success \| warning \| error \| info` | `default` | Styling hook                                   |
| `count`               | `number`                                         | `0`       | Numeric fallback content                       |
| `countCap`            | `number`                                         | `99`      | Maximum displayed value; `-1` disables capping |
| `label`, `labelledBy` | `string`                                         | —         | Accessible-name strategies                     |
| `decorative`          | `boolean`                                        | `false`   | Hides the badge from assistive technology      |
| `live`                | `off \| polite \| assertive`                     | `off`     | Opt-in live update behavior                    |

Slot content replaces the displayed count. Use `decorative` only when equivalent information is already conveyed nearby. Use `live` sparingly: frequently changing counts can become disruptive. Custom themes must not use badge color as the only indication of status.
