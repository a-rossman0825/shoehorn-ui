# Getting Started

ShoeHorn UI is a **design-agnostic, accessibility-first Vue 3 component library**.
It provides behavior, semantics, and accessibility.

## Installation

```bash
npm install shoehorn-ui
```
#### peer dependencies
ShoeHorn UI requires:
- Vue 3 (Composition API)
```bash
npm install vue@^3
```
---
## Usage
#### Import components
```ts
import { ShButton } from 'shoehorn-ui';
```
#### Use in templates
```vue
<template>
  <ShButton @click="onClick">
    Click Me
  </ShButton>
</template>
```
---

## Plugin installation (optional)

You may register all components globally:
```ts
import { createApp } from 'vue';
import ShoeHornUI from 'shoehorn-ui';

createApp(App)
  .use(ShoeHornUI)
  .mount('#app')
```
This is completely optional, tree-shaking works better with direct imports.
---
## Philosophy
- No forced styles
- No design tokens
- No CSS framework assumptions
- Accessibility first/non-negotiable
- Styling is the consumer's responsibility

See:
- [styling.md](./styling.md)
- [accessibility.md](./accessibility.md)

