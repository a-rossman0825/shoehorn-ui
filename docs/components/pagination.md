# ShPagination

An accessible pagination component for navigating paged results.

---

## Usage, Options, and Requirements:

### Basic Pagination

```vue
<ShPagination v-model="page" :total="250" :perPage="25" />
```

#### Acts as:

A `<nav aria-label="Pagination">` that renders page controls, previous/next buttons, and optional first/last buttons.

#### Optional Attributes:

##### ModelValue

`number`

- The current page number.
- Required.
- Use with `v-model`.

Usage:

```vue
<ShPagination v-model="page" :total="120" />
```

##### Total

`number`

- Total number of items across all pages.
- Required.

Usage:

```vue
<ShPagination v-model="page" :total="80" />
```

##### PerPage

`number`

- Number of items shown per page.
- Defaults to `10` if not specified.

Usage:

```vue
<ShPagination v-model="page" :total="250" :perPage="25" />
```

##### ShowFirstLast

`true` | `false`

- Controls whether first/last page jump buttons are rendered.
- Defaults to `true` if not specified.

Usage:

```vue
<ShPagination v-model="page" :total="250" :showFirstLast="false" />
```

##### MaxVisible

`number`

- Maximum number of page buttons shown in the visible range.
- Defaults to `7` if not specified.

Usage:

```vue
<ShPagination v-model="page" :total="500" :maxVisible="5" />
```

#### Requirements:

- `modelValue` should be between `1` and the total page count.
- `total` should be greater than or equal to `0`.

---

### Compact Pagination

```vue
<ShPagination
  v-model="page"
  :total="96"
  :perPage="12"
  :maxVisible="5"
  :showFirstLast="false"
/>
```

- Useful for tighter layouts.
- Still includes previous and next buttons.

---

### Rule of Thumb:

- Keep `maxVisible` low when space is limited.
- Hide first/last controls only when pagination stays easy to understand.
- Pair with visible page context elsewhere in the UI when possible.

---

## Events

| **Event**           | **Payload** | **Description**               |
| ------------------- | ----------- | ----------------------------- |
| `update:modelValue` | `number`    | Emitted when the page changes |

Usage:

```vue
<ShPagination v-model="page" :total="results.length" />
```

---

## Styling Hooks

### Classes

- `.sh-pagination` — Applied to the root nav element always.
- `.sh-pagination__list` — Applied to the list of controls.
- `.sh-pagination__item` — Applied to each list item.
- `.sh-pagination__button` — Applied to every pagination button.
- `.sh-pagination__button--current` — Applied to the active page button.
- `.sh-pagination__ellipsis` — Applied to ellipsis markers.

Example:

```scss
.sh-pagination__button--current {
  font-weight: 700;
  text-decoration: underline;
}

.sh-pagination__ellipsis {
  opacity: 0.65;
}
```

---

## Dev-time Warnings

ShPagination warns during development if:

- `modelValue` is less than `1`.
- `modelValue` is greater than the computed total page count.

Example:

```
[ShPagination] Current page is out of bounds. Expected between 1 and 8, received 12.
```
