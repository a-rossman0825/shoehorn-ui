# ShoeHorn UI

ShoeHorn UI is a **design-agnostic Vue 3 component library** focused on: 
- predictable behavior
- accessibility
- clean, composable APIs
- minimal opt-in styling

It is intended to be used as a **foundation layer**, not a visual design system.

---

## Features

- Vue 3 + Composiiton API
- TypeScript-first
- Accessible by default
- SCSS-based styling (no CSS-in-JS)
- Works with any design system or CSS framework

---

## Installation

```bash
npm install shoehorn-ui
```
or
```bash
pnpm add shoehorn-ui
```
---

## ️ Setup

#### Global registration (optional)

```typescript
// main.ts
import { createApp } from 'vue'
import ShoeHornUI from 'shoehorn-ui'
import 'shoehorn-ui/styles'

createApp(App)
  .use(ShoeHornUI)
  .mount('#app')
```
#### Individual component imports (recommended for tree-shaking)
```typescript
import { ShButton } from 'shoehorn-ui'
```
---

## Components


### Button (ShButton)
A foundational button component that preserves native behavior while adding a consistent API and accessibility guarantees.

#### Usage
```vue
<template>
  <ShButton @click="onClick">
    Click me
  </ShButton>
</template>
```
#### As an Anchor/Link
```vue
<ShButton as="a" href="/dashboard">
  Go to Dashboard
</ShButton>
```
#### As a Submit btn
```vue
<form @submit.prevent="onSubmit">
  <Shbutton type="submit">
    Submit form
  </ShButton>
</form>
```
#### Props
| **Prop** | **Type** | **Default** | **Description** |
| ---- | ---- | ---- | ---- |
| as | 'button' &#124; 'a' | 'button' | Underlying HTML element |
| type | 'button' &#124; 'submit' &#124; 'reset' | 'button' | Button behavior (button only) |
| disabled | boolean | false | Disables interaction |

#### Events
| **Event** | **Payload** |
| ---- | ---- |
| click | MouseEvent |

___

## Styling
ShoeHorn UI ships with **minimal base styles** and exposes styling hooks via:
- stable class names (e.g. .sh-button)
- CSS variables
- SCSS partials

No colors, spacing scales, or themes are enforced.

#### Example override:
```scss
.sh-button {
  background: var(--brand-primary);
  border-radius: 6px;
}
```
---
## Project Structure

```txt
src/
├─ components/
│  └─ Button/
│     ├─ ShButton.vue
│     ├─ button.scss
│     └─ index.ts
│
├─ composables/
├─ utils/
├─ styles/
│  ├─ _variables.scss
│  ├─ _base.scss
│  └─ index.scss
│
├─ plugin.ts
├─ index.ts
└─ env.d.ts
```
- **One folder per component**
- Components export through index.ts
- Styles are global, minimal, and opt-in
- No pages, router, or app-level concerns

---

##️ Build Status
This project is under active development.
APIs may evolve until v1.0.

---

## License
MIT
