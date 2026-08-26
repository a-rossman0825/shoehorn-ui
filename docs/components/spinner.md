# ShSpinner

`ShSpinner` is a compact loading indicator.

```vue
<ShSpinner label="Loading search results" />
<ShSpinner decorative />
```

The default exposes `role="status"` and an accessible label. Set `decorative` only when adjacent visible or programmatic text already announces loading. The animation slows under `prefers-reduced-motion`.

Do not use an unlabeled spinner as the only indication that an operation is in progress.
