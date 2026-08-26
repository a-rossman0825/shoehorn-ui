# ShoeHorn UI Agent Guide

## Project mission

ShoeHorn UI is an accessibility-first, design-agnostic component library for Vue 3 and TypeScript. It should make the accessible implementation the easiest implementation, make invalid combinations difficult or impossible to express, and warn developers when runtime usage cannot be validated statically.

The library owns component semantics, interaction behavior, focus management, form behavior, accessible state, and minimal structural styling. It does not own an application's visual identity.

Build components that help consuming applications conform to WCAG 2.2 Level AA. Do not claim that a component library alone is "WCAG compliant": WCAG conformance applies to complete pages. Public language should say that ShoeHorn UI is designed and tested to support WCAG 2.2 Level AA conformance when components are used according to their documented contracts.

## Priorities

When requirements compete, use this order:

1. Correct native semantics and accessible behavior.
2. Predictable keyboard, pointer, touch, screen-reader, and form behavior.
3. Type-safe APIs that prevent invalid combinations.
4. Compatibility with SSR, hydration, and multiple component instances.
5. A consistent and understandable developer experience.
6. Design-agnostic styling and extensibility.
7. Implementation brevity.

Do not preserve an existing implementation detail when it conflicts with native HTML behavior, WCAG, WAI-ARIA, or the component's documented accessibility contract. Preserve the project's style and API philosophy while correcting the underlying behavior.

## Established code style

Follow the style established by `ShButton`, `ShInput`, `ShLabel`, and `ShBadge`:

- Vue 3 Single File Components with `<script setup lang="ts">`.
- TypeScript props and typed tuple-style emits.
- `withDefaults(defineProps<...>(), {...})` where defaults are meaningful.
- Computed values for resolved attributes and derived state.
- Small composables and utilities for behavior shared across components.
- Dev-only warnings for invalid runtime usage.
- BEM class names using the `sh-` prefix, such as `sh-input__control`.
- State and variants exposed through `data-*` attributes.
- Component folders containing the SFC, SCSS, tests, and `index.ts` export.
- Markdown documentation in `docs/components/` with practical examples and accessibility guidance.
- Double quotes, semicolons, and formatting governed by Prettier.

Prefer readable names such as `resolvedAriaLabel`, `handleFocus`, and `descriptionId`. Keep functions focused. Remove obsolete commented-out implementations and temporary refactor notes once the replacement is established.

Do not put TypeScript `as` assertions directly in Vue template expressions. Resolve typed values in the script because the template parser can interpret pipes as deprecated Vue filters.

## Accessibility principles

### Native HTML first

Use the native element that matches the interaction:

- Actions use `<button>`.
- Navigation uses `<a href>`.
- Text inputs use `<input>` or `<textarea>`.
- Selection from a short static list uses `<select>` when it satisfies the requirement.
- Checkboxes and radio buttons remain native inputs unless a different pattern is truly necessary.
- Related native radios use `<fieldset>` and `<legend>`.
- Lists, headings, landmarks, and tables use their corresponding native elements.

Do not add a redundant role to a native element. Do not recreate native keyboard behavior unless implementing a composite WAI-ARIA widget. Never turn a link into a button by adding `role="button"`, and never use a non-interactive element as an interaction target when a native element works.

### ARIA rules

Follow the first rule of ARIA: do not use ARIA when native HTML supplies the required semantics and behavior.

- Every interactive control must have a programmatically determinable accessible name.
- `aria-labelledby` should take precedence over `aria-label` when both are intentionally supported.
- Every ID reference must resolve to an existing, unique element.
- Combine generated and consumer-provided `aria-describedby` IDs; do not silently discard either.
- Use `aria-invalid="true"` only for a known invalid state. Omit it otherwise unless a component contract explicitly requires `false`.
- Communicate state through native properties first, then ARIA where required.
- Do not add live regions or `role="alert"` indiscriminately. Announce changes only when the user needs the update and avoid duplicate announcements.
- Disabled, readonly, required, selected, expanded, checked, pressed, current, and busy states must be exposed consistently to visual users and assistive technology.
- Do not use `aria-hidden="true"` on focusable elements or meaningful form controls.

For composite widgets, follow the current WAI-ARIA Authoring Practices pattern for the widget and document any intentional difference. APG examples are implementation guidance, not substitutes for testing.

### Keyboard and focus

