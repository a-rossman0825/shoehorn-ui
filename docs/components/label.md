# ShLabel

An accessible label component for form controls.

---

## Basic Usage

```vue
<template>
  <ShLabel for="email-input"> Email address </ShLabel>
  <ShInput id="email-input" />
</template>
```

---

## Required Field

```vue
<template>
  <ShLabel for="name" :required="true"> Name </ShLabel>
  <ShInput id="name" required />
</template>
```

---

## Props

| **Prop**   | **Type** | **Default** | **Description**               |
| ---------- | -------- | ----------- | ----------------------------- |
| `for`      | string   | undefined   | ID of associated form control |
| `required` | boolean  | false       | Shows required indicator (\*) |

---

## Accessibility

ShLabel provides explicit form control labeling:

- **Association**
  - Uses native `<label>` with `for` attribute
  - Warns when `for` attribute is missing
  - Automatically associates with control for click activation
- **Required Indicator**
  - Adds visual asterisk (\*) when required
  - Includes `aria-label="required"` on indicator

---

## Styling Hooks

#### Classes

- `.sh-label` - Label element
- `.sh-label__required` - Required indicator (\*)

#### Data Attributes

```html
data-required="true"
```

---

## When to Use ShLabel

- Explicit labeling of form controls
- When using form components without built-in labels
- Complex form layouts requiring separate labels
- Custom form control implementations

**Note:** Many Shoehorn components (ShInput, ShTextarea, etc.) have built-in label props. Use ShLabel when you need more control over label positioning or styling.
