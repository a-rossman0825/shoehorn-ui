# Styling ShoeHorn UI

ShoeHorn UI is **not a design system**.
It does not ship colors, spacing, or themes.

Instead, it exposes **stable hooks** so *you* control visuals.

---

## How styling works

Each component provides:
- a stable root class (e.g. `.sh-button`)
- `data-*` attributes that describe state

Example:
```html
html

<button
  class="sh-button"
  data-variant="primary"
  data-size="md"
  data-disabled="true"
>
```

---

## Styling with CSS/SCSS
```scss
scss

.sh-button {
  font: inherit;
  padding: 0.5rem 1rem;
}

.sh-button[data-variant="primary"] {
  background: var(--brand-primary);
  color: white;
}

.sh-button[data-size="sm"]{
  font-size: 0.875rem;
}

---

## Why data attributes?
- No class overuse/confusion
- Easy to inspect in DevTools
- Test-friendly
- Framework-agnostic
- No JS logic in CSS

---

## Theming & dark mode

ShoeHorn UI works well with CSS variables:

```css
css

:root {
  --brand-primary: #2563eb;
}

[data-theme="dark"] {
  --brand-primary: #60a5fa;
}
```

You control:
- light/dark modes
- branding
- spacing
- animation

