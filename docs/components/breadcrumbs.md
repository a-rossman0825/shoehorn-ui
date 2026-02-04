# ShBreadcrumbs

An accessible breadcrumb navigation component.

---

## Basic Usage

```vue
<script setup lang="ts">
const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Electronics", href: "/products/electronics" },
  { label: "Laptop", current: true },
];
</script>

<template>
  <ShBreadcrumbs :items="breadcrumbs" />
</template>
```

---

## Custom Separator

```vue
<ShBreadcrumbs :items="breadcrumbs" separator=">" />
```

---

## Props

| **Prop**    | **Type**         | **Default** | **Description**           |
| ----------- | ---------------- | ----------- | ------------------------- |
| `items`     | BreadcrumbItem[] | []          | Array of breadcrumb items |
| `separator` | string           | '/'         | Separator between items   |

### BreadcrumbItem Interface

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean; // Marks current page
}
```

---

## Accessibility

ShBreadcrumbs follows accessibility best practices:

- **Landmark Navigation**
  - Uses `<nav>` with `aria-label="Breadcrumb"`
  - Helps screen reader users understand context
- **Current Page**
  - Sets `aria-current="page"` on current item
  - Renders as text, not link
- **Semantic HTML**
  - Uses `<ol>` for ordered list
  - Proper link structure
- **Separators**
  - Hidden from screen readers with `aria-hidden`

---

## Styling Hooks

#### Classes

- `.sh-breadcrumbs` - Nav container
- `.sh-breadcrumbs__list` - Ordered list
- `.sh-breadcrumbs__item` - List item
- `.sh-breadcrumbs__link` - Breadcrumb link
- `.sh-breadcrumbs__current` - Current page
- `.sh-breadcrumbs__separator` - Separator

---

## When to Use ShBreadcrumbs

- Multi-level navigation
- Show current location in hierarchy
- Help users navigate back
- E-commerce category pages

**Don't use for:**

- Single-level sites
- Linear processes → use stepper/progress
- Primary navigation → use menu/nav
