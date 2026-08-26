# Contributing to ShoeHorn UI

Thank you for helping make accessible Vue interfaces easier to build.

## Development

Requirements: Node.js 20.19 or newer and npm.

```bash
npm ci
npm run test:run
npm run check
```

Read [AGENTS.md](./AGENTS.md) before changing component behavior. It defines the project's semantic, accessibility, API, styling, testing, and documentation contracts.

## Component changes

Before opening a pull request:

1. Review the native HTML element and applicable WAI-ARIA Authoring Practices pattern.
2. Preserve native keyboard behavior wherever possible.
3. Add tests for semantics, accessible names and descriptions, state, keyboard behavior, forms, and dynamic updates.
4. Add an axe smoke test for representative markup.
5. Update component documentation, including consumer responsibilities and known limitations.
6. Run `npm run check` without warnings or failures.

Complex widgets also require real-browser and manual assistive-technology verification before being promoted to stable.

## Pull requests

Keep changes focused and describe:

- The user problem being solved.
- Semantic or interaction decisions.
- Keyboard and focus behavior.
- Tests performed, including browser and assistive-technology combinations.
- Any known limitations or consumer responsibilities.

Do not describe a component as “WCAG compliant.” Components can support a consuming page's conformance, but WCAG conformance applies to complete pages.
