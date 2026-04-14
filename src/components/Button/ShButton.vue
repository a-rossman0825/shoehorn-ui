<script setup lang="ts">
/* eslint-disable vue/require-default-prop, vue/no-required-prop-with-default */
import { computed, onMounted, useAttrs } from "vue";
import { getAttrString } from "../../utils";
import { useHasSlotText } from "../../composables";
import { hasAccessibleName } from "../../utils/hasAccessibleName";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "default" | "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

/**
 * ShButton uses discriminated unions to enforce prop contracts:
 *
 * ElementProps: `as` determines the element type
 *   - as="button" (default): renders <button>, href not allowed
 *   - as="a": renders <a>, href is REQUIRED
 *
 * AccessibilityProps: `iconOnly` determines if label is required
 *   - iconOnly=true: label MUST be provided (icon-only button)
 *   - iconOnly=false/undefined (default): label is optional
 *
 * This prevents impossible prop combinations at compile time.
 * See docs/components/button.md for usage examples.
 */

type ButtonElementProps =
  | {
      as?: "button";
      href?: never;
    }
  | {
      as: "a";
      href: string;
    };

type ButtonAccessibilityProps =
  | {
      iconOnly: true;
      label: string;
    }
  | {
      iconOnly?: false;
      label?: string;
    };

type ButtonProps = ButtonElementProps &
  ButtonAccessibilityProps & {
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    labelledBy?: string;
  };

const attrs = useAttrs() as Record<string, unknown>;

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
  disabled: false,
  variant: "default",
  size: "md",
  type: "button",
  iconOnly: false,
});

const emit = defineEmits<{
  click: [mouseEvent: MouseEvent];
}>();

const isButton = computed(() => props.as === "button");

/* NOTE - refactor: use "getAttrString()" util instead.
function getAttrString(name: string) {
  const value = attrs[name];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}
    */

const resolvedAriaLabelledBy = computed(() => {
  const attrLabelledBy = getAttrString(attrs, "aria-labelledby");
  if (attrLabelledBy) return attrLabelledBy;
  return props.labelledBy;
});

const resolvedAriaLabel = computed(() => {
  const attrLabel = getAttrString(attrs, "aria-label");
  if (attrLabel) return attrLabel;
  if (resolvedAriaLabelledBy.value) return undefined;
  return props.label;
});

function onClick(mouseEvent: MouseEvent) {
  if (props.disabled) {
    mouseEvent.preventDefault();
    mouseEvent.stopImmediatePropagation();
    return;
  }
  emit("click", mouseEvent);
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    // NOTE - Keep keyboard activation on the same click event path.
    const syntheticClick = new MouseEvent("click", {
      bubbles: event.bubbles,
      cancelable: event.cancelable,
    });
    emit("click", syntheticClick);
  }
}

const slotHasText = useHasSlotText();

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    const hasSlotText = slotHasText();

    if (props.as === "a" && !props.href) {
      console.warn(
        '[ShButton] as="a" was used without an href. ' +
          "Anchors without href are not accessible. " +
          "Add an href or use the default button.",
      );
    }

    /* NOTE - refactor: use "useHasSlotText()" composable instead.
    const hasSlotContent =
      slots.default &&
      slots.default().some((vnode) => {
        if (typeof vnode.children === "string") {
          return vnode.children.trim().length > 0;
        }
        return vnode.children !== null;
      });
    */
    /* NOTE - refactor: use "hasAccessibleName()" util instead.
    const hasAccessibleName =
      Boolean(resolvedAriaLabel.value) ||
      Boolean(resolvedAriaLabelledBy.value) ||
      Boolean(hasSlotText);
    */
    const accessible = hasAccessibleName(
      resolvedAriaLabel.value,
      resolvedAriaLabelledBy.value,
      hasSlotText,
    );
    if (props.iconOnly && !accessible) {
      console.warn(
        "[ShButton] iconOnly=true requires `label` or `labelledBy` (or `aria-label` / `aria-labelledby`).",
      );
    } else if (!accessible) {
      console.warn(
        "[ShButton] Button has no accessible name. " +
          "Provide visible text, `label`, `labelledBy`, `aria-label`, or `aria-labelledby`.",
      );
    }
  }
});
</script>

<template>
  <component
    :is="as"
    class="sh-button"
    :data-disabled="disabled || undefined"
    :data-variant="variant"
    :data-size="size"
    :href="!isButton ? href : undefined"
    :type="isButton ? type : undefined"
    :disabled="isButton ? disabled : undefined"
    :aria-disabled="!isButton && disabled ? 'true' : undefined"
    :aria-label="resolvedAriaLabel"
    :aria-labelledby="resolvedAriaLabelledBy"
    :tabindex="!isButton ? (disabled ? -1 : 0) : undefined"
    :role="!isButton ? 'button' : undefined"
    @click="onClick"
    @keydown="!isButton ? onKeydown($event) : undefined"
  >
    <slot />
  </component>
</template>
