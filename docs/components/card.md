# ShCard

A simple container component for grouping related content.

---

## Basic Usage

```vue
<template>
  <ShCard>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </ShCard>
</template>
```

---

## Semantic Variants

```vue
<!-- As article for standalone content -->
<ShCard as="article">
  <h2>Blog Post Title</h2>
  <p>Post content...</p>
</ShCard>

<!-- As section for document sections -->
<ShCard as="section">
  <h2>Section Title</h2>
  <p>Section content...</p>
</ShCard>
```

---

## Props

| **Prop** | **Type**                                | **Default** | **Description**       |
| -------- | --------------------------------------- | ----------- | --------------------- |
| `as`     | 'div' &#124; 'article' &#124; 'section' | 'div'       | Semantic HTML element |

---

## Accessibility

ShCard is a presentational component with semantic flexibility:

- **Semantic HTML**
  - Use `as="article"` for self-contained content
  - Use `as="section"` for thematic grouping
  - Default `div` for generic containers
- **Headings**
  - Include appropriate heading levels in card content
  - Maintain document outline hierarchy

---

## Styling Hooks

#### Classes

- `.sh-card` - Card container

Example:

```scss
.sh-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
}
```

---

## When to Use ShCard

- Grouping related information
- Visual separation of content sections
- Creating layouts with distinct content blocks
- Dashboard widgets

**Note:** ShCard is intentionally simple and unstyled by design. It provides structure and minimal styling, allowing you to build card variants suited to your needs.
