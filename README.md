# ShoeHorn UI

**ShoeHorn UI** is an accessibility-first, design-agnostic component library for Vue 3 + TypeScript.

Features:

- Accessibility as a feature (no more fighting lighthouse over Aria).
- Enforces correct prop usage (eg: no anchor without href).
- Dev-time warnings whenever prop/attrs are incorrect (eg: no label on icon-only buttons).
- Fails loudly to ensure inaccessible components are never shipped.
- Vue 3 first instead of a React adapted component library.
- Built for teams that want correctness guaranteed, not just flexibility.

ShoeHorn does not handle style or designs, it only handles behavior and accessibility.

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
import { ref } from "vue";
import { ShLabel, ShInput, ShButton } from "shoehorn-ui";

const query = ref("");
const error = ref("");

const handleSearch = () => {
  if (!query.value) {
    error.value = "Search term required";
    return;
  }
  console.log("Searching for:", query.value);
};
</script>

<template>
  <div>
    <!-- Label properly associates with input -->
    <ShLabel for="search">Search users</ShLabel>

    <!-- Shows error state with aria-invalid -->
    <ShInput
      id="search"
      v-model="query"
      placeholder="Type a name..."
      :error="error"
      aria-describedby="search-error"
    />

    <!-- This would FAIL: iconOnly requires label prop -->
    <!-- <ShButton iconOnly @click="handleSearch">
            <i class="mdi mdi-magnify"></i>
         </ShButton> -->

    <!-- This works: explicit label enforces accessibility -->
    <ShButton iconOnly label="Search" @click="handleSearch">
      <i class="mdi mdi-magnify"></i>
    </ShButton>
  </div>
</template>
```

---

# Documentation

Full documentation lives in the [/docs folder](https://github.com/a-rossman0825/shoehorn-ui/tree/main/docs):

- [Getting Started](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/getting-started.md)
- [Styling Guide](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/styling.md)
- [Accessibility](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/accessibility.md)
- Components
  - [ShBadge](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/badge.md)
  - [ShButton](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/button.md)
  - [ShLabel](https://github.com/a-rossman0825/shoehorn-ui/blob/main/docs/components/label.md)

---

# Build Status

ShoeHorn UI is currently in early development.

- APIs will evolve
- Components are being added incrementally

## Roadmap

**Completed:** ShButton, ShLabel, ShBadge

**In Progress:** ShInput, ShCheckbox

**Planned:** ShDialog, ShTabs, ShCombobox, ShSelect, ShAccordion, ShBreadcrumbs, ShField, ShForm, ShPagination, ShRadioGroup, ShSwitch, ShTextarea, ShTooltip

## Development

- Built with Vue 3 + TypeScript
- ESLint + Prettier for code quality
- Vitest for component unit testing
- Composables + Utils for code reuse

## Type Safety

- Discriminated unions enforce correct prop usage at compile time, for example:

- Using `as="a"` on a [ShButton] requires `href`
- `iconOnly` requires `label`
- No invalid prop combinations, ever

See [Contributing Guide](./CONTRIBUTING.md) for development setup.

---

# Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

---

# Testing

All components have:

- Unit tests (Vitest)
- Accessibility tests
- v-model/emit tests

---

# License

MIT

Free software, Hell Yeah!
