# ShForm

A form wrapper component that provides context for form fields.

---

## Basic Usage

```vue
<script setup lang="ts">
const handleSubmit = (event: Event) => {
  console.log("Form submitted");
};
</script>

<template>
  <ShForm @submit="handleSubmit">
    <ShField label="Name">
      <ShInput v-model="name" required />
    </ShField>

    <ShField label="Email">
      <ShInput v-model="email" type="email" required />
    </ShField>

    <ShButton type="submit">Submit</ShButton>
  </ShForm>
</template>
```

---

## Custom Element

```vue
<ShForm as="div">
  <!-- Not a real form element -->
</ShForm>
```

---

## Named Form

```vue
<ShForm name="user-registration">
  <!-- Form fields -->
</ShForm>
```

---

## Props

| **Prop** | **Type** | **Default** | **Description**       |
| -------- | -------- | ----------- | --------------------- |
| `as`     | string   | 'form'      | Element tag to render |
| `name`   | string   | undefined   | Form name             |

---

## Events

| **Event** | **Payload** | **Description**                                 |
| --------- | ----------- | ----------------------------------------------- |
| `submit`  | Event       | Emitted when form submitted (default prevented) |

---

## Accessibility

ShForm follows accessibility best practices:

- **Native Form Behavior**
  - Preserves browser form validation
  - Prevents default submission automatically
- **Form Context**
  - Provides context to child components
  - Links fields and labels correctly
- **Keyboard Support**
  - Enter key submits form
  - Tab navigation between fields

---

## Styling Hooks

#### Classes

- `.sh-form` - Form container

---

## When to Use ShForm

- Collecting user input
- Login/registration flows
- Settings pages
- Data entry

**Don't use for:**

- Single input → just use ShInput
- Search bars → use search-specific component
- Filters → use filter component
