# ShField

A form field wrapper that provides label, description, and error messaging.

---

## Basic Usage

```vue
<template>
  <ShField label="Username">
    <ShInput v-model="username" />
  </ShField>
</template>
```

---

## With Description

```vue
<ShField label="Password" description="Must be at least 8 characters">
  <ShInput type="password" v-model="password" />
</ShField>
```

---

## Required Field

```vue
<ShField label="Email" required>
  <ShInput type="email" v-model="email" />
</ShField>
```

---

## With Error

```vue
<ShField label="Email" :error="emailError">
  <ShInput type="email" v-model="email" />
</ShField>
```

---

## Props

| **Prop**      | **Type** | **Default** | **Description**         |
| ------------- | -------- | ----------- | ----------------------- |
| `label`       | string   | undefined   | Field label text        |
| `for`         | string   | (auto)      | ID of associated input  |
| `error`       | string   | undefined   | Error message           |
| `description` | string   | undefined   | Help text               |
| `required`    | boolean  | false       | Show required indicator |
| `optional`    | boolean  | false       | Show optional indicator |

---

## Slots

| **Slot**  | **Description**                    |
| --------- | ---------------------------------- |
| `default` | Form control (input, select, etc.) |
| `label`   | Custom label content               |

---

## Accessibility

ShField follows accessibility best practices:

- **Label Association**
  - Automatically links label to input via `for` attribute
  - Generates ID if not provided
- **Description IDs**
  - Sets `aria-describedby` with description + error IDs
  - Screen readers announce help text
- **Required/Optional**
  - Visual indicators for field requirements
  - Semantic HTML for validation
- **Error Messages**
  - Associated with input via `aria-describedby`
  - Role announcements for errors

---

## Styling Hooks

#### Classes

- `.sh-field` - Field container
- `.sh-field__label-wrapper` - Label row
- `.sh-field__label` - Label text
- `.sh-field__required` - Required indicator
- `.sh-field__optional` - Optional indicator
- `.sh-field__description` - Description text
- `.sh-field__error` - Error message
- `.sh-field__control` - Control wrapper

---

## When to Use ShField

- Form inputs that need labels
- Fields with help text
- Error messaging
- Consistent field layout

**Don't use for:**

- Checkbox/radio → use ShCheckbox/ShRadioGroup
- Standalone buttons
- Read-only data display
