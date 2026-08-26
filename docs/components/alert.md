# ShAlert

`ShAlert` displays status feedback with explicit live-region behavior.

```vue
<ShAlert variant="success">Profile saved.</ShAlert>
<ShAlert variant="error" live="assertive">Your session expired.</ShAlert>
```

`variant` is a visual styling hook. `live` defaults to `polite`; use `assertive` only for urgent interruptions and `off` for content that should not be announced as it appears. `atomic` defaults to true so the complete message is announced when it changes.

Do not insert a live region and its message in the same render when reliable announcement timing is critical; keep the region mounted and update its content. Avoid repeating the same update through multiple live regions.