- All functionality must be operable with a keyboard.
- Preserve native keyboard behavior for native controls.
- Composite widgets must implement their documented arrow, Home, End, Enter, Space, Escape, and Tab behavior.
- Roving-tabindex widgets must move DOM focus when the active item changes.
- Focus must remain visible and must never become trapped except inside an active modal dialog.
- Opening overlays must place focus intentionally; closing them must restore focus when the prior target is still valid.
- Disabled and hidden elements must not be selected as focus targets.
- Test focus behavior in a real browser; jsdom alone is insufficient.

### Visual accessibility

Even a design-agnostic library owns accessibility-essential CSS:

- Provide a visible `:focus-visible` treatment with sufficient contrast and area.
- Never rely on color alone for error, selected, required, or active state.
- Support text zoom, 400% reflow, and content expansion.
- Respect `prefers-reduced-motion`.
- Support forced-colors/high-contrast mode.
- Support RTL for directional layouts and keyboard behavior where applicable.
- Keep pointer targets at least WCAG 2.2 AA minimum size and prefer 44 by 44 CSS pixels where practical.
- Do not disable browser zoom or introduce horizontal scrolling at narrow viewport widths without necessity.

Consumer-supplied themes can invalidate contrast. Document token pairings and contrast responsibilities rather than claiming arbitrary consumer colors are accessible.

## Component API rules

### Attribute forwarding

When a component wraps a native control, use `defineOptions({ inheritAttrs: false })` and intentionally forward relevant attributes and listeners to the native control. Attributes such as `aria-label`, `aria-labelledby`, `aria-describedby`, `autocomplete`, `inputmode`, and `data-*` must not accidentally land on a wrapper.

Do not maintain unnecessarily narrow allowlists for native HTML attributes. Preserve Vue's normal event behavior and avoid emitting duplicate events.

### IDs and SSR

- Use Vue's `useId()` or a shared SSR-safe ID utility.
- Never generate render IDs with `Math.random()`.
- Prefix related IDs with a component-instance ID, not only an item value.
- Multiple instances and repeated item values must never create duplicate IDs.
- Server-rendered markup must hydrate without ID or state mismatches.

### Controlled state

Treat `modelValue` and `open` props as controlled state unless the API explicitly supports an uncontrolled default. Emit updates without assuming the parent has already applied them. Watch for prop changes and reconcile invalid or removed selections safely.

Do not mutate props or derive focus targets from stale controlled values. If an event selects an item and focus must move immediately, use the selected item from the event rather than waiting for the parent to update.

### Forms

Form controls must be tested for:

- `name` and value submission through `FormData`.
- Native required and constraint validation.
- Disabled controls being excluded from submission.
- Form reset behavior.
- Labels and descriptions.
- Error state and error-message association.
- Autofill and autocomplete where relevant.
- Focus of invalid fields.

Do not pair a hidden required input with a visible custom control if the browser may attempt to focus an unreachable input. Do not prevent native form submission by default unless that is an explicit, documented API choice.

### Types

Use discriminated unions when one prop changes the validity of another, as with element type or icon-only labels. Types should prevent impossible states without making ordinary native-attribute use cumbersome.

Export reusable public prop and option types from `.ts` modules when possible rather than depending on types declared inside an SFC. Avoid `any`; if an unavoidable framework boundary requires it, isolate and explain it.

### Development warnings

Use warnings for conditions that cannot be enforced at compile time. Warnings must:

- Run only outside production.
- State the component, problem, and corrective action.
- Avoid false positives in valid usage.
- Validate meaningful values rather than only attribute presence.
- Re-evaluate when relevant reactive inputs change if the invalid state can change after mount.

Warnings complement accessible behavior; they do not replace it. Prefer stable warning codes and documentation links as the warning system grows.

## Shared architecture

Extract shared code only after the contract is understood. Likely shared primitives include:

- Stable ID generation.
- Accessible-name and referenced-ID resolution.
- Merging description IDs.
- Field context for label, description, error, required, disabled, and invalid state.
- Controllable state.
- Roving focus.
- Focus scopes and restoration.
- Dismissable overlay behavior.
- Form-control integration.

Keep composables framework-appropriate and independently tested. Avoid a monolithic accessibility helper that hides component-specific semantics.

`ShField` should ultimately provide context so form components can inherit IDs and state without requiring consumers to manually duplicate ARIA wiring. Direct standalone usage must remain possible.

## Styling policy

SCSS should provide structure and accessibility essentials, not a fixed brand design.

