<script setup lang="ts">
/* eslint-disable vue/require-default-prop, vue/no-required-prop-with-default */
import { computed, onMounted, useAttrs, useSlots } from "vue";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "default" | "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonElementProps =
  | { as?: "button"; href?: never }
  | { as: "a"; href: string };

type ButtonAccessibilityProps =
  | { iconOnly: true; label: string }
  | { iconOnly?: false; label?: string };

type ButtonProps = ButtonElementProps &
  ButtonAccessibilityProps & {
    disabled?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
    type?: ButtonType;
    labelledBy?: string;
  };

const attrs = useAttrs() as Record<string, unknown>;
const slots = useSlots();

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

function getAttrString(name: string) {
  const value = attrs[name];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

const resolvedAriaLabelledBy = computed(() => {
  const attrLabelledBy = getAttrString("aria-labelledby");
  if (attrLabelledBy) return attrLabelledBy;
  return props.labelledBy;
});

const resolvedAriaLabel = computed(() => {
  const attrLabel = getAttrString("aria-label");
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

onMounted(() => {
  if (process.env.NODE_ENV !== "production") {
    if (props.as === "a" && !props.href) {
      console.warn(
        '[ShButton] as="a" was used without an href. ' +
          "Anchors without href are not accessible. " +
          "Add an href or use the default button.",
      );
    }

    // NOTE - Icon-only buttons need an explicit accessible name.
    const hasSlotContent =
      slots.default &&
      slots.default().some((vnode) => {
        // NOTE - Plain text slot content is already a valid label.
        if (typeof vnode.children === "string") {
          return vnode.children.trim().length > 0;
        }
        // NOTE - Non-text slot content is assumed intentional.
        return vnode.children !== null;
      });

    const hasAccessibleName =
      Boolean(resolvedAriaLabel.value) ||
      Boolean(resolvedAriaLabelledBy.value) ||
      Boolean(hasSlotContent);

    if (props.iconOnly && !hasAccessibleName) {
      console.warn(
        "[ShButton] iconOnly=true requires `label` or `labelledBy` (or `aria-label` / `aria-labelledby`).",
      );
    } else if (!hasAccessibleName) {
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
