# ShInput


## Basic Usage
```vue
vue

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <ShInput
    v-model="email"
    label="Email address"
    type="email"
  />
</template>
```

---

## Props
| **** | **** | **** | **** | **** | **** | **** | **** |


---

#### Events

**update:modelValue**
```ts
ts

(value: string) => void
```
Emitted when the user changes the input value.

--- 


#### focus

```ts
ts

(event: FocusEvent) => void
```
Emitted when the input receives focus.

---

#### blur
```ts
ts

(event: FocusEvent) => void
```
Emitted when the input loses focus.

---

## Accessibility

ShInput enforces strong accessiblity guarantees:
- **Labeling**
	- Automatically associates `<label>` with `<input>`
	- Warns in development if no accessible label is present
- **Error Handling**
	- Sets `aria-invalid` when error is provided
	- Associates error text using `aria-describedby`
	- Uses `role="alert"` for error announcements
- **Native Semantics**
	- Uses a native `<input>` element
	- Preserves browser behavior and keyboard support

---

## Attribute Passthrough

Any additional attributes are forwarded to the underlying `<input>`:
```vue
vue

<ShInput
  label="Username"
  autocomplete="username"
  aria-describedby="custom-help"
/>
```

---

## Example Usage

#### With Error
```vue
vue

<ShInput
  v-model="email"
  label="Email"
  type="email"
  error="Please enter a valid email address"
/>
```

---

#### Without Visible Label
```vue
vue

<ShInput
  v-model="search"
  aria-label="Search"
  type="search"
/>
```

---

## Design Notes
- ShInput intentionally does **not** manage validation logic.
- Validation state is derived entirely from props.
- Component is predictable, testable, and framework-agnostic.

---