- Use `sh-` BEM selectors.
- Expose state through attributes such as `data-state`, `data-disabled`, and `data-invalid`.
- Use CSS custom properties for configurable values.
- Provide safe fallbacks where a minimal default theme is intended.
- Avoid broad global resets in the mandatory stylesheet; make resets optional or scope them.
- Separate headless/essential CSS from an optional starter theme if the package grows in visual scope.
- Do not use `transition: all`.
- Add reduced-motion and forced-colors behavior alongside the base style, not as an afterthought.

## Testing requirements

Every supported component needs tests before it is documented as complete.

### Unit and contract tests

Use Vitest and Vue Test Utils to cover:

- Default element and semantics.
- Props, slots, and attribute forwarding.
- Accessible name and description wiring.
- State attributes and ARIA state.
- Emitted events and controlled updates.
- Disabled and readonly behavior.
- Form behavior where applicable.
- Dev warnings and valid no-warning cases.
- Dynamic prop and option changes.
- Multiple instances and unique IDs.

Tests should mount components in valid accessible configurations unless the test intentionally verifies a warning. Do not leave expected warning noise in successful test output.

### Automated accessibility tests

Run axe against representative states, but never treat a clean axe result as proof of accessibility. Cover default, disabled, invalid, expanded, selected, empty, loading, and other meaningful states.

### Browser interaction tests

Use Playwright or an equivalent real-browser runner for:

- Tab order and visible focus.
- Composite-widget keyboard interaction.
- Dialog focus containment and restoration.
- Pointer/blur ordering in overlays and comboboxes.
- Native form submission, reset, and validation.
- SSR hydration where applicable.
- Reduced motion, forced colors, RTL, zoom, and reflow.

### Manual verification

Complex components require manual assistive-technology testing. Maintain a dated support matrix covering at least:

- NVDA with Firefox and Chrome.
- VoiceOver with Safari on macOS and iOS.
- TalkBack with Chrome on Android.
- JAWS with Chrome when resources permit.

Record known limitations instead of hiding them.

## Documentation requirements

Each component document should include:

- Purpose and when not to use it.
- Installation/import example.
- Basic and advanced usage.
- Props, emits, slots, exposed methods, and styling hooks.
- Generated DOM and semantic model where helpful.
- Accessible-name requirements.
- Keyboard interaction table for interactive widgets.
- Form behavior where applicable.
- Required consumer responsibilities.
- Dev warnings.
- Known limitations and assistive-technology notes.

Examples must compile and must model accessible usage. Do not use placeholder text as a label. Do not document unimplemented behavior. Keep README roadmap and completion claims synchronized with the code and test suite.

## Repository and package conventions

- Public components must be exported from their folder `index.ts`, `src/components/index.ts`, and ultimately `src/index.ts`.
- Public types and optional Vue plugin installation must be included deliberately in package exports.
- Do not import styles or components that do not exist.
- Keep tests excluded from generated declarations and distribution output.
- Validate the packed package in a small consumer fixture, not only from source.
- Preserve tree shaking and keep Vue external to the bundle.
- Do not edit unrelated user changes. Check `git status` before and after work.

## Definition of done

A component or change is not complete until:

1. Native semantics and the relevant WAI-ARIA pattern have been reviewed.
2. Mouse, touch, keyboard, focus, screen-reader, form, and dynamic-state behavior have been considered.
3. Types prevent known invalid prop combinations where practical.
4. Attributes reach the correct native element.
5. IDs are unique and SSR-safe.
6. Unit, accessibility, and browser tests cover representative states.
7. Documentation describes both library guarantees and consumer responsibilities.
8. Build, type generation, lint, formatting, and all tests pass without unexpected warnings.
9. The component is exported and usable from the built package.
10. Claims in the README and roadmap reflect the verified implementation.

## Current repository hazards

Before building new components, verify and address these known issues rather than copying them:

- `src/components/index.ts` currently exports only Button, Input, Label, and Badge.
- `src/styles/index.scss` references component styles that do not exist, so the production build currently fails.
- `ShField.vue` currently has no template.
- Several components use `Math.random()` for IDs and are not SSR-safe.
- Some wrapped controls do not forward consumer ARIA attributes to the native control.
- Several template type assertions currently cause lint parser errors.
- Tabs, Dialog, Combobox, RadioGroup, Switch, and link-mode Button need semantic or focus corrections before being considered stable.
- Existing automated tests cover only a small subset of components, despite broader documentation claims.
- `docs/components/accordion.md` may contain user work in progress; preserve unrelated edits.

Stabilize the foundation and verification pipeline before expanding the component catalog. A smaller set of demonstrably reliable primitives is more valuable than a large collection with unverified accessibility behavior.
