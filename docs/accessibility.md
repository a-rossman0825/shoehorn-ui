# Accessibility

ShoeHorn UI is designed and tested to support WCAG 2.2 Level AA conformance when components are used according to their documented contracts. WCAG conformance applies to complete pages rather than isolated components, so this library does not claim that installing it makes an application conformant.

## What the library provides

- Native elements and semantics whenever possible.
- Accessible-name and description wiring.
- Keyboard and focus behavior for composite widgets.
- Native form submission and validation behavior.
- SSR-safe, instance-safe relationships.
- Visible focus styles and state hooks.
- Reduced-motion and forced-colors support.
- Development warnings for invalid runtime usage.
- Automated semantic, interaction, and axe tests.

## Consumer responsibilities

Applications must still provide:

- Meaningful labels, link text, headings, instructions, and error messages.
- Logical page structure, landmarks, heading order, and reading order.
- Accessible color contrast in custom themes.
- Text alternatives for images and media.
- Appropriate live-region timing and content.
- Page-level focus management and route-change announcements.
- Testing at supported zoom levels, viewport sizes, languages, and content lengths.
- Browser and assistive-technology verification for the final application.

## Native HTML first

Actions use buttons, navigation uses links, and form controls retain native inputs wherever possible. ARIA is added only when native semantics do not express required state or relationships.

Do not change a link into a button with `role="button"`, suppress native keyboard behavior, remove focus outlines, or hide a focusable element from assistive technology.

## Accessible names

Every interactive component requires an accessible name. Prefer visible text associated through native HTML. `aria-labelledby` is the next choice when visible text already exists elsewhere. Use `aria-label` when a visible label cannot be provided, such as a genuinely icon-only control.

Placeholder text is not a label. An ID alone also does not label a control; the ID must be referenced by an associated `<label>` or `aria-labelledby` relationship.

## Fields and errors

`ShField` provides a stable control ID plus label, description, error, required, disabled, and invalid state to compatible child controls. Consumer-provided `aria-describedby` values are merged with generated description and error IDs.

Do not announce every error immediately as an alert. Errors shown after submission or direct validation should be associated with the field; applications can add an error summary and move focus when a form-wide update requires attention.

## Composite widgets

Accordion, Tabs, Dialog, Combobox, and Tooltip follow their relevant WAI-ARIA Authoring Practices interaction models. The components preserve these expectations:

- Tab remains the primary way into and out of widgets.
- Arrow keys move within roving-focus widgets.
- Escape dismisses transient content without unexpectedly discarding unrelated state.
- Modal dialogs contain focus through native dialog behavior and restore focus when closed.
- Combobox DOM focus remains on the text input while `aria-activedescendant` identifies the active option.

## Visual presentation

The bundled stylesheet provides structural and accessibility-essential CSS, not a guaranteed accessible consumer theme. Custom colors must maintain WCAG contrast for text, controls, boundaries, states, and focus indicators.

Test at 200% text zoom and 400% page zoom/reflow, with reduced motion, forced colors, RTL, narrow viewports, and long translated content.

## Verification

See [Accessibility testing](./testing.md) for automated checks, test limitations, and the manual assistive-technology matrix. A clean axe result is useful evidence, but it is not proof of WCAG conformance.
