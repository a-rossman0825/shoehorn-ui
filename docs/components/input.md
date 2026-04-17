# ShInput

An accessible, form-bound text input component with v-model binding, error states, and validation feedback.

---

## Usage, Options, and Requirements:

### Basic Text Input

```vue
<ShLabel for="email">Email</ShLabel>
<ShInput id="email" v-model="email" />
```

#### Acts as:

A native `<input>` element wrapped in a `<div>` container that holds error and description text.

#### Optional Attributes:

##### Type

`text` | `email` | `password` | `search` | `url` | `tel`

- Determines input behavior and keyboard on mobile.
- `text` acts as default.
- `email` triggers email validation keyboard.
- `password` masks input characters.
- `search`, `url`, `tel` provide contextual keyboards.
- Defaults to `text` if not specified.

Usage:

```vue
<ShInput id="password" v-model="password" type="password" />
<ShInput id="email" v-model="email" type="email" />
<ShInput id="phone" v-model="phone" type="tel" />
```

##### Id

`string`

- Unique identifier for the input.
- **Required** to associate with external `<ShLabel>` or for form submission.
- Also used to link error/description messages via `aria-describedby`.

Usage:

```vue
<ShLabel for="username">Username</ShLabel>
<ShInput id="username" v-model="username" />
```

##### Name

`string`

- Form field name for submission and FormData API.
- Use when input is part of a form being submitted to a server.
- Defaults to `undefined` if not specified.

Usage:

```vue
<form @submit.prevent="submitForm">
  <ShInput id="email" name="email" v-model="email" type="email" />
  <ShButton type="submit">Submit</ShButton>
</form>
```

##### Placeholder

`string`

- Hint text displayed when input is empty.
- **Note:** Placeholder alone does not serve as a label. Always use `<ShLabel>`.
- Defaults to `undefined` if not specified.

Usage:

```vue
<ShInput id="search" v-model="query" placeholder="Search..." />
```

##### Disabled

`true` | `false`

- Disables user input and prevents `update:modelValue` emission.
- Defaults to `false` if not specified.

Usage:

```vue
<ShInput id="readonly-field" v-model="value" disabled />
```

##### Readonly

`true` | `false`

- Allows selection/focus but prevents editing.
- Still emits `update:modelValue` if programmatically changed.
- Defaults to `false` if not specified.

Usage:

```vue
<ShInput id="username" v-model="username" readonly />
```

##### Error

`string`

- Error message to display below the input.
- Sets `aria-invalid="true"` automatically.
- Conditional rendering: only displays if error prop is provided.
- Defaults to `undefined` if not specified.

Usage:

```vue
<ShInput id="password" v-model="password" :error="passwordError" />
<!-- renders error message if passwordError is not empty -->
```

##### Description

`string`

- Helper text displayed below the input (below error if both exist).
- Linked via `aria-describedby` for accessibility.
- Useful for password requirements, hints, or formatting instructions.
- Defaults to `undefined` if not specified.

Usage:

```vue
<ShInput
  id="password"
  v-model="password"
  description="At least 8 characters, one uppercase, one number"
></ShInput>
```

#### Requirements:

- Must have an accessible name via:
  - External `<ShLabel for="id">` (recommended)
  - `aria-label` attribute
  - `aria-labelledby` attribute
- Recommended: Use `id` to associate with `<ShLabel>`.

---

### Input with Error State

```vue
<ShLabel for="email">Email Address</ShLabel>
<ShInput id="email" v-model="email" type="email" :error="emailError" />
```

#### What renders:

```html
<div class="input-wrapper">
  <input aria-invalid="true" aria-describedby="input-error" />
  <p id="input-error">Invalid email format</p>
</div>
```

#### How it works:

- Error message automatically linked via `aria-describedby`.
- Screen readers announce: "Input field, invalid, Invalid email format".
- `aria-invalid="true"` signals validation failure.

#### Usage:

```vue
<script setup>
const email = ref("");
const emailError = ref("");

function validateEmail() {
  if (!email.value.includes("@")) {
    emailError.value = "Email must contain @";
  } else {
    emailError.value = "";
  }
}
</script>

<template>
  <ShInput
    id="email"
    v-model="email"
    type="email"
    :error="emailError"
    @input="validateEmail"
  />
</template>
```

---

### Input with Description (Helper Text)

