# Accessibility

Accessibility is a **core feature** of ShoeHorn UI - not an add-on.

Every component is designed to:
- use correct semantics
- support keyboard interaction
- expose proper ARIA attributes
- avoid invalid or redundant ARIA

---

## Design Principles

#### 1. Native First
If the browser already supports something, ShoeHorn uses it.

#### 2. No fake accessibility
NO `role="button"` on actual `<button>` elements (and similar hacks).
NO ARIA where native HTML is sufficient.

#### 3. Keyboard always works
All interactive components:
- are focusable
- respond to keyboard input
- behave consistently across elements

---

## Dev-time warnings

ShoeHorn UI warns you **during development** when accessibility rules are violated.

Example:

```txt
txt

[ShButton] as="a" was used without an href.
Anchors without href are not accessible.
```

These warnings:
- only appear in dev mode
- explain _why_ something is wrong
- tell you _how_ to fix the problem

___

## ShoeHorn's Guarantees
- Correct roles
- Correct focus behavior
- No invalid ARIA
- Screen reader compatibility
- Lighthouse-safe primitives
| ⚠️ Note: Final accessibility also depends on how components are composed. |

---

## Testing accessibility

ShoeHorn components are unit-tested for:
- semantic output
- ARIA attributes
- disabled behavior

You are encouraged to add:
- integration tests
- a11y audits
- real screen reader testing
