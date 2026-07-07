# ShBreadcrumbs

An accessible breadcrumb navigation component.

---

## Usage, Options, and Requirements:

### Basic Breadcrumbs

```vue
<ShBreadcrumbs
  :items="[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', current: true },
  ]"
/>
```

#### Acts as:

A native `<nav aria-label="Breadcrumb">` containing an ordered list of breadcrumb items.

#### Optional Attributes:

##### Items

`{ label: string; href?: string; current?: boolean }[]`

- Defines the breadcrumb trail.
- `label` is the visible text.
- `href` renders the breadcrumb as a link when the item is not current.
- `current` marks the active page and applies `aria-current="page"`.

Usage:

```vue
<ShBreadcrumbs
  :items="[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Reports', current: true },
  ]"
/>
```

##### Separator

`string`

- Sets the visible separator between breadcrumb items.
- Defaults to `/` if not specified.

Usage:

```vue
<ShBreadcrumbs :items="items" separator=">" />
```

#### Requirements:

- Provide at least one breadcrumb item.
- Mark the current page with `current: true`.
- Non-current items should usually include `href` so they behave like links.

---

### Current Page Only

```vue
<ShBreadcrumbs :items="[{ label: 'Account', current: true }]" />
```

- Useful when the current page still benefits from breadcrumb context.
- The current item renders as text instead of a link.

---

### Rule of Thumb:

- Use breadcrumb items in the same order users navigated to reach the page.
- Mark only one item as current.
- Keep breadcrumb labels short and recognizable.

---

## Styling Hooks

### Classes

- `.sh-breadcrumbs` — Applied to the root nav element always.
- `.sh-breadcrumbs__list` — Applied to the ordered list.
- `.sh-breadcrumbs__item` — Applied to each breadcrumb item.
- `.sh-breadcrumbs__link` — Applied to linked breadcrumb items.
- `.sh-breadcrumbs__current` — Applied to the current page item.
- `.sh-breadcrumbs__separator` — Applied to the separator text.

Example:

```scss
.sh-breadcrumbs__list {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.sh-breadcrumbs__separator {
  opacity: 0.6;
}

.sh-breadcrumbs__current {
  font-weight: 600;
}
```

---

## Dev-time Warnings

ShBreadcrumbs warns during development if:

- No `items` prop is provided.
- `items` is an empty array.

Example:

```
[ShBreadcrumbs] Breadcrumbs has no items. Provide the `items` prop with at least one breadcrumb.
```