```vue
<ShLabel for="password">Password</ShLabel>
<ShInput
  id="password"
  v-model="password"
  type="password"
  description="At least 8 characters, one uppercase, one number"
></ShInput>
```

#### What renders:

```html
<div class="input-wrapper">
  <input aria-describedby="input-description" />
  <p id="input-description">At least 8 characters, one uppercase, one number</p>
</div>
```

---

### Input with Both Error and Description

```vue
<ShInput
  id="password"
  v-model="password"
  type="password"
  :error="passwordError"
  description="At least 8 characters"
></ShInput>
```

#### Priority logic:

- If `error` exists: `aria-describedby` links to error (error takes priority).
- If only `description` exists: `aria-describedby` links to description.
- If neither: `aria-describedby` is undefined (no link).

Screen reader announcement when error exists: reads error, not description.

---

### Rule of Thumb:

- Always pair with `<ShLabel>` for form clarity.
- Use `id` for label association and form submission.
- Use `name` if input is inside a form being submitted.
- Use `error` for validation feedback.
- Use `description` for hints or requirements.
- Error message takes priority over description for accessibility.

---

## V-Model Binding

ShInput uses Vue 3 v-model pattern:

```vue
<script setup>
const email = ref("");
</script>

<template>
  <ShInput v-model="email" />
  <!-- Equivalent to: -->
  <!-- <ShInput :modelValue="email" @update:modelValue="email = $event" /> -->
</template>
```

When user types, `update:modelValue` event is emitted with the new value. Parent updates `email` ref, component re-renders with new value.

**Note:** If `disabled` is true, typing does not emit the event.

---

## Events

| **Event**           | **Payload** | **Description**                                   |
| ------------------- | ----------- | ------------------------------------------------- |
| `update:modelValue` | `string`    | Emitted when user types (not emitted if disabled) |

Usage:

```vue
<ShInput v-model="name" @update:modelValue="handleChange" />
```

---

## Styling Hooks

### Classes

- `.sh-input` — Applied to the wrapper `<div>` always.
- `.sh-input__control` — Applied to the `<input>` element.
- `.sh-input__error` — Applied to error message element.
- `.sh-input__description` — Applied to description element.

### Data Attributes

| **Attribute** | **Values**                                     | **Description**                 |
| ------------- | ---------------------------------------------- | ------------------------------- |
| `data-error`  | string                                         | Present when error exists       |
| `data-state`  | "idle" \| "focused" \| "invalid" \| "disabled" | Current input state for styling |

Example:

```scss
.sh-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sh-input__control {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

/* State-based styling */
.sh-input__control[data-state="focused"] {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.sh-input__control[data-state="invalid"] {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.sh-input__control[data-state="disabled"] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Error and description styling */
.sh-input__error {
  color: #ef4444;
  font-size: 0.875rem;
}

.sh-input__description {
  color: #666;
  font-size: 0.875rem;
}
```

---

## Accessibility Requirements

### Required Field Visual Indicators

When using `required={true}`, you **must** provide a visual indicator (asterisk, bold text, color, etc.). This is a WCAG 3.2.2 requirement - screen reader users see `aria-required="true"`, but sighted users need a visual cue too.

#### Using `<ShLabel required>`

Pair with `<ShLabel>` and use the `required` prop:

```vue
<ShLabel for="password" required>Password</ShLabel>
<ShInput id="password" v-model="password" required type="password" />
```

The `<ShLabel>` component renders `data-required="true"` on the element, and the default CSS automatically adds a red asterisk (`*`) after the label text.

**To customize the asterisk styling**, override the CSS:

```scss
.sh-label[data-required="true"]::after {
  content: " *";
  color: orange; /* change color */
  font-weight: bold; /* adjust weight */
  /* or use a different indicator */
  /* content: " (required)"; */
}
```

#### Custom Approaches

If not using `<ShLabel>`, add a visual indicator in your own markup:

```vue
<label for="email">
  Email
  <span aria-label="required" style="color: red;">*</span>
</label>
<ShInput id="email" v-model="email" required type="email" />
```

---

## Dev-time Warnings

ShInput warns during development if:

- No `id`, `aria-label`, or `aria-labelledby` provided (input not accessible to screen readers).

Example:

```
[ShInput] should have one of: `id` (to associate with external label), `aria-label`, or `aria-labelledby`
```
