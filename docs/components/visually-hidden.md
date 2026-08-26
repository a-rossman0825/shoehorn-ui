# ShVisuallyHidden

`ShVisuallyHidden` keeps content available to assistive technology while removing it from visual layout.

```vue
<ShVisuallyHidden>Opens in a new window</ShVisuallyHidden>
```

Set `as` to choose the rendered element. With `focusable`, content remains visually hidden until it or a descendant receives focus, which is useful for skip links.

Do not hide content merely to repair unclear visible text. Accessible names should normally match the visible interface, and focusable controls must never remain permanently visually hidden.
