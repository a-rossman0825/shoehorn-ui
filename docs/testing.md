# Accessibility testing

ShoeHorn UI uses complementary test layers. No single tool establishes accessibility or WCAG conformance.

## Automated checks

- Vitest and Vue Test Utils verify semantics, ARIA relationships, controlled state, emitted events, forms, and keyboard contracts.
- axe-core smoke tests scan representative component states for detectable accessibility violations.
- TypeScript declaration generation validates the public type surface.
- ESLint and Prettier enforce source consistency.
- The production bundle and packed npm contents are verified in CI.

Run everything with:

```bash
npm run check
```

The jsdom axe suite disables page-landmark checks because it scans isolated component fragments. Color contrast is also excluded there because jsdom does not implement canvas; contrast must be evaluated in real-browser visual testing.

## Manual and browser verification

Composite widgets require browser testing for focus movement, pointer and blur ordering, zoom and reflow, reduced motion, forced colors, RTL, and native form behavior.

Manual assistive-technology results should be recorded with the date, component version, operating system, browser, screen reader, and known limitations. The target matrix is:

| Screen reader | Browser | Platform | Status                          |
| ------------- | ------- | -------- | ------------------------------- |
| NVDA          | Firefox | Windows  | Pending documented verification |
| NVDA          | Chrome  | Windows  | Pending documented verification |
| VoiceOver     | Safari  | macOS    | Pending documented verification |
| VoiceOver     | Safari  | iOS      | Pending documented verification |
| TalkBack      | Chrome  | Android  | Pending documented verification |
| JAWS          | Chrome  | Windows  | Pending resources               |

Do not mark a pending combination as supported until a dated manual test record exists.
