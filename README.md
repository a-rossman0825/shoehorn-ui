# ShoeHorn UI

**ShoeHorn UI** is an accessibility-first, desgin-agnostic component library for Vue 3 + TypeScript.

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
- [Accessiblity](./docs/accessibility.md)
- Components
	- [ShButton](./docs/components/button.md)

---

# Philosophy
- Accessiblity as a Feature
- Native HTML first
- No Fake ARIA
- No forced styles
- Clear errors instead of silent failures

---

# Build Status
ShoeHorn UI is currently in early development.
- APIs will evolve
- Components are being added incrememntally
- Accessibility guarantees are still completely stable

---

# License

MIT

Free software, Hell Yeah!

