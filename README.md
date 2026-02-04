# ShoeHorn UI

**ShoeHorn UI** is an accessibility-first, design-agnostic component library for Vue 3 + TypeScript.

Features:

- Correct semantics
- Keyboard interaction
- ARIA only where appropriate
- Clear and concise dev-time accessibility warnings

ShoeHorn allows you to handle styles and designs with your own design system, and handles behavior and accessibility for you.

---

# Installation

```bash
bash

npm install shoehorn-ui
```

## Peer Dependency

```bash
bash

npm install vue@^3
```

---

# Usage

```vue
vue

<script setup lang="ts">
import { ShButton } from "shoehorn-ui";
</script>

<template>
  <ShButton @click="save"> Save changes </ShButton>
</template>
```

---

# Documentation

Full documentation lives in the [/docs folder](https://github.com/a-rossman0825/shoehorn-ui/tree/main/docs):

- [Getting Started](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/getting-started.md)
- [Styling Guide](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/styling.md)
- [Accessibility](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/accessibility.md)
- Components
  - [ShAccordion](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/accordion.md)
  - [ShBadge](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/badge.md)
  - [ShBreadcrumbs](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/breadcrumbs.md)
  - [ShButton](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/button.md)
  - [ShCard](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/card.md)
  - [ShCheckbox](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/checkbox.md)
  - [ShCombobox](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/combobox.md)
  - [ShDialog](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/dialog.md)
  - [ShField](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/field.md)
  - [ShForm](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/form.md)
  - [ShInput](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/input.md)
  - [ShLabel](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/label.md)
  - [ShPagination](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/pagination.md)
  - [ShProgress](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/progress.md)
  - [ShRadiogroup](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/radiogroup.md)
  - [ShSelect](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/select.md)
  - [ShSpinner](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/spinner.md)
  - [ShSwitch](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/switch.md)
  - [ShTabs](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/tabs.md)
  - [ShTextarea](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/textarea.md)
  - [ShTooltip](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/tooltip.md)

---

# Philosophy

- Accessibility as a Feature
- Native HTML first
- No Fake ARIA
- No forced styles
- Clear errors instead of silent failures

---

# Build Status

ShoeHorn UI is currently in early development.

- APIs will evolve
- Components are being added incrementally
- Accessibility guarantees are still completely stable

---

# License

MIT

Free software, Hell Yeah!
