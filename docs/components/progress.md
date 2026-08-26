# ShProgress

`ShProgress` uses the native `<progress>` element and an associated visible label.

```vue
<ShProgress label="Uploading files" :value="uploaded" :max="total" show-value />
<ShProgress label="Preparing download" />
```

Omitting `value` creates an indeterminate progress indicator. `valueText` supplies a human-readable alternative when a numeric percentage is not meaningful. `showValue` adds a visual percentage without duplicating screen-reader output.

Use Progress for a task's completion, not an unknown loading duration with no meaningful progress. For that case, use `ShSpinner` with nearby status text.
