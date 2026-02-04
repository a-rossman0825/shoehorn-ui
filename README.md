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
import { ShButton } from 'shoehorn-ui';
</script>

<template>
  <ShButton @click="save">
    Save changes
  </ShButton>
</template>
```

---

# Documentation

Full documentation lives in the /docs folder:
- [Getting Started](./docs/getting-started.md)
- [Styling Guide](./docs/styling.md)
- [Accessibility](./docs/accessibility.md)
- Components
	- [ShAccordion](./docs/components/accordion.md)
  - [ShBadge](./docs/components/badge.md)
  - [ShBreadcrumbs](./docs/components/breadcrumbs.md)
  - [ShButton](./docs/components/button.md)
  - [ShCard](./docs/components/card.md)
  - [ShCheckbox](./docs/components/checkbox.md)
  - [ShCombobox](./docs/components/combobox.md)
  - [ShDialog](./docs/components/dialog.md)
  - [ShField](./docs/components/field.md)
  - [ShForm](./docs/components/form.md)
  - [ShInput](./docs/components/input.md)
  - [ShLabel](./docs/components/label.md)
  - [ShPagination](./docs/components/pagination.md)
  - [ShProgress](./docs/components/progress.md)
  - [ShRadiogroup](./docs/components/radiogroup.md)
  - [ShSelect](./docs/components/select.md)
  - [ShSpinner](./docs/components/spinner.md)
  - [ShSwitch](./docs/components/switch.md)
  - [ShTabs](./docs/components/tabs.md)
  - [ShTextarea](./docs/components/textarea.md)
  - [ShTooltip](./docs/components/tooltip.md)


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

