# ShTooltip

`ShTooltip` supplies a short, non-interactive text description that appears on keyboard focus or pointer hover. Do not use it for essential information, validation errors, or interactive content; use visible text, a description, dialog, or popover instead.

## Usage

The scoped slot returns `triggerProps`. Bind them to the actual focusable trigger so `aria-describedby` and event handlers reach the correct element.

```vue
<script setup lang="ts">
import { ShTooltip } from "shoehorn-ui";
</script>

<template>
  <ShTooltip text="Download report" v-slot="{ triggerProps }">
    <button v-bind="triggerProps" type="button" aria-label="Download report">
      <DownloadIcon aria-hidden="true" />
    </button>
  </ShTooltip>
</template>
```

## Props

| Prop         | Type                             | Default  | Purpose                               |
| ------------ | -------------------------------- | -------- | ------------------------------------- |
| `text`       | `string`                         | required | Plain tooltip text                    |
| `placement`  | `top \| right \| bottom \| left` | `top`    | Preferred visual placement            |
| `openDelay`  | `number`                         | `300`    | Delay before showing, in milliseconds |
| `closeDelay` | `number`                         | `100`    | Delay before hiding, in milliseconds  |

## Keyboard behavior

| Key             | Behavior                                                 |
| --------------- | -------------------------------------------------------- |
| Tab / Shift+Tab | Native focus navigation shows or hides the tooltip       |
| Escape          | Dismisses the tooltip while leaving focus on the trigger |

The tooltip itself never receives focus and must not contain links, buttons, or form controls. The trigger must remain understandable without depending exclusively on hover.

## Styling hooks

- `.sh-tooltip`
- `.sh-tooltip__content`
- `[data-placement]`
- `--sh-tooltip-text`
- `--sh-tooltip-background`
