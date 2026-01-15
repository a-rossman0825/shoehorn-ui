# ShButton

An accessible, polymorphic button component.

---

## Basic usage
```vue
vue

<ShButton @click="save">
  Save
</ShButton>
```
Renders:
```html
html

<button class="sh-button">Save</button>
```

## Rendering as a link
```vue
vue

<ShButton as="a" href="/settings">
  Go To Settings
</ShButton>
```
Renders:
```html
html

<a class="sh-button" href="/settings">Go to settings</a>
```
⚠️ Note: Using as="a" without href will trigger a dev warning.

---

## Props
| **Prop** | **Type** | **Default** | **Description** |
| -------- | -------- | ----------- | --------------- |
| `as`       | 'button' &#124; 'a' | button | Render element |
| `disabled` | boolean  | false       | Disables interaction |
| `variant`  | 'default' &#124; 'primary' &#124; 'ghost' | default | Semantic variants |
| `size`     | 'sm' &#124; 'md' &#124; 'lg' | md | Size hint |

---

## Events
| **Event** | **Payload** | **Description** |
| --------- | ----------- | --------------- |
| `click`     | MouseEvent  | Emitted when activated |

| `disabled` buttons do not emit events.

___

## Accessibility behavior
- uses native `<button>` semantics when possible
- Anchors receive:
	- `role="button"`
	- `aria-disabled`
	- keyboard activation (`Enter`/`Space`)
- Disabled anchors are removed from tab order

___

## Styling hooks

#### Classes
- `.sh-button`

#### Data attributes
```html
html

data-variant="default | primary | ghost"
data-size="sm | md | lg"
data-disabled="true"
```
Example:
```scss
scss

.sh-button[data-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## When to Use ShButton
- Actions
- Form submission
- Navigation (with as="a")

If you need:
- layout -> use CSS
- visual -> use your design system
- confirmation -> wrap with a modal

---

##ShoeHorn Guarantees
- Accessible by default
- No visual assumptions
- Stable public API
- Fully test-covered
