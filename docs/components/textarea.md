# ShTextarea

An accessible multi-line text input component.

---

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from "vue";

const bio = ref("");
</script>

<template>
  <ShTextarea
    v-model="bio"
    label="Biography"
    placeholder="Tell us about yourself"
    :rows="6"
  />
</template>
```

---

## With Description and Error

```vue
<ShTextarea
  v-model="comments"
  label="Comments"
  description="Max 500 characters"
  :error="commentsError"
  :maxlength="500"
/>
```

---

## Resize Options

```vue
<!-- Prevent resizing -->
<ShTextarea v-model="text" resize="none" />

<!-- Allow both directions -->
<ShTextarea v-model="text" resize="both" />

<!-- Horizontal only -->
<ShTextarea v-model="text" resize="horizontal" />

<!-- Vertical only (default) -->
<ShTextarea v-model="text" resize="vertical" />
```

---

## Props

| **Prop**      | **Type**                                                   | **Default**    | **Description**           |
| ------------- | ---------------------------------------------------------- | -------------- | ------------------------- |
| `modelValue`  | string                                                     | undefined      | Textarea value            |
| `id`          | string                                                     | auto-generated | Textarea element ID       |
| `name`        | string                                                     | undefined      | Form field name           |
| `disabled`    | boolean                                                    | false          | Disables interaction      |
| `readonly`    | boolean                                                    | false          | Makes textarea read-only  |
| `required`    | boolean                                                    | false          | Makes field required      |
| `placeholder` | string                                                     | undefined      | Placeholder text          |
| `minlength`   | number                                                     | undefined      | Minimum length            |
| `maxlength`   | number                                                     | undefined      | Maximum length            |
| `rows`        | number                                                     | 4              | Number of visible rows    |
| `cols`        | number                                                     | undefined      | Number of visible columns |
| `resize`      | 'none' &#124; 'both' &#124; 'horizontal' &#124; 'vertical' | 'vertical'     | Resize behavior           |
| `label`       | string                                                     | undefined      | Label text                |
| `error`       | string                                                     | undefined      | Error message             |
| `description` | string                                                     | undefined      | Help text                 |

---

## Events

| **Event**           | **Payload** | **Description**                      |
| ------------------- | ----------- | ------------------------------------ |
| `update:modelValue` | string      | Emitted when value changes           |
| `focus`             | FocusEvent  | Emitted when textarea receives focus |
| `blur`              | FocusEvent  | Emitted when textarea loses focus    |

---

## Accessibility

ShTextarea extends ShInput's accessibility patterns:

- **Labeling**
  - Automatically associates `<label>` with `<textarea>`
  - Warns in development if no accessible label present
  - Supports `aria-label` and `aria-labelledby`
- **Error Handling**
  - Sets `aria-invalid` when error provided
  - Associates error text using `aria-describedby`
  - Uses `role="alert"` for error announcements
- **Native Semantics**
  - Uses native `<textarea>` element
  - Preserves browser behavior and keyboard support
- **Developer Warnings**
  - Warns when no accessible label provided
  - Warns when required without visual indicator

---

## Exposed Methods

```typescript
focus(): void   // Programmatically focus the textarea
blur(): void    // Programmatically blur the textarea
select(): void  // Select all text in the textarea
```

---

## Styling Hooks

#### Classes

- `.sh-textarea` - Container
- `.sh-textarea__label` - Label element
- `.sh-textarea__control` - Textarea element
- `.sh-textarea__description` - Description text
- `.sh-textarea__error` - Error message

#### Data Attributes

```html
data-state="idle | focused | invalid | disabled" data-resize="none | both |
horizontal | vertical"
```

Example:

```scss
.sh-textarea__control[data-state="focused"] {
  border-color: blue;
}

.sh-textarea__control[data-resize="none"] {
  resize: none;
}
```

---

## When to Use ShTextarea

- Multi-line text input
- Comments, descriptions, messages
- Long-form content
- Any text longer than a few words

**Don't use for:**

- Single-line text → use ShInput
- Passwords or sensitive short data → use ShInput with type="password"
- Code editing → consider specialized code editor
