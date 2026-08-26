# ShoeHorn UI

ShoeHorn UI is an accessibility-first, design-agnostic component library for Vue 3 and TypeScript. It owns semantics, keyboard and focus behavior, form integration, accessible state, and minimal structural styling while leaving visual identity to the consuming application.

ShoeHorn UI is designed and tested to support WCAG 2.2 Level AA conformance when its components are used according to their documented contracts. WCAG conformance applies to complete pages, so application content, structure, color choices, and integration remain consumer responsibilities.

## Features

- Native HTML semantics whenever a native element satisfies the interaction.
- Type-safe prop contracts for invalid combinations that can be caught statically.
- Development warnings for runtime accessibility problems.
- SSR-safe IDs and instance-safe ARIA relationships.
- Native form submission, validation, reset, and attribute forwarding.
- Keyboard and focus behavior for composite widgets.
- Automated interaction and axe accessibility tests.
- Design-agnostic BEM classes, state attributes, and CSS custom properties.
- Reduced-motion, forced-colors, RTL-friendly, zoom, and reflow considerations.

## Installation

```bash
npm install shoehorn-ui
```

Vue 3.4 or newer is required as a peer dependency.

```ts
import { createApp } from "vue";
import { ShoeHornUI } from "shoehorn-ui";
import "shoehorn-ui/style.css";

createApp(App).use(ShoeHornUI).mount("#app");
```

Components can also be imported individually for tree shaking:

```vue
<script setup lang="ts">
import { ref } from "vue";
import { ShButton, ShField, ShInput } from "shoehorn-ui";

const name = ref("");
const error = ref("");

function save() {
  error.value = name.value.trim() ? "" : "Enter your name";
}
</script>

<template>
  <ShField
    id="display-name"
    label="Display name"
    description="Shown on your public profile"
    :error="error"
    required
  >
    <ShInput v-model="name" name="displayName" autocomplete="name" />
  </ShField>
  <ShButton @click="save">Save profile</ShButton>
</template>
```

## Components

### Forms

- Button and navigation-link mode
- Field, Label, Input, Textarea, Select
- Checkbox, Switch, RadioGroup
- Combobox and Form

### Navigation and disclosure

- Accordion, Breadcrumbs, Pagination, Tabs
- Dialog and Tooltip

### Status and utility

- Alert, Badge, Progress, Spinner, VisuallyHidden

All components and reusable option types are exported from the package root.

## Accessibility approach

- Native controls retain their built-in keyboard and form behavior.
- Composite widgets follow the relevant WAI-ARIA Authoring Practices pattern.
- Generated IDs use Vue's SSR-safe `useId()`.
- Consumer and generated description references are merged.
- Wrapped controls deliberately forward attributes to the native element.
- Complex behavior has interaction contract tests; representative markup is scanned with axe.

See [Accessibility](./docs/accessibility.md) and [Accessibility testing](./docs/testing.md). Automated tests cannot replace browser and assistive-technology testing; the current manual support matrix is explicitly tracked as pending rather than implied.

## Styling

ShoeHorn UI ships minimal structural and accessibility-essential styles through `shoehorn-ui/style.css`. Components expose `sh-` BEM classes, CSS custom properties, and state attributes such as `data-state`, `data-disabled`, and `data-invalid`.

Consumer themes are responsible for maintaining accessible color contrast. See [Styling](./docs/styling.md).

## Development

```bash
npm ci
npm run check
```

`npm run check` runs linting, formatting verification, type declaration generation, tests, axe scans, and the production build.

Before contributing, read [AGENTS.md](./AGENTS.md) and [CONTRIBUTING.md](./CONTRIBUTING.md).

## Project status

ShoeHorn UI is pre-1.0. APIs can evolve as browser and assistive-technology verification expands. The source and automated contracts are substantially hardened, but manual screen-reader combinations listed in [docs/testing.md](./docs/testing.md) must be completed before describing the library as broadly assistive-technology verified.

## License

MIT
